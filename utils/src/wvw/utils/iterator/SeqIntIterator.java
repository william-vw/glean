package wvw.utils.iterator;

public class SeqIntIterator implements FlexibleIterator<Integer> {

	private int cur = 0;
	private int limit = 0;

	public SeqIntIterator(int limit) {
		this.limit = limit;
	}

	public boolean hasNext() {
		return cur < limit;
	}

	public Integer next() {
		return cur++;
	}
	
	public Integer current() {
		System.err.println("unsupported method: current");	
		
		return null;
	}

	public void reset() {
		cur = 0;
	}

	public void startAt(int idx) {
		if (idx < limit)
			cur = idx;
	}

	public Integer getAt(int idx) {
		if (idx < limit)
			return idx;
		else
			return null;
	}

	public int size() {
		return limit;
	}
}
