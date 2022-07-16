package wvw.cig.uigen;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.jen3.n3.FeedbackActions;
import org.apache.jen3.n3.FeedbackTypes;
import org.apache.jen3.n3.N3Feedback;
import org.apache.jen3.n3.N3MistakeTypes;
import org.apache.jen3.n3.N3Model;
import org.apache.jen3.n3.N3ModelSpec;
import org.apache.jen3.n3.N3ModelSpec.Types;
import org.apache.jen3.rdf.model.ModelFactory;
import org.apache.log4j.Logger;

import wvw.utils.IOUtils;

public class UiGen {

	public enum EhrStandards {
		FHIR, OPENEHR;

		public String getFolder() {
			return toString().toLowerCase();
		}
	};

	public enum UiFormats {
		HTML_RDFA(".html"), YAIL(".yail");

		private String ext;

		private UiFormats(String ext) {
			this.ext = ext;
		}

		public String getExt() {
			return ext;
		}

		public String getFolder() {
			return toString().toLowerCase();
		}

		public String getFolder(OutputOptions... options) {
			String folder = getFolder();

			OutputOptions option = null;
			if (this == HTML_RDFA) {
				if (options.length > 0)
					option = options[0];
				else
					option = OutputOptions.SELF_CONTAINED;
			}

			if (option != null)
				folder += "/" + option.getFolder();

			return folder;
		}
	};

	public enum OutputOptions {
		SELF_CONTAINED, TABLE;

		private String getFolder() {
			return toString().toLowerCase();
		}
	}

	private final static Logger LOG = Logger.getLogger(UiGen.class.getName());

	// run "prepare" steps here
	public static void main(String[] args) throws Exception {
		UiGen uiGen = new UiGen();

		uiGen.prepare(EhrStandards.FHIR, UiFormats.HTML_RDFA, OutputOptions.SELF_CONTAINED);
		uiGen.prepare(EhrStandards.FHIR, UiFormats.HTML_RDFA, OutputOptions.TABLE);
		
//		uiGen.prepare(EhrStandards.FHIR, UiFormats.YAIL);
	}

	protected void prepare(EhrStandards ehr, UiFormats ui, OutputOptions... options)
			throws Exception {
		prepare(ehr);

		File preparedUi = IOUtils.getResourceFromCaller(
				"ehr/" + ehr.getFolder() + "/out/" + ui.getFolder(options) + "/ui_prepared.n3");

		preparedUi.getParentFile().mkdirs();

//		if (!preparedUi.exists())
		prepareUi(ehr, ui, new FileOutputStream(preparedUi), options);
		LOG.info("written to " + preparedUi.getAbsolutePath());
	}

	protected void prepare(EhrStandards ehr) throws Exception {
		File selectors = IOUtils
				.getResourceFromCaller("ehr/" + ehr.getFolder() + "/out/selectors_composed.n3");

//		if (!selectors.exists())
		composeSelectors(ehr, new FileOutputStream(selectors));
		LOG.info("written to " + selectors.getAbsolutePath());
	}

	protected void composeSelectors(EhrStandards ehr, OutputStream out) throws Exception {
		LOG.info("composing selectors ..");

		N3Model model = ModelFactory.createN3Model(N3ModelSpec.get(Types.N3_MEM_FP_INF));
		model.read(
				IOUtils.getResourceStream(getClass(), "/ehr/" + ehr.getFolder() + "/selectors.n3"),
				"N3");
		model.read(IOUtils.getResourceStream(getClass(), "/rules/compose_selectors.n3"), "N3");

		model.getDeductionsModel().write(out);
	}

	protected void prepareUi(EhrStandards ehr, UiFormats ui, OutputStream out,
			OutputOptions... options) throws Exception {

		LOG.info("preparing ui ..");

		N3Model model = ModelFactory.createN3Model(N3ModelSpec.get(Types.N3_MEM_FP_INF));

		model.read(IOUtils.getResourceStream(getClass(),
				"/ehr/" + ehr.getFolder() + "/obs_structure.n3"), "N3");

		model.read(IOUtils.getResourceStream(getClass(),
				"/ui/" + ui.getFolder(options) + "/ui_codes.n3"), "N3");

		LOG.info(IOUtils.getResourcePath(getClass(),
				"/ui/" + ui.getFolder(options) + "/ui_codes.n3"));

		model.read(IOUtils.getResourceStream(getClass(), "/rules/prepare_ui.n3"), "N3");

		model.getDeductionsModel().write(out);
	}

	public void generate(EhrStandards ehr, UiFormats ui, N3Model reportNeeds, File tmpDir,
			OutputStream out, OutputOptions... options) throws Exception {

		switch (ui) {

		case YAIL:
			File yailFile = new File(tmpDir, "ui_final.yail");
			OutputStream yailOut = new FileOutputStream(yailFile);

			doGenerate(ehr, ui, reportNeeds, tmpDir, yailOut, options);
			packageAia(ehr, ui, yailFile, tmpDir, out);

			yailFile.delete();

			break;

		default:
			doGenerate(ehr, ui, reportNeeds, tmpDir, out, options);
			break;
		}
	}

	private void doGenerate(EhrStandards ehr, UiFormats ui, N3Model reportNeeds, File tmpDir,
			OutputStream out, OutputOptions... options) throws Exception {

		File selectors = IOUtils.getResource(getClass(),
				"ehr/" + ehr.getFolder() + "/out/selectors_composed.n3");
		File preparedUi = IOUtils.getResource(getClass(),
				"ehr/" + ehr.getFolder() + "/out/" + ui.getFolder(options) + "/ui_prepared.n3");

		File instantiatedUi = new File(tmpDir, "ui_instantiated.n3");

		instantiateUi(ehr, ui, selectors, preparedUi, reportNeeds,
				new FileOutputStream(instantiatedUi));
		finalizeUi(ehr, ui, selectors, instantiatedUi, reportNeeds, out, options);

//		instantiatedUi.delete();

		LOG.info("written UI to outputstream");
	}

	protected void instantiateUi(EhrStandards ehr, UiFormats ui, File selectors, File preparedUi,
			N3Model reportNeeds, OutputStream out) throws Exception {

		LOG.info("instantiating ui..");

		N3ModelSpec spec = N3ModelSpec.get(Types.N3_MEM_FP_INF);
		spec.setFeedback(new N3Feedback(N3MistakeTypes.BUILTIN_WRONG_INPUT, FeedbackTypes.ERROR,
				FeedbackActions.LOG));

		N3Model model = ModelFactory.createN3Model(spec);

		model.add(reportNeeds);
		model.read(new FileInputStream(selectors), "N3");
		model.read(new FileInputStream(preparedUi), "N3");
		model.read(
				IOUtils.getResourceStream(getClass(), "/ehr/" + ehr.getFolder() + "/templates.n3"),
				"N3");

		model.read(IOUtils.getResourceStream(getClass(), "/rules/instantiate_ui.n3"), "N3");

//		model.write(System.out);
		model.getDeductionsModel().write(out);
	}

	protected void finalizeUi(EhrStandards ehr, UiFormats ui, File selectors, File instantiatedUi,
			N3Model reportNeeds, OutputStream out, OutputOptions... options) throws Exception {

		LOG.info("finalizing ui ..");

		N3Model model = ModelFactory.createN3Model(N3ModelSpec.get(Types.N3_MEM_FP_INF));

		model.add(reportNeeds);
		model.read(IOUtils.getResourceStream(getClass(),
				"/ui/" + ui.getFolder(options) + "/ui_codes.n3"), "N3");
		model.read(new FileInputStream(selectors), "N3");
		model.read(new FileInputStream(instantiatedUi), "N3");
		model.read(
				IOUtils.getResourceStream(getClass(), "/ehr/" + ehr.getFolder() + "/templates.n3"),
				"N3");

		model.read(IOUtils.getResourceStream(getClass(), "/rules/finalize_ui.n3"), "N3");

//		model.getDeductionsModel().write(System.out);
		model.outputString(out);
	}

	// TODO properly populate project.properties

	protected void packageAia(EhrStandards ehr, UiFormats ui, File tmpDir, File yailFile,
			OutputStream out) throws Exception {

		File outRootDir = tmpDir;
		String localRootDir = "ui/" + ui.getFolder() + "/";

		File outDir1 = new File(outRootDir, "src/appinventor/ai_test/");
		outDir1.mkdirs();

		Path source1 = IOUtils.getResourcePath(getClass(), localRootDir + "Screen1.bky");
		Path target1 = new File(outDir1, "Screen1.bky").toPath();
		Files.copy(source1, target1, StandardCopyOption.REPLACE_EXISTING);

		Path source2 = yailFile.toPath();
		Path target2 = new File(outDir1, "Screen1.scm").toPath();
		Files.copy(source2, target2, StandardCopyOption.REPLACE_EXISTING);

		File outDir3 = new File(outRootDir, "youngandroidproject/");
		outDir3.mkdir();

		Path source3 = IOUtils.getResourcePath(getClass(), localRootDir + "project.properties");
		Path target3 = new File(outDir3, "project.properties").toPath();
		Files.copy(source3, target3, StandardCopyOption.REPLACE_EXISTING);

		LOG.info("copied project files");

		packageZip(outRootDir, out);

		LOG.info("packaged aia file");

		IOUtils.deleteFolder(outRootDir);
	}

	// courtesy
	// https://stackoverflow.com/questions/15968883/how-to-zip-a-folder-itself-using-java
	private static void packageZip(File sourceDir, OutputStream zip) throws IOException {
//		if (zipFile.exists())
//			zipFile.delete();

//		Path p = Files.createFile(zipFile.toPath());

		try (ZipOutputStream zs = new ZipOutputStream(zip)) {
//				Files.newOutputStream(p, StandardOpenOption.TRUNCATE_EXISTING))) 

			Path pp = sourceDir.toPath();

			Files.walk(pp).filter(path -> !Files.isDirectory(path)).forEach(path -> {
				ZipEntry zipEntry = new ZipEntry(pp.relativize(path).toString());
				try {
					zs.putNextEntry(zipEntry);
					Files.copy(path, zs);
					zs.closeEntry();

				} catch (IOException e) {
					System.err.println(e);
				}
			});
		}
	}
}
