package wvw.utils;

import java.util.stream.Stream;

public class StreamUtils {

	// (based on
	// https://www.techempower.com/blog/2016/10/19/efficient-multiple-stream-concatenation-in-java/)

	@SuppressWarnings("unchecked")
	public static <T> Stream<T> concat(Stream<T>... streams) {
		if (streams.length == 2)
			return Stream.concat(streams[0], streams[1]);

		return Stream.of(streams).flatMap(s -> s);
	}
}
