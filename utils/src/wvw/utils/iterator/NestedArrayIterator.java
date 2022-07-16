package wvw.utils.iterator;

import java.util.Iterator;

@SuppressWarnings("unchecked")
public class NestedArrayIterator<T> implements Iterator<T> {

	private int curIdx = 0;
	private Iterator<T>[] iterators;

	public NestedArrayIterator(Iterator<T>... iterators) {
		this.iterators = iterators;
	}

	public boolean hasNext() {
		if (curIdx < iterators.length) {

			if (iterators[curIdx].hasNext())
				return true;

			else {
				curIdx++;
				
				return hasNext();
			}

		} else
			return false;
	}

	public T next() {
		return iterators[curIdx].next();
	}
}
