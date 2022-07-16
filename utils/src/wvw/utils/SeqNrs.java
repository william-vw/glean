package wvw.utils;

import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("rawtypes")
public class SeqNrs {

	private static Map<Class, Integer> cnt = new HashMap<Class, Integer>();

	public static int unique(Class clz) {
		Integer cur = cnt.get(clz);
		if (cur == null || cur == Integer.MAX_VALUE)
			cur = 0;
		
		cnt.put(clz, cur + 1);

		return cur;
	}
}
