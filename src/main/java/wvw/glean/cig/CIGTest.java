package wvw.glean.cig;

import wvw.glean.workflow.WorkflowModel.InitOptions;
import wvw.glean.workflow.WorkflowModel.LoadOptions;
import wvw.semweb.kb.jena.NS;

public class CIGTest {

	private static String cigPath = "cig/lipid/ckd_dyslipidemia.n3";
//	private static String cigPath = "cig/lipid/evaluate_lipid_profile.n3";

	public static void main(String[] args) throws Exception {
		CIGModel cig = (CIGModel) new CIGModel(NS.ckd)
				.initialize(InitOptions.DO_TRANSIT, InitOptions.LOGGING)
				.load(CIGModel.class, cigPath, LoadOptions.RECURSIVELY);

		cig.transitAll("Dyslipidemia_CKD");
//		cig.transitAll("Evaluate_Lipid_Profile");

		followupLipidProfileCase(cig);
//		evaluateLipidProfileCase(cig);
	}

	public static void followupLipidProfileCase(CIGModel cig) throws Exception {
		// > Follow-up Lipid Profile

		// prior_lipid_profile
		cig.loadString(" @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n" + "\n"
				+ "ns:df_0_0 <http://hl7.org/fhir/Observation.code> ns:code_lipid_profile;\n"
				+ "    <http://hl7.org/fhir/Observation.valueBoolean> true.");
//
//		// assess_suspect_sec_cause
//		cig.loadString("@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
//				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
//				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n" + "\n"
//				+ "ns:df_1_0 <http://hl7.org/fhir/Observation.code> ns:code_sec_cause;\n"
//				+ "    <http://hl7.org/fhir/Observation.valueBoolean> false.");
//
//		// assess_current_treatment
//		cig.loadString("@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
//				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
//				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n"
//				+ "ns:df_2_0 <http://hl7.org/fhir/Observation.code> ns:code_patient_on_statins;\n"
//				+ "    <http://hl7.org/fhir/Observation.valueBoolean> false.");
//
//		// reassess_10_year_cv_risk
//		cig.loadString("@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
//				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
//				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n"
//				+ "ns:df_3_0 <http://hl7.org/fhir/Observation.code> ns:code_10_year_cv_risk;\n"
//				+ "    <http://hl7.org/fhir/Observation.valueBoolean> true.");

		cig.printAllTransits(true);

//		cig.getKb().printAll();
//		cig.getKb().printDerivations();
	}

	public static void evaluateLipidProfileCase(CIGModel cig) throws Exception {
		System.out.println("START");
		
		// > Evaluate Lipid Profile

		// prior_lipid_profile
		cig.loadString(" @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n" + "\n"
				+ "ns:df_0_0 <http://hl7.org/fhir/Observation.code> ns:code_lipid_profile;\n"
				+ "    <http://hl7.org/fhir/Observation.valueBoolean> true.");

		// measure_lipid_profile
		cig.loadString(" @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n" + "\n"
				+ "ns:df_1_0 <http://hl7.org/fhir/Observation.code> ns:code_abnormal_lipid_profile;\n"
				+ "    <http://hl7.org/fhir/Observation.valueBoolean> true.");

//		// rule_out_secondary_causes
		cig.loadString(" @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n"
				+ "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.\n"
				+ "@prefix ns: <http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#>.\n" + "\n"
				+ "ns:df_1_0 <http://hl7.org/fhir/Observation.code> ns:code_no_secondary_causes;\n"
				+ "    <http://hl7.org/fhir/Observation.valueBoolean> true.");
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

		cig.printAllTransits(true);

//		cig.getKb().printAll();
//		cig.getKb().printDerivations();
	}
}
