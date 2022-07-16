package wvw.utils.label;

import java.util.ArrayList;
import java.util.List;

import wvw.utils.OutputUtils;

public class AggregateLabeler implements Labeler {

	private List<Object> labels = new ArrayList<Object>();

	public AggregateLabeler() {
	}

	public AggregateLabeler(List<Object> labels) {
		this.labels = labels;
	}

	public List<Object> getLabels() {
		return labels;
	}

	public void addLabel(Object label) {
		labels.add(label);
	}

	public String getLabel() {
		return OutputUtils.toString(labels);
	}

	public String getLabel(Object obj) {
		return getLabel();
	}

	public void combine(Labeler labeler) {
	}
}
