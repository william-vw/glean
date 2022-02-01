package wvw.glean.workflow;

import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.jen3.graph.NodeFactory;
import org.apache.jen3.n3.N3ModelSpec;
import org.apache.jen3.n3.N3ModelSpec.Types;
import org.apache.jen3.rdf.model.Collection;
import org.apache.jen3.rdf.model.Resource;
import org.apache.jen3.rdf.model.Statement;
import org.apache.jen3.reasoner.InfGraph;
import org.apache.jen3.reasoner.rulesys.builtins.n3.log.Skolem;
import org.apache.jen3.vocabulary.RDFS;
import org.apache.log4j.Logger;

import wvw.semweb.kb.jena.JenaKb;
import wvw.utils.log.Log;
import wvw.utils.rdf.NS;

public abstract class WorkflowModel {

	public enum LoadOptions {
		RECURSIVELY
	}

	public enum InitOptions {
		DO_TRANSIT, LOAD_GEN, LOGGING
	}

	protected final static Logger LOG = Logger.getLogger(WorkflowModel.class.getName());

	public static InitOptions[] transit = { InitOptions.DO_TRANSIT, InitOptions.LOAD_GEN };
	public static InitOptions[] transitTest = { InitOptions.DO_TRANSIT, InitOptions.LOGGING };

//	protected static String root = "src/main/resources/";
	protected static String root = "/";

	protected JenaKb kb;

	protected String base = NS.glean;
	protected String condInf = NS.cond + "conditionMet";
	
	protected Resource condInfPrp;
	protected Resource condPrp;
	protected Resource statePrp;
	protected Resource curItPrp;
	protected Resource totalArgScorePrp;

	protected static List<WorkflowUpdateListener> listeners = new ArrayList<>();

	protected List<InputStream> addOntologies = new ArrayList<>();

	public WorkflowModel() {
		this(NS.glean);
	}

	public WorkflowModel(String base) {
		this(base, N3ModelSpec.get(Types.N3_MEM_FP_INF));
	}

	public WorkflowModel(N3ModelSpec spec) {
		this(NS.glean, spec);
	}

	public WorkflowModel(String base, N3ModelSpec spec) {
		this.base = base;

		setup(spec);
	}

	private void setup(N3ModelSpec spec) {
		if (spec.isInf())
			spec.allowRederiveFor(NodeFactory.createURI(condInf));

		JenaKb kb = new JenaKb(spec);
		setupProperties(kb, kb.property("state:in"));
	}

	public WorkflowModel addOntology(InputStream ontology) {
		this.addOntologies.add(ontology);

		return this;
	}

	public abstract WorkflowModel initialize(InitOptions... initOptions) throws WorkflowException;

	public WorkflowModel load(String dataPath, LoadOptions... loadOptions) throws IOException {
		return load(base, dataPath, loadOptions);
	}

	public WorkflowModel load(String base, String dataPath, LoadOptions... loadOptions)
			throws IOException {

		if (ArrayUtils.contains(loadOptions, LoadOptions.RECURSIVELY)) {
			JenaKb kb2 = new JenaKb(N3ModelSpec.get(Types.N3_MEM));
			kb2.from(base, dataPath);

			if (ArrayUtils.contains(loadOptions, LoadOptions.RECURSIVELY))
				resolveReferences(kb2);

			kb.addAll(kb2.listAll());

		} else
			kb.from(base, dataPath);

		return this;
	}

	public WorkflowModel load(Class<?> cls, String dataPath, LoadOptions... loadOptions)
			throws IOException, URISyntaxException {

		return load(base, cls, dataPath, loadOptions);
	}

	public WorkflowModel load(String base, Class<?> cls, String dataPath,
			LoadOptions... loadOptions) throws IOException, URISyntaxException {

		if (ArrayUtils.contains(loadOptions, LoadOptions.RECURSIVELY)) {
			JenaKb kb2 = new JenaKb(N3ModelSpec.get(Types.N3_MEM));
			kb2.fromClsRes(cls, base, dataPath);

			if (ArrayUtils.contains(loadOptions, LoadOptions.RECURSIVELY))
				resolveReferences(kb2);

			kb.addAll(kb2.listAll());

		} else
			kb.fromClsRes(cls, base, dataPath);

		return this;
	}

	public WorkflowModel loadString(String rdf) {
		return loadString(base, rdf);
	}

	public WorkflowModel loadString(String base, String rdf) {
		kb.fromString(base, rdf);

		return this;
	}

	protected void resolveReferences(JenaKb kb) {
		boolean added = false;

		// support recursively resolving workflow references
		do {
			added = false;

//			List<Statement> stmts = kb.list(null, RDF.type, kb.resource("gl:Workflow")).toList();
			List<Statement> stmts = kb.list(null, kb.resource("gl:source"), null).toList();
			for (Statement stmt : stmts) {
				Resource wf = stmt.getSubject();

				if (!wf.hasProperty(kb.resource("gl:loaded"), kb.literal(true))
						&& wf.hasProperty(kb.resource("gl:source"))) {

					Resource src = wf.getPropertyResourceValue(kb.resource("gl:source"));
					String srcStr = src.asLiteral().getString();
					Log.i("(resolving: " + srcStr + ")");

					long start = System.currentTimeMillis();
					JenaKb kb2 = null;
					try {
						kb2 = new JenaKb(kb.getModel().getSpec()).fromClsRes(getClass(), base,
								srcStr);
						// let referencing model "override" default label
						if (kb.contains(wf, RDFS.label, null))
							kb2.remove(wf, RDFS.label, null);

						kb.addAll(kb2.listAll());
						kb.add(wf, kb.resource("gl:loaded"), true);

						added = true;

					} catch (Exception e) {
						e.printStackTrace();
					}
					long end = System.currentTimeMillis();
					Log.i("(time: " + (end - start) + "ms)");
				}
			}

		} while (added);
	}

	protected void setupProperties(JenaKb kb, Resource statePrp) {
		this.kb = kb;

		this.statePrp = statePrp;
		condInfPrp = kb.resourceFromUri(condInf);
		condPrp = kb.property("gl:condition");
		curItPrp = kb.property("gl:currentIteration");
		totalArgScorePrp = kb.property("gl:totalArgumentScore");
	}

	public JenaKb getKb() {
		return kb;
	}

	public static void register(WorkflowUpdateListener listener) {
		listeners.add(listener);
	}

	public static void unregister(WorkflowUpdateListener listener) {
		listeners.remove(listener);
	}

	public List<TaskState> transitAll() {
		return transitAll(null);
	}

	public abstract List<TaskState> transitAll(Resource workflow);

	public void printAllTransits() {
		printAllTransits((Resource) null);
	}

	public void printAllTransits(Resource workflow) {
		List<TaskState> states = transitAll(workflow);

		printAllTransits(states);
	}

	public void printAllTransits(List<TaskState> states) {
		states.forEach(state -> System.out.println(state));
	}

	public JenaKb getInputData(Resource task) {
		JenaKb ret = new JenaKb(N3ModelSpec.get(Types.N3_MEM));

		kb.list(task, kb.resource("gl:hasInputData"), null).forEachRemaining(stmt -> {
			ret.addAll(kb.findLinked(stmt.getObject(), (r) -> r.isAnon()));
			ret.add(stmt);
		});

		return ret;
	}

	protected boolean bulkTransit = false;

	public void startBulkTransit() {
		bulkTransit = true;
	}

	public void endBulkTransit() {
		bulkTransit = false;

		((InfGraph) kb.getModel().getGraph()).rebind(false);
	}

	public abstract boolean transitTo(Resource task, Resource newState);

	public void resetAll(Resource task) {
		// collects all tasks occurring *after* the given task
		Set<Resource> found = new HashSet<>();
		// removes all "raw" statements that pertain to input // and associated
		// derivations (i.e., conditionMet) that occur *after* the given task
		deleteInputsAndConditionsRecursively(task, found);

		startBulkTransit();
		resetStatesRecursively(task);
		endBulkTransit();
	}

	private void resetStatesRecursively(Resource task) {
//		LOG.info("resetting: " + task);

		Resource target = null;
		if (task.hasProperty(kb.resource("gl:root"), kb.literal(true)))
			target = kb.resource("gl:Active");
		else
			target = kb.resource("gl:Inactive");

		transitTo(task, target);

		task.listProperties(kb.resource("gl:subTask"))
				.andThen(task.listProperties(kb.resource("gl:next"))).forEachRemaining(stmt -> {
					Resource task2 = stmt.getObject();

					resetStatesRecursively(task2);
				});
	}

	public void deleteInputs(Resource task, boolean rederive) {
		List<Statement> toDelete = getInputs(task);

		if (!toDelete.isEmpty()) {
			startConditionUpdate();

			toDelete.forEach(stmt -> removeConditionPremise(stmt.getSubject(), stmt.getPredicate(),
					stmt.getObject()));

			endConditionUpdate(rederive);
		}
	}

	public void deleteInputsAndConditionsRecursively(Resource task, Set<Resource> met) {
		if (met.contains(task))
			return;

		met.add(task);

//		LOG.info("deleting inputs: " + task);

		// only interested in removing "raw" underlying data
		getInputs(task).forEach(
				stmt -> kb.removeRaw(stmt.getSubject(), stmt.getPredicate(), stmt.getObject()));

		// (does not re-derive them; assumption is that only the task's inputs determine
		// whether the task's condition is met; and we just deleted all those inputs)

		resetTaskCondition(task);

		task.listProperties(kb.resource("gl:subTask"))
				.andThen(task.listProperties(kb.resource("gl:next"))).forEachRemaining(stmt -> {
					Resource task2 = stmt.getObject();
					deleteInputsAndConditionsRecursively(task2, met);
				});
	}

	private void resetTaskCondition(Resource task) {
		kb.removeDeduction(task, condInfPrp, null);

		kb.list(task, condPrp, null).forEachRemaining(condStmt -> {
			Resource cond = condStmt.getObject();
			resetConditionOperand(cond);
		});
	}

	private void resetConditionOperand(Resource cond) {
		kb.removeDeduction(cond, condInfPrp, null);

		Resource skolem = kb.toResource(Skolem.gen(cond.asNode()));
		kb.removeDeduction(skolem, condInfPrp, null);

		kb.list(cond, kb.property("cond:allOf"), null)
				.andThen(kb.list(cond, kb.property("cond:anyOf"), null)).forEachRemaining(stmt -> {
					Collection coll = stmt.getObject().asCollection();

					coll.getElements().forEachRemaining(el -> {
						resetConditionOperand(el);
					});
				});
	}

	private List<Statement> getInputs(Resource task) {
		List<Statement> inputs = new ArrayList<>();
		kb.list(task, kb.resource("gl:hasInputData"), null).forEachRemaining(stmt -> {
			inputs.addAll(kb.findLinked(stmt.getObject(), (r) -> r.isAnon()));
			inputs.add(stmt);
		});

		return inputs;
	}

	public void removeQuietly(Statement stmt) {
		kb.removeQuietly(stmt.getSubject(), stmt.getPredicate(), stmt.getObject());
	}

	public void removeQuietly(Resource s, Resource p, Resource o) {
		kb.removeQuietly(s, p, o);
	}

	public void startConditionUpdate() {
		kb.startBulkUpdate();
	}

	public void removeConditionPremise(Resource s, Resource p, Resource o) {
		kb.removePremise(s, p, o, condInfPrp);
	}

	public void replaceConditionPremise(Resource s, Resource p, Resource o, Resource s2,
			Resource p2, Resource o2) {

		kb.replacePremise(s, p, o, s2, p2, o2, condInfPrp);
	}

	public void endConditionUpdate(boolean rederive) {
		kb.endBulkUpdate(rederive, condInfPrp);
	}

	public void close() {
		kb.close();
	}

	public interface WorkflowUpdateListener {

		public void workflowUpdated();
	}

	public static class WorkflowException extends Exception {

		private static final long serialVersionUID = 1L;

		public WorkflowException(Exception e) {
			super(e);
		}
	}

	public static class TaskState {

		private Resource task;
		private Resource atomicState;
		private List<Resource> compoundStates;

		public TaskState(Resource task, Resource atomicState, List<Resource> compoundStates) {
			this.task = task;
			this.atomicState = atomicState;
			this.compoundStates = compoundStates;
		}

		public Resource getTask() {
			return task;
		}

		public boolean hasAtomicState() {
			return atomicState != null;
		}

		public Resource getAtomicState() {
			return atomicState;
		}

		public List<Resource> getCompoundStates() {
			return compoundStates;
		}

		@Override
		public String toString() {
			return (task.isAnon() ? task : task.getLocalName()) + " is "
					+ (atomicState != null ? atomicState.getLocalName() : "unknown") + " ("
					+ compoundStates.stream().map(c -> c.getLocalName())
							.collect(Collectors.joining(", "))
					+ ")";
		}
	}
}
