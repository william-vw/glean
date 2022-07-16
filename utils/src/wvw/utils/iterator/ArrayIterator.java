package wvw.utils.iterator;

public class ArrayIterator<T> implements FlexibleIterator<T> {

	protected int idx = -1;

	protected T[] array;
	protected int limit;

	public ArrayIterator(T[] array) {
		this.array = array;

		this.limit = array.length;
	}

	public ArrayIterator(T[] array, int limit) {
		this.array = array;

		this.limit = limit;
	}

	public boolean hasNext() {
		return (idx + 1) < limit;
	}

	public T next() {
		return array[++idx];
	}

	public T current() {
		return array[idx];
	}

	public void reset() {
		idx = -1;
	}

	public void startAt(int idx) {
		this.idx = idx;
	}

	public T getAt(int idx) {
		return array[idx];
	}

	public int size() {
		return limit;
	}
}
