package wvw.cig.fhir.server.provider;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.hl7.fhir.dstu3.model.Task;
import org.hl7.fhir.instance.model.api.IBaseResource;

import ca.uhn.fhir.rest.annotation.RequiredParam;
import ca.uhn.fhir.rest.annotation.Search;
import ca.uhn.fhir.rest.param.StringParam;
import wvw.cig.fhir.server.CIGServer;
import wvw.cig.fhir.server.FhirUtils;
import wvw.cig.fhir.server.TaskReference;
import wvw.cig.fhir.server.WorkflowReference;
import wvw.glean.cig.CIGModel;
import wvw.glean.workflow.WorkflowModel.EntityState;
import wvw.semweb.kb.jena.JenaKb;

public class TaskResourceProvider extends CIGResourceProvider {

	private final static Logger LOG = Logger.getLogger(TaskResourceProvider.class.getName());

	public TaskResourceProvider(CIGServer server) {
		super(server);
	}

	@Override
	public Class<? extends IBaseResource> getResourceType() {
		return Task.class;
	}

	// called when client is initializing or after deleting a task's observations

	@Search()
	public List<Task> getAllTasks(@RequiredParam(name = "workflow") StringParam workflow,
			@RequiredParam(name = "initializing") StringParam initializing,
			HttpServletRequest request) {

		long start = System.currentTimeMillis();

		WorkflowReference workflowRef;
		try {
			workflowRef = WorkflowReference.parse(workflow.getValue());
		} catch (Exception e) {
			LOG.error(e);
			return new ArrayList<>();
		}

		boolean init = Boolean.parseBoolean(initializing.getValue());
		
		CIGModel cig = getCig(request, workflowRef);

		LOG.info("getAllTasks: workflow? " + workflowRef + ", ns? " + cig.getNs()
				+ ", initializing? " + init);

		List<Task> ret = new ArrayList<>();

		List<EntityState> states = cig.transitAll(workflowRef.getWorkflowId());
//		cig.printAllTransits(states);

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

			task.setStatus(FhirUtils.mapToStatus(state.getAtomicState(), LOG));
			task.setBusinessStatus(FhirUtils.mapToBusinessStatus(state.getAtomicState(), LOG));

			if (init) {
				JenaKb inputData = cig.getInputData(state.getEntity());
				if (!inputData.getModel().isEmpty()) {
					// TODO isn't being serialized
//					task.setRaw(inputData.toString("N3"));
					task.setDescription(inputData.toString("N3"));
				}
			}

			ret.add(task);
		});

//		cig.getKb().printAll();

		long end = System.currentTimeMillis();
		LOG.info("time: " + (end - start) + " ms");

		return ret;
	}
}
