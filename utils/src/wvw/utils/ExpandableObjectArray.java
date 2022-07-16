package wvw.utils;

import java.util.ArrayList;
import java.util.List;

public class ExpandableObjectArray {

	public static Object[] createArray(int initCap) {
		Object[] array = new Object[initCap + 1];
		array[0] = 1;

		return array;
	}

	public static Object[] add(Object[] array, Object obj) {
		return add(array, obj, false, 1);
	}

	public static Object[] add(Object[] array, Object obj, int capIncr) {
		return add(array, obj, false, capIncr);
	}

	public static Object[] add(Object[] array, Object obj, boolean duplCheck, int capIncr) {
		if (!duplCheck || !contains(array, obj)) {

			if (addPos(array) == array.length)
				array = grow(array, capIncr);

			array[addPos(array)] = obj;
			incrAddPos(array);
		}

		return array;
	}

	public static boolean roomLeft(Object[] array) {
		return addPos(array) < array.length;
	}

	@SuppressWarnings("rawtypes")
	public static Object[] add(Object[] array, List objs) {
		return add(array, objs, false);
	}

	@SuppressWarnings("rawtypes")
	public static Object[] add(Object[] array, List objs, boolean duplCheck) {
		// TODO could grow array too large in case of duplicates
		array = accommodate(array, objs.size());
		for (Object obj : objs)
			add(array, obj, duplCheck, 1);

		return array;
	}

	private static Object[] accommodate(Object[] array, int nrNewElements) {
		int diff = (array.length - addPos(array)) - nrNewElements;
		if (diff < 0)
			return grow(array, -diff);

		return array;
	}

	public static Object[] grow(Object[] array, int incr) {
		Object[] newArray = new Object[array.length + incr];
		System.arraycopy(array, 0, newArray, 0, array.length);

		return newArray;
	}
	
	public static Object[] combine(Object[] array1, Object[] array2) {
		Object[] array = new Object[array1.length + array2.length];

		System.arraycopy(array1, 0, array, 0, array1.length);
		System.arraycopy(array2, 0, array, array1.length, array2.length);
		
		return array;
	}

	public static Object get(Object[] array, int idx) {
		return array[idx + 1];
	}

	public static void set(Object[] array, int idx, Object obj) {
		array[idx + 1] = obj;
	}

	public static int length(Object[] array) {
		return addPos(array) - 1;
	}

	public static Object[] remove(Object[] array, Object obj) {
		int pos = indexOf(array, obj);
		if (pos != -1)
			array = remove(array, pos, 1);

		return array;
	}

	@SuppressWarnings("rawtypes")
	public static Object[] remove(Object[] array, List objs) {
		for (Object obj : objs)
			array = remove(array, obj);

		return array;
	}

	public static Object[] remove(Object[] array, int from, int len) {
		return shrink(array, from, len);
	}

	private static Object[] shrink(Object[] array, int from, int len) {
		from++;

		if (from + len >= addPos(array))
			len -= from + len - addPos(array);

		Object[] newArray = new Object[array.length - len];
		int[] limits = { 0, from, from + len, array.length };

		int newCtr = 0;
		for (int i = 0; i < limits.length; i += 2) {

			for (int j = limits[i]; j < limits[i + 1]; j++)
				newArray[newCtr++] = array[j];
		}

		decrAddPos(newArray, len);

		return newArray;
	}

	public static boolean contains(Object[] array, Object needle) {
		for (int i = 1; i < addPos(array); i++) {
			if (array[i].equals(needle))
				return true;
		}

		return false;
	}

	public static int indexOf(Object[] array, Object needle) {
		for (int i = 1; i < addPos(array); i++) {
			if (array[i].equals(needle))
				return i - 1;
		}

		return -1;
	}

	public static boolean isEmpty(Object[] array) {
		return addPos(array) == 1;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List get(Object[] data, Class klazz) {
		List things = new ArrayList();
		for (int i = 1; i < addPos(data); i++) {
			if (data[i] == null)
				return things;

			if (klazz.isAssignableFrom(data[i].getClass()))
				things.add(data[i]);
		}

		return things;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static boolean has(Object[] data, Class klazz) {
		for (int i = 1; i < addPos(data); i++) {
			if (data[i] == null)
				return false;

			if (klazz.isAssignableFrom(data[i].getClass()))
				return true;
		}

		return false;
	}

	public static String toString(Object[] array) {
		String str = "[";

		for (int i = 1; i < addPos(array); i++) {
			if (i > 1)
				str += ", ";

			str += array[i];
		}
		str += "]";
		str += "\n(len: " + array.length + ")";

		return str;
	}

	@SuppressWarnings("rawtypes")
	public static Object[] fromList(List list) {
		return fromList(list, false);
	}

	@SuppressWarnings("rawtypes")
	public static Object[] fromList(List list, boolean duplCheck) {
		Object[] array = createArray(list.size());
		for (Object obj : list)
			if (!duplCheck || !contains(array, obj))
				array = add(array, obj);

		return array;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List toList(Object[] array) {
		List objs = new ArrayList(addPos(array) - 1);
		for (int i = 1; i < addPos(array); i++)
			objs.add(array[i]);

		return objs;
	}

	public static Object[] copyShallow(Object[] array) {
		Object[] clone = createArray(addPos(array) - 1);
		for (int i = 0; i < addPos(array); i++)
			clone[i] = array[i];

		return clone;
	}

	public static int addPos(Object[] array) {
		return (Integer) array[0];
	}

	private static void incrAddPos(Object[] array) {
		array[0] = (Integer) array[0] + 1;
	}

	private static void decrAddPos(Object[] array, int len) {
		array[0] = (Integer) array[0] - len;
	}
}
