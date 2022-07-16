package wvw.utils.store;

import java.io.IOException;
import java.io.InputStream;

import wvw.utils.IOUtils;

public class FileStorage {

	private static FileStorage storage;

	private static String storagePath = null;

	public static void init(FileStorage storage, String storagePath) {
		FileStorage.storage = storage;

		FileStorage.storagePath = storagePath;
	}

	public static InputStream getFileStream(String filePath) throws IOException {
		return getFileStream(filePath, true);
	}

	public static InputStream getFileStream(String filePath, boolean relative) throws IOException {
		return storage.retrieveFileStream(filePath, relative);
	}

	protected InputStream retrieveFileStream(String filePath, boolean relative) throws IOException {
		return IOUtils.getFileStream(resolvePath(filePath, relative));
	}

	public static String readFile(String filePath) throws IOException {
		return readFile(filePath, true);
	}

	public static String readFile(String filePath, boolean relative) throws IOException {
		return storage.retrieveFile(filePath, relative);
	}

	public static Object readObject(String filePath) throws Exception {
		return readObject(filePath, true);
	}

	public static Object readObject(String filePath, boolean relative) throws Exception {
		String fullPath = resolvePath(filePath, relative);

		return IOUtils.readObject(fullPath);
	}

	protected String retrieveFile(String filePath, boolean relative) throws IOException {
		return IOUtils.readFile(resolvePath(filePath, relative));
	}

	public static void writeFile(String filePath, String contents) throws IOException {
		writeFile(filePath, true, contents, true);
	}

	public static void writeFile(String filePath, boolean relative, String contents) throws IOException {
		writeFile(filePath, relative, contents, true);
	}

	public static void writeFile(String filePath, String contents, boolean append) throws IOException {
		writeFile(filePath, true, contents, append);
	}

	public static void writeFile(String filePath, boolean relative, String contents, boolean append)
			throws IOException {

		storage.composeFile(filePath, relative, contents, append);
	}

	public static void writeObject(String filePath, Object obj) throws IOException {
		writeObject(filePath, true, obj);
	}

	public static void writeObject(String filePath, boolean relative, Object obj) throws IOException {
		String fullPath = resolvePath(filePath, relative);

		IOUtils.writeFile(fullPath, obj);
	}

	public static void removeFile(String filePath) {
		removeFile(filePath, true);
	}

	public static void removeFile(String filePath, boolean relative) {
		String fullPath = resolvePath(filePath, relative);

		IOUtils.deleteFile(fullPath);
	}

	public static void removeContents(String folderPath) throws IOException {
		removeContents(folderPath, true);
	}

	public static void removeContents(String folderPath, boolean relative) throws IOException {
		String fullPath = resolvePath(folderPath, relative);
		
		IOUtils.deleteContents(fullPath);
	}

	protected void composeFile(String filePath, boolean relative, String contents, boolean append) throws IOException {
		String fullPath = resolvePath(filePath, relative);

		IOUtils.writeFile(fullPath, contents, append);
		fileDone(fullPath);
	}

	protected void fileDone(String filePath) {
	}

	protected static String resolvePath(String filePath, boolean relative) {
		if (relative)
			return storagePath + filePath;
		else
			return filePath;
	}

	public static String getStoragePath() {
		return storagePath;
	}

	public static void setStoragePath(String storagePath) {
		FileStorage.storagePath = storagePath;
	}
}
