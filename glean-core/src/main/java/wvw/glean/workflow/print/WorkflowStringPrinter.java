package wvw.glean.workflow.print;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.jen3.rdf.model.Resource;
import org.apache.jen3.vocabulary.RDF;

import wvw.glean.workflow.WorkflowModel;

public class WorkflowStringPrinter extends WorkflowPrinter {

	protected int indent = 4;
	protected int ws = -indent;

	public WorkflowStringPrinter() {
	}

	public void print(WorkflowModel m) {
		this.kb = m.getKb();

		Resource wf = getWorkflow();
		if (wf == null)
			return;

		printWorkflow(wf);
		printNext(wf);
	}

	protected void printWorkflow(Resource wf) {
		str.append("| ").append(wf).append("\n");
	}

	protected void printNext(Resource e) {
//		runTaskHook(getTask(e));

		newLevel();

		List<Resource> follows = getNext(e);
		follows.addAll(getComposed(e));

		for (Resource follow : follows) {
			follow = print(follow);

			printNext(follow);
		}

		priorLevel();
	}

	protected Resource print(Resource e) {
		indent(ws);

		// get pre-cond from entity, albeit task or decision branch
		String condStr = getPreconditionLabel(e);

		// in case of branch: from now on, work with branch's target
		if (e.hasProperty(RDF.type, kb.resource("gl:DecisionBranch")))
			e = e.getPropertyResourceValue(kb.resource("gl:branchTarget"));

		String name = getTaskName(e);

		String superTasks = kb.list(null, kb.resource("gl:subTask"), e).toList().stream()
				.map(stmt -> stmt.getSubject().getLocalName()).collect(Collectors.joining(", "));
		if (!superTasks.isEmpty())
			name += " (" + superTasks + ")";

		if (condStr != null)
			name = condStr + " ?? " + name;

		str.append(name).append("\n");

		return e;
	}

	protected void newLevel() {
		ws += indent;
	}

	protected void priorLevel() {
		ws -= indent;
	}

	protected void newline(int ws) {
		str.append("\n");
		indent(ws);
	}

	protected void indent(int ws) {
		for (int i = 0; i < ws; i++)
			str.append(" ");
	}
}
