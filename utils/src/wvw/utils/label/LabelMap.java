package wvw.utils.label;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class LabelMap implements Labeler {

	private Map<String, Labeler> map = new HashMap<String, Labeler>();

	public LabelMap() {
	}

	public LabelMap(Labeled id, Labeler labeler) {
		add(id, labeler);
	}

	public void add(Labeled id, Labeler labeler) {
		map.put(id.getLabel(), labeler);
	}

	public String getLabel(Object id) {
		return map.get(id).getLabel();
	}

	public String getLabel() {
		StringBuffer ret = new StringBuffer();

		Iterator<String> keys = map.keySet().iterator();
		while (keys.hasNext()) {

			String id = keys.next();
			Labeler labeler = map.get(id);

			ret.append(id).append(": ").append(labeler.getLabel(id)).append("; ");
		}

		return ret.toString();
	}

	public void combine(Labeler labeler) {
		if (labeler instanceof LabelMap) {
			LabelMap map = (LabelMap) labeler;

			this.map.putAll(map.map);
		}
	}
}