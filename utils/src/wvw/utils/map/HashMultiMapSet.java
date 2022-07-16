package wvw.utils.map;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class HashMultiMapSet<K, V> extends HashMap<K, Set<V>> implements MultiMapSet<K, V> {

	private static final long serialVersionUID = 1L;

	public HashMultiMapSet() {
	}

	public HashMultiMapSet(Map<K, Set<V>> map) {
		super(map);
	}

	@SafeVarargs
	public final void putValue(K key, V... values) {
		putValue(key, false, values);
	}

	@SafeVarargs
	public final void putValue(K key, boolean ignoreDuplicates, V... values) {
		Set<V> elements = get(key);

		if (elements == null) {
			elements = new HashSet<V>();
			put(key, elements);
		}

		for (V value : values) {
			if (!ignoreDuplicates || !elements.contains(value))
				elements.add(value);
		}
	}

	public void removeEl(K key, V value) {
		Set<V> elements = get(key);
		if (elements == null)
			return;

		Iterator<V> it = elements.iterator();
		while (it.hasNext()) {
			V element = it.next();
			if (element.equals(value)) {
				it.remove();
				break;
			}
		}

		if (elements.isEmpty())
			remove(key);
	}
}
