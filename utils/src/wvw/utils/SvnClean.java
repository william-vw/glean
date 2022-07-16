package wvw.utils;

import java.io.File;

public class SvnClean {

	public static void main(String[] args) throws Exception {
		new SvnClean().clean(new File("C:/Users/William/git/reflex/jenabean"));
	}

	public void clean(File folder) throws Exception {
		for (File f : folder.listFiles()) {
			if (f.getName().equals(".svn")) {
				System.out.println(f);
				
				IOUtils.deleteContents(f);
				f.delete();
			}
			
			else if (f.isDirectory())
				clean(f);
		}
	}
}
