package wvw.utils;

public class ArrayUtils {

	public static boolean[] trueBoolArray(int length) {
		boolean[] array = new boolean[length];
		for (int i = 0; i < length; i++)
			array[i] = true;

		return array;
	}

	public static boolean[] falseBoolArray(int length) {
		return new boolean[length];
	}

	public static int[] incrIntArray(int length) {
		int[] array = new int[length];
		for (int i = 0; i < length; i++)
			array[i] = i;

		return array;
	}
}
