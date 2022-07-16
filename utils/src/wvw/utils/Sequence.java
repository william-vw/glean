package wvw.utils;

import java.util.ArrayList;
import java.util.List;

public class Sequence<T> {

	protected int idx = 0;
	protected List<T> list;

	public Sequence() {
		this.list = new ArrayList<>();
	}

	public Sequence(List<T> list) {
		this.list = list;
	}

	protected Sequence(int idx, List<T> list) {
		this.idx = idx;
		this.list = list;
	}

	public void previous() {
		idx--;
	}

	public void next() {
		idx++;
	}

	public boolean atStart() {
		return idx == 0;
	}

	public void reset() {
		idx = 0;
	}

	public int size() {
		return list.size();
	}

	public boolean hasCurrent() {
		return idx < list.size();
	}

	public T getCurrent() {
		return list.get(idx);
	}

	public void add(T o) {
		list.add(o);
	}

	public Sequence<T> shallowCopy() {
		return new Sequence<T>(idx, list);
	}

	public String toString() {
		return String.valueOf(idx);
	}
}
