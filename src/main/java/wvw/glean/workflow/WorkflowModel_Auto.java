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
import org.apache.jen3.vocabulary.RDFS;

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

	public WorkflowModel_Auto(String base) {
		super(base);
	}

	public WorkflowModel_Auto(String base, N3ModelSpec spec) {
		super(base, spec);
	}

	@Override
	public WorkflowModel initialize(InitOptions... initOptions) throws WorkflowException {
		try {
			long start = System.currentTimeMillis();

			boolean log = ArrayUtils.contains(initOptions, InitOptions.LOGGING);

			kb.fromClsRes(getClass(), base, ontologyPath);
			for (InputStream ontology : addOntologies)
				kb.from(base, ontology);

			if (ArrayUtils.contains(initOptions, InitOptions.DO_TRANSIT)) {
				// @formatter:off
				if (ArrayUtils.contains(initOptions, InitOptions.LOAD_GEN)) {
					String genFile = workflowFolder + "gen" + (log ? "_log" : "_nolog") + ".n3";
					kb.fromClsRes(getClass(), base, genFile);
					
					LOG.info("(loading pre-generated file: " + genFile + ")");
				}
				
				// re-generate linear-logic rules each time
				else {
					kb.fromClsRes(getClass(), base, 
						root + "logic/owl2rl.n3",
						conditionFolder + "condition.n3",
						workflowFolder + "next.n3",
						workflowFolder + "condition.n3",
						workflowFolder + "composite.n3",
						workflowFolder + "decision.n3",
						workflowFolder + "split.n3",
						workflowFolder + "cycle.n3"
					);
					kb.fromClsRes(getClass(), base,
						genFolder + "state" + (log ? "_log.n3" : "_nolog.n3")
					);
				}
				// @formatter:on

			} else
				kb.fromClsRes(getClass(), base, logicFolder + "owl2rl.n3");

			long end = System.currentTimeMillis();

			LOG.info("intialize workflow: " + (end - start) + "ms (options: "
					+ Arrays.toString(initOptions) + ")");

		} catch (Exception e) {
			throw new WorkflowException(e);
		}

		return this;
	}

	// TODO only return tasks with *changed* states ..
	// (will require keeping a map in this class; or keeping timestamp before adding
	// data, and checking transit logs for younger transits).

	@Override
	public List<TaskState> transitAll(Resource workflow) {
		// so tasks are neatly ordered by their URI
		Map<Resource, TaskState> states = new TreeMap<>();

		// @formatter:off
		StmtIterator stmts = (workflow == null ? 
			kb.list(null, RDF.type, kb.resource("gl:Task")) :
			kb.list(workflow, kb.resource("gl:subTask"), null)
		);
		// @formatter:on

		while (stmts.hasNext()) {
			Statement stmt = stmts.next();
			// @formatter:off
			Resource task = (workflow == null ? 
				stmt.getSubject() : 
				stmt.getObject()
			);
			// @formatter:on

			List<Resource> atom = new ArrayList<>();
			List<Resource> compound = new ArrayList<>();

			StmtIterator stmts2 = kb.list(task, statePrp, null);
			while (stmts2.hasNext()) {
				Statement stmt2 = stmts2.next();

				Resource state = stmt2.getObject();
				if (state.hasProperty(RDF.type, kb.resource("state:AtomicState")))
					atom.add(state);

				else
					compound.add(state);
			}

			states.put(task, new TaskState(task, (!atom.isEmpty() ? atom.get(0) : null), compound));
		}

		return new ArrayList<>(states.values());
	}

	@Override
	public void printAllTransits(List<TaskState> states) {
		// involves printing current states & transit logs

		Log.i("- current states:");
		super.printAllTransits(states);

		Log.i("\n- transit log:");
		MultiMap<Calendar, String> logs = new TreeMultiMap<>();

		StmtIterator stmts = kb.list(null, RDF.type, kb.resource("state:Log"));
		while (stmts.hasNext()) {
			Statement stmt = stmts.next();
			Resource log = stmt.getSubject();

			Resource targetRes = log.getPropertyResourceValue(kb.resource("state:target"));
			String target = null;
			if (targetRes.isURI())
				target = targetRes.getLocalName();
			else {
				Statement condStmt = targetRes.getProperty(kb.resource("gl:precondition"));
				if (condStmt.getObject().equals(kb.resource("gl:Other")))
					target = "OTHER";
				else {
					Statement labelStmt = condStmt.getObject().getProperty(RDFS.label);
					if (labelStmt != null)
						target = "\"" + labelStmt.getObject().asLiteral().getString() + "\"";
					else
						target = targetRes.toString();
				}
			}

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
		for (Statement stmt2 : stmts2)
			// don't want to trigger a rebind
			kb.removeQuietly(stmt2);

		if (bulkTransit)
			kb.addQuietly(task, statePrp, newState);
		else
			kb.add(task, statePrp, newState);

		return true;
	}
}
