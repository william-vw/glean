package wvw.utils;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * @author wvw
 */

public class Stringify {

	private static ToStringStyle style = ToStringStyle.SHORT_PREFIX_STYLE;

	public static String toString(Object obj) {
		return ToStringBuilder.reflectionToString(obj, style);
	}

	public static String toString(Object obj, Object... atts) {
		ToStringBuilder builder = new ToStringBuilder(obj, style);

		for (Object att : atts)
			builder.append(att);

		return builder.toString();
	}

	public static String uniqueObjName(Object obj) {
		return obj.getClass().getSimpleName() + "@"
				+ Integer.toHexString(obj.hashCode());
	}
}
