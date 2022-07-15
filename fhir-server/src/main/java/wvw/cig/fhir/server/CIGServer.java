package wvw.cig.fhir.server;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import org.apache.log4j.Logger;

import ca.uhn.fhir.rest.server.IResourceProvider;
import ca.uhn.fhir.rest.server.RestfulServer;
import wvw.cig.fhir.server.provider.ObservationResourceProvider;
import wvw.cig.fhir.server.provider.PatientResourceProvider;
import wvw.cig.fhir.server.provider.TaskResourceProvider;
import wvw.glean.cig.CIGModel;
import wvw.glean.workflow.WorkflowModel.InitOptions;
import wvw.glean.workflow.WorkflowModel.LoadOptions;
import wvw.utils.rdf.NS;

/**
 * Using Servlet 3.0 annotations to define the URL pattern for this servlet
 * (could also define this in a web.xml file).
 */
@WebServlet(urlPatterns = { "/cig/*" }, displayName = "CIG Execution Server")
public class CIGServer extends RestfulServer {

	private static final long serialVersionUID = 1L;

	private final static Logger LOG = Logger.getLogger(CIGServer.class.getName());

	private Map<String, ModelEntry> models = new HashMap<>();

	/**
	 * The initialize method is automatically called when the servlet is starting
	 * up, so it can be used to configure the servlet to define resource providers,
	 * or set up configuration, interceptors, etc.
	 */
	@Override
	protected void initialize() throws ServletException {
		/*
		 * The servlet defines any number of resource providers, and configures itself
		 * to use them by calling setResourceProviders()
		 */
		List<IResourceProvider> resourceProviders = new ArrayList<IResourceProvider>();
		resourceProviders.add(new PatientResourceProvider());
		resourceProviders.add(new ObservationResourceProvider(this));
		resourceProviders.add(new TaskResourceProvider(this));
		setResourceProviders(resourceProviders);
//		registerInterceptor(new InitCigInterceptor());

		// setup known models
		models.put("Dyslipidemia_CKD", new ModelEntry("lipid/ckd_dyslipidemia", NS.ckd));
		models.put("RBC_Match", new ModelEntry("btsf/rbc_match", NS.rbc));
	}

	public CIGModel createCig(WorkflowReference workflowRef) {
		ModelEntry model = models.get(workflowRef.getBaseId());
		if (model == null) {
			LOG.error("error: model for " + workflowRef + " not found");
			return null;
		}

		CIGModel cig = null;
		String path = "cig/" + model.getPath() + ".n3";
		try {
			long start = System.currentTimeMillis();

//			if (cig != null)
//				cig.close();

			cig = (CIGModel) new CIGModel(model.getNs())
					.initialize(InitOptions.DO_TRANSIT, InitOptions.LOAD_GEN) // InitOptions.LOGGING)
					.load(CIGModel.class, path, LoadOptions.RECURSIVELY);
//				cig.printAllTransits();

			long end = System.currentTimeMillis();
			LOG.info("init: " + (end - start) + " ms");

		} catch (Exception e) {
			LOG.error("error creating new CIG (loading from " + path + ")", e);
		}

		return cig;
	}

	private class ModelEntry {

		private String path;
		private String ns;

		private ModelEntry(String path, String ns) {
			this.path = path;
			this.ns = ns;
		}

		public String getPath() {
			return path;
		}

		public String getNs() {
			return ns;
		}
	}

	// in the end, this turned out to be too awkward to work with
	// resource providers have different ways of obtaining the workflow id,
	// and these would all need to be duplicated in SessionHandlerInterceptor

//	public CIGModel getCig(HttpSession session, WorkflowReference workflowRef) {
//		return (CIGModel) session.getAttribute(workflowRef.getBaseId());
//	}
//
//	public CIGModel resetCig(HttpSession session, WorkflowReference workflowRef) {
//		CIGModel cig = createCig(workflowRef);
//		session.setAttribute(workflowRef.getBaseId(), cig);
//
//		return cig;
//	}
//
//	public class InitCigInterceptor extends SessionHandlerInterceptor {
//
//		// TODO close CIG models when session gets invalidated
//		// (doesn't seem to be an on-invalidate event ..)
//
//		@Override
//		protected void handleSession(HttpSession session, WorkflowReference workflowRef,
//				boolean newSession) {
//
////			if (newSession) {
//			CIGModel cig = getCig(session, workflowRef);
//			if (cig == null) {
//				LOG.info("creating CIGModel for new session: " + workflowRef);
//				resetCig(session, workflowRef);
//
//			} else
//				LOG.info("re-using CIGModel for existing session: " + workflowRef);
//		}
//	}
}
