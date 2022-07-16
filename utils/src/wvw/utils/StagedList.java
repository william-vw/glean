package wvw.utils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class StagedList<T> {

	private List<T> list = new ArrayList<>();

	private int start = 0;

	public StagedList() {
	}

	public StagedList(T el) {
		add(el);
	}

	public void add(T el) {
		list.add(el);
	}

	public void remove(T el) {
		int idx = list.indexOf(el);
		if (idx == -1)
			return;

		if (idx < start)
			start--;

		list.remove(idx);
	}

	public int size() {
		return list.size();
	}

	public boolean isEmpty() {
		return list.isEmpty();
	}

	public int start() {
		return start;
	}

	public void start(int start) {
		this.start = start;
	}

	public T get(int index) {
		return list.get(index);
	}

	public Iterator<T> iterator() {
		return new StagedListIterator();
	}

	@Override
	public String toString() {
		return "{" + /*start + " - " + */ list + "}";
	}

	public class StagedListIterator implements Iterator<T> {

		private int end = size();

		@Override
		public boolean hasNext() {
			return start < end;
		}

		@Override
		public T next() {
			return list.get(start++);
		}

		@Override
		public void remove() {
			list.remove(--start);
			end--;
		}
	}

	public static void main(String[] args) {
		StagedList<String> sl = new StagedList<>();

		// - adding

//		sl.add("a");
//		sl.add("b");
//
//		int cnt = 0;
//		Iterator<String> it = sl.iterator();
//		while (it.hasNext()) {
//			String el = it.next();
//			System.out.println(el);
//
//			switch (cnt++) {
//			case 0:
//				sl.add("c");
//				break;
//			case 1:
//				sl.add("d");
//				break;
//			case 2:
//				sl.add("e");
//				break;
//			}
//		}
//		System.out.println(sl);
//
//		it = sl.iterator();
//		while (it.hasNext()) {
//			System.out.println(it.next());
//		}

//		// - adding + "popping" queue
//
//		sl.add("a");
//		sl.add("b");
//
//		int cnt = 0;
//		Iterator<String> it = sl.iterator();
//		while (it.hasNext()) {
//			String el = it.next();
//			it.remove();
//
//			System.out.println(el);
//
//			switch (cnt++) {
//			case 0:
//				sl.add("c");
//				break;
//			case 1:
//				sl.add("d");
//				break;
//			case 2:
//				sl.add("e");
//				break;
//			}
//		}
//		System.out.println(sl);
//
//		it = sl.iterator();
//		while (it.hasNext()) {
//			System.out.println(it.next());
//		}

		// - adding + removing arbitrary element
		sl.add("a");
		sl.add("b");
		sl.add("c");
		sl.add("d");
		sl.add("e");

		System.out.println(sl);
		sl.remove("b");
		System.out.println(sl);

		Iterator<String> it = sl.iterator();
		System.out.println(it.next());
		System.out.println(it.next());
		System.out.println(it.next());

		System.out.println(sl);
		sl.remove("c");
		System.out.println(sl);
		it = sl.iterator();
		System.out.println(it.next());
		System.out.println(it.hasNext());
	}
}