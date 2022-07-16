package wvw.utils.iterator;

import java.util.Iterator;

public class ExceptIterator<T> implements Iterator<T> {

	private Iterator<T> it;
	private T[] except;

	private T next;

	@SuppressWarnings("unchecked")
	public ExceptIterator(Iterator<T> it, T... except) {
		this.it = it;
		this.except = except;
	}

	@Override
	public boolean hasNext() {
		if (it.hasNext()) {
			next = it.next();

			if (ignore(next))
				return hasNext();
			else
				return true;

		} else
			return false;
	}

	private boolean ignore(T next) {
		for (int i = 0; i < except.length; i++) {
			if (except[i].equals(next))
				return true;
		}

		return false;
	}

	@Override
	public T next() {
		return next;
	}
}
