package wvw.utils.label;

public interface Labeler {

	public String getLabel();

	public String getLabel(Object obj);

	public void combine(Labeler labeler);
}
