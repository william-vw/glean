package wvw.utils.iterator;

public class FlexibleVarArgsIterator<T> implements FlexibleIterator<T> {

	private int idx = -1;
	private T[] array;

	@SafeVarargs
	public FlexibleVarArgsIterator(T... ts) {
		this.array = ts;
	}

	public boolean hasNext() {
		return (idx + 1) < array.length;
	}

	public T next() {
		return array[++idx];
	}

	public T current() {
		return array[idx];
	}

	public void startAt(int idx) {
		if (array.length < idx)
			this.idx = idx;
	}

	public T getAt(int idx) {
		if (idx < array.length)
			return array[idx];

		return null;
	}

	public void reset() {
		idx = 0;
	}

	public int size() {
		return array.length;
	}
}
