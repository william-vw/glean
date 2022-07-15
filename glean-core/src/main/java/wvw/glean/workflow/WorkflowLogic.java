package wvw.glean.workflow;

import java.io.FileOutputStream;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.jen3.n3.N3Model;
import org.apache.log4j.Logger;

import wvw.glean.state.StateLogic;
import wvw.glean.workflow.WorkflowModel.InitOptions;
import wvw.glean.workflow.WorkflowModel.ReasonTypes;
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

		for (ReasonTypes reasonType : ReasonTypes.values()) {
			regenerate(outPath, reasonType, InitOptions.DO_TRANSIT);
			regenerate(outPath, reasonType, InitOptions.DO_TRANSIT, InitOptions.LOGGING);
		}
	}

	public static void regenerate(String outPath, ReasonTypes reasonType, InitOptions... options)
			throws WorkflowException {

		try {
			long start = System.currentTimeMillis();

			WorkflowModel m = new WorkflowModel_Auto().initialize(reasonType, options);

			boolean logging = ArrayUtils.contains(options, InitOptions.LOGGING);
			// rule generation code (genPath) already loaded by WorkflowModel
			N3Model out = convertToLinearLogic(m.getKb().getModel(), null, logging);

			outPath = WorkflowModel_Auto.pregenCodePath(outPath, reasonType, options);
			out.write(new FileOutputStream(outPath));

			long end = System.currentTimeMillis();

			LOG.info("generated LL code: " + (end - start) + "ms (written to " + outPath + ")");

		} catch (Exception e) {
			throw new WorkflowException(e);
		}
	}
}
