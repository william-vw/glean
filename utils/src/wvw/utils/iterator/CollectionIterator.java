package wvw.utils.iterator;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

/**
 * @author wvw
 */

public class CollectionIterator<K> implements FlexibleIterator<K> {

	private Collection<List<K>> lists;
	private Iterator<List<K>> listIt;

	private Iterator<K> curIt;

	public CollectionIterator(Collection<List<K>> lists) {
		this.lists = lists;

		listIt = lists.iterator();
	}

	public boolean hasNext() {
		if (curIt == null || !curIt.hasNext()) {

			if (listIt.hasNext()) {
				curIt = listIt.next().iterator();

				return hasNext();

			} else
				return false;

		} else
			return true;
	}

	public K next() {
		if (curIt == null)
			curIt = listIt.next().iterator();

		return curIt.next();
	}
	

	public K current() {
		System.err.println("unsupported method: current");	
		
		return null;
	}

	public void reset() {
		listIt = lists.iterator();

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
		return lists.size();
	}
}
