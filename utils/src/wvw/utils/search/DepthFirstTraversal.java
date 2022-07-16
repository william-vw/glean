package wvw.utils.search;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.function.BiConsumer;
import java.util.function.BiFunction;
import java.util.function.Function;

public class DepthFirstTraversal<T> {

	// will not traverse the same node twice
	public void traverse(T node, BiConsumer<T, Integer> foundFn, Function<T, Collection<T>> descFn) {
		traverse(node, foundFn, descFn, 0, new HashSet<>());
	}

	private void traverse(T node, BiConsumer<T, Integer> foundFn, Function<T, Collection<T>> descFn, int depth,
			Set<T> done) {

		if (done.contains(node))
			return;

		done.add(node);
		foundFn.accept(node, depth);

		for (T child : descFn.apply(node))
			traverse(child, foundFn, descFn, depth + 1, done);
	}

	// traversal of a node depends on return value of foundFn
	public void traverse(T node, BiFunction<T, Integer, Boolean> foundFn, Function<T, Collection<T>> descFn) {
		traverse(node, foundFn, descFn, 0);
	}

	private void traverse(T node, BiFunction<T, Integer, Boolean> foundFn, Function<T, Collection<T>> descFn,
			int depth) {

		if (!foundFn.apply(node, depth))
			return;

		for (T child : descFn.apply(node))
			traverse(child, foundFn, descFn, depth + 1);
	}
}