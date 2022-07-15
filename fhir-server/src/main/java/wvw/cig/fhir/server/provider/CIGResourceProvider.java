package wvw.cig.fhir.server.provider;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import ca.uhn.fhir.rest.server.IResourceProvider;
import wvw.cig.fhir.server.CIGServer;
import wvw.cig.fhir.server.WorkflowReference;
import wvw.glean.cig.CIGModel;

public abstract class CIGResourceProvider implements IResourceProvider {

	private final static Logger LOG = Logger.getLogger(CIGServer.class.getName());

	protected CIGServer server;

	public CIGResourceProvider(CIGServer server) {
		this.server = server;
	}

	protected CIGModel getCig(HttpServletRequest request, WorkflowReference workflowRef) {
		HttpSession session = request.getSession();

		CIGModel cig = (CIGModel) session.getAttribute(workflowRef.getBaseId());
		if (cig == null) {
			LOG.info("creating CIGModel for new session: " + workflowRef);
			return resetCig(request, workflowRef);

		} else {
			LOG.info("(re-using CIGModel for existing session: " + workflowRef + ")");
			return cig;
		}
	}

	protected CIGModel resetCig(HttpServletRequest request, WorkflowReference workflowRef) {
		HttpSession session = request.getSession();

		CIGModel cig = server.createCig(workflowRef);
		session.setAttribute(workflowRef.getBaseId(), cig);

		return cig;
	}
}
