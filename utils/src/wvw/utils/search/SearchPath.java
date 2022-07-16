package wvw.utils.search;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

public class SearchPath<T> implements Iterable<T> {

	private List<T> path;

	public SearchPath() {
		path = new ArrayList<>();
	}

	public SearchPath(List<T> path) {
		this.path = path;
	}

	public void add(T el) {
		path.add(el);
	}

	public T first() {
		return path.get(0);
	}

	public T last() {
		return path.get(path.size() - 1);
	}

	public T prior() {
		if (path.size() > 1)
			return path.get(path.size() - 2);
		else
			return null;
	}
	
	public SearchPath<T> reverse() {
		Collections.reverse(path);
		
		return this;
	}

//	public T at(int idx) {
//		return path.get(idx);
//	}

	public int size() {
		return path.size();
	}

	@Override
	public Iterator<T> iterator() {
		return path.iterator();
	}

	public SearchPath<T> copy() {
		return new SearchPath<T>(new ArrayList<>(path));
	}

	public String print() {
		return print(" --> ", 0, path.size());
	}

	public String print(String arrow) {
		return print(arrow, 0, path.size());
	}

	public String print(String arrow, int from, int to) {
		List<T> subPath = path.subList(from, to);

		return subPath.stream().map(n -> n.toString()).collect(Collectors.joining(arrow));
	}

	@Override
	public String toString() {
		return path.toString();
	}
}