package wvw.glean.workflow.print;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.jen3.rdf.model.Resource;
import org.apache.jen3.rdf.model.Statement;
import org.apache.jen3.rdf.model.StmtIterator;
import org.apache.jen3.vocabulary.RDF;
import org.apache.jen3.vocabulary.RDFS;
import org.apache.log4j.Logger;

import wvw.glean.cig.CIGModel;
import wvw.glean.workflow.WorkflowModel;
import wvw.glean.workflow.WorkflowModel.LoadOptions;
import wvw.semweb.kb.jena.JenaKb;
import wvw.semweb.kb.jena.NS;
import wvw.utils.IOUtils;

public abstract class WorkflowPrinter {

	public static void main(String[] args) throws Exception {
		long start = System.currentTimeMillis();

		String name = "ckd_dyslipidemia-v2";
		String path = "cig/lipid/" + name + ".n3";

		WorkflowModel wf = new CIGModel(NS.ckd).initialize().load(WorkflowPrinter.class, path,
				LoadOptions.RECURSIVELY);

//		wf.getKb().printAll();

		// string
//		WorkflowPrinter printer = new WorkflowStringPrinter(); // WorkflowD3TreePrinter();
//		printer.print(wf);
//
//		System.out.println(printer.getString());

		// json
		WorkflowPrinter printer = new WorkflowD3TreePrinter(null);
		printer.print(wf);

		String out = printer.getString();
//		System.out.println(out);
		
		String outFolder = "/Users/wvw/git/cig/visualize/json/";
		String outPath = outFolder + name + ".json";
		IOUtils.writeFile(outPath, out, false);

		long end = System.currentTimeMillis();
		LOG.info("writing workflow: " + (end - start) + "ms");
		
		LOG.info("written to " + outPath);
	}

	protected final static Logger LOG = Logger.getLogger(WorkflowPrinter.class.getName());

	protected JenaKb kb;
	protected StringBuffer str = new StringBuffer();

	public WorkflowPrinter() {
	}

	public abstract void print(WorkflowModel m);

	protected Resource getWorkflow() {
		Resource ret = null;

		StmtIterator it = kb.list(null, RDF.type, kb.resource("gl:Workflow"));
		while (it.hasNext()) {
			Resource wf = it.next().getSubject();

			if (kb.contains(wf, kb.resource("gl:root"), kb.literal(true))) {
				if (ret != null)
					LOG.error("multiple root workflows found: " + ret.getLocalName() + ", "
							+ wf.getLocalName());

				ret = wf;
			}
		}

		if (ret == null)
			LOG.error("no workflow found");

		return ret;
	}

	protected List<Resource> getFollowing(Resource e) {
		List<Resource> ret = new ArrayList<>();

		if (e.hasProperty(RDF.type, kb.resource("gl:DecisionBranch")))
			e = e.getPropertyResourceValue(kb.resource("gl:branchTarget"));

		if (e.hasProperty(RDF.type, kb.resource("gl:CompositeTask"))) {
			StmtIterator it = e.listProperties(kb.resource("gl:subTask"));

			while (it.hasNext()) {
				Statement stmt = it.next();
				Resource subTask = stmt.getObject();

				// filter out subtasks that are not "first"'s in the composite task
				// and not the target of decision branches
				if (!kb.list(null, kb.resource("gl:next"), subTask).hasNext()
						&& !kb.list(null, kb.resource("gl:branchTarget"), subTask).hasNext())

					ret.add(subTask);
			}
		}

		ret.addAll(e.listProperties(kb.resource("gl:next")).toList().stream()
				.map(stmt -> stmt.getObject()).collect(Collectors.toList()));

//		System.out.println(e + " -> " + ret);
		return ret;
	}

	protected String getTaskName(Resource e) {
		String name = e.getLocalName();

		if (e.hasProperty(RDF.type, kb.resource("gl:CompositeTask")))
			name = "|" + name + "|";

		if (e.hasProperty(RDF.type, kb.resource("gl:DecisionTask")))
			name = "[" + name + "]";

		return name;
	}

	protected String getPreconditionLabel(Resource e) {
		Statement condStmt = e.getProperty(kb.resource("gl:precondition"));
		if (condStmt == null)
			return null;

		if (condStmt.getObject().equals(kb.resource("gl:Other")))
			return "other";
		else {
			Statement labelStmt = condStmt.getObject().getProperty(RDFS.label);
			if (labelStmt != null)
				return labelStmt.getObject().asLiteral().getString();
			else
				return e.toString();
		}
	}

	protected Resource getTask(Resource e) {
		if (e.hasProperty(RDF.type, kb.resource("gl:DecisionBranch")))
			return e.getPropertyResourceValue(kb.resource("gl:branchTarget"));
		else
			return e;
	}

	protected String getId(Resource e) {
		e = getTask(e);

		return (e.isURI() ? e.getLocalName() : e.toString());
	}

	protected String getType(Resource task) {
		if (task.hasProperty(RDF.type, kb.resource("gl:DecisionTask")))
			return "decision_task";
		else if (task.hasProperty(RDF.type, kb.resource("gl:CompositeTask")))
			return "composite_task";
		else if (task.hasProperty(RDF.type, kb.resource("gl:EndPoint")))
			return "endpoint";
		else
			return "atomic_task";
	}

	protected String getWorkflowState(Resource task) {
		// TODO
		if (task.hasProperty(kb.resource("state:in"))) {
			String state = task.getProperty(kb.resource("state:in")).getObject().getLocalName();
			return state.toLowerCase() + "State";
		}

		return "inactiveState";
	}

	protected String getDecisionalState(Resource task) {
		// TODO ..
		return "chosenState";
	}

	public String getString() {
		return str.toString();
	}
}
