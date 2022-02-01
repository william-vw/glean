package wvw.glean.workflow;

import java.io.FileInputStream;

import org.apache.jen3.n3.FeedbackActions;
import org.apache.jen3.n3.FeedbackTypes;
import org.apache.jen3.n3.N3Feedback;
import org.apache.jen3.n3.N3MistakeTypes;
import org.apache.jen3.n3.N3Model;
import org.apache.jen3.n3.N3ModelSpec;
import org.apache.jen3.n3.N3ModelSpec.Types;
import org.apache.jen3.rdf.model.ModelFactory;

import wvw.semweb.kb.jena.JenaKb;
import wvw.utils.log.Log;

public class WorkflowTest {

	private static String base = "http://niche.cs.dal.ca/ns/glean/base.owl#";

	private static String root = "src/main/resources/";
	private static String wfTestFolder = root + "test/workflow/";
	private static String condTestFolder = root + "test/condition/";

	public static void main(String[] args) throws Exception {
//		testCondition();
//		testRederive();

		N3ModelSpec spec = N3ModelSpec.get(Types.N3_MEM_FP_INF);
		spec.setFeedback(new N3Feedback(N3MistakeTypes.INFER_UNBOUND_GLOBALS, FeedbackTypes.WARN,
				FeedbackActions.LOG));
		spec.setFeedback(new N3Feedback(N3MistakeTypes.BUILTIN_WRONG_INPUT, FeedbackTypes.WARN,
				FeedbackActions.LOG));
		spec.setFeedback(new N3Feedback(N3MistakeTypes.BUILTIN_UNBOUND_VARS, FeedbackTypes.WARN,
				FeedbackActions.LOG));

//		test_next(spec);
//		test_composite(spec);
//		test_decision(spec);
//		test_split(spec);
		test_cycle(spec);
	}

	public static void testCondition() throws Exception {
		N3Model model = ModelFactory.createN3Model(N3ModelSpec.get(Types.N3_MEM_FP_INF));
		model.read(new FileInputStream(root + "logic/owl2rl.n3"), base);
		model.read(new FileInputStream(root + "logic/glean.owl"), base);
		model.read(new FileInputStream(root + "logic/condition/condition.n3"), base);

		model.read(new FileInputStream(condTestFolder + "test2.n3"), base);

//		model.write(System.out);
		model.getDeductionsModel().write(System.out);
	}

	public static void testRederive() throws Exception {
		WorkflowModel m = new WorkflowModel_Auto().initialize(WorkflowModel.transitTest);

		JenaKb kb = m.getKb();
		kb.from(base, root + "test/test_rederive.n3");

		kb.printDerivations();

		m.startConditionUpdate();

		Log.i("\n\n>> removing will's Sys BP");
		m.removeConditionPremise(kb.resource(base + "will"), kb.resource(base + "hasSysBP"), null);

		Log.i(">> replacing will's HR");
		m.replaceConditionPremise(kb.resource(base + "will"), kb.resource(base + "hasHR"), null,
				kb.resource(base + "will"), kb.resource(base + "hasHR"), kb.literal(145));

		m.endConditionUpdate(true);

		kb.printDerivations();
	}

	public static void test_next(N3ModelSpec spec) throws Exception {
		WorkflowModel m = new WorkflowModel_Auto(spec).initialize(WorkflowModel.transitTest)
				.load(wfTestFolder + "test_next.n3");

		JenaKb kb = m.getKb();

		m.printAllTransits();

		Log.i("\n>> adding profile that meets condition");
		kb.add(kb.resource(base + "will"), kb.resource(base + "hasHR"), 151);
		m.printAllTransits();

//		kb.printAll();
		kb.printDerivations();
	}

	public static void test_composite(N3ModelSpec spec) throws Exception {
		WorkflowModel m = new WorkflowModel_Auto(spec).initialize(WorkflowModel.transitTest)
				.load(wfTestFolder + "test_composite.n3");
		JenaKb kb = m.getKb();

		m.printAllTransits();

		Log.i("\n>> moving tC subtasks to completed");
		m.transitTo(kb.resource(base + "tC1"), kb.resource("gl:Completed"));
		m.transitTo(kb.resource(base + "tC2"), kb.resource("gl:Completed"));
		m.transitTo(kb.resource(base + "tC3"), kb.resource("gl:Completed"));
		m.printAllTransits();

		Log.i("\n>> moving tD to discarded");
		m.transitTo(kb.resource(base + "tD"), kb.resource("gl:Discarded"));
		m.printAllTransits();

		Log.i("\n>> moving tE subtasks to discarded");
		m.transitTo(kb.resource(base + "tE1"), kb.resource("gl:Discarded"));
		m.transitTo(kb.resource(base + "tE2"), kb.resource("gl:Discarded"));
		m.printAllTransits();

//		kb.printAll();
//		kb.printDerivations();
	}

	public static void test_decision(N3ModelSpec spec) throws Exception {
		WorkflowModel m = new WorkflowModel_Auto(spec).initialize(WorkflowModel.transitTest)
				.load(base, wfTestFolder + "test_decision.n3");
//		JenaKb kb = m.getKb();

		m.printAllTransits();

//		kb.printAll();
//		kb.printDerivations();
	}

	public static void test_split(N3ModelSpec spec) throws Exception {
		WorkflowModel m = new WorkflowModel_Auto(spec).initialize(WorkflowModel.transitTest)
				.load(base, wfTestFolder + "test_split.n3");
		JenaKb kb = m.getKb();

//		Log.i("\n>> moving tA to active");
		m.transitTo(kb.resource(base + "tA"), kb.resource("gl:Active"));
		m.printAllTransits();

		Log.i("\n>> moving tA1x branches to completed");
		m.transitTo(kb.resource(base + "tA11"), kb.resource("gl:Completed"));
		m.transitTo(kb.resource(base + "tA12"), kb.resource("gl:Completed"));
		m.printAllTransits();

		Log.i("\n>> moving tB1, tB2 branches to done");
		m.transitTo(kb.resource(base + "tB1"), kb.resource("gl:Completed"));
		m.transitTo(kb.resource(base + "tB2"), kb.resource("gl:Discarded"));
		m.printAllTransits();
//
		Log.i("\n>> moving tC1, tC2 branches to completed");
		m.transitTo(kb.resource(base + "tC1"), kb.resource("gl:Completed"));
		m.transitTo(kb.resource(base + "tC2"), kb.resource("gl:Completed"));
		m.printAllTransits();
//
		Log.i("\n>> moving tD1, tD2 branches to discarded");
		m.transitTo(kb.resource(base + "tD1"), kb.resource("gl:Discarded"));
		m.transitTo(kb.resource(base + "tD2"), kb.resource("gl:Discarded"));
		m.printAllTransits();
//
		Log.i("\n>> moving tE1, tE2 branches to discarded");
		m.transitTo(kb.resource(base + "tE1"), kb.resource("gl:Discarded"));
		m.transitTo(kb.resource(base + "tE2"), kb.resource("gl:Discarded"));
		m.printAllTransits();

//		kb.printAll();
//		kb.printDerivations();
	}

	public static void test_cycle(N3ModelSpec spec) throws Exception {
		long start = System.currentTimeMillis();

		WorkflowModel m = new WorkflowModel_Auto(spec).initialize(WorkflowModel.transitTest)
				.load(base, wfTestFolder + "test_cycle.n3");
		JenaKb kb = m.getKb();

		m.printAllTransits();

//		Log.i("\n>> moving tAx tasks to completed (iteration 1)");
//		m.transitTo(kb.resource(base + "tA1"), kb.resource("gl:Completed"));
//		m.transitTo(kb.resource(base + "tA2"), kb.resource("gl:Completed"));
//		m.printAllTransits();
//
//		Log.i("\n>> moving tAx tasks to completed (iteration 2)");
//
//		m.removeConditionPremise(kb.resource(base + "will"), kb.resource(base + "hasHR"), null);
//		m.transitTo(kb.resource(base + "tA1"), kb.resource("gl:Completed"));
//		m.transitTo(kb.resource(base + "tA2"), kb.resource("gl:Completed"));
//		m.printAllTransits();

		Log.i("\n>> moving tBx tasks to completed (iteration 1)");
		m.transitTo(kb.resource(base + "tB1"), kb.resource("gl:Completed"));
		m.transitTo(kb.resource(base + "tB2"), kb.resource("gl:Completed"));
		m.printAllTransits();

		Log.i("\n>> moving tBx tasks to completed (iteration 2)");
		m.transitTo(kb.resource(base + "tB1"), kb.resource("gl:Completed"));
		m.transitTo(kb.resource(base + "tB2"), kb.resource("gl:Completed"));
		m.printAllTransits();
//
		Log.i("\n>> moving tBx tasks to completed (iteration 3)");
		m.transitTo(kb.resource(base + "tB1"), kb.resource("gl:Completed"));
		m.transitTo(kb.resource(base + "tB2"), kb.resource("gl:Completed"));
		m.printAllTransits();

		long end = System.currentTimeMillis();

		System.out.println("time: " + (end - start));

//		kb.printAll();
//		kb.printDerivations();
	}
}
