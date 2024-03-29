package wvw.glean.workflow;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.jen3.datatypes.xsd.XSDDateTime;
import org.apache.jen3.n3.N3ModelSpec;
import org.apache.jen3.rdf.model.Resource;
import org.apache.jen3.rdf.model.Statement;
import org.apache.jen3.rdf.model.StmtIterator;
import org.apache.jen3.vocabulary.RDF;

import wvw.utils.log.Log;
import wvw.utils.map.MultiMap;
import wvw.utils.map.TreeMultiMap;

public class WorkflowModel_Auto extends WorkflowModel {

	public static String logicFolder = root + WorkflowLogic.logicFolder;
	public static String conditionFolder = root + WorkflowLogic.conditionFolder;
	public static String workflowFolder = root + WorkflowLogic.workflowFolder;
	public static String genFolder = root + WorkflowLogic.genFolder;
	public static String ontologyPath = root + WorkflowLogic.ontologyPath;

	public WorkflowModel_Auto() {
		super();
	}

	public WorkflowModel_Auto(N3ModelSpec spec) {
		super(spec);
	}

	public WorkflowModel_Auto(String refFolder) {
		super(refFolder);
	}

	public static String pregenCodePath(ReasonTypes reasonType, InitOptions... initOptions) {
		return pregenCodePath(workflowFolder, reasonType, initOptions);
	}

	public static String pregenCodePath(String folder, ReasonTypes reasonType,
			InitOptions... initOptions) {

		boolean log = ArrayUtils.contains(initOptions, InitOptions.LOGGING);

		return folder + "pregen/" + reasonType.toString().toLowerCase() + "_"
				+ (log ? "log" : "nolog") + ".n3";
	}

	private static String generatorCodePath(ReasonTypes reasonType, InitOptions... initOptions) {
		boolean log = ArrayUtils.contains(initOptions, InitOptions.LOGGING);

		return genFolder + reasonType.toString().toLowerCase() + "/" + "state"
				+ (log ? "_log.n3" : "_nolog.n3");
	}

	@Override
	public WorkflowModel initialize(ReasonTypes reasonType, InitOptions... initOptions)
			throws WorkflowException {

		try {
			long start = System.currentTimeMillis();

			kb.fromClsRes(getClass(), base, ontologyPath);
			for (InputStream ontology : addOntologies)
				kb.from(base, ontology);

			if (ArrayUtils.contains(initOptions, InitOptions.DO_TRANSIT)) {

				if (ArrayUtils.contains(initOptions, InitOptions.LOAD_GEN)) {
					String pregenPath = pregenCodePath(workflowFolder, reasonType, initOptions);
					kb.fromClsRes(getClass(), base, pregenPath);

					LOG.warn("(loading pre-generated file: " + pregenPath + ")");
				}

				// re-generate linear-logic rules each time
				else {
					// @formatter:off
					kb.fromClsRes(getClass(), base, 
						root + "logic/owl2rl.n3",
						conditionFolder + "condition.n3",
						workflowFolder + "next.n3",
						workflowFolder + "condition.n3",
						workflowFolder + "composite.n3",
						workflowFolder + "decision.n3"
//						workflowFolder + "split.n3",
//						workflowFolder + "cycle.n3"
					);
					// @formatter:on

					String generatorPath = generatorCodePath(reasonType, initOptions);
					kb.fromClsRes(getClass(), base, generatorPath);
				}

			} else
				kb.fromClsRes(getClass(), base, logicFolder + "owl2rl.n3");

			long end = System.currentTimeMillis();

			LOG.warn("intialize workflow: " + (end - start) + "ms (options: " + reasonType + ", "
					+ Arrays.toString(initOptions) + ")");

		} catch (Exception e) {
			throw new WorkflowException(e);
		}

		return this;
	}

	// TODO only return tasks with *changed* states ..
	// (will require keeping a map in this class; or keeping timestamp before adding
	// data, and checking transit logs for younger transits)

	@Override
	public List<EntityState> transitAll(Resource workflow) {
		// so tasks are neatly ordered by their URI
		Map<Resource, EntityState> states = new TreeMap<>();

		StmtIterator stmts = null;
		if (workflow != null) {
			transit(workflow, states);
			stmts = kb.list(workflow, kb.resource("gl:subTask"), null);

		} else
			stmts = kb.list(null, RDF.type, kb.resource("gl:Task"));

		while (stmts.hasNext()) {
			Statement stmt = stmts.next();

			Resource task = (workflow == null ? stmt.getSubject() : stmt.getObject());
			transit(task, states);

			// comment this out if branches should not be included
			StmtIterator stmts2 = kb.list(task, kb.resource("gl:decisionBranch"), null);
			while (stmts2.hasNext()) {
				Statement stmt2 = stmts2.next();
				transit(stmt2.getObject(), states);
			}
		}

		return new ArrayList<>(states.values());
	}

	private void transit(Resource entity, Map<Resource, EntityState> states) {
		List<Resource> atom = new ArrayList<>();
		List<Resource> compound = new ArrayList<>();

		StmtIterator stmts2 = kb.list(entity, statePrp, null);
		while (stmts2.hasNext()) {
			Statement stmt2 = stmts2.next();

			Resource state = stmt2.getObject();
			if (state.hasProperty(RDF.type, kb.resource("state:AtomicState")))
				atom.add(state);
			else
				compound.add(state);
		}

		states.put(entity,
				new EntityState(entity, (!atom.isEmpty() ? atom.get(0) : null), compound, kb));
	}

	@Override
	public void printAllTransits(List<EntityState> states, boolean groupPerState) {
		// involves printing current states & transit logs

		Log.i("- current states:");
		super.printAllTransits(states, groupPerState);

		Log.i("\n- transit log:");
		MultiMap<Calendar, String> logs = new TreeMultiMap<>();

		StmtIterator stmts = kb.list(null, RDF.type, kb.resource("state:Log"));
		while (stmts.hasNext()) {
			Statement stmt = stmts.next();
			Resource log = stmt.getSubject();

			Resource targetRes = log.getPropertyResourceValue(kb.resource("state:target"));
			String target = findEntityLabel(targetRes, kb);

			String from = log.getPropertyResourceValue(kb.resource("state:from")).getLocalName();
			String to = log.getPropertyResourceValue(kb.resource("state:to")).getLocalName();

			Resource reasonRes = log.getPropertyResourceValue(kb.resource("state:reason"));
			if (reasonRes == null) {
				LOG.error("found transition log without reason for '" + target + "'");
				continue;
			}

			String reason = reasonRes.getLocalName();

			XSDDateTime time = (XSDDateTime) log.getProperty(kb.resource("state:time")).getObject()
					.asLiteral().getValue();
			String str = target + ": " + from + " -> " + to + " ? " + reason + " @ " + time;

			logs.putValue(time.asCalendar(), str);
		}

		for (List<String> concurrLog : logs.values())
			concurrLog.stream().forEach(log -> Log.i(log));

		stmts = kb.list(null, curItPrp, null);
		if (stmts.hasNext()) {
			Log.i("\n- iterations:");

			while (stmts.hasNext()) {
				Statement stmt = stmts.next();

				Log.i(stmt.getSubject().getLocalName() + ": "
						+ stmt.getObject().asLiteral().getValue());
			}
		}

		stmts = kb.list(null, kb.resource("gl:warning"), null);
		if (stmts.hasNext()) {
			Log.i("\n- warnings:");

			while (stmts.hasNext()) {
				Statement stmt = stmts.next();
				String warning = (String) stmt.getObject().asLiteral().getValue();

				Log.i(warning);
			}
		}

		Log.i("\n");
	}

	@Override
	public boolean transitTo(Resource task, Resource newState) {
		List<Statement> stmts2 = kb.list(task, statePrp, null).toList();
		for (Statement stmt2 : stmts2) {
//			Log.i("removing: " + stmt2);
			// don't want to trigger a rebind
			kb.removeQuietly(stmt2);
		}

//		Log.i("adding: " + task + " " + statePrp + " " + newState);

		if (bulkTransit)
			kb.addQuietly(task, statePrp, newState);
		else
			kb.add(task, statePrp, newState);

		return true;
	}
}
