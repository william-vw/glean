package wvw.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author wvw
 */

public class OrderedMap<K, V> implements Map<K, V> {

	private List<K> keys = new ArrayList<K>();
	private List<V> values = new ArrayList<V>();

	public int size() {
		return keys.size();
	}

	public boolean isEmpty() {
		return size() == 0;
	}

	public boolean containsKey(Object key) {
		return getIdxKey(key) != -1;
	}

	public boolean containsValue(Object value) {
		return getIdxValue(value) != -1;
	}

	public V get(Object key) {
		int idx = getIdxKey(key);
		if (idx != -1)
			return values.get(idx);

		return null;
	}

	public V put(K key, V value) {
		keys.add(key);
		values.add(value);

		return value;
	}

	public V remove(Object key) {
		int idx = getIdxKey(key);
		if (idx != -1) {
			keys.remove(idx);

			return values.remove(idx);
		}

		return null;
	}

	public void putAll(Map<? extends K, ? extends V> m) {
		Iterator<? extends K> keyIt = m.keySet().iterator();
		while (keyIt.hasNext()) {
			K key = keyIt.next();
			V value = m.get(key);

			keys.add(key);
			values.add(value);
		}
	}

	public void clear() {
		keys.clear();

		values.clear();
	}

	public Set<K> keySet() {		
		return new LinkedHashSet<K>(keys);
	}

	public Collection<V> values() {
		return new ArrayList<V>(values);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Set<Map.Entry<K, V>> entrySet() {
		List<Map.Entry<K, V>> entries = new ArrayList<Map.Entry<K, V>>();
		for (int i = 0; i < keys.size(); i++) {
			K key = keys.get(i);
			V value = values.get(i);

			entries.add(new OrderedMap.Entry(key, value));
		}
		
		return new HashSet<Map.Entry<K, V>>(entries);
	}

	private int getIdxKey(Object key) {
		for (int i = 0; i < keys.size(); i++) {
			K key2 = keys.get(i);

			if (key2.equals(key))
				return i;
		}

		return -1;
	}

	private int getIdxValue(Object value) {
		for (int i = 0; i < values.size(); i++) {
			V value2 = values.get(i);

			if (value2.equals(value))
				return i;
		}

		return -1;
	}

	public String toString() {
		StringBuffer buffer = new StringBuffer();
		
		buffer.append("keys: ").append(keys).append("\n");
		buffer.append("values: ").append(values).append("\n");
		
		return buffer.toString();
	}
	
	public class Entry implements Map.Entry<K, V> {

		private K key;
		private V value;

		public Entry(K key, V value) {
			this.key = key;
			this.value = value;
		}

		public K getKey() {
			return key;
		}

		public V getValue() {
			return value;
		}

		public V setValue(V value) {
			this.value = value;

			return value;
		}
	}
}
