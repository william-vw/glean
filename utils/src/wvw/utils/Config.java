package wvw.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Config {

	public static Properties config = new Properties();

	@SuppressWarnings("rawtypes")
	protected static void init(Class cls) {
		init(cls, "config.properties");
	}

	@SuppressWarnings("rawtypes")
	protected static void init(Class cls, String name) {
		try {
			InputStream in = cls.getResourceAsStream("config_shared.properties");
			if (in != null) {
				config.load(in);

				String fileName = "config_" + (isLocal(config) ? "local" : "remote") + ".properties";
				config.load(cls.getResourceAsStream(fileName));

			} else {
				in = cls.getResourceAsStream(name);
				if (in == null)
					System.err.println("[Config] cannot find config.properties file");
				else
					config.load(in);
			}

			System.out.println("config? " + config);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private static boolean isLocal(Properties config) {
		String user = System.getProperty("user.name");
		String localUser = config.getProperty("localUserName");

		return (user != null && localUser != null && user.equals(localUser));
	}

	protected static int getIntProperty(String name) {
		return Integer.valueOf(config.getProperty(name));
	}

	protected static double getDoubleProperty(String name) {
		return Double.valueOf(config.getProperty(name));
	}

	protected static String getStringProperty(String name) {
		return config.getProperty(name);
	}
}
