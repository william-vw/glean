package wvw.utils.label;

public class SimpleLabeler implements Labeler {

	public String label;

	public SimpleLabeler() {
	}

	public SimpleLabeler(Object obj) {
		this.label = obj.toString();
	}

	public SimpleLabeler(String label) {
		this.label = label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

	public String getLabel(Object obj) {
		return label;
	}

	public void combine(Labeler labeler) {
	}
}