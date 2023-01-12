export class Observation {
	constructor(Observationdotcode, ObservationdotvalueBoolean) {
		this.Observationdotcode = Observationdotcode;
		this.ObservationdotvalueBoolean = ObservationdotvalueBoolean;
	}

	Observationdotcode;
	ObservationdotvalueBoolean;
}

export class Code {
	static codeOralContraceptives = 'codeOralContraceptives';
	static codeCorticosteroids = 'codeCorticosteroids';
	static codeCyclosporine = 'codeCyclosporine';
	static codeExcessiveAlcoholConsumption = 'codeExcessiveAlcoholConsumption';
	static codeAndrogens = 'codeAndrogens';
	static codeHypothyroidism = 'codeHypothyroidism';
	static codeNephroticSyndrome = 'codeNephroticSyndrome';
	static codeAntiConvulsant = 'codeAntiConvulsant';
	static codeLiverDisease = 'codeLiverDisease';
	static codeSirolimus = 'codeSirolimus';
	static codeHighlyActiveAntiRetroviralTherapy = 'codeHighlyActiveAntiRetroviralTherapy';
	static code13CisRetiniocAcid = 'code13CisRetiniocAcid';
	static codeDiabetes = 'codeDiabetes';
	static codeNoSecondaryCauses = 'codeNoSecondaryCauses';
	static codeAbnormalLipidProfile = 'codeAbnormalLipidProfile';

	constructor(type) {
		this.type = type;
	}

	type;
}

export function createWorkflow() {
	let e0 = new Entity()
	e0.type = Entity.CompositeTask
	e0.isIn = new State(State.Active)
	e0.conditional = false
	e0.id = "Evaluate_Lipid_Profile"
	e0.label = "Evaluate lipid profile"
	let e1 = new Entity()
	e1.type = Entity.DecisionTask
	e1.isIn = new State(State.Inactive)
	e1.conditional = false
	e1.id = "rule_out_secondary_causes"
	e1.label = "Rule out secondary causes"
	let e2 = new Entity()
	e2.type = Entity.DecisionBranch
	e2.isIn = new State(State.Inactive)
	let c0 = new Condition()
	c0.type = Condition.Disjunction
	let c1 = new Condition()
	c1.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeOralContraceptives && obs.ObservationdotvalueBoolean == true) {  c1.conditionMet = true; }
	}
	c0.anyOf.push(c1)
	let c2 = new Condition()
	c2.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeCorticosteroids && obs.ObservationdotvalueBoolean == true) {  c2.conditionMet = true; }
	}
	c0.anyOf.push(c2)
	let c3 = new Condition()
	c3.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeCyclosporine && obs.ObservationdotvalueBoolean == true) {  c3.conditionMet = true; }
	}
	c0.anyOf.push(c3)
	let c4 = new Condition()
	c4.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeExcessiveAlcoholConsumption && obs.ObservationdotvalueBoolean == true) {  c4.conditionMet = true; }
	}
	c0.anyOf.push(c4)
	let c5 = new Condition()
	c5.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeAndrogens && obs.ObservationdotvalueBoolean == true) {  c5.conditionMet = true; }
	}
	c0.anyOf.push(c5)
	let c6 = new Condition()
	c6.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeHypothyroidism && obs.ObservationdotvalueBoolean == true) {  c6.conditionMet = true; }
	}
	c0.anyOf.push(c6)
	let c7 = new Condition()
	c7.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeNephroticSyndrome && obs.ObservationdotvalueBoolean == true) {  c7.conditionMet = true; }
	}
	c0.anyOf.push(c7)
	let c8 = new Condition()
	c8.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeAntiConvulsant && obs.ObservationdotvalueBoolean == true) {  c8.conditionMet = true; }
	}
	c0.anyOf.push(c8)
	let c9 = new Condition()
	c9.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeLiverDisease && obs.ObservationdotvalueBoolean == true) {  c9.conditionMet = true; }
	}
	c0.anyOf.push(c9)
	let c10 = new Condition()
	c10.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeSirolimus && obs.ObservationdotvalueBoolean == true) {  c10.conditionMet = true; }
	}
	c0.anyOf.push(c10)
	let c11 = new Condition()
	c11.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeHighlyActiveAntiRetroviralTherapy && obs.ObservationdotvalueBoolean == true) {  c11.conditionMet = true; }
	}
	c0.anyOf.push(c11)
	let c12 = new Condition()
	c12.check = function (obs) {
		if (obs.Observationdotcode.type == Code.code13CisRetiniocAcid && obs.ObservationdotvalueBoolean == true) {  c12.conditionMet = true; }
	}
	c0.anyOf.push(c12)
	let c13 = new Condition()
	c13.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeDiabetes && obs.ObservationdotvalueBoolean == true) {  c13.conditionMet = true; }
	}
	c0.anyOf.push(c13)
	e2.condition = c0
	let e3 = new Entity()
	e3.type = Entity.EndPoint
	e3.isIn = new State(State.Inactive)
	e3.conditional = false
	e3.id = "secondary_causes_found"
	e3.label = "Treatment or referral"
	e2.branchTarget = e3
	e1.decisionBranch.push(e2)
	let e4 = new Entity()
	e4.type = Entity.DecisionBranch
	e4.isIn = new State(State.Inactive)
	let c14 = new Condition()
	c14.type = Condition.Conjunction
	let c15 = new Condition()
	c15.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeNoSecondaryCauses && obs.ObservationdotvalueBoolean == true) {  c15.conditionMet = true; }
	}
	c14.allOf.push(c15)
	e4.condition = c14
	let e5 = new Entity()
	e5.type = Entity.EndPoint
	e5.isIn = new State(State.Inactive)
	e5.conditional = false
	e5.id = "no_secondary_causes_found"
	e5.label = "No secondary causes"
	e4.branchTarget = e5
	e1.decisionBranch.push(e4)
	e0.subTask.push(e1)
	let e6 = new Entity()
	e6.type = Entity.EndPoint
	e6.isIn = new State(State.Inactive)
	e6.conditional = false
	e6.id = "no_dyslipidemia"
	e6.label = "No action"
	e0.subTask.push(e6)
	e0.subTask.push(e3)
	let e7 = new Entity()
	e7.type = Entity.DecisionTask
	e7.isIn = new State(State.Inactive)
	e7.conditional = false
	e7.id = "measure_lipid_profile"
	e7.label = "Measure lipid profile"
	let e8 = new Entity()
	e8.type = Entity.DecisionBranch
	e8.isIn = new State(State.Inactive)
	let c16 = new Condition()
	c16.type = Condition.Conjunction
	let c17 = new Condition()
	c17.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeAbnormalLipidProfile && obs.ObservationdotvalueBoolean == false) {  c17.conditionMet = true; }
	}
	c16.allOf.push(c17)
	e8.condition = c16
	e8.branchTarget = e6
	e7.decisionBranch.push(e8)
	let e9 = new Entity()
	e9.type = Entity.DecisionBranch
	e9.isIn = new State(State.Inactive)
	let c18 = new Condition()
	c18.type = Condition.Conjunction
	let c19 = new Condition()
	c19.check = function (obs) {
		if (obs.Observationdotcode.type == Code.codeAbnormalLipidProfile && obs.ObservationdotvalueBoolean == true) {  c19.conditionMet = true; }
	}
	c18.allOf.push(c19)
	e9.condition = c18
	e9.branchTarget = e1
	e7.decisionBranch.push(e9)
	e0.subTask.push(e7)
	e0.subTask.push(e5)
	
	return e0
}

export var jsonWorkflow = {"id": "Evaluate_Lipid_Profile","name": "Evaluate lipid profile","composed": false,"node_type": "composite_task","workflow_state": "activeState","decisional_state": "chosenState","children": [{"id": "measure_lipid_profile","name": "Measure lipid profile","composed": true,"in_workflow": "Evaluate_Lipid_Profile","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "1.\tTotal cholesterol\n2.\tLDL cholesterol \n3.\tHDL cholesterol \n4.\tTriglycerides","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_abnormal_lipid_profile'><\/span><div id='code_abnormal_lipid_profile' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Abnormal lipid profile?: <label><input type='radio' name='code_abnormal_lipid_profile' id='code_abnormal_lipid_profile-yes' code='code_abnormal_lipid_profile-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_abnormal_lipid_profile' id='code_abnormal_lipid_profile-no' code='code_abnormal_lipid_profile-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "no_dyslipidemia","name": "No action","composed": false,"in_workflow": "Evaluate_Lipid_Profile","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "normal","description": "No abnormal lipid profile."},"description": "No further measurement of lipid profile."},{"id": "rule_out_secondary_causes","name": "Rule out secondary causes","composed": false,"in_workflow": "Evaluate_Lipid_Profile","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "abnormal","description": "Abnormal lipid profile."},"description": "Investigate and treat remediable secondary causes of dyslipidemia.","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_no_secondary_causes'><\/span><label><input type='checkbox' id='code_no_secondary_causes' code='code_no_secondary_causes' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_nephrotic_syndrome,code_hypothyroidism,code_diabetes,code_excessive_alcohol_consumption,code_liver_disease,code_13-cis-retinioc_acid,code_anti_convulsant,code_highly_active_anti-retroviral_therapy,code_androgens,code_oral_contraceptives,code_corticosteroids,code_cyclosporine,code_sirolimus' mandatory='false' \/>No secondary causes<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_nephrotic_syndrome'><\/span><label><input type='checkbox' id='code_nephrotic_syndrome' code='code_nephrotic_syndrome' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Nephrotic syndrome?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_hypothyroidism'><\/span><label><input type='checkbox' id='code_hypothyroidism' code='code_hypothyroidism' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Hypothyroidism?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_diabetes'><\/span><label><input type='checkbox' id='code_diabetes' code='code_diabetes' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Diabetes?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_excessive_alcohol_consumption'><\/span><label><input type='checkbox' id='code_excessive_alcohol_consumption' code='code_excessive_alcohol_consumption' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Excessive alcohol consumption?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_liver_disease'><\/span><label><input type='checkbox' id='code_liver_disease' code='code_liver_disease' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Liver disease?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_13-cis-retinioc_acid'><\/span><label><input type='checkbox' id='code_13-cis-retinioc_acid' code='code_13-cis-retinioc_acid' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>13-cis-retinioc acid?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_anti_convulsant'><\/span><label><input type='checkbox' id='code_anti_convulsant' code='code_anti_convulsant' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Anti-convulsant?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_highly_active_anti-retroviral_therapy'><\/span><label><input type='checkbox' id='code_highly_active_anti-retroviral_therapy' code='code_highly_active_anti-retroviral_therapy' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Highly active anti-retroviral therapy?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_androgens'><\/span><label><input type='checkbox' id='code_androgens' code='code_androgens' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Androgens?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_oral_contraceptives'><\/span><label><input type='checkbox' id='code_oral_contraceptives' code='code_oral_contraceptives' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Oral contraceptives?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_corticosteroids'><\/span><label><input type='checkbox' id='code_corticosteroids' code='code_corticosteroids' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Corticosteroids?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof=''><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_sirolimus'><\/span><label><input type='checkbox' id='code_sirolimus' code='code_sirolimus' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Sirolimus?<\/label><\/td><\/tr><\/table>\n","children": [{"id": "secondary_causes_found","name": "Treatment or referral","composed": false,"in_workflow": "Evaluate_Lipid_Profile","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "secondary causes","description": "Some secondary causes found."},"description": "Remediable (secondary) causes of dyslipidemia found. Treat secondary causes or refer to specialist."},{"id": "no_secondary_causes_found","name": "No secondary causes","composed": false,"in_workflow": "Evaluate_Lipid_Profile","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no","description": "No secondary causes found."},"description": "No remediable (secondary) causes of dyslipidemia found."}]}]}]}