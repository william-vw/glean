package wvw.cig.fhir.server;

import java.util.List;

import org.apache.jen3.rdf.model.Resource;
import org.apache.log4j.Logger;
import org.hl7.fhir.dstu3.model.Bundle;
import org.hl7.fhir.dstu3.model.Bundle.BundleType;
import org.hl7.fhir.dstu3.model.CodeableConcept;
import org.hl7.fhir.dstu3.model.Coding;
import org.hl7.fhir.dstu3.model.OperationOutcome;
import org.hl7.fhir.dstu3.model.OperationOutcome.IssueSeverity;
import org.hl7.fhir.dstu3.model.OperationOutcome.IssueType;
import org.hl7.fhir.dstu3.model.Task;
import org.hl7.fhir.dstu3.model.Task.TaskStatus;

import ca.uhn.fhir.rest.api.MethodOutcome;
import wvw.glean.cig.CIGModel;
import wvw.glean.workflow.WorkflowModel.EntityState;
import wvw.semweb.kb.jena.JenaKb;
import wvw.utils.rdf.NS;

public class FhirUtils {

	public static Bundle bundleTaskData(CIGModel cig, TaskReference reference,
			boolean includeInputData, Logger LOG) {

		Bundle ret = new Bundle().setType(BundleType.COLLECTION);

		// get new state transitions

		// TODO only get those of given workflow id
		// (ids of "sub" workflows are being sent)

		// TODO only return tasks with *changed* states

		WorkflowReference workflowRef = reference.getWorkflow();

		List<EntityState> states = cig.transitAll(workflowRef.getWorkflowId());
//		cig.printAllTransits(states, true);

		states.forEach(state -> {
			// ignore decision-branches
			if (state.getEntity().isAnon())
				return;

//			LOG.info(state);
			if (!state.hasAtomicState()) {
				LOG.error("no atomic state found for task: " + state.getEntity());
				return;
			}

			TaskReference taskRef = new TaskReference(workflowRef,
					state.getEntity().getLocalName());

			Task task = new Task();
			task.setId(taskRef.toString());

			task.setStatus(mapToStatus(state.getAtomicState(), LOG));
			task.setBusinessStatus(mapToBusinessStatus(state.getAtomicState(), LOG));

			if (includeInputData) {
				JenaKb inputData = cig.getInputData(state.getEntity());
				task.setDescription(inputData.toString("N3"));
			}

			ret.addEntry().setResource(task);
		});

		// return task(s) with new state

//		Reference patientRef = theObservation.getSubject();

		return ret;
	}

	// @formatter:off
		/*
		Code	Display	Definition	Canonical Status
		draft	Draft	The task is not yet ready to be acted upon.	~draft
		requested	Requested	The task is ready to be acted upon and action is sought.	~requested
		received	Received	A potential performer has claimed ownership of the task and is evaluating whether to perform it.	~received
		accepted	Accepted	The potential performer has agreed to execute the task but has not yet started work.	~accepted
		rejected	Rejected	The potential performer who claimed ownership of the task has decided not to execute it prior to performing any action.	~declined
		ready	Ready	The task is ready to be performed, but no action has yet been taken. Used in place of requested/received/accepted/rejected when request assignment and acceptance is a given.	~on-target
		cancelled	Cancelled	The task was not completed.	~abandoned
		in-progress	In Progress	The task has been started but is not yet complete.	~active
		on-hold	On Hold	The task has been started but work has been paused.	~suspended
		failed	Failed	The task was attempted but could not be completed due to some error.	~failed
		completed	Completed	The task has been completed.	~complete
		entered-in-error	Entered in Error	The task should never have existed and is retained only because of the possibility it may have used.	~error
		*/
		// @formatter:on

	public static TaskStatus mapToStatus(Resource state, Logger LOG) {
		String s = state.getLocalName();
		if (s.equals("Inactive"))
			return TaskStatus.DRAFT;
		else if (s.equals("Active"))
			return TaskStatus.REQUESTED;
		else if (s.equals("Started"))
			return TaskStatus.INPROGRESS;
		else if (s.equals("Completed"))
			return TaskStatus.COMPLETED;
		else if (s.equals("Discarded"))
			return TaskStatus.CANCELLED;
		else
			LOG.error("unknown atomic task state: " + s);

		return null;
	}

	public static CodeableConcept mapToBusinessStatus(Resource state, Logger LOG) {
		String s = state.getLocalName();
		return new CodeableConcept().addCoding(new Coding(NS.wf, s, s));
	}

	public static MethodOutcome errorParsingReference(Exception e, Logger LOG) {
		LOG.error(e.getMessage());

		OperationOutcome oo = new OperationOutcome();
		oo.addIssue().setSeverity(IssueSeverity.ERROR).setCode(IssueType.STRUCTURE)
				.setDiagnostics(e.getMessage());
		return new MethodOutcome(oo);
	}
}
