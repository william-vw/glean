package wvw.utils.iterator;

import java.util.Iterator;
import java.util.List;

public class ListIterator<K> implements FlexibleIterator<K> {

	private List<K>[] lists;
	private int curIdx = -1;

	private Iterator<K> curIt;

	@SafeVarargs
	public ListIterator(List<K>... lists) {
		this.lists = lists;
	}

	public boolean hasNext() {
		if (curIt == null || !curIt.hasNext()) {

			if (curIdx + 1 < lists.length) {
				List<K> next = lists[++curIdx];

				if (next != null)
					curIt = next.iterator();

				return hasNext();

			} else
				return false;

		} else
			return true;
	}

	public K next() {
		return curIt.next();
	}
	
	public K current() {
		System.err.println("unsupported method: current");	
		
		return null;
	}

	public void reset() {
		curIdx = 0;

		curIt = null;
	}

	public void startAt(int idx) {
		System.err.println("unsupported method: startAt");		
	}

	public K getAt(int idx) {
		System.err.println("unsupported method: getAt");
		
		return null;
	}
	
	public int size() {
		return lists.length;
	}
}
