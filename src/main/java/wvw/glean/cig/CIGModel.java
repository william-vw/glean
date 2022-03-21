package wvw.glean.cig;

import java.util.List;

import wvw.glean.workflow.WorkflowModel_Auto;
import wvw.utils.IOUtils;
import wvw.utils.rdf.NS;

public class CIGModel extends WorkflowModel_Auto {

	public static String base = NS.cig;
	private String ns;

	private static String cigOntology = "logic/cig.owl";

	public CIGModel(String ns) {
//		super(base);

		this.ns = ns;
		setup();
	}

	public String getNs() {
		return ns;
	}

	public void resetAll(String taskId) {
		resetAll(kb.resource(ns + taskId));
	}

	public List<EntityState> transitAll(String workflowId) {
		return transitAll(kb.resource(ns + workflowId));
	}

	public void printAllTransits(String workflowId) {
		printAllTransits(kb.resource(ns + workflowId));
	}

	private void setup() {
		try {
			addOntology(IOUtils.getResourceStream(getClass(), cigOntology));

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
