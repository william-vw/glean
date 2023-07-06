package wvw.semweb.kb.jena;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.function.Function;

import org.apache.jen3.datatypes.xsd.XSDDateTime;
import org.apache.jen3.graph.BlankNodeId;
import org.apache.jen3.graph.Node;
import org.apache.jen3.graph.Triple;
import org.apache.jen3.n3.N3Model;
import org.apache.jen3.n3.N3ModelSpec;
import org.apache.jen3.rdf.model.AnonId;
import org.apache.jen3.rdf.model.Literal;
import org.apache.jen3.rdf.model.ModelFactory;
import org.apache.jen3.rdf.model.Property;
import org.apache.jen3.rdf.model.Resource;
import org.apache.jen3.rdf.model.Statement;
import org.apache.jen3.rdf.model.StmtIterator;
import org.apache.jen3.reasoner.InfGraph;

import wvw.utils.IOUtils;
import wvw.utils.log.Log;
import wvw.utils.rdf.NS;

public class JenaKb {

	private N3Model model;

	public JenaKb(N3ModelSpec spec) {
		this.model = ModelFactory.createN3Model(spec);
	}

	public JenaKb(N3Model model) {
		this.model = model;
	}

	public JenaKb from(String base, String... paths) throws IOException {
		for (String path : paths)
			model.read(new FileInputStream(path), base);

		return this;
	}

	@SuppressWarnings("rawtypes")
	public JenaKb fromClsRes(Class cls, String base, String... paths)
			throws IOException, URISyntaxException {

		for (String path : paths) {
			// System.out.println("fromClsRes: " + path);
			model.read(IOUtils.getResourceStream(cls, path), base);
		}

		return this;
	}

	public JenaKb from(String base, InputStream in) {
		model.read(in, base);

		return this;
	}

	public JenaKb fromString(String base, String rdf) {
		return from(base, new ByteArrayInputStream(rdf.getBytes()));
	}

	public N3Model getModel() {
		return model;
	}

	public Resource resource() {
		return model.createResource();
	}

	public Resource resource(String ns, String ln) {
		return model.createResource(NS.getNsUri(ns) + ln);
	}

	public Resource resource(String qName) {
		return model.createResource(NS.toUri(qName));
	}

	public Resource resourceFromUri(String uri) {
		return model.createResource(uri);
	}

	public Resource blankNode() {
		return model.createResource(new AnonId());
	}

	public Resource blankNode(BlankNodeId id) {
		return model.createResource(new AnonId(id));
	}

	public Property property(String qName) {
		return model.createProperty(NS.toUri(qName));
	}

	public Property propertyFromUri(String uri) {
		return model.createProperty(uri);
	}

	public Literal literal(String value) {
		return model.createLiteral(value);
	}

	public Literal literal(java.sql.Date date) {
		return model.createTypedLiteral(toCal(date));
	}

	public Literal literal(Object value) {
		return model.createTypedLiteral(value);
	}

	public Resource toResource(Node arg) {
		if (arg.isURI())
			return resourceFromUri(arg.getURI());
		else
			return blankNode(arg.getBlankNodeId());
	}

	public StmtIterator list(Resource s, Resource p, Resource o) {
		return model.listStatements(s, p, o);
	}

	public List<Statement> findLinked(Resource s, Function<Resource, Boolean> filter) {
		List<Statement> ret = new ArrayList<>();
		findLinked(s, filter, ret);

		return ret;
	}

	public void findLinked(Resource s, Function<Resource, Boolean> filter, List<Statement> ret) {
		s.listProperties().forEachRemaining(stmt -> {
			ret.add(stmt);

			if (filter.apply(stmt.getObject()))
				findLinked(stmt.getObject(), filter, ret);
		});
	}

	public List<Statement> listAll() {
		return model.listStatements().toList();
	}

	public boolean contains(Resource s, Resource p, Resource o) {
		return model.contains(s, p, o);
	}

	public void add(Statement stmt) {
		model.add(stmt);
	}

	public void add(Resource s, Resource p, Resource o) {
		model.add(s, p, o);
	}

	public void add(Resource s, Resource p, Object o) {
		model.addLiteral(s, p, model.createTypedLiteral(o));
	}

	public void addAll(List<Statement> stmts) {
		model.add(stmts);
	}

	public void remove(Statement stmt) {
		model.remove(stmt);
	}

	private boolean bulkUpdate = false;

	/*
	 * Allows updating the "raw" underlying data (removePremise, replacePremise)
	 * without re-derivations per individual update.
	 * 
	 * After calling this method, individual updates will be applied without
	 * re-deriving inferences each time; when calling endBulkpdate, a single
	 * re-derivation will take place.
	 * 
	 * One can also update premises individually without calling this method. In
	 * that case, however, inferences will be re-derived per individual update.
	 */

	public void startBulkUpdate() {
		bulkUpdate = true;
	}

	public void removePremise(Resource s, Resource p, Resource o, Resource... inferredProperties) {
		if (bulkUpdate)
			removeRaw(s, p, o);
		else
			removeAndDerive(s, p, o, inferredProperties);
	}

	public void replacePremise(Resource s, Resource p, Resource o, Resource s2, Resource p2,
			Resource o2, Resource... inferredProperties) {

		if (bulkUpdate)
			replaceRaw(s, p, o, s2, p2, o2);
		else
			replaceAndDerive(s, p, o, s2, p2, o2, inferredProperties);
	}

	/*
	 * Call this method after the bulk update. Derivations matching the
	 * inferredProperties will be removed, and optionally (rederive param) the
	 * method will re-derive all statements with these properties.
	 * 
	 */

	public void endBulkUpdate(boolean rederive, Resource... inferredProperties) {
		if (bulkUpdate) {
			bulkUpdate = false;

			resetDerivations(inferredProperties);
			if (rederive)
				rederiveFor(inferredProperties);

		} else
			Log.e("calling #endConditionUpdate without having called #startBulkUpdate first");
	}

	// bypass the inference graph's mechanics to rebind the model after a delete
	// (hope we know what we're doing!)

	public void removeQuietly(Statement stmt) {
		removeQuietly(stmt.getSubject(), stmt.getPredicate(), stmt.getObject());
	}

	public void removeQuietly(Resource s, Resource p, Resource o) {
		InfGraph ig = (InfGraph) model.getGraph();

		Node sn = (s != null ? s.asNode() : null);
		Node pn = (p != null ? p.asNode() : null);
		Node on = (o != null ? o.asNode() : null);

		// (does not trigger rebind)
		ig.getRawGraph().remove(sn, pn, on);
		ig.getDeductionsGraph().remove(sn, pn, on);
	}

	public void removeRaw(Resource s, Resource p, Resource o) {
		InfGraph ig = (InfGraph) model.getGraph();

		Node sn = (s != null ? s.asNode() : null);
		Node pn = (p != null ? p.asNode() : null);
		Node on = (o != null ? o.asNode() : null);

		// (does not trigger rebind)
		ig.getRawGraph().remove(sn, pn, on);
	}

	public void removeDeduction(Resource s, Resource p, Resource o) {
		InfGraph ig = (InfGraph) model.getGraph();

		Node sn = (s != null ? s.asNode() : null);
		Node pn = (p != null ? p.asNode() : null);
		Node on = (o != null ? o.asNode() : null);

		// (does not trigger rebind)
		ig.getDeductionsGraph().remove(sn, pn, on);
	}

	public void replaceRaw(Resource s, Resource p, Resource o, Resource s2, Resource p2,
			Resource o2) {

		InfGraph ig = (InfGraph) model.getGraph();

		Node sn = (s != null ? s.asNode() : null);
		Node pn = (p != null ? p.asNode() : null);
		Node on = (o != null ? o.asNode() : null);

		// (does not trigger rebind)
		ig.getRawGraph().remove(sn, pn, on);
		ig.getRawGraph().add(new Triple(s2.asNode(), p2.asNode(), o2.asNode()));
	}

	public void removeAndDerive(Resource s, Resource p, Resource o,
			Resource... inferredProperties) {
		InfGraph ig = (InfGraph) model.getGraph();

		Node sn = (s != null ? s.asNode() : null);
		Node pn = (p != null ? p.asNode() : null);
		Node on = (o != null ? o.asNode() : null);

		Node[] ipns = Arrays.stream(inferredProperties).map(res -> res.asNode())
				.toArray(size -> new Node[size]);

		// (does not trigger rebind)
		ig.getRawGraph().remove(sn, pn, on);

		// remove prior inferences for given properties
		for (Node ipn : ipns)
			ig.getDeductionsGraph().remove(null, ipn, null);

		// then, re-generate all inferences for given property
		ig.rebind(ipns);
	}

	public void replaceAndDerive(Resource s, Resource p, Resource o, Resource s2, Resource p2,
			Resource o2, Resource... inferredProperties) {

		InfGraph ig = (InfGraph) model.getGraph();

		Node sn = (s != null ? s.asNode() : null);
		Node pn = (p != null ? p.asNode() : null);
		Node on = (o != null ? o.asNode() : null);

		Node[] ipns = Arrays.stream(inferredProperties).map(res -> res.asNode())
				.toArray(size -> new Node[size]);

		// (does not trigger rebind)
		ig.getRawGraph().remove(sn, pn, on);
		ig.getRawGraph().add(new Triple(s2.asNode(), p2.asNode(), o2.asNode()));

		// remove prior inferences for given properties
		for (Node ipn : ipns)
			ig.getDeductionsGraph().remove(null, ipn, null);

		// then, re-generate all inferences for given properties
		ig.rebind(ipns);
	}

	public void addQuietly(Statement stmt) {
		addQuietly(stmt.getSubject(), stmt.getPredicate(), stmt.getObject());
	}

	public void addQuietly(Resource s, Resource p, Resource o) {
		InfGraph ig = (InfGraph) model.getGraph();

		Node sn = (s != null ? s.asNode() : null);
		Node pn = (p != null ? p.asNode() : null);
		Node on = (o != null ? o.asNode() : null);

		// (does not trigger rebind)
		ig.getRawGraph().add(new Triple(sn, pn, on));
	}

	public void deriveFor(Resource inferredProperty) {
		InfGraph ig = (InfGraph) model.getGraph();

		ig.rebind(inferredProperty.asNode());
	}

	public void resetDerivations(Resource... inferredProperties) {
		for (Resource inferredProperty : inferredProperties)
			removeDeduction(null, inferredProperty, null);
	}

	public void rederiveFor(Resource... inferredProperties) {
		InfGraph ig = (InfGraph) model.getGraph();

		ig.rebind(Arrays.stream(inferredProperties).map(res -> res.asNode())
				.toArray(s -> new Node[s]));
	}

	public void remove(Resource s, Resource p, Resource o) {
		model.remove(s, p, o);
	}

	public void remove(Resource s, Resource p, Object o) {
		model.remove(s, p, model.createTypedLiteral(o));
	}

	public boolean hasProperty(Resource subj, Resource prp) {
		return model.getProperty(subj, prp) != null;
	}

	public Resource getObject(Resource subj, Resource prp) {
		return (subj.hasProperty(prp) ? subj.getProperty(prp).getObject() : null);
	}

	public Resource getObjectResource(Resource subj, Resource prp) {
		Resource object = getObject(subj, prp);

		return (object != null ? object.asResource() : null);
	}

	public Literal getObjectLiteral(Resource subj, Resource prp) {
		Resource object = getObject(subj, prp);

		return (object != null ? object.asLiteral() : null);
	}

	public Integer getObjectInt(Resource subj, Resource prp) {
		return (Integer) getObjectPrimitive(subj, prp, l -> l.getInt());
	}

	public Double getObjectDouble(Resource subj, Resource prp) {
		return (Double) getObjectPrimitive(subj, prp, l -> l.getDouble());
	}

	public Boolean getObjectBool(Resource subj, Resource prp) {
		return (Boolean) getObjectPrimitive(subj, prp, l -> l.getBoolean());
	}

	public Object getObjectPrimitive(Resource subj, Resource prp, Function<Literal, Object> fn) {
		Literal l = getObjectLiteral(subj, prp);
		if (l != null)
			return fn.apply(l);
		else
			return null;
	}

	public void setObjectInt(Resource subj, Resource prp, int value) {
		if (hasProperty(subj, prp))
			model.getProperty(subj, prp).changeLiteralObject(value);
		else
			model.add(subj, prp, model.createTypedLiteral(value));
	}

	public LocalDate getObjectDate(Resource subj, Resource prp) {
		return toDate((XSDDateTime) getObject(subj, prp).asLiteral().getValue());
	}

	public List<Resource> collectObjects(Resource subj, Resource... path) {
		List<Resource> objs = new ArrayList<>();
		getObjects(subj, path, 0, objs);

		return objs;
	}

	public void printAll() {
		model.write(System.out);
	}

	public void printDerivations() {
		model.getDeductionsModel().write(System.out);

//		Log.i("");
//
//		StmtIterator stmtIt = model.getDeductionsModel().listStatements();
//		boolean found = stmtIt.hasNext();
//
//		while (stmtIt.hasNext()) {
//			Log.i("derivation:");
//			Log.i(stmtIt.next() + "\n");
//		}
//
//		if (!found)
//			Log.i("derivations: none\n");
	}

	public String toString(String lang) {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		model.write(out, lang);

		return new String(out.toByteArray());
	}

	public void close() {
		model.close();
	}

	private void getObjects(Resource subj, Resource[] path, int idx, List<Resource> collect) {
		StmtIterator it = subj.listProperties(path[idx]);

		while (it.hasNext()) {
			Resource obj = it.next().getObject();
			if (idx == path.length - 1)
				collect.add(obj);
			else
				getObjects(obj.asResource(), path, idx + 1, collect);
		}
	}

	private Calendar toCal(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);

		return cal;
	}

//	private LocalDate toDate(String str) {
//		DateTimeFormatter formatter = DateTimeFormatter.ISO_INSTANT;
//		return LocalDate.parse(str, formatter);
//	}

	private LocalDate toDate(XSDDateTime dateTime) {
		Calendar cal = dateTime.asCalendar();

		return LocalDateTime.ofInstant(cal.toInstant(), cal.getTimeZone().toZoneId()).toLocalDate();
	}
}
