package wvw.cig.fhir.server.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import ca.uhn.fhir.interceptor.api.Hook;
import ca.uhn.fhir.interceptor.api.Pointcut;
import wvw.cig.fhir.server.WorkflowReference;

public abstract class SessionHandlerInterceptor {

	private final static Logger LOG = Logger.getLogger(SessionHandlerInterceptor.class.getName());

	@Hook(Pointcut.SERVER_INCOMING_REQUEST_PRE_PROCESSED)
	public boolean logRequestsPreProcessed(HttpServletRequest request) {
//		LOG.info("SERVER_INCOMING_REQUEST_PRE_PROCESSED");

		// should be given in first request for a CIG model
		if (request.getParameter("workflow") == null)
			return true;

		WorkflowReference workflow;
		try {
			workflow = WorkflowReference.parse(request.getParameter("workflow"));
		} catch (Exception e) {
			LOG.error(e);
			return false;
		}

//		LOG.info("workflow? " + request.getParameter("workflow").toString() + " - " + workflow);

		boolean newSession = false;

		// TODO just use isNew() method
		HttpSession session = request.getSession(false);
		if (session == null) {
			session = request.getSession(true);
			newSession = true;
		}

//		LOG.info("ServletRequest.session:" + session.getId());
		handleSession(session, workflow, newSession);

		return true;
	}

	protected abstract void handleSession(HttpSession session, WorkflowReference workflowRef,
			boolean newSession);
}
