/**
 * Copyright 2015 William Van Woensel

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 * 
 * 
 * @author wvw
 * 
 */
package wvw.utils;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author wvw
 */

public class OutputUtils {

	@SuppressWarnings("rawtypes")
	public static String className(Class cls) {
		String str = cls.toString();

		return str.substring(str.lastIndexOf(".") + 1);
	}

	@SuppressWarnings("rawtypes")
	public static String toString(Object obj) {
		if (obj == null)
			return "null";

		else if (obj instanceof Exception)
			return toString((Exception) obj);

		else if (obj instanceof Map)
			return toString((Map) obj);

		else if (obj instanceof List)
			return toString((List) obj);

		else if (obj instanceof Object[])
			return toString((Object[]) obj);

		else if (obj instanceof int[])
			return toString((int[]) obj);

		else if (obj instanceof byte[])
			return toString((byte[]) obj);

		else if (obj instanceof int[][])
			return toString((int[][]) obj);

		else if (obj instanceof boolean[])
			return toString((boolean[]) obj);

		else
			return obj.toString();
	}

	public static String toString(Exception e) {
		return "[" + e.getClass() + "] " + e.getMessage();
	}

	@SuppressWarnings("rawtypes")
	public static String toString(Map map) {
		StringBuffer ret = new StringBuffer();

		ret.append("{");

		Iterator it = map.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry entry = (Map.Entry) it.next();

			Object key = entry.getKey();
			Object value = entry.getValue();

			if (ret.length() > 1)
				ret.append(",");

			ret.append(toString(key)).append("=").append(toString(value));
		}

		ret.append("}");

		return ret.toString();
	}

	@SuppressWarnings("rawtypes")
	public static String toString(List list) {
		return toString(list, ",", "[", "]");
	}

	@SuppressWarnings("rawtypes")
	public static String toString(List list, String sep, String lb, String rb) {
		return toString(list, sep, lb, rb, o -> toString(o));
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static String toString(List list, String sep, String lb, String rb, ToString toStr) {
		if (list == null)
			return "<null>";

		StringBuffer ret = new StringBuffer();

		ret.append(lb);
		for (Object o : list) {

			if (ret.length() > lb.length())
				ret.append(sep);

			ret.append(toStr.toString(o));
		}

		ret.append(rb);

		return ret.toString();
	}

	@SuppressWarnings("rawtypes")
	public static String valuesToString(Map map) {
		return map.values().toString();
	}

	@SuppressWarnings("rawtypes")
	public static String keysToString(Map map) {
		return map.keySet().toString();
	}

	public static String toString(Object[] array) {
		StringBuffer ret = new StringBuffer();

		for (int i = 0; i < array.length; i++) {
			Object el = array[i];

			if (i > 0)
				ret.append(", ");

			ret.append(toString(el));
		}

		return "[ " + ret + " ]";
	}

	public static String toString(int[] array) {
		if (array == null)
			return "null";

		StringBuffer ret = new StringBuffer();
		for (int i = 0; i < array.length; i++) {
			int el = array[i];

			if (i > 0)
				ret.append(", ");

			ret.append(el);
		}

		return "[ " + ret + " ]";
	}

	public static String toString(byte[] array) {
		if (array == null)
			return "null";

		StringBuffer ret = new StringBuffer();
		for (int i = 0; i < array.length; i++) {
			byte el = array[i];

			if (i > 0)
				ret.append(", ");

			ret.append(el);
		}

		return "[ " + ret + " ]";
	}

	public static String toString(int[][] array) {
		if (array == null)
			return "null";

		StringBuffer ret = new StringBuffer();
		for (int i = 0; i < array.length; i++) {
			int[] el = array[i];

			if (i > 0)
				ret.append(", ");

			ret.append(toString(el));
		}

		return "[ " + ret + " ]";
	}

	public static String toString(boolean[] array) {
		StringBuffer ret = new StringBuffer();
		for (int i = 0; i < array.length; i++) {
			boolean el = array[i];

			if (i > 0)
				ret.append(", ");

			ret.append(el);
		}

		return "[ " + ret + " ]";
	}
	
	public static interface ToString<K> {
		
		public String toString(K k);
	}
}
