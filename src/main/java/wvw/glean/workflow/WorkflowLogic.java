package wvw.glean.workflow;

import java.io.FileOutputStream;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.jen3.n3.N3Model;
import org.apache.log4j.Logger;

import wvw.glean.state.StateLogic;
import wvw.glean.workflow.WorkflowModel.InitOptions;
import wvw.glean.workflow.WorkflowModel.WorkflowException;

public class WorkflowLogic extends StateLogic {

	protected final static Logger LOG = Logger.getLogger(WorkflowLogic.class.getName());

	public static final String logicFolder = "logic/";
	public static final String conditionFolder = logicFolder + "condition/";
	public static final String workflowFolder = logicFolder + "workflow/";
	public static final String genFolder = logicFolder + "gen/";
	public static final String ontologyPath = logicFolder + "glean.owl";

	public static void main(String[] args) throws Exception {
		// run this code each time state logic transitions are updated!

		String outPath = "src/main/resources/" + workflowFolder;
		regenerate(outPath);
	}

	public static void regenerate(String outPath) throws WorkflowException {
		regenerate(outPath, InitOptions.DO_TRANSIT);
		regenerate(outPath, InitOptions.DO_TRANSIT, InitOptions.LOGGING);
	}

	private static void regenerate(String outPath, InitOptions... options)
			throws WorkflowException {

		try {
			long start = System.currentTimeMillis();

			WorkflowModel m = new WorkflowModel_Auto().initialize(options);

			boolean logging = ArrayUtils.contains(options, InitOptions.LOGGING);
			N3Model out = convertToLinearLogic(m.getKb().getModel(), genFolder, logging);

			String name = "gen" + (logging ? "_log" : "_nolog") + ".n3";
			outPath += name;
			out.write(new FileOutputStream(outPath));

			long end = System.currentTimeMillis();

			LOG.info("generated LL code: " + (end - start) + "ms (written to " + outPath + ")");

		} catch (Exception e) {
			throw new WorkflowException(e);
		}
	}
}
