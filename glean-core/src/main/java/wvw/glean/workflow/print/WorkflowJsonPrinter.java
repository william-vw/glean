package wvw.glean.workflow.print;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.jen3.rdf.model.Resource;
import org.apache.jen3.util.TriFunction;

import wvw.semweb.kb.jena.JenaKb;
import wvw.utils.MyStringEscapeUtils;

public abstract class WorkflowJsonPrinter extends WorkflowPrinter {

	protected TriFunction<Resource, JenaKb, WorkflowJsonPrinter, Boolean> taskHook;

	public WorkflowJsonPrinter() {
	}

	public WorkflowJsonPrinter(PrintJsonTaskHook taskHook) {
		this.taskHook = taskHook;
	}

	public void appendKeyString(String key, String value) {
		str.append(printKeyString(key, value));
	}

	public void appendKeyValue(String key, Object value) {
		str.append(printKeyValue(key, value));
	}

	public void appendKeyArray(String key, List<String> values, boolean quoteElements) {
		str.append(printKeyArray(key, values, quoteElements));
	}

	protected String printKeyString(String key, String value) {
		return printKeyString(key, value, false);
	}

	protected String printKeyString(String key, String value, boolean addComma) {
		return printKeyValue(key, "\"" + value + "\"", addComma);
	}

	protected String printKeyValue(String key, Object value) {
		return printKeyValue(key, value, false);
	}

	protected String printKeyValue(String key, Object value, boolean addComma) {
		StringBuffer str = new StringBuffer();

		str.append("\"").append(key).append("\": ").append(value);
		if (addComma)
			str.append(",");

		return str.toString();
	}

	protected String printKeyArray(String key, List<String> values, boolean quoteElements) {
		return printKeyArray(key, values, quoteElements, false);
	}

	protected String printKeyArray(String key, List<String> values, boolean quoteElements,
			boolean addComma) {

		StringBuffer str = new StringBuffer();

		str.append("\"").append(key).append("\": ").append("[").append(values.stream()
				.map(v -> (quoteElements ? "\"" + v + "\"" : v)).collect(Collectors.joining(", ")))
				.append("]");
		if (addComma)
			str.append(",");

		return str.toString();
	}

	public String txtToJson(String txt) {
		txt = MyStringEscapeUtils.escapeJson(txt);
		return txt;
	}

	protected void runTaskHook(Resource entity) {
		if (taskHook != null) {
			str.append(",");
			// if nothing was added, remove our comma
			if (!taskHook.apply(entity, kb, this))
				str.deleteCharAt(str.length() - 1);
		}
	}

	public interface PrintJsonTaskHook
			extends TriFunction<Resource, JenaKb, WorkflowJsonPrinter, Boolean> {
	}
}
