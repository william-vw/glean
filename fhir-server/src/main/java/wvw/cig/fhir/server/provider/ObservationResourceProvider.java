package wvw.cig.fhir.server.provider;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.hl7.fhir.dstu3.model.Bundle;
import org.hl7.fhir.dstu3.model.IdType;
import org.hl7.fhir.dstu3.model.Observation;
import org.hl7.fhir.dstu3.model.OperationOutcome;
import org.hl7.fhir.dstu3.model.OperationOutcome.IssueSeverity;
import org.hl7.fhir.dstu3.model.OperationOutcome.IssueType;
import org.hl7.fhir.dstu3.model.Reference;
import org.hl7.fhir.instance.model.api.IBaseResource;

import ca.uhn.fhir.rest.annotation.Create;
import ca.uhn.fhir.rest.annotation.Delete;
import ca.uhn.fhir.rest.annotation.IdParam;
import ca.uhn.fhir.rest.annotation.ResourceParam;
import ca.uhn.fhir.rest.api.MethodOutcome;
import wvw.cig.fhir.server.CIGServer;
import wvw.cig.fhir.server.FhirUtils;
import wvw.cig.fhir.server.TaskReference;
import wvw.cig.fhir.server.WorkflowReference;
import wvw.glean.cig.CIGModel;

/**
 * All resource providers must implement IResourceProvider
 */
public class ObservationResourceProvider extends CIGResourceProvider {

	private final static Logger LOG = Logger.getLogger(ObservationResourceProvider.class.getName());

	public ObservationResourceProvider(CIGServer server) {
		super(server);
	}

	/**
	 * The getResourceType method comes from IResourceProvider, and must be
	 * overridden to indicate what type of resource this provider supplies.
	 */
//	@Override
	public Class<? extends IBaseResource> getResourceType() {
		return Observation.class;
	}

	@Delete
	public MethodOutcome deleteObservations(@IdParam IdType theId, HttpServletRequest request) {
		LOG.info("deleting observation(s): " + theId);

		String id = theId.getIdPart();
		TaskReference taskRef = null;
		try {
			taskRef = TaskReference.parse(id);

		} catch (Exception e) {
			return FhirUtils.errorParsingReference(e, LOG);
		}

		WorkflowReference workflowRef = taskRef.getWorkflow();

		CIGModel cig = getCig(request, workflowRef);

		if (workflowRef.getWorkflowId().equals("all")) {
			LOG.info("hard reset: " + workflowRef);

			cig = resetCig(request, workflowRef);

		} else if (taskRef.getTaskId().equals("all")) {
			LOG.info("resetting workflow: " + workflowRef);

			// this will de-activate all tasks (root workflow will be set to active)
			// and then derive all current task states (does not get rid of prior
			// derivations)
			// also, deletes all related inputs recursively (i.e., belonging to all
			// subtasks)
			cig.resetAll(workflowRef.getWorkflowId());

		} else {
			String task = taskRef.getTaskId();
			LOG.info("resetting task: " + task);

			cig.resetAll(task);
		}

//		cig.getKb().printAll();

		MethodOutcome mo = new MethodOutcome();

		// reasoning run after reset

		/* List<EntityState> states = */ cig.transitAll(workflowRef.getWorkflowId());
		// debugging
//		cig.printAllTransits(states, true);

		return mo;
	}

	@Create
	public MethodOutcome createObservation(@ResourceParam Observation theObservation,
			HttpServletRequest request) {

		long start = System.currentTimeMillis();

		// process incoming observation

		// TODO this should really be in a resource profile (extension)
		// (adding constraint to Observation; e.g., TaskObservation)

		if (!theObservation.hasBasedOn()) {
			LOG.error("expecting 'basedOn' attribute");

			OperationOutcome oo = new OperationOutcome();
			oo.addIssue().setSeverity(IssueSeverity.ERROR).setCode(IssueType.REQUIRED)
					.setDiagnostics("requiring 'basedOn' attribute");
			return new MethodOutcome(oo);
		}

		TaskReference taskRef = null;
		try {
			Reference basedOn = theObservation.getBasedOnFirstRep();
			taskRef = TaskReference.parse(basedOn.getReference());

		} catch (Exception e) {
			return FhirUtils.errorParsingReference(e, LOG);
		}

		CIGModel cig = getCig(request, taskRef.getWorkflow());

		LOG.info("creating observation for: " + taskRef);

		// (print received observation)
//		FhirContext ctx = FhirContext.forDstu3();
//		String json = ctx.newJsonParser().setPrettyPrint(true)
//				.encodeResourceToString(theObservation);
//		LOG.info("observation:\n" + json);

		// load new data into CIG model

		String rdf = theObservation.getComment();
//		LOG.info("rdf? " + rdf);

		long start1 = System.currentTimeMillis();
		try {
			cig.loadString(rdf);

		} catch (Exception e) {
			LOG.error("error parsing RDF", e);

			OperationOutcome oo = new OperationOutcome();
			oo.addIssue().setSeverity(IssueSeverity.ERROR).setCode(IssueType.STRUCTURE)
					.setDiagnostics("error parsing RDF: " + e.getMessage());
			return new MethodOutcome(oo);
		}
		long end1 = System.currentTimeMillis();
		LOG.info("loading: " + (end1 - start1) + " ms");

		MethodOutcome mo = new MethodOutcome();

		Bundle bundle = FhirUtils.bundleTaskData(cig, taskRef, false, LOG);
		mo.setResource(bundle);

		long end = System.currentTimeMillis();
		LOG.info("total: " + (end - start) + " ms");

		return mo;
	}
}