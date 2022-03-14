package wvw.glean.cig;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Pattern;

import org.apache.jen3.n3.N3Model;
import org.apache.jen3.n3.N3ModelSpec;
import org.apache.jen3.n3.N3ModelSpec.Types;
import org.apache.jen3.rdf.model.Collection;
import org.apache.jen3.rdf.model.ModelFactory;
import org.apache.jen3.rdf.model.Resource;
import org.apache.jen3.rdf.model.Statement;
import org.apache.jen3.rdf.model.StmtIterator;
import org.apache.jen3.util.iterator.ExtendedIterator;
import org.apache.jen3.vocabulary.RDF;
import org.apache.log4j.Logger;

import wvw.cig.uigen.UiGen;
import wvw.cig.uigen.UiGen.EhrStandards;
import wvw.cig.uigen.UiGen.OutputOptions;
import wvw.cig.uigen.UiGen.UiFormats;
import wvw.glean.workflow.WorkflowModel;
import wvw.glean.workflow.WorkflowModel.LoadOptions;
import wvw.glean.workflow.print.WorkflowD3TreePrinter;
import wvw.glean.workflow.print.WorkflowJsonPrinter;
import wvw.glean.workflow.print.WorkflowJsonPrinter.PrintJsonTaskHook;
import wvw.glean.workflow.print.WorkflowPrinter;
import wvw.semweb.kb.jena.JenaKb;
import wvw.semweb.kb.jena.NS;
import wvw.utils.IOUtils;

public class CIGWorkflowPrinter implements PrintJsonTaskHook {

	private final static Logger LOG = Logger.getLogger(CIGWorkflowPrinter.class.getName());

	private Map<Resource, JenaKb> inputDatas = new HashMap<>();
	private Map<Resource, String> inputHtml = new HashMap<>();

	private UiGen uiGen = new UiGen();

	public static void main(String[] args) throws Exception {
		CIGWorkflowPrinter printer = new CIGWorkflowPrinter();

		// - print html separately

		// (NOTE: when editing ui_codes, need to re-run UiGen!)
		
//		printer.printUi("/cig/lipid/input/ckd_dyslipidemia.n3", "ckd:prior_lipid_profile_report");

		// - print workflow

		String name = "lipid/ckd_dyslipidemia";
		printer.printWorkflow(name);
	}

	private N3Model inputDef = null;
	private File tmpDir = Paths.get("src/main/resources/out/tmp").toFile();

	public CIGWorkflowPrinter() throws IOException {
		File defFile = Paths.get("src/main/resources/cig/input/definitions.n3").toFile();

		inputDef = ModelFactory.createN3Model(N3ModelSpec.get(Types.N3_MEM));
		inputDef.read(new FileInputStream(defFile), "N3");
	}

	public void printUi(String inputPath, String inputRes) throws Exception {
		JenaKb inputData = loadInputData(inputPath);
//		inputData.printAll();

		N3Model reportNeeds = getReportNeeds(inputData.resource(inputRes), inputData);
//		reportNeeds.write(System.out);

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		uiGen.generate(EhrStandards.FHIR, UiFormats.HTML_RDFA, reportNeeds, tmpDir, out,
				OutputOptions.TABLE);

		String html = new String(out.toByteArray()).trim();
		System.out.println("html? " + html);
	}

	public void printWorkflow(String name) throws Exception {
		long start = System.currentTimeMillis();

		WorkflowModel wf = new CIGModel(NS.ckd).initialize().load(getClass(), "cig/" + name + ".n3",
				LoadOptions.RECURSIVELY);

//		wf.getKb().printAll();

		// string
//		WorkflowPrinter printer = new WorkflowStringPrinter(); // WorkflowD3TreePrinter();
//		printer.print(wf);
//		
//		System.out.println(printer.getString());

		// json
		WorkflowPrinter printer = new WorkflowD3TreePrinter(this);
		printer.print(wf);

		String out = printer.getString();
//		System.out.println(out);

		String outFolder = "/Users/wvw/git/cig/visualize/json/";
		String outPath = outFolder + name + ".json";
		IOUtils.writeFile(outPath, out, false);

		long end = System.currentTimeMillis();
		LOG.info("writing json: " + (end - start) + "ms");

		LOG.info("written to " + outPath);
	}

	// (returns whether json was updated by this hook)
	public Boolean apply(Resource t, JenaKb kb, WorkflowJsonPrinter printer) {
		if (!t.isURI())
			return false;

		Resource input = t.getPropertyResourceValue(kb.resource("cig:input"));
		if (input != null) {
			String html = null;

			// already encountered this particular input
			// (e.g., in case of multiple occurrences of same workflow)
			if (inputHtml.containsKey(input))
				html = inputHtml.get(input);
			else {
				html = generateHtml(t, kb, input);
				inputHtml.put(input, html);
			}

			if (html != null) {
				printer.appendKeyString("html", printer.txtToJson(html));
				// added some stuff to the json
				return true;
			}
		}

		return false;
	}

	private String generateHtml(Resource t, JenaKb kb, Resource input) {
		Resource inputFile = findClosestInputData(t, kb);
		if (inputFile == null) {
			LOG.error("cannot find closest inputFile for input: " + input);
			return null;
		}

		if (!inputDatas.containsKey(inputFile)) {
			String inPath = inputFile.asLiteral().getString();

			try {
				JenaKb inputData = loadInputData(inPath);
				inputDatas.put(inputFile, inputData);

				LOG.info("loaded input file: " + inPath);

			} catch (IOException e) {
				LOG.error("cannot load inputFile: " + inPath, e);
				return null;
			}
		}

		JenaKb inputData = inputDatas.get(inputFile);

		LOG.info(t.getLocalName() + ": input = " + input.getLocalName() + " ("
				+ inputFile.asLiteral().getValue() + ")");

		N3Model reportNeeds = getReportNeeds(input, inputData);
//			reportNeeds.write(System.out);

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {
			uiGen.generate(EhrStandards.FHIR, UiFormats.HTML_RDFA, reportNeeds, tmpDir, out,
					OutputOptions.TABLE);

			String html = new String(out.toByteArray()).trim();
//			System.out.println(html);
			html = Pattern.compile(">\\s+<", Pattern.DOTALL).matcher(html).replaceAll("><");

			return html;

		} catch (Exception e) {
			LOG.error("cannot generate UI code", e);

			return null;
		}
	}

	private JenaKb loadInputData(String inPath) throws IOException {
		File reportNeeds = Paths.get("src/main/resources" + inPath).toFile();

		N3Model model = ModelFactory.createN3Model(N3ModelSpec.get(Types.N3_MEM));
		model.read(new FileInputStream(reportNeeds), "N3");

		return new JenaKb(model);
	}

	private N3Model getReportNeeds(Resource input, JenaKb inputData) {
		N3Model reportNeeds = ModelFactory.createN3Model(N3ModelSpec.get(Types.N3_MEM));
//		reportNeeds.add(inputDef);

		// ('input' is not from InputModel, so need to query that model explicitly,
		// i.e., cannot invoke its properties here)
		StmtIterator it = inputData.list(input, null, (Resource) null);
		if (!it.hasNext()) {
			LOG.error("ERROR: cannot find plan definition " + input + " in input file");
			return reportNeeds;
		}

		reportNeeds.add(it);

		Collection actions = inputData
				.list(input, inputData.resource("fhir:PlanDefinition.action"), (Resource) null)
				.next().getObject().asCollection();

		Iterator<Resource> elements = actions.getElements();
		while (elements.hasNext()) {
			Resource bnode = elements.next();

			Resource defUri = inputData.resource("fhir:PlanDefinition.action.definitionUri");
			Resource action = bnode.getPropertyResourceValue(defUri);
			if (!action.hasProperty(RDF.type)) {
				LOG.error("unknown action: '" + action + "'");
				continue;
			}

			reportNeeds.add(bnode, defUri, action);

			reportNeeds.add(action.listProperties());
			Resource req = action.getPropertyResourceValue(
					inputData.resource("fhir:ActivityDefinition.observationResultRequirement"));
			transitiveBNodeProperties(req, reportNeeds);
		}

		return reportNeeds;
	}

	private void transitiveBNodeProperties(Resource src, N3Model model) {
		src.listProperties().forEachRemaining(stmt -> {
			model.add(stmt);

			if (stmt.getObject().isAnon()) {
				transitiveBNodeProperties(stmt.getObject(), model);
			}
		});
	}

	private Resource findClosestInputData(Resource e, JenaKb kb) {
		ExtendedIterator<Statement> it = kb.list(null, kb.resource("gl:subTask"), e);

		while (it.hasNext()) {
			Statement stmt = it.next();

			Resource e0 = stmt.getSubject();
			Resource inputData = e0.getPropertyResourceValue(kb.resource("cig:inputFile"));

			if (inputData != null) {
				return inputData;
			} else
				return findClosestInputData(e0, kb);
		}

		return null;
	}
}
