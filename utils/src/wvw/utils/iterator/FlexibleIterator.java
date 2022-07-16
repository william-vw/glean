package wvw.utils.iterator;

import java.util.Iterator;

/**
 * @author wvw
 */

public interface FlexibleIterator<T> extends Iterator<T> {

	public boolean hasNext();

	public T next();

	public T current();

	public void reset();

	public int size();
}
