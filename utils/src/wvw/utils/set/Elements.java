package wvw.utils.set;

import java.util.Iterator;
import java.util.function.Function;

public interface Elements<T> {

	public <S> Elements<S> mapWith(Function<T, S> mapFn);
	
	public int size();
	
	public Iterator<T> iterate();
}
