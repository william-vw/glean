package wvw.glean.cig;

import java.util.List;

import org.apache.jen3.n3.N3ModelSpec;
import org.apache.jen3.n3.N3ModelSpec.Types;
import org.apache.jen3.reasoner.rulesys.N3FBRuleInfGraph;

import wvw.glean.workflow.WorkflowModel.EntityState;
import wvw.glean.workflow.WorkflowModel.InitOptions;
import wvw.glean.workflow.WorkflowModel.LoadOptions;
import wvw.glean.workflow.WorkflowModel.ReasonTypes;
import wvw.utils.log.Log;
import wvw.utils.rdf.NS;

public class CIGTest {

//	private static N3ModelSpec spec = N3ModelSpec.get(Types.N3_MEM_FP_INF);
//	private static ReasonTypes reason = ReasonTypes.FORWARD;

	private static N3ModelSpec spec = N3ModelSpec.get(Types.N3_MEM_HYBRID_INF);
	private static ReasonTypes reason = ReasonTypes.HYBRID;

//	private static String cigNs = NS.ckd;
//	private static String cigPath = "cig/lipid/evaluate_lipid_profile-simple.n3";
//	private static String workflow = "Evaluate_Lipid_Profile";

	private static String cigNs = NS.ckd;
	private static String cigPath = "cig/lipid/ckd_dyslipidemia.n3";
	private static String workflow = "Dyslipidemia_CKD";

//	private static String cigNs = NS.rbc;
//	private static String cigPath = "cig/btsf/rbc_match.n3";
//	private static String workflow = "RBC_Match";

	public static void main(String[] args) throws Exception {
		long start = System.currentTimeMillis();

		CIGModel cig = (CIGModel) new CIGModel(cigNs, spec)
				.initialize(reason, InitOptions.DO_TRANSIT, InitOptions.LOAD_GEN) // InitOptions.LOGGING)
				.load(CIGModel.class, cigPath, LoadOptions.RECURSIVELY);

		cig.transitAll(workflow);

//		List<EntityState> states = evaluateLipidProfile(cig);

		List<EntityState> states = followupLipidProfileCase(cig);

//		List<EntityState> states = rbcMatchCase1(cig);

		long end = System.currentTimeMillis();

		cig.printAllTransits(states, true);

		Log.i("\ntime: " + (end - start));

//		Log.i("# new graphs: " + BindingStack.nrNewGraphs);
//		Log.i("# new colls: " + BindingStack.nrNewColls);
		Log.i("# ctu calls: " + N3FBRuleInfGraph.ctuCnt);
	}

	public static List<EntityState> evaluateLipidProfile(CIGModel cig) throws Exception {
		System.out.println("START");

		// > Evaluate Lipid Profile

		// measure_lipid_profile
		cig.loadString(" @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n" + "\n"
				+ "ns:df_1_0 <http://hl7.org/fhir/Observation.code> ns:code_abnormal_lipid_profile;\n"
				+ "    <http://hl7.org/fhir/Observation.valueBoolean> true.");

//		// rule_out_secondary_causes
//		cig.loadString(" @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
//				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
//				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n" + "\n"
//				+ "ns:df_2_0 <http://hl7.org/fhir/Observation.code> ns:code_no_secondary_causes;\n"
//				+ "    <http://hl7.org/fhir/Observation.valueBoolean> true.");
//
//		// evaluate_severity_dyslipidemia
//		cig.loadString("@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
//				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
//				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n" + "\n"
//				+ "ns:df_9_2 <http://hl7.org/fhir/Observation.code> ns:code_fasting_triglycerides;\n"
//				+ "    <http://hl7.org/fhir/Observation.valueQuantity> ns:df_9_3.\n"
//				+ "ns:df_9_3 <http://hl7.org/fhir/Quantity.system> <http://unitsofmeasure.org>;\n"
//				+ "    <http://hl7.org/fhir/Quantity.code> \"mmol/L\";\n"
//				+ "    <http://hl7.org/fhir/Quantity.value> 8.1.\n"
//				+ "ns:df_9_0 <http://hl7.org/fhir/Observation.code> ns:code_ldl_cholesterol;\n"
//				+ "    <http://hl7.org/fhir/Observation.valueQuantity> ns:df_9_1.\n"
//				+ "ns:df_9_1 <http://hl7.org/fhir/Quantity.system> <http://unitsofmeasure.org>;\n"
//				+ "    <http://hl7.org/fhir/Quantity.code> \"mmol/L\";\n"
//				+ "    <http://hl7.org/fhir/Quantity.value> \"3.2\"^^xsd:double.\n");

//		cig.printAllTransits(true);

//		cig.getKb().printAll();
//		cig.getKb().printDerivations();

		return cig.transitAll();
	}

	public static List<EntityState> followupLipidProfileCase(CIGModel cig) throws Exception {
		// > Follow-up Lipid Profile

		// prior_lipid_profile
		cig.loadString(" @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n" + "\n"
				+ "ns:df_0_0 <http://hl7.org/fhir/Observation.code> ns:code_lipid_profile;\n"
				+ "    <http://hl7.org/fhir/Observation.valueBoolean> true.");

		cig.loadString("@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n" + "\n"
				+ "ns:df_1_0 <http://hl7.org/fhir/Observation.code> ns:code_age;\n"
				+ "    	<http://hl7.org/fhir/Observation.valueQuantity> ns:df_1_1 ."
				+ "ns:df_1_1 <http://hl7.org/fhir/Quantity.value> 19 .");

		cig.loadString("@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
				+ "@prefix fhir: <http://hl7.org/fhir/>.\n"
				+ "@prefix gl: <http://niche.cs.dal.ca/ns/glean/base.owl#>.\n"
				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n\n"
				+ "_:df_2_0 <http://hl7.org/fhir/Observation.code> ns:code_kidney_transplant;\n"
				+ "    <http://hl7.org/fhir/Observation.valueBoolean> true.\n"
				+ "ns:assess_kidney_transplant-2 gl:hasInputData _:df_2_0.\n");

		return cig.transitAll();

//		cig.printAllTransits(true);

//		cig.getKb().printAll();
//		cig.getKb().printDerivations();
	}

	public static List<EntityState> rbcMatchCase1(CIGModel cig) throws Exception {
		cig.loadString("@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
				+ "@prefix fhir: <http://hl7.org/fhir/>.\n"
				+ "@prefix gl: <http://niche.cs.dal.ca/ns/glean/base.owl#>.\n"
				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/rbc_match.owl#>.\n"
				+ "_:df_0_0 <http://hl7.org/fhir/Observation.code> ns:code_routine_match;\n"
				+ "    <http://hl7.org/fhir/Observation.valueBoolean> true.\n"
				+ "ns:check_routine_match gl:hasInputData _:df_0_0.");

		cig.loadString("@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
				+ "@prefix fhir: <http://hl7.org/fhir/>.\n"
				+ "@prefix gl: <http://niche.cs.dal.ca/ns/glean/base.owl#>.\n"
				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/rbc_match.owl#>.\n" + "\n"
				+ "_:df_2_0 <http://hl7.org/fhir/Observation.code> ns:code_irr_blood ;\n"
				+ "    <http://hl7.org/fhir/Observation.valueBoolean> false.\n"
				+ "ns:check_need_irr_blood gl:hasInputData _:df_2_0.");

		cig.loadString("@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
				+ "@prefix fhir: <http://hl7.org/fhir/>.\n"
				+ "@prefix gl: <http://niche.cs.dal.ca/ns/glean/base.owl#>.\n"
				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/rbc_match.owl#>.\n" + "\n"
				+ "_:df_4_1 <http://hl7.org/fhir/Observation.code> ns:code_female;\n"
//				+ "_:df_4_1 <http://hl7.org/fhir/Observation.code> ns:code_male;\n"
				+ "    <http://hl7.org/fhir/Observation.valueBoolean> true.\n"
				+ "_:df_4_2 <http://hl7.org/fhir/Observation.code> ns:code_age;\n"
				+ "    <http://hl7.org/fhir/Observation.valueQuantity> _:df_4_3.\n"
				+ "_:df_4_3 <http://hl7.org/fhir/Quantity.system> <http://unitsofmeasure.org>;\n"
				+ "    <http://hl7.org/fhir/Quantity.code> \"year\";\n"
//				+ "    <http://hl7.org/fhir/Quantity.value> 47.\n"
				+ "    <http://hl7.org/fhir/Quantity.value> 41.\n"
				+ "ns:check_female_childbearing_age gl:hasInputData _:df_4_1, _:df_4_2.");

		cig.loadString("@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
				+ "@prefix fhir: <http://hl7.org/fhir/>.\n"
				+ "@prefix gl: <http://niche.cs.dal.ca/ns/glean/base.owl#>.\n"
				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/rbc_match.owl#>.\n" + "\n"
				+ "_:df_5_0 <http://hl7.org/fhir/Observation.code> ns:code_kell_pos ;\n"
				+ "    <http://hl7.org/fhir/Observation.valueBoolean> true.\n"
				+ "ns:check_kell_status gl:hasInputData _:df_5_0.");

		return cig.transitAll();

//		cig.printAllTransits(true);

//		cig.getKb().printAll();
//		cig.getKb().printDerivations();
	}
}
