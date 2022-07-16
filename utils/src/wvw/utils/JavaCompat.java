package wvw.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import wvw.utils.log.Log;

public class JavaCompat {

	public static void main(String[] args) throws Exception {
		JavaCompat o = new JavaCompat();
		o.javaCompat(new File("C:/Users/William/Downloads/commons-lang3-3.5-src/src/"));
	}

	public void javaCompat(File folder) throws IOException {
		for (File file : folder.listFiles()) {

			if (file.isDirectory())
				javaCompat(file);

			else {
				if (!file.getName().endsWith(".java"))
					continue;
				
				BufferedReader reader = new BufferedReader(new FileReader(file));

				boolean isInterface = false;
				boolean staticMethod = false;
				boolean defaultMethod = false;

				boolean insideComment = false;

				String line = null;
				while ((line = reader.readLine()) != null) {
					line = line.trim();

					if (!isInterface)
						isInterface = line.contains("public interface");

					else {
						if (line.startsWith("/**")) {
							insideComment = true;

						} else if (line.startsWith("*/")) {
							insideComment = false;

						} else if (!(line.startsWith("*") || line.startsWith("//")) && !insideComment) {
							if (line.contains(" static "))
								staticMethod = true;

							if (line.contains(" default "))
								defaultMethod = true;
						}
					}
				}

				reader.close();

				if (staticMethod)
					Log.d(file.getPath());// + ": static method in interface");

				if (defaultMethod)
					Log.d(file.getPath());// + ": default method in interface");
			}
		}
	}
}
