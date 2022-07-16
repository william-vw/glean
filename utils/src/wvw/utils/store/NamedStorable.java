package wvw.utils.store;

public abstract class NamedStorable extends Storable {

	private static final long serialVersionUID = 1761947771432324486L;

	protected String name;

	public NamedStorable() {
	}

	public NamedStorable(String path) {
		super(path);
	}

	public NamedStorable(String path, String name) {
		super(path);

		this.name = name;
	}

	public void store() throws StorableException {
		store(name);
	}

	public boolean load() throws StorableException {
		return load(name);
	}
}