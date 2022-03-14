package wvw.glean.workflow;

import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.stream.Collectors;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.jen3.graph.NodeFactory;
import org.apache.jen3.n3.N3ModelSpec;
import org.apache.jen3.n3.N3ModelSpec.Types;
import org.apache.jen3.rdf.model.Collection;
import org.apache.jen3.rdf.model.Resource;
import org.apache.jen3.rdf.model.Statement;
import org.apache.jen3.rdf.model.StmtIterator;
import org.apache.jen3.reasoner.InfGraph;
import org.apache.jen3.reasoner.rulesys.builtins.n3.log.Skolem;
import org.apache.jen3.util.iterator.ExtendedIterator;
import org.apache.jen3.vocabulary.RDFS;
import org.apache.log4j.Logger;

import wvw.semweb.kb.jena.JenaKb;
import wvw.semweb.kb.jena.NS;
import wvw.utils.log.Log;
import wvw.utils.map.HashMultiMap;
import wvw.utils.map.MultiMap;

public abstract class WorkflowModel {

	public enum LoadOptions {
		RECURSIVELY
	}

	public enum InitOptions {
		DO_TRANSIT, LOAD_GEN, LOGGING
	}

	protected enum ResetCmds {
		ALL, STOP, ONLY_STATES;
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
		resolveReferences(kb, new ArrayList<>());
	}

	protected void resolveReferences(JenaKb kb, List<String> sources) {
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

					if (sources.contains(srcStr))
						continue;
					else
						sources.add(srcStr);

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

	public List<EntityState> transitAll() {
		return transitAll(null);
	}

	public abstract List<EntityState> transitAll(Resource workflow);

	public void printAllTransits() {
		printAllTransits((Resource) null, false);
	}

	public void printAllTransits(boolean groupPerState) {
		printAllTransits((Resource) null, groupPerState);
	}

	public void printAllTransits(Resource workflow) {
		printAllTransits(workflow, false);
	}

	public void printAllTransits(Resource workflow, boolean groupPerState) {
		List<EntityState> states = transitAll(workflow);

		printAllTransits(states, groupPerState);
	}

	protected void printAllTransits(List<EntityState> states, boolean groupPerState) {
		if (groupPerState) {
			MultiMap<String, EntityState> map = new HashMultiMap<>();
			states.stream()
					.forEach(state -> map.putValue(state.getAtomicState().getLocalName(), state));

			Iterator<Entry<String, List<EntityState>>> it = map.entrySet().iterator();
			while (it.hasNext()) {
				Entry<String, List<EntityState>> e = it.next();

				System.out.println(e.getKey() + ":");
				e.getValue().forEach(state -> System.out.println(state));

				System.out.println();
			}

		} else
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
		// removes all "raw" statements that pertain to input and associated
		// derivations (i.e., conditionMet) for the task and its successors;
		// as well as its associated states

		// in case no prior input data was given for this task,
		// no need to reset (couldn't have influenced following tasks)

		if (!task.hasProperty(kb.resource("gl:hasInputData"))) {
			Log.i("no need to reset: " + task);
			return;
		}

//		Log.i("start resetting");

		resetRecursively(task);

//		Log.i("done resetting");
	}

	private void resetRecursively(Resource task) {
		List<Statement> toRemove = new ArrayList<>();
		List<Statement> toAdd = new ArrayList<>();

		propagateThroughWorkflow(task, new BiFunction<Resource, ResetCmds, ResetCmds>() {

			private Set<Resource> set = new HashSet<>();

			@Override
			public ResetCmds apply(Resource t, ResetCmds curCmd) {
				if (set.contains(t))
					return ResetCmds.STOP;

				set.add(t);

				Log.i("reset: " + t + " ? " + curCmd);

				switch (curCmd) {

				case ALL:
					getResetInputsAndConditions(t, toRemove);

					// fallthrough! :-)
				case ONLY_STATES:
					getResetStates(t, toRemove, toAdd);
					break;

				default:
					break;
				}

				// - assumes that influence of decision task doesn't extend beyond the next
				// decision task (else, all following conditions & states also need to be reset)

				// TODO this assumption turns out to be wrong in our CKD use case
				
				// - reset *states* for discarded branches (these propagate throughout the
				// following workflow)

				// (re simply checking for inactive tasks: just because a task is inactive,
				// doesn't mean it doesn't have any input; or any of its (disjunctive)
				// conditions aren't met (simply means not (all) its conditions have been met))

//				if (t.hasProperty(RDF.type, kb.resource("gl:DecisionTask"))
//						&& !t.hasProperty(kb.resource("gl:hasInputData"))) {
//
//					if (t.hasProperty(kb.resource("state:in"), kb.resource("gl:Discarded")))
//						return ResetCmds.ONLY_STATES;
//					else {
//						// also reset the states of its (possibly readied) branches
//						t.listProperties(kb.resource("gl:decisionBranch"))
//								.forEachRemaining(stmt -> {
//									Resource b = stmt.getObject();
//									getResetStates(b, toRemove, toAdd);
//								});
//
//						return ResetCmds.STOP;
//					}
//				}

				return ResetCmds.ALL;
			}
		});

		startBulkTransit();

		toRemove.forEach(stmt -> kb.removeQuietly(stmt));
		toAdd.forEach(stmt -> kb.addQuietly(stmt));

//		kb.printAll();

		endBulkTransit();
	}

	private void propagateThroughWorkflow(Resource task,
			BiFunction<Resource, ResetCmds, ResetCmds> op) {

		propagateThroughWorkflow(task, op, ResetCmds.ALL, true, false);
	}

	private void propagateThroughWorkflow(Resource task,
			BiFunction<Resource, ResetCmds, ResetCmds> op, ResetCmds curCmd, boolean first,
			boolean isSuper) {

		ResetCmds newCmd = op.apply(task, curCmd);
		if (newCmd == ResetCmds.STOP)
			return;

		ExtendedIterator<Statement> it = task.listProperties(kb.resource("gl:next"));
		while (it.hasNext()) {
			Statement stmt = it.next();
			Resource task2 = stmt.getObject();

			Log.i("next: " + task + " - " + task2);
			propagateThroughWorkflow(task2, op, newCmd, false, false);
		}

		if (!isSuper) {
			it = it.andThen(task.listProperties(kb.resource("gl:subTask")));
			while (it.hasNext()) {
				Statement stmt = it.next();
				Resource task2 = stmt.getObject();

				// first task of the (sub)workflow
				if (!kb.contains(null, kb.resource("gl:next"), task2)) {
					Log.i("first-sub: " + task + " - " + task2);
					propagateThroughWorkflow(task2, op, newCmd, false, false);
				}
			}
		}

		// for first-task & super-tasks, propagate *up* through workflow
		if (first || isSuper) {
			StmtIterator superTasks = kb.list(null, kb.resource("gl:subTask"), task);

			while (superTasks.hasNext()) {
				Statement stmt0 = superTasks.next();
				Resource superTask = stmt0.getSubject();

				Log.i("super: " + task + " - " + superTask);
				propagateThroughWorkflow(superTask, op, newCmd, false, true);
			}
		}
	}

	private void getResetInputsAndConditions(Resource task, List<Statement> toRemove) {
		List<Statement> inputs = getInputs(task);
		toRemove.addAll(inputs);

		getResetTaskCondition(task, toRemove);
	}

	private void getResetTaskCondition(Resource task, List<Statement> toRemove) {
		kb.list(task, condInfPrp, null).forEachRemaining(stmt -> toRemove.add(stmt));

		kb.list(task, condPrp, null).forEachRemaining(condStmt -> {
			Resource cond = condStmt.getObject();

			getResetConditionOperand(cond, toRemove);
		});
	}

	private void getResetConditionOperand(Resource cond, List<Statement> toRemove) {
		kb.list(cond, condInfPrp, null).forEachRemaining(stmt -> toRemove.add(stmt));

		Resource skolem = kb.toResource(Skolem.gen(cond.asNode()));
		kb.list(skolem, condInfPrp, null).forEachRemaining(stmt -> toRemove.add(stmt));

		kb.list(cond, kb.property("cond:allOf"), null)
				.andThen(kb.list(cond, kb.property("cond:anyOf"), null)).forEachRemaining(stmt -> {
					Collection coll = stmt.getObject().asCollection();

					coll.getElements()
							.forEachRemaining(el -> getResetConditionOperand(el, toRemove));
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

	private void getResetStates(Resource task, List<Statement> toRemove, List<Statement> toAdd) {
		Resource target = null;
		if (task.hasProperty(kb.resource("gl:root"), kb.literal(true)))
			target = kb.resource("gl:Active");
		else
			target = kb.resource("gl:Inactive");

		List<Statement> stmts2 = kb.list(task, statePrp, null).toList();
		toRemove.addAll(stmts2);

		toAdd.add(kb.getModel().createStatement(task, statePrp, target));
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

	protected String findEntityLabel(Resource entity, JenaKb kb) {
		if (entity.isURI())
			return entity.getLocalName();
		else {
			Statement condStmt = entity.getProperty(kb.resource("gl:precondition"));
			if (condStmt.getObject().equals(kb.resource("gl:Other")))
				return "OTHER";
			else {
				Statement labelStmt = condStmt.getObject().getProperty(RDFS.label);
				if (labelStmt != null)
					return "\"" + labelStmt.getObject().asLiteral().getString() + "\"";
				else
					return entity.toString();
			}
		}
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

	public class EntityState {

		private Resource entity;
		private Resource atomicState;
		private List<Resource> compoundStates;

		private String label;

		public EntityState(Resource entity, Resource atomicState, List<Resource> compoundStates,
				JenaKb kb) {

			this.entity = entity;
			this.atomicState = atomicState;
			this.compoundStates = compoundStates;

			label = findEntityLabel(entity, kb);
		}

		public Resource getEntity() {
			return entity;
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

		public String getLabel() {
			return label;
		}

		@Override
		public String toString() {
			return label + " is " + (atomicState != null ? atomicState.getLocalName() : "unknown")
					+ " (" + compoundStates.stream().map(c -> c.getLocalName())
							.collect(Collectors.joining(", "))
					+ ")";
		}
	}
}
