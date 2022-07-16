package wvw.utils;

import java.text.DecimalFormat;

public class PrintUtils {

	private static DecimalFormat doubleFormat = new DecimalFormat("#.##");

	public static String print(double v) {
		return doubleFormat.format(v);
	}
}
