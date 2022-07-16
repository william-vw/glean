package wvw.utils.iterator;

import java.util.Iterator;
import java.util.List;

public class NestedIterator<T> implements Iterator<T> {

	private int idx = 0;
	private Iterator<T>[] iterators;

	@SuppressWarnings("unchecked")
	public NestedIterator(Iterator<T>... iterators) {
		this.iterators = iterators;
	}

	@SuppressWarnings("unchecked")
	public NestedIterator(List<Iterator<T>> iterators) {
		this.iterators = iterators.toArray(new Iterator[iterators.size()]);
	}

	@Override
	public boolean hasNext() {
		if (idx == iterators.length)
			return false;

		if (!iterators[idx].hasNext()) {
			idx++;

			return hasNext();
		}

		return true;
	}

	@Override
	public T next() {
		return iterators[idx].next();
	}
}
