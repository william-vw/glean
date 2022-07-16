package wvw.utils.iterator;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class NestedListIterator<T> implements Iterator<T> {

	private int curIdx = 0;
	private List<Iterator<T>> iterators;

	public NestedListIterator(List<Iterator<T>> iterators) {
		this.iterators = iterators;
	}

	public NestedListIterator() {
		iterators = new ArrayList<Iterator<T>>();
	}

	public void add(Iterator<T> iterator) {
		iterators.add(iterator);
	}

	public boolean hasNext() {
		if (curIdx < iterators.size()) {

			if (iterators.get(curIdx).hasNext())
				return true;

			else {
				curIdx++;

				return hasNext();
			}

		} else
			return false;
	}

	public T next() {
		return iterators.get(curIdx).next();
	}
}
