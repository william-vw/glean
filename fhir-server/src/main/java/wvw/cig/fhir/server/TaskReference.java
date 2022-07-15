package wvw.cig.fhir.server;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TaskReference {

	private static Pattern pat = Pattern.compile("(.*?)\\.(.*?)\\.(.*?)");

	private WorkflowReference workflowRef;
	private String taskId;

	public static TaskReference parse(String str) throws Exception {
		Matcher m = pat.matcher(str);
		if (!m.matches())
			throw new Exception(
					"invalid task reference: expecting '[base].[workflow].[task]', got: '" + str
							+ "'");

		return new TaskReference(new WorkflowReference(m.group(1), m.group(2)), m.group(3));
	}

	public TaskReference(WorkflowReference workflowRef, String taskId) {
		this.workflowRef = workflowRef;
		this.taskId = taskId;
	}

	public WorkflowReference getWorkflow() {
		return workflowRef;
	}

	public String getTaskId() {
		return taskId;
	}

	@Override
	public String toString() {
		return workflowRef + "." + taskId;
	}
}
