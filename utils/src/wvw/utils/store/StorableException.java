package wvw.utils.store;

/**
 * @author wvw
 */

public class StorableException extends Exception {

	private static final long serialVersionUID = -2810731106143608937L;

	public StorableException(String msg) {
		super(msg);
	}

	public StorableException(Exception e) {
		super(e);
	}

	public StorableException(String msg, Exception e) {
		super(msg, e);
	}
}
