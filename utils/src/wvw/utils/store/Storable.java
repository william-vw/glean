package wvw.utils.store;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public abstract class Storable implements Serializable {

	private static final long serialVersionUID = 5400036110846768456L;

	protected String path = "";

	public Storable() {
	}

	public Storable(String path) {
		this.path = path;
	}

	public void store(String name) throws StorableException {
		try {
			File folder = new File(FileStorage.getStoragePath() + path);
			folder.mkdir();

			File file = new File(folder, name);

			ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file));
			store(oos);

			oos.close();

		} catch (IOException e) {
			throw new StorableException(e);
		}
	}

	protected abstract void store(ObjectOutputStream out) throws IOException;

	public boolean load(String name) throws StorableException {
		try {
			File file = new File(FileStorage.getStoragePath() + path + name);

			if (!file.exists())
				return false;

			ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file));
			load(ois);

			ois.close();

			return true;

		} catch (IOException | ClassNotFoundException e) {
			throw new StorableException(e);
		}
	}

	protected abstract void load(ObjectInputStream in) throws IOException, ClassNotFoundException;
}
