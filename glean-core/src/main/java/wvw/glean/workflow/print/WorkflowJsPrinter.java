package wvw.glean.workflow.print;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.jen3.n3.N3Model;
import org.apache.jen3.n3.N3ModelSpec;
import org.apache.jen3.n3.N3ModelSpec.Types;
import org.apache.jen3.n3.impl.N3Rule;
import org.apache.jen3.rdf.model.CitedFormula;
import org.apache.jen3.rdf.model.Collection;
import org.apache.jen3.rdf.model.ModelFactory;
import org.apache.jen3.rdf.model.Resource;
import org.apache.jen3.reasoner.rulesys.Node_RuleVariable;
import org.apache.jen3.vocabulary.RDF;
import org.apache.jen3.vocabulary.RDFS;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import wvw.glean.workflow.WorkflowModel;
import wvw.semweb.codegen.CodeGen.GenConfig;
import wvw.semweb.codegen.CodeGen.GenOptions;
import wvw.semweb.codegen.gen.GenerateCode.CodeTypes;
import wvw.semweb.codegen.gen.GenerateCode.GeneratedCode;
import wvw.semweb.codegen.gen.GenerateJavaScript;
import wvw.semweb.codegen.model.adt.CodeModel;
import wvw.semweb.codegen.parse.ParseModelLogic;
import wvw.semweb.codegen.parse.rule.ann.ParameterAnnotation;
import wvw.semweb.codegen.parse.rule.ann.ParameterAnnotation.ParameterTypes;

public class WorkflowJsPrinter extends WorkflowPrinter {

	protected static final Logger log = LogManager.getLogger(WorkflowJsPrinter.class);

	private StringBuffer fnStr = new StringBuffer();

	private int eCnt = 0;
	private int cCnt = 0;
	private Map<Resource, JsObj> map = new HashMap<>();

	private String jsonStr;

	private GenConfig jsGenConfig = new GenConfig(CodeTypes.JAVASCRIPT, GenOptions.GEN_NODE_ADT_MAP,
			GenOptions.ONLY_IF_COND);
	private N3Model jsOntology;
	// populate same code-model for all conditions
	private CodeModel jsCodeModel = new CodeModel();

	public WorkflowJsPrinter(N3Model jsOntology, String jsonStr) {
		this.jsOntology = jsOntology;

		this.jsonStr = jsonStr;
	}

	@Override
	public void print(WorkflowModel m) {
		this.kb = m.getKb();

		Resource wf = getWorkflow();
		if (wf == null)
			return;

		JsObj ret = print(wf);

		try {
			jsCodeModel.removeStruct("Entity");

			GenerateJavaScript codeGen = new GenerateJavaScript();
			GeneratedCode gen = codeGen.generate(jsCodeModel, jsGenConfig);

			String cls = gen.getAdt().replaceAll("(\\s|^)class(\\s)", "$1export class$2");
			str.append(cls);

			str.append("\n\nexport var nodeAdtMap = ").append(gen.getNodeAdtMap()).append("\n");

		} catch (IOException e) {
			e.printStackTrace();
		}

		String fn = fnStr.toString().replaceAll("\n", "\n\t");

		str.append("\n\n").append("export function createWorkflow() {\n\t");
		str.append(fn);
		str.append("\n\t").append("return ").append(ret.varName);
		str.append("\n}");

		str.append("\n\nexport var jsonWorkflow = ").append(jsonStr);
	}

	private JsObj print(Resource r) {
		if (map.containsKey(r))
			return map.get(r);

		JsObj obj = instantiateCls(r);
		map.put(r, obj);

		r.listProperties(kb.resource("gl:subTask")).forEachRemaining(stmt -> {
			JsObj ret = print(stmt.getObject());

			fnStr.append(obj.varName).append(".subTask.push(").append(ret.varName).append(")\n");
			fnStr.append(ret.varName).append(".subTaskOf = ").append(obj.varName).append("\n");
		});

		r.listProperties(kb.resource("gl:decisionBranch")).forEachRemaining(stmt -> {
			JsObj ret = print(stmt.getObject());

			fnStr.append(obj.varName).append(".decisionBranch.push(").append(ret.varName).append(")\n");
		});

		if (r.hasProperty(kb.resource("gl:branchTarget"))) {
			JsObj ret = print(r.getProperty(kb.resource("gl:branchTarget")).getObject());

			fnStr.append(obj.varName).append(".branchTarget = ").append(ret.varName).append("\n");
		}

		r.listProperties(kb.resource("gl:next")).forEachRemaining(stmt -> {
//			if (r.hasProperty(kb.resource("gl:decisionBranch"), stmt.getObject())
//					|| r.hasProperty(kb.resource("gl:branchTarget"), stmt.getObject())
//			)
//
//				return;

			JsObj ret = print(stmt.getObject());

			fnStr.append(obj.varName).append(".next.push(").append(ret.varName).append(")\n");
			fnStr.append(ret.varName).append(".nextOf.push(").append(obj.varName).append(")\n");
		});

		return obj;
	}

	private JsObj instantiateCls(Resource r) {
		String varName = "e" + eCnt++;

		String cls = null;
		String type = null;
		if (r.hasProperty(kb.resource("gl:subTask"))) {
			cls = "Entity";
			type = "Entity.CompositeTask";

		} else if (r.hasProperty(RDF.type, kb.resource("gl:EndPoint"))) {
			cls = "Entity";
			type = "Entity.EndPoint";

		} else if (r.hasProperty(kb.resource("gl:decisionBranch"))) {
			cls = "Entity";
			type = "Entity.DecisionTask";

		} else if (r.hasProperty(kb.resource("gl:branchTarget"))) {
			cls = "Entity";
			type = "Entity.DecisionBranch";

		} else
			cls = "Entity";

		fnStr.append("let ").append(varName).append(" = ").append("new ").append(cls).append("()\n");
		if (type != null)
			fnStr.append(varName).append(".type = ").append(type).append("\n");

		String state = getState(r);
		fnStr.append(varName).append(".isIn = ").append("new State(State.").append(state).append(")\n");

		if (r.hasProperty(kb.resource("gl:conditional"))) {
			boolean conditional = r.getPropertyResourceValue(kb.resource("gl:conditional")).asLiteral().getBoolean();

			fnStr.append(varName).append(".conditional = ").append(conditional).append("\n");
		}

		if (r.hasProperty(kb.resource("gl:involvesAction"))) {
			boolean conditional = r.getPropertyResourceValue(kb.resource("gl:involvesAction")).asLiteral().getBoolean();

			fnStr.append(varName).append(".involvesAction = ").append(conditional).append("\n");
		}

		if (r.hasProperty(kb.resource("gl:precondition"))) {
			Resource c = r.getProperty(kb.resource("gl:precondition")).getObject();

			JsObj ret = genCondition(c);
			fnStr.append(varName).append(".precondition = ").append(ret.varName).append("\n");
		}

		if (r.isURI())
			fnStr.append(varName).append(".id = \"").append(r.getLocalName()).append("\"\n");

		String label = null;
		if (r.hasProperty(RDFS.label))
			label = r.getProperty(RDFS.label).getObject().asLiteral().getString();
		else
			label = r.getLocalName();

		if (label != null)
			fnStr.append(varName).append(".label = \"").append(label).append("\"\n");

		return new JsObj(varName);
	}

	private String getState(Resource r) {
		if (r.hasProperty(kb.resource("state:in"))) {
			String state = r.getProperty(kb.resource("state:in")).getObject().getLocalName();
			return state;

		} else
			return "Inactive";
	}

	private JsObj genCondition(Resource c) {
		String varName = "c" + cCnt++;

		String cls = "Condition";
		String type = null;

		if (c.hasProperty(kb.resource("cond:allOf"))) {
			type = "Condition.Conjunction";

		} else if (c.hasProperty(kb.resource("cond:anyOf"))) {
			type = "Condition.Disjunction";
		}

		fnStr.append("let ").append(varName).append(" = ").append("new ").append(cls).append("()\n");
		if (type != null)
			fnStr.append(varName).append(".type = ").append(type).append("\n");

		JsObj obj = new JsObj(varName);

		c.listProperties(kb.resource("cond:anyOf")).andThen(c.listProperties(kb.resource("cond:allOf")))
				.forEachRemaining(stmt -> {
					String prpName = (stmt.getPredicate().getURI().endsWith("anyOf") ? "anyOf" : "allOf");

					Collection col = stmt.getObject().asCollection();

					col.getElements().forEachRemaining(e -> {
						JsObj ret = genCondition(e);
						fnStr.append(obj.varName).append(".").append(prpName).append(".push(").append(ret.varName)
								.append(")\n");
					});
				});

		if (c.hasProperty(kb.resource("cond:premise"))) {
			CitedFormula premise = c.getPropertyResourceValue(kb.resource("cond:premise")).asCitedFormula();

			String fn = genConditionFn(premise, obj);
			fnStr.append(obj.varName).append(".check = ").append(fn).append("\n");
		}

		return obj;
	}

	private String genConditionFn(CitedFormula premise, JsObj obj) {
		List<N3Rule> rules = new ArrayList<>();

		N3Model m = ModelFactory.createN3Model(N3ModelSpec.get(Types.N3_MEM_FP_INF));
		m.setListener((r) -> rules.add(r));

		CitedFormula concl = m.createCitedFormula();
		N3Model conclM = concl.open();
		conclM.add(m.createQuickVariable(obj.varName), kb.resource("cond:conditionMet"), kb.literal(true));
		concl.close();

		m.add(premise, kb.resource("log:implies"), concl);

		ParameterAnnotation ann1 = new ParameterAnnotation(new Node_RuleVariable("obs", 0), ParameterTypes.FUNCTION);
		ParameterAnnotation ann2 = new ParameterAnnotation(new Node_RuleVariable(obj.varName, 0),
				ParameterTypes.FUNCTION);

		try {
			ParseModelLogic parser = new ParseModelLogic(jsCodeModel);
			parser.parse(rules, jsOntology, Arrays.asList(ann1, ann2), jsGenConfig);

			GenerateJavaScript genCode = new GenerateJavaScript();
			String body = genCode.generate(parser.getLogic(), jsGenConfig);
			body = "return " + body;
			body = body.replaceAll("\n|\t", " ").replaceAll("  ", " ");

			return "function (obs) {\n\t" + body + "\n}";

		} catch (Exception e) {
			log.error("for premise: " + premise);
			e.printStackTrace();
			return null;
		}
	}

	private class JsObj {

		private String varName;

		public JsObj(String varName) {
			this.varName = varName;
		}

		@Override
		public String toString() {
			return "JsObj [varName=" + varName + "]";
		}
	}
}