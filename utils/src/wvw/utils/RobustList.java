package wvw.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Stream;

/**
 * A list that keeps references to all issued iterators, informing them when an
 * element has been removed so they can update their inner state.
 * 
 * 
 * @author wvw
 *
 * @param <T>
 */

public class RobustList<T> {

	private List<T> list;
	private List<RobustIterator> iterators = new ArrayList<>();

	public RobustList() {
		list = new ArrayList<>();
	}

	public RobustList(List<T> list) {
		this.list = list;
	}

	public Stream<T> stream() {
		return list.stream();
	}

	public RobustIterator iterator() {
		RobustIterator it = new RobustIterator();
		iterators.add(it);

		return it;
	}

	public void add(T object) {
		list.add(object);
	}

	public void remove(T object) {
		int idx = list.indexOf(object);
		if (idx == -1)
			return;

		list.remove(idx);
		iterators.stream().forEach(i -> i.removedAt(idx));
	}
	
	public int size() {
		return list.size();
	}

	@Override
	public String toString() {
		return list.toString();
	}

	public class RobustIterator implements Iterator<T> {

		private int idx = 0;
		private int limit;

		public RobustIterator() {
			this.limit = list.size();
		}

		@Override
		public boolean hasNext() {
			boolean ret = idx < limit;
			if (!ret)
				done();

			return ret;
		}

		@Override
		public T next() {
			return list.get(idx++);
		}

		protected void removedAt(int idx) {
			limit--;

			if (idx <= this.idx && this.idx > 0)
				this.idx--;
		}

		public void done() {
			iterators.remove(this);
		}
	}

	public static void main(String[] args) throws Exception {
		RobustList<String> ul = new RobustList<>(new ArrayList<>(Arrays.asList("a", "b", "c", "d")));

		RobustList<String>.RobustIterator it = ul.iterator();

		int cnt = 0;

		while (it.hasNext()) {
			String n = it.next();
			System.out.println(n);

			if (cnt == 2) {
				ul.remove("a");
				ul.remove("b");
				ul.remove("c");
				ul.remove("d");
			}
			cnt++;
		}
	}
}
