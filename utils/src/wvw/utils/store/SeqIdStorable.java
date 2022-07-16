package wvw.utils.store;

import wvw.utils.SeqNrs;

/**
 * @author wvw
 */

public abstract class SeqIdStorable extends Storable {

	private static final long serialVersionUID = 1761947771432324486L;

	private int id = 0;

	public SeqIdStorable() {
		id = nextId();
	}

	public SeqIdStorable(int id) {
		this.id = id;
	}

	public SeqIdStorable(String path) {
		super(path);

		id = nextId();
	}

	public SeqIdStorable(String path, int id) {
		super(path);

		this.id = id;
	}

	private int nextId() {
		return SeqNrs.unique(SeqIdStorable.class);
	}

	public void store() throws StorableException {
		super.store(String.valueOf(id));
	}

	public boolean load() throws StorableException {
		return super.load(String.valueOf(id));
	}
}
