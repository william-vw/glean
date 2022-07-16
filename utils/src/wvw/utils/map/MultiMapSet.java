package wvw.utils.map;

import java.io.Serializable;
import java.util.Map;
import java.util.Set;

public interface MultiMapSet<K, V> extends Map<K, Set<V>>, Serializable {

	@SuppressWarnings("unchecked")
	public void putValue(K key, V... value);


	@SuppressWarnings("unchecked")
	public void putValue(K key, boolean ignoreDuplicates, V... value);

	public void removeEl(K key, V value);
}
