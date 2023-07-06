package wvw.glean.cig;

import java.io.File;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;

import wvw.glean.cig.CIGWorkflowPrinter.DataSources;

public class EditorCmd {

	public static void main(String[] args) throws Exception {
		Options options = new Options();
		options.addOption(Option.builder("folder").argName("input").hasArg().desc(
				"The main folder structured as follows: a 'cig' subfolder keeps all CIG-related artefacts; a 'tmp' folder keeps temporary output; and an 'out' folder keeps the final output")
				.numberOfArgs(1).required(true).build());
		options.addOption(Option.builder("cig").argName("cig").hasArg()
				.desc("name of CIG file (without extension) under the 'cig' subfolder; e.g., 'example_cig'")
				.numberOfArgs(1).required(true).build());
		options.addOption(Option.builder("ns").argName("ns").hasArg()
				.desc("namespace URI used for the CIG tasks; e.g., http://example.org/").numberOfArgs(1).required(true)
				.build());

		CommandLineParser parser = new DefaultParser();
		CommandLine line = null;
		try {
			line = parser.parse(options, args);
		} catch (ParseException exp) {
			System.err.println("ERROR: " + exp.getMessage());
			System.exit(1);
		}

		String cig = line.getOptionValue("cig");
		String ns = line.getOptionValue("ns");

		String folder = line.getOptionValue("folder");
		String inFolder = folder + "/";
		String tmpFolder = new File(folder, "tmp").getAbsolutePath() + "/";
		String outFolder = new File(folder, "out").getAbsolutePath() + "/";

		CIGWorkflowPrinter printer = new CIGWorkflowPrinter();
		printer.printWorkflow(cig, ns, inFolder, tmpFolder, outFolder, DataSources.LOCAL);
	}

}
