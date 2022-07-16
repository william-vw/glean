package wvw.utils.iterator;

import java.util.Iterator;

public class SingleElementIterator<T> implements Iterator<T> {

	private boolean done = false;

	private T element;

	public SingleElementIterator(T element) {
		this.element = element;
	}

	@Override
	public boolean hasNext() {
		if (done)
			return false;

		done = true;

		return true;
	}

	@Override
	public T next() {
		return element;
	}
}
