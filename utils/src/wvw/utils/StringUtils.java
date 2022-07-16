package wvw.utils;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author wvw
 */

public class StringUtils {

	public static void main(String[] args) {
		String str = "If taking methotrexate or your blood work results are abnormal and your family doctor or the Rheumatology Clinic are concerned";
		
//		System.out.println(splitIncludeSep(str, " and "));
		
		System.out.println(str.replaceAll(" (and|or) ", " <b>$1</b> "));
	}
	
	public static String[] splitIncludeSep(String str, String regex) {
		Pattern p = Pattern.compile(regex);
		Matcher m1 = p.matcher(str);

		List<String> parts = new ArrayList<>();

		int prevIdx = 0;
		while (m1.find()) {
			parts.add(str.substring(prevIdx, m1.start()));

			prevIdx = m1.start();
		}
		
		parts.add(str.substring(prevIdx));
		
		return parts.toArray(new String[parts.size()]);
	}

	public static String getCommonPrefix(String str1, String str2) {
		StringBuffer ret = new StringBuffer();

		for (int i = 0; i < str1.length() && i < str2.length(); i++) {
			char ch1 = str1.charAt(i);

			if (ch1 == str2.charAt(i))
				ret.append(ch1);
			else
				break;
		}

		if (ret.length() == 0)
			return null;
		else
			return ret.toString();
	}

	public static String format(List<String> strs, String separator) {
		return format(strs, separator, null);
	}

	public static String padLeft(String str, int nrSpaces, String padding) {
		String spaces = genSpaces(nrSpaces, padding);

		return spaces + str;
	}

	public static String padRight(String str, int nrSpaces, String padding) {
		String spaces = genSpaces(nrSpaces, padding);

		return str + spaces;
	}

	public static String pad(String str, int nrSpaces, String padding) {
		String spaces = genSpaces(nrSpaces, padding);

		return spaces + str + spaces;
	}

	protected static String genSpaces(int nrSpaces, String padding) {
		StringBuilder spaces = new StringBuilder();

		while (nrSpaces-- > 0)
			spaces.append(padding);

		return spaces.toString();
	}

	public static String genSpaces(int len) {
		return genChars(len, " ");
	}

	public static String genTabs(int len) {
		return genChars(len, "\t");
	}

	public static String genChars(int len, String chr) {
		StringBuffer buffer = new StringBuffer();
		while (len-- > 0)
			buffer.append(chr);

		return buffer.toString();
	}

	public static String format(List<String> strs, String separator, String prefix) {
		String ret = "";

		prefix = (prefix == null ? "" : prefix);
		for (String str : strs)
			ret += separator + prefix + str;

		return ret.substring(separator.length());
	}

	public static boolean isNumber(String str) {
		return str.matches("-?\\d+(\\.\\d+)?");
	}

	public static InputStream toStream(String str) {
		return new ByteArrayInputStream(str.getBytes(StandardCharsets.UTF_8));
	}

	@SuppressWarnings("rawtypes")
	public static String toString(List list, String separator, String valueTag) {
		StringBuffer buffer = new StringBuffer();
		for (int i = 0; i < list.size(); i++) {
			if (i > 0)
				buffer.append(separator);

			buffer.append("<").append(valueTag).append(">");
			buffer.append(list.get(i));
			buffer.append("</").append(valueTag).append(">");
		}

		return buffer.toString();
	}

	public static String toString(Object o) {
		if (o instanceof Object[])
			return toString((Object[]) o);

		else if (o instanceof String[])
			return toString((String[]) o);

		else
			return o.toString();
	}

	public static String toString(Exception e) {
		return "[" + e.getClass() + "] " + e.getMessage();
	}

	public static String toString(String[] strs) {
		return toString(strs, ", ", "[ ", " ]");
	}

	public static String toString(String[] strs, String sep, String par1, String par2) {
		String ret = "";

		for (String str : strs)
			ret += sep + str;

		return par1 + ret.substring(2) + par2;
	}

	public static String toString(Object[] objs) {
		String ret = "";
		for (Object obj : objs)
			ret += ", " + (obj == null ? "NULL" : toString(obj));

		return "[ " + ret.substring(2) + " ]";
	}

	public static String toString(byte[] array) {
		StringBuilder builder = new StringBuilder();
		builder.append("[");

		for (byte b : array) {
			if (builder.length() > 1)
				builder.append(", ");

			builder.append(b);
		}

		builder.append("]");

		return builder.toString();
	}

	public static String toString(boolean[] array) {
		StringBuilder builder = new StringBuilder();
		builder.append("[");

		for (boolean b : array) {
			if (builder.length() > 1)
				builder.append(", ");

			builder.append(b);
		}

		builder.append("]");

		return builder.toString();
	}

	public static String addressToString(Object o) {
		String str = o.toString();

		if (str.contains("@")) {
			str = str.substring(str.indexOf("@"));

			if (str.contains(" "))
				return str.substring(0, str.indexOf(" "));
			else
				return str;
		}

		return null;
	}

	@SuppressWarnings("rawtypes")
	public static String valuesToString(Map map) {
		return map.values().toString();
	}

	@SuppressWarnings("rawtypes")
	public static String keysToString(Map map) {
		return map.keySet().toString();
	}
}
