package wvw.utils.iterator;

import java.util.List;

/**
 * @author wvw
 */

public class FlexibleListIterator<T> implements FlexibleIterator<T> {

	private int idx = -1;
	protected List<T> list;

	public FlexibleListIterator(List<T> list) {
		this.list = list;
	}

	public boolean hasNext() {
		return (idx + 1) < list.size();
	}

	public T next() {
		return list.get(++idx);
	}
	
	public T current() {
		return list.get(idx);
	}

	public void remove() {
		list.remove(idx--);
	}

	public void reset() {
		idx = 0;
	}

	public int size() {
		return list.size();
	}
}
