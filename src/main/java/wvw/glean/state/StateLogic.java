package wvw.glean.state;

import org.apache.jen3.n3.N3Model;
import org.apache.jen3.n3.N3ModelSpec;
import org.apache.jen3.n3.N3ModelSpec.Types;
import org.apache.jen3.rdf.model.ModelFactory;
import org.apache.log4j.Logger;

import wvw.semweb.kb.jena.JenaKb;
import wvw.utils.IOUtils;

public class StateLogic {

	protected final static Logger LOG = Logger.getLogger(StateLogic.class.getName());

	public static N3Model convertToLinearLogic(N3Model in, String inPath, boolean logging)
			throws Exception {

		String name = inPath + "state" + (logging ? "_log" : "_nolog") + ".n3";
		in.read(IOUtils.getResourceStream(StateLogic.class, name), in.getBase());

		N3Model out = ModelFactory.createN3Model(N3ModelSpec.get(Types.N3_MEM));

		JenaKb ink = new JenaKb(in);
		ink.list(null, ink.resource("log:implies"), null).forEachRemaining(stmt -> {
			// ignore generator rules!
			if (!ink.contains(stmt.getSubject(), ink.resource("state:generator"), null))
				out.add(stmt);
		});

		ink.list(null, ink.resource("log:becomes"), null).forEachRemaining(stmt -> out.add(stmt));

		return out;
	}
}
