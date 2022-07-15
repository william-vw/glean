package wvw.cig.fhir.server.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import ca.uhn.fhir.interceptor.api.Hook;
import ca.uhn.fhir.interceptor.api.Interceptor;
import ca.uhn.fhir.interceptor.api.Pointcut;

@Interceptor
public class LogRequestInterceptor {

	private final static Logger LOG = Logger.getLogger(LogRequestInterceptor.class.getName());

	@Hook(Pointcut.SERVER_INCOMING_REQUEST_PRE_PROCESSED)
	public boolean logRequestsPreProcessed(HttpServletRequest request) {
		LOG.info("SERVER_INCOMING_REQUEST_PRE_PROCESSED");
//		LOG.info("Request:" + theRequest.getOperation() + "/" + theRequest.getRequestId());

		HttpSession session = request.getSession(false);
		if (session == null) {
			session = request.getSession(true);
		}

		LOG.info("ServletRequest:" + session.getId());

		return true;
	}

//	@Hook(Pointcut.SERVER_INCOMING_REQUEST_PRE_HANDLED)
//	public void logRequestsPreHandled(RequestDetails request,
//			ServletRequestDetails servletRequest) {
//
//		LOG.info("SERVER_INCOMING_REQUEST_PRE_HANDLED");
//		LOG.info("Request:" + request.getOperation() + "/" + request.getRequestId());
//
//		HttpSession session = servletRequest.getServletRequest().getSession();
//		LOG.info("ServletRequest:" + session.getId());
//	}
}