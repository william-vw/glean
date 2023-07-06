package wvw.glean.cig;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
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
import wvw.glean.workflow.print.WorkflowJsPrinter;
import wvw.glean.workflow.print.WorkflowJsonPrinter;
import wvw.glean.workflow.print.WorkflowJsonPrinter.PrintJsonTaskHook;
import wvw.glean.workflow.print.WorkflowPrinter;
import wvw.semweb.kb.jena.JenaKb;
import wvw.utils.IOUtils;
import wvw.utils.rdf.NS;

public class CIGWorkflowPrinter implements PrintJsonTaskHook {

	public enum DataSources {
		SERVER, LOCAL
	}

	private final static Logger LOG = Logger.getLogger(CIGWorkflowPrinter.class.getName());

	private UiGen uiGen = new UiGen();

	private String ontologyPath = "cig/js_ontology.n3";

	public static void main(String[] args) throws Exception {
		CIGWorkflowPrinter printer = new CIGWorkflowPrinter();

		// NOTE: after editing any ui-gen source file, need to re-run UiGen
		// make sure to remove out/html contents (so html is re-generated)

		// - print html separately

//		printer.printUi("/cig/test/input/example1.n3",
//				"http://example.org/decision3_report");

		// - print workflow

		String inFolder = "/Users/wvw/git/glean/glean-core/src/main/resources/";
		String tmpFolder = "/Users/wvw/git/glean/glean-core/src/main/resources/tmp/";
		String outFolder = "/Users/wvw/git/glean/glean-js/wf/";

		// -- lipid

//		String name = "lipid/ckd_dyslipidemia";
////		String name = "lipid/evaluate_lipid_profile";
//		String ns = NS.ckd;
//		for (DataSources src : DataSources.values())
//			printer.printWorkflow(name, ns, outFolder, src);

		// -- rbc

//		String name = "rbc/rbc_match";
//		String ns = NS.rbc;
//		printer.printWorkflow(name, ns, outFolder);

		// -- test
		String name = "test/example1";
		String ns = NS.ex;

		printer.printWorkflow(name, ns, inFolder, tmpFolder, outFolder, DataSources.LOCAL);
	}

//	private N3Model inputDef = null;

	private File inDir;
	private File htmlDir;
	private File tmpDir;

	private Map<Resource, JenaKb> inputDatas = new HashMap<>();

	public CIGWorkflowPrinter() throws IOException {
	}

	public void printUi(String inputPath, String inputRes) throws Exception {
		JenaKb inputData = loadInputData(inputPath);
//		inputData.printAll();

		N3Model reportNeeds = getReportNeeds(inputData.resource(inputRes), inputData);
//		reportNeeds.write(System.out);

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		uiGen.generate(EhrStandards.FHIR, UiFormats.HTML_RDFA, reportNeeds, tmpDir, out, OutputOptions.TABLE);

		String html = new String(out.toByteArray()).trim();
		System.out.println("html? " + html);
	}

	public void printWorkflow(String name, String ns, String inFolder, String tmpFolder, String outFolder,
			DataSources forSource) throws Exception {

		LOG.info("- printing workflow " + name + " for " + forSource);

		long start = System.currentTimeMillis();

		inDir = new File(inFolder);
		tmpDir = new File(tmpFolder);
		if (!tmpDir.exists())
			tmpDir.mkdir();
		htmlDir = new File(tmpDir, "html");
		if (!htmlDir.exists())
			htmlDir.mkdir();

		File outDir = new File(outFolder);
		if (!outDir.exists())
			outDir.mkdir();

		WorkflowModel wf = new CIGModel(ns, inFolder).initialize().load(inFolder + "cig/" + name + ".n3",
				LoadOptions.RECURSIVELY);

//		wf.getKb().printAll();

		// - string

//		WorkflowPrinter printer = new WorkflowStringPrinter(); // WorkflowD3TreePrinter();
//		printer.print(wf);
//		
//		System.out.println(printer.getString());

		// - json

		WorkflowPrinter jsonPrinter = new WorkflowD3TreePrinter(this);
		jsonPrinter.print(wf);

		String jsonOut = jsonPrinter.getString();
//		System.out.println("json:\n" + out);

		String outPath = null;
		switch (forSource) {

		case LOCAL:
			// - js
			N3Model ontology = ModelFactory.createN3Model(N3ModelSpec.get(Types.N3_MEM));
			ontology.read(IOUtils.getResourceStream(getClass(), ontologyPath), "");

			WorkflowPrinter jsPrinter = new WorkflowJsPrinter(ontology, jsonOut);
			jsPrinter.print(wf);

			String jsOut = jsPrinter.getString();
//			System.out.println("js:\n" + out);

			outPath = outFolder + name + "_local.js";
			IOUtils.writeFile(outPath, jsOut, false);

			break;

		case SERVER:
			outPath = outFolder + name + "_server.json";
			IOUtils.writeFile(outPath, jsonOut, false);

			break;
		}

		LOG.info("");

		LOG.info("written to " + outPath);

		long end = System.currentTimeMillis();
		LOG.info("writing: " + (end - start) + "ms\n");

		LOG.info("\n");
	}

	// (returns whether json was updated by this hook)
	public Boolean apply(Resource t, JenaKb kb, WorkflowJsonPrinter printer) {
		// did we add some stuff to the json?
		boolean modified = false;

		if (!t.isURI())
			return false;

		Resource inputRes = t.getPropertyResourceValue(kb.resource("cig:input"));
		if (inputRes != null) {
			String html = generateHtml(t, kb, inputRes);

			if (html != null) {
				printer.appendKeyString("inputForm", printer.txtToJson(html));

				modified = true;
			}
		}

		Resource htmlRes = t.getPropertyResourceValue(kb.resource("cig:insert"));
		if (htmlRes != null) {
			String html = loadFrom(htmlRes);

			if (html != null) {
				printer.appendKeyString("insert", printer.txtToJson(html));

				modified = true;
			}
		}

		return modified;
	}

	private String loadFrom(Resource htmlRes) {
		String htmlPath = htmlRes.asLiteral().getString();

		File htmlFile = new File(inDir, htmlPath);
		try {
			return IOUtils.readFromFile(htmlFile);

		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	private String generateHtml(Resource t, JenaKb kb, Resource inputElRes) {
		Resource inputFileRes = findClosestInputData(t, kb);
		if (inputFileRes == null) {
			LOG.error("cannot find closest inputFile for input: " + inputElRes);
			return null;
		}

		// - check whether HTML for this element had already been generated before;
		// if so, simply load & return that

		String inPath = inputFileRes.asLiteral().getString();
		File inputFile = new File(inDir, inPath);
		File htmlFile = new File(htmlDir, inputElRes.getLocalName() + ".html");

		// input-file was not edited after html was previously generated
		// so, simply return previously generated html

		if (htmlFile.exists() && inputFile.lastModified() <= htmlFile.lastModified())
			try {
				String html = IOUtils.readFromFile(htmlFile);
				LOG.info("loaded html file: " + htmlFile.getPath());

				return html;

			} catch (IOException e1) {
				e1.printStackTrace();
			}

		// - check whether this input-data file had already been loaded
		// (will typically contain many report-needs for input resources)

		if (!inputDatas.containsKey(inputFileRes)) {
			try {
				JenaKb inputData = loadInputData(inPath);
				LOG.info("loaded input file: " + inPath);

				inputDatas.put(inputFileRes, inputData);

			} catch (IOException e) {
				LOG.error("cannot load inputFile: " + inPath, e);
				return null;
			}
		}

		JenaKb inputData = inputDatas.get(inputFileRes);

		LOG.info(t.getLocalName() + ": input = " + inputElRes.getLocalName() + " ("
				+ inputFileRes.asLiteral().getValue() + ")");

		N3Model reportNeeds = getReportNeeds(inputElRes, inputData);
//			reportNeeds.write(System.out);

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {
			uiGen.generate(EhrStandards.FHIR, UiFormats.HTML_RDFA, reportNeeds, tmpDir, out, OutputOptions.TABLE);

			String html = new String(out.toByteArray()).trim();
//			System.out.println(html);
			html = Pattern.compile(">\\s+<", Pattern.DOTALL).matcher(html).replaceAll("><");

			// store html for later re-use
			IOUtils.writeToFile(html, htmlFile);

			return html;

		} catch (Exception e) {
			LOG.error("cannot generate UI code", e);

			return null;
		}
	}

	private JenaKb loadInputData(String inPath) throws IOException {
		File reportNeeds = new File(inDir, inPath);

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

		Collection actions = inputData.list(input, inputData.resource("fhir:PlanDefinition.action"), (Resource) null)
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
