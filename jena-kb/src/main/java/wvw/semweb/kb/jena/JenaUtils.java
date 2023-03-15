package wvw.semweb.kb.jena;

import org.apache.jen3.rdf.model.Model;
import org.apache.jen3.rdf.model.Property;
import org.apache.jen3.rdf.model.Resource;

import wvw.utils.rdf.NS;

public class JenaUtils {

	public static boolean hasType(Resource res, Resource type) {
		Model m = res.getModel();

		return m.contains(res, prop(NS.toUri("rdf:type"), m), type);
	}

	public static Resource getType(Resource res) {
		Model m = res.getModel();

		return res.getPropertyResourceValue(prop("rdf:type", m));
	}

	public static Resource res(String curi, Model m) {
		return m.createResource(NS.toUri(curi));
	}

	public static Property prop(String curi, Model m) {
		return m.createProperty(NS.toUri(curi));
	}
}
