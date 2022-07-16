package wvw.utils;

public class ExpandableByteArray {

	public static byte[] createArray(int initCap) {
		byte[] array = new byte[initCap + 1];
		array[0] = 1;

		return array;
	}

	public static byte[] add(byte[] array, byte obj) {
		return add(array, obj, false, 1);
	}

	public static byte[] add(byte[] array, byte obj, int capIncr) {
		return add(array, obj, false, capIncr);
	}

	public static byte[] add(byte[] array, byte obj, boolean duplCheck, int capIncr) {
		if (!duplCheck || !contains(array, obj)) {

			if (addPos(array) == array.length)
				array = grow(array, capIncr);

			array[addPos(array)] = obj;
			incrAddPos(array);
		}

		return array;
	}

	public static byte[] combine(byte[] array1, byte[] array2) {
		byte[] array = new byte[array1.length + array2.length];

		System.arraycopy(array1, 0, array, 0, array1.length);
		System.arraycopy(array2, 0, array, array1.length, array2.length);
		
		return array;
	}

	public static boolean roomLeft(byte[] array) {
		return addPos(array) < array.length;
	}

	public static byte[] grow(byte[] array, int incr) {
		byte[] newArray = new byte[array.length + incr];
		System.arraycopy(array, 0, newArray, 0, array.length);

		return newArray;
	}

	public static byte get(byte[] array, int idx) {
		return array[idx + 1];
	}

	public static void set(byte[] array, int idx, byte obj) {
		array[idx + 1] = obj;
	}

	public static int length(byte[] array) {
		return addPos(array) - 1;
	}

	public static byte[] remove(byte[] array, byte obj) {
		int pos = indexOf(array, obj);
		if (pos != -1)
			array = remove(array, pos, 1);

		return array;
	}

	public static byte[] remove(byte[] array, int from, int len) {
		return shrink(array, from, len);
	}

	private static byte[] shrink(byte[] array, int from, int len) {
		from++;

		if (from + len >= addPos(array))
			len -= from + len - addPos(array);

		byte[] newArray = new byte[array.length - len];
		int[] limits = { 0, from, from + len, array.length };

		int newCtr = 0;
		for (int i = 0; i < limits.length; i += 2) {

			for (int j = limits[i]; j < limits[i + 1]; j++)
				newArray[newCtr++] = array[j];
		}

		decrAddPos(newArray, len);

		return newArray;
	}

	public static boolean contains(byte[] array, byte needle) {
		for (int i = 1; i < addPos(array); i++) {
			if (array[i] == needle)
				return true;
		}

		return false;
	}

	public static int indexOf(byte[] array, byte needle) {
		for (int i = 1; i < addPos(array); i++) {
			if (array[i] == needle)
				return i - 1;
		}

		return -1;
	}

	public static boolean isEmpty(byte[] array) {
		return addPos(array) == 1;
	}

	public static String toString(byte[] array) {
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

	public static byte[] copyShallow(byte[] array) {
		byte[] clone = createArray(addPos(array) - 1);

		for (int i = 0; i < addPos(array); i++)
			clone[i] = array[i];

		return clone;
	}

	public static int addPos(byte[] array) {
		return array[0];
	}

	private static void incrAddPos(byte[] array) {
		array[0] = (byte) (array[0] + 1);
	}

	private static void decrAddPos(byte[] array, int len) {
		array[0] = (byte) (array[0] - len);
	}
}
