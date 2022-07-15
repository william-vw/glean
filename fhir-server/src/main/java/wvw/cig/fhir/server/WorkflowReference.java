package wvw.cig.fhir.server;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class WorkflowReference {

	private static Pattern pat = Pattern.compile("(.*?)\\.(.*?)");

	private String baseId;
	private String workflowId;

	public static WorkflowReference parse(String str) throws Exception {
		Matcher m = pat.matcher(str);
		if (!m.matches())
			throw new Exception("invalid workflow reference: expecting '[base].[workflow]', got: '"
					+ str + "'");

		return new WorkflowReference(m.group(1), m.group(2));
	}

	public WorkflowReference(String baseId, String workflowId) {
		this.baseId = baseId;
		this.workflowId = workflowId;
	}

	public String getBaseId() {
		return baseId;
	}

	public String getWorkflowId() {
		return workflowId;
	}

	@Override
	public String toString() {
		return baseId + "." + workflowId;
	}
}
