package wvw.utils;

public class NumberUtils {

	public static int smallest(int... nrs) {
		int smallest = Integer.MAX_VALUE;

		for (int nr : nrs) {

			if (nr < smallest)
				smallest = nr;
		}

		return smallest;
	}

	public static int largest(int... nrs) {
		int largest = Integer.MIN_VALUE;

		for (int nr : nrs) {

			if (nr > largest)
				largest = nr;
		}

		return largest;
	}
}
