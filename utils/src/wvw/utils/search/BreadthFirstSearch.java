package wvw.utils.search;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

// this class could likely be made more efficient

public class BreadthFirstSearch<T, U> {

	private List<QueueEntry<T>> queue;

	public SearchResult<T, U> searchFirst(T seed, Function<QueueEntry<T>, U> foundFn, Function<T, Iterator<T>> descFn) {
		List<SearchResult<T, U>> ret = searchAll(Arrays.asList(seed), foundFn, results -> results.isEmpty(), descFn);

		if (!ret.isEmpty())
			return ret.get(0);
		else
			return null;
	}

	public List<SearchResult<T, U>> searchAll(T seed, Function<QueueEntry<T>, U> foundFn,
			Function<List<SearchResult<T, U>>, Boolean> ctuFn, Function<T, Iterator<T>> descFn) {

		return searchAll(Arrays.asList(seed), foundFn, ctuFn, descFn);
	}

	public List<SearchResult<T, U>> searchAll(List<T> roots, Function<QueueEntry<T>, U> foundFn,
			Function<List<SearchResult<T, U>>, Boolean> ctuFn, Function<T, Iterator<T>> descFn) {

		List<SearchResult<T, U>> ret = new ArrayList<>();

		this.queue = roots.stream().map(r -> new QueueEntry<>(r)).collect(Collectors.toList());

		Collection<T> expanded = new HashSet<>();
		while (!queue.isEmpty()) {

			// technically limit is not needed
			// but it neatly distinguishes each level

			int limit = queue.size();

			while (limit-- > 0) {
				final QueueEntry<T> entry = queue.remove(0);

				T current = entry.getCurrent();
				if (expanded.contains(current))
					continue;

				expanded.add(current);
				U result = foundFn.apply(entry);
				if (result != null)
					ret.add(new SearchResult<>(entry.getPath(), result));

				if (!ctuFn.apply(ret))
					break;

				descFn.apply(current).forEachRemaining(d -> queue.add(new QueueEntry<>(d, entry)));
			}
		}

		return ret;
	}

	public static class QueueEntry<T> {

		private SearchPath<T> path;

		public QueueEntry(T root) {
			path = new SearchPath<>();
			path.add(root);
		}

		public QueueEntry(T e, QueueEntry<T> parent) {
			path = parent.getPath().copy();
			path.add(e);
		}

		public SearchPath<T> getPath() {
			return path;
		}

		public T getCurrent() {
			return path.last();
		}

		@Override
		public String toString() {
			return path.last().toString();
		}
	}

	public static class SearchResult<T, U> {

		private SearchPath<T> path;
		private U result;

		public SearchResult(SearchPath<T> path, U result) {
			this.path = path;
			this.result = result;
		}

		// will always include the "root" and needle
		// so, if the root equals the needle, path will have size 1
		public SearchPath<T> getPath() {
			return path;
		}

		public U getResult() {
			return result;
		}

		public String toString() {
			return "path? " + path + " - result? " + result;
		}
	}
}
