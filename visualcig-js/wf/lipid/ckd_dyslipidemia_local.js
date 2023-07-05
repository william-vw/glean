export class Observation {
	constructor(Observationdotcode, ObservationdotvalueQuantity, ObservationdotvalueBoolean) {
		this.Observationdotcode = Observationdotcode;
		this.ObservationdotvalueQuantity = ObservationdotvalueQuantity;
		this.ObservationdotvalueBoolean = ObservationdotvalueBoolean;
	}

	Observationdotcode;
	ObservationdotvalueQuantity;
	ObservationdotvalueBoolean;
}

export class Code {
	static codeFastingTriglycerides = 'codeFastingTriglycerides';
	static codeLdlCholesterol = 'codeLdlCholesterol';
	static codePatientOnStatins = 'codePatientOnStatins';
	static code10YearCvRisk = 'code10YearCvRisk';
	static codeSecCause = 'codeSecCause';
	static codeKidneyTransplant = 'codeKidneyTransplant';
	static codeDialysisTreatment = 'codeDialysisTreatment';
	static codeAge = 'codeAge';
	static codeNoCvRiskFactors = 'codeNoCvRiskFactors';
	static codePriorMi = 'codePriorMi';
	static codePriorCoronaryRevascularization = 'codePriorCoronaryRevascularization';
	static codePriorIschemicStroke = 'codePriorIschemicStroke';
	static codePriorTransientIschemicAttack = 'codePriorTransientIschemicAttack';
	static codeDiabetes = 'codeDiabetes';
	static codeEstimated10YearIncidenceCoronaryDeath = 'codeEstimated10YearIncidenceCoronaryDeath';
	static codeLikelihoodNonFatalMi = 'codeLikelihoodNonFatalMi';
	static codeStatinEzetimibe = 'codeStatinEzetimibe';
	static codeEgfr = 'codeEgfr';
	static codeStatinPrescribed = 'codeStatinPrescribed';
	static codeFastingSerumTg = 'codeFastingSerumTg';
	static codeMalnutrition = 'codeMalnutrition';
	static codePreventPancreatitis = 'codePreventPancreatitis';
	static codeNoSecondaryCauses = 'codeNoSecondaryCauses';
	static codeNephroticSyndrome = 'codeNephroticSyndrome';
	static codeHypothyroidism = 'codeHypothyroidism';
	static codeExcessiveAlcoholConsumption = 'codeExcessiveAlcoholConsumption';
	static codeLiverDisease = 'codeLiverDisease';
	static code13CisRetiniocAcid = 'code13CisRetiniocAcid';
	static codeAntiConvulsant = 'codeAntiConvulsant';
	static codeHighlyActiveAntiRetroviralTherapy = 'codeHighlyActiveAntiRetroviralTherapy';
	static codeAndrogens = 'codeAndrogens';
	static codeOralContraceptives = 'codeOralContraceptives';
	static codeCorticosteroids = 'codeCorticosteroids';
	static codeCyclosporine = 'codeCyclosporine';
	static codeSirolimus = 'codeSirolimus';
	static codeAbnormalLipidProfile = 'codeAbnormalLipidProfile';
	static codeLipidProfile = 'codeLipidProfile';

	constructor(type) {
		this.type = type;
	}

	type;
}

export class ValueQuantity {
	constructor(Quantitydotvalue) {
		this.Quantitydotvalue = Quantitydotvalue;
	}

	Quantitydotvalue;
}

export var nodeAdtMap = {"http://hl7.org/fhir/Observation":{"name":"Observation","http://hl7.org/fhir/Observation.code":{"name":"Observationdotcode","type":"http://hl7.org/fhir/Code"},"http://hl7.org/fhir/Observation.valueQuantity":{"name":"ObservationdotvalueQuantity","type":"http://hl7.org/fhir/ValueQuantity"},"http://hl7.org/fhir/Observation.valueBoolean":{"name":"ObservationdotvalueBoolean"}},"http://hl7.org/fhir/Code":{"name":"Code","http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_fasting_triglycerides":{"name":"codeFastingTriglycerides"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_ldl_cholesterol":{"name":"codeLdlCholesterol"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_patient_on_statins":{"name":"codePatientOnStatins"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_10_year_cv_risk":{"name":"code10YearCvRisk"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_sec_cause":{"name":"codeSecCause"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_kidney_transplant":{"name":"codeKidneyTransplant"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_dialysis_treatment":{"name":"codeDialysisTreatment"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_age":{"name":"codeAge"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_no_cv_risk_factors":{"name":"codeNoCvRiskFactors"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_prior_mi":{"name":"codePriorMi"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_prior_coronary_revascularization":{"name":"codePriorCoronaryRevascularization"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_prior_ischemic_stroke":{"name":"codePriorIschemicStroke"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_prior_transient_ischemic_attack":{"name":"codePriorTransientIschemicAttack"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_diabetes":{"name":"codeDiabetes"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_estimated_10-year_incidence_coronary_death":{"name":"codeEstimated10YearIncidenceCoronaryDeath"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_likelihood_non_fatal_mi":{"name":"codeLikelihoodNonFatalMi"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_statin_ezetimibe":{"name":"codeStatinEzetimibe"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_egfr":{"name":"codeEgfr"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_statin_prescribed":{"name":"codeStatinPrescribed"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_fasting_serum_tg":{"name":"codeFastingSerumTg"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_malnutrition":{"name":"codeMalnutrition"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_prevent_pancreatitis":{"name":"codePreventPancreatitis"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_no_secondary_causes":{"name":"codeNoSecondaryCauses"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_nephrotic_syndrome":{"name":"codeNephroticSyndrome"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_hypothyroidism":{"name":"codeHypothyroidism"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_excessive_alcohol_consumption":{"name":"codeExcessiveAlcoholConsumption"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_liver_disease":{"name":"codeLiverDisease"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_13-cis-retinioc_acid":{"name":"code13CisRetiniocAcid"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_anti_convulsant":{"name":"codeAntiConvulsant"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_highly_active_anti-retroviral_therapy":{"name":"codeHighlyActiveAntiRetroviralTherapy"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_androgens":{"name":"codeAndrogens"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_oral_contraceptives":{"name":"codeOralContraceptives"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_corticosteroids":{"name":"codeCorticosteroids"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_cyclosporine":{"name":"codeCyclosporine"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_sirolimus":{"name":"codeSirolimus"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_abnormal_lipid_profile":{"name":"codeAbnormalLipidProfile"},"http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#code_lipid_profile":{"name":"codeLipidProfile"},"http://www.w3.org/1999/02/22-rdf-syntax-ns#type":{"name":"type"}},"http://hl7.org/fhir/ValueQuantity":{"name":"ValueQuantity","http://hl7.org/fhir/Quantity.value":{"name":"Quantitydotvalue"}}}


export function createWorkflow() {
	let e0 = new Entity()
	e0.type = Entity.CompositeTask
	e0.isIn = new State(State.Active)
	e0.id = "Dyslipidemia_CKD"
	e0.label = "Dyslipidemia CKD Workflow"
	let e1 = new Entity()
	e1.type = Entity.DecisionTask
	e1.isIn = new State(State.Inactive)
	e1.conditional = false
	e1.id = "evaluate_severity_dyslipidemia"
	e1.label = "Evaluate severity dyslipidemia"
	let e2 = new Entity()
	e2.type = Entity.DecisionBranch
	e2.isIn = new State(State.Inactive)
	let c0 = new Condition()
	c0.type = Condition.Disjunction
	let c1 = new Condition()
	c1.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeFastingTriglycerides && obs.ObservationdotvalueQuantity.Quantitydotvalue > 11.3)
	}
	c0.anyOf.push(c1)
	let c2 = new Condition()
	c2.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeLdlCholesterol && obs.ObservationdotvalueQuantity.Quantitydotvalue > 4.9)
	}
	c0.anyOf.push(c2)
	e2.precondition = c0
	let e3 = new Entity()
	e3.type = Entity.EndPoint
	e3.isIn = new State(State.Inactive)
	e3.conditional = false
	e3.id = "severe_dyslipidemia"
	e3.label = "Referral"
	e2.branchTarget = e3
	e2.next.push(e3)
	e3.nextOf.push(e2)
	e1.decisionBranch.push(e2)
	let e4 = new Entity()
	e4.type = Entity.DecisionBranch
	e4.isIn = new State(State.Inactive)
	let c3 = new Condition()
	c3.type = Condition.Conjunction
	let c4 = new Condition()
	c4.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeFastingTriglycerides && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 11.3)
	}
	c3.allOf.push(c4)
	let c5 = new Condition()
	c5.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeLdlCholesterol && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 4.9)
	}
	c3.allOf.push(c5)
	e4.precondition = c3
	let e5 = new Entity()
	e5.type = Entity.CompositeTask
	e5.isIn = new State(State.Inactive)
	e5.conditional = false
	e5.id = "Followup_Lipid_Profile-1"
	e5.label = "Followup Lipid Profile"
	let e6 = new Entity()
	e6.type = Entity.DecisionTask
	e6.isIn = new State(State.Inactive)
	e6.conditional = false
	e6.id = "assess_current_treatment-1"
	e6.label = "Already on statins?"
	let e7 = new Entity()
	e7.type = Entity.DecisionBranch
	e7.isIn = new State(State.Inactive)
	let c6 = new Condition()
	c6.type = Condition.Conjunction
	let c7 = new Condition()
	c7.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePatientOnStatins && obs.ObservationdotvalueBoolean == false)
	}
	c6.allOf.push(c7)
	e7.precondition = c6
	let e8 = new Entity()
	e8.type = Entity.DecisionTask
	e8.isIn = new State(State.Inactive)
	e8.conditional = false
	e8.id = "reassess_10_year_cv_risk-1"
	e8.label = "Reassessing 10 year CV risk?"
	let e9 = new Entity()
	e9.type = Entity.DecisionBranch
	e9.isIn = new State(State.Inactive)
	let c8 = new Condition()
	c8.type = Condition.Conjunction
	let c9 = new Condition()
	c9.check = function (obs) {
		return (obs.Observationdotcode.type == Code.code10YearCvRisk && obs.ObservationdotvalueBoolean == false)
	}
	c8.allOf.push(c9)
	e9.precondition = c8
	let e10 = new Entity()
	e10.type = Entity.EndPoint
	e10.isIn = new State(State.Inactive)
	e10.conditional = false
	e10.id = "no_reassess_no_followup-1"
	e10.label = "No followup"
	e9.branchTarget = e10
	e9.next.push(e10)
	e10.nextOf.push(e9)
	e8.decisionBranch.push(e9)
	let e11 = new Entity()
	e11.type = Entity.DecisionBranch
	e11.isIn = new State(State.Inactive)
	let c10 = new Condition()
	c10.type = Condition.Conjunction
	let c11 = new Condition()
	c11.check = function (obs) {
		return (obs.Observationdotcode.type == Code.code10YearCvRisk && obs.ObservationdotvalueBoolean == true)
	}
	c10.allOf.push(c11)
	e11.precondition = c10
	let e12 = new Entity()
	e12.type = Entity.EndPoint
	e12.isIn = new State(State.Inactive)
	e12.conditional = false
	e12.id = "yes_reassess_followup-1"
	e12.label = "Followup lipid profile"
	e11.branchTarget = e12
	e11.next.push(e12)
	e12.nextOf.push(e11)
	e8.decisionBranch.push(e11)
	e8.next.push(e11)
	e11.nextOf.push(e8)
	e8.next.push(e9)
	e9.nextOf.push(e8)
	e7.branchTarget = e8
	e7.next.push(e8)
	e8.nextOf.push(e7)
	e6.decisionBranch.push(e7)
	let e13 = new Entity()
	e13.type = Entity.DecisionBranch
	e13.isIn = new State(State.Inactive)
	let c12 = new Condition()
	c12.type = Condition.Conjunction
	let c13 = new Condition()
	c13.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePatientOnStatins && obs.ObservationdotvalueBoolean == true)
	}
	c12.allOf.push(c13)
	e13.precondition = c12
	let e14 = new Entity()
	e14.type = Entity.EndPoint
	e14.isIn = new State(State.Inactive)
	e14.conditional = false
	e14.id = "yes_statins_no_followup-1"
	e14.label = "No followup"
	e13.branchTarget = e14
	e13.next.push(e14)
	e14.nextOf.push(e13)
	e6.decisionBranch.push(e13)
	e6.next.push(e13)
	e13.nextOf.push(e6)
	e6.next.push(e7)
	e7.nextOf.push(e6)
	e5.subTask.push(e6)
	e6.subTaskOf = e5
	let e15 = new Entity()
	e15.type = Entity.EndPoint
	e15.isIn = new State(State.Inactive)
	e15.conditional = false
	e15.id = "sec_cause_followup-1"
	e15.label = "Followup lipid profile"
	e5.subTask.push(e15)
	e15.subTaskOf = e5
	e5.subTask.push(e8)
	e8.subTaskOf = e5
	let e16 = new Entity()
	e16.type = Entity.DecisionTask
	e16.isIn = new State(State.Inactive)
	e16.conditional = false
	e16.id = "assess_suspect_sec_cause-1"
	e16.label = "Suspect secondary dyslipidemia cause?"
	let e17 = new Entity()
	e17.type = Entity.DecisionBranch
	e17.isIn = new State(State.Inactive)
	let c14 = new Condition()
	c14.type = Condition.Conjunction
	let c15 = new Condition()
	c15.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeSecCause && obs.ObservationdotvalueBoolean == false)
	}
	c14.allOf.push(c15)
	e17.precondition = c14
	e17.branchTarget = e6
	e17.next.push(e6)
	e6.nextOf.push(e17)
	e16.decisionBranch.push(e17)
	let e18 = new Entity()
	e18.type = Entity.DecisionBranch
	e18.isIn = new State(State.Inactive)
	let c16 = new Condition()
	c16.type = Condition.Conjunction
	let c17 = new Condition()
	c17.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeSecCause && obs.ObservationdotvalueBoolean == true)
	}
	c16.allOf.push(c17)
	e18.precondition = c16
	e18.branchTarget = e15
	e18.next.push(e15)
	e15.nextOf.push(e18)
	e16.decisionBranch.push(e18)
	e16.next.push(e17)
	e17.nextOf.push(e16)
	e16.next.push(e18)
	e18.nextOf.push(e16)
	e5.subTask.push(e16)
	e16.subTaskOf = e5
	e5.subTask.push(e14)
	e14.subTaskOf = e5
	e5.subTask.push(e10)
	e10.subTaskOf = e5
	e5.subTask.push(e12)
	e12.subTaskOf = e5
	e4.branchTarget = e5
	e4.next.push(e5)
	e5.nextOf.push(e4)
	e1.decisionBranch.push(e4)
	e1.next.push(e4)
	e4.nextOf.push(e1)
	e1.next.push(e2)
	e2.nextOf.push(e1)
	e0.subTask.push(e1)
	e1.subTaskOf = e0
	e0.subTask.push(e3)
	e3.subTaskOf = e0
	let e19 = new Entity()
	e19.type = Entity.CompositeTask
	e19.isIn = new State(State.Inactive)
	e19.conditional = false
	e19.id = "Dyslipidemia_Treatment-2"
	e19.label = "Dyslipidemia Treatment"
	let e20 = new Entity()
	e20.type = Entity.CompositeTask
	e20.isIn = new State(State.Inactive)
	e20.conditional = false
	e20.id = "Pharmacological_Cholesterol_Lowering_Treatment-2"
	e20.label = "Pharmacological Cholesterol Lowering Treatment"
	let e21 = new Entity()
	e21.type = Entity.EndPoint
	e21.isIn = new State(State.Inactive)
	e21.conditional = false
	e21.id = "treat_statin_high_risk-2"
	e21.label = "treat with statin"
	e20.subTask.push(e21)
	e21.subTaskOf = e20
	let e22 = new Entity()
	e22.type = Entity.EndPoint
	e22.isIn = new State(State.Inactive)
	e22.conditional = false
	e22.id = "no_statin_treatment_low_risk-2"
	e22.label = "do not initiate statins"
	e20.subTask.push(e22)
	e22.subTaskOf = e20
	let e23 = new Entity()
	e23.type = Entity.DecisionTask
	e23.isIn = new State(State.Inactive)
	e23.conditional = false
	e23.id = "assess_kidney_transplant-2"
	e23.label = "Kidney transplant?"
	let e24 = new Entity()
	e24.type = Entity.DecisionBranch
	e24.isIn = new State(State.Inactive)
	let c18 = new Condition()
	c18.type = Condition.Conjunction
	let c19 = new Condition()
	c19.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeKidneyTransplant && obs.ObservationdotvalueBoolean == false)
	}
	c18.allOf.push(c19)
	e24.precondition = c18
	let e25 = new Entity()
	e25.type = Entity.DecisionTask
	e25.isIn = new State(State.Inactive)
	e25.conditional = false
	e25.id = "assess_dialysis_treatment-2"
	e25.label = "Treatment with dialysis?"
	let e26 = new Entity()
	e26.type = Entity.DecisionBranch
	e26.isIn = new State(State.Inactive)
	let c20 = new Condition()
	c20.type = Condition.Conjunction
	let c21 = new Condition()
	c21.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeDialysisTreatment && obs.ObservationdotvalueBoolean == false)
	}
	c20.allOf.push(c21)
	e26.precondition = c20
	let e27 = new Entity()
	e27.type = Entity.DecisionTask
	e27.isIn = new State(State.Inactive)
	e27.conditional = false
	e27.id = "assess_age_no_dialysis-2"
	e27.label = "Age?"
	let e28 = new Entity()
	e28.type = Entity.DecisionBranch
	e28.isIn = new State(State.Inactive)
	let c22 = new Condition()
	c22.type = Condition.Conjunction
	let c23 = new Condition()
	c23.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeAge && obs.ObservationdotvalueQuantity.Quantitydotvalue >= 50)
	}
	c22.allOf.push(c23)
	e28.precondition = c22
	let e29 = new Entity()
	e29.type = Entity.EndPoint
	e29.isIn = new State(State.Inactive)
	e29.conditional = false
	e29.id = "treat_statin_no_dialysis-2"
	e29.label = "treat with statins or statin/ezetimibe"
	e28.branchTarget = e29
	e28.next.push(e29)
	e29.nextOf.push(e28)
	e27.decisionBranch.push(e28)
	let e30 = new Entity()
	e30.type = Entity.DecisionBranch
	e30.isIn = new State(State.Inactive)
	let c24 = new Condition()
	c24.type = Condition.Conjunction
	let c25 = new Condition()
	c25.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeAge && obs.ObservationdotvalueQuantity.Quantitydotvalue >= 18 && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 49)
	}
	c24.allOf.push(c25)
	e30.precondition = c24
	let e31 = new Entity()
	e31.type = Entity.DecisionTask
	e31.isIn = new State(State.Inactive)
	e31.conditional = false
	e31.id = "assess_cv_risk-2"
	e31.label = "assess CV risk"
	let e32 = new Entity()
	e32.type = Entity.DecisionBranch
	e32.isIn = new State(State.Inactive)
	let c26 = new Condition()
	c26.type = Condition.Conjunction
	let c27 = new Condition()
	c27.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeNoCvRiskFactors && obs.ObservationdotvalueBoolean == true)
	}
	c26.allOf.push(c27)
	e32.precondition = c26
	e32.branchTarget = e22
	e32.next.push(e22)
	e22.nextOf.push(e32)
	e31.decisionBranch.push(e32)
	let e33 = new Entity()
	e33.type = Entity.DecisionBranch
	e33.isIn = new State(State.Inactive)
	let c28 = new Condition()
	c28.type = Condition.Disjunction
	let c29 = new Condition()
	c29.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePriorMi && obs.ObservationdotvalueBoolean == true)
	}
	c28.anyOf.push(c29)
	let c30 = new Condition()
	c30.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePriorCoronaryRevascularization && obs.ObservationdotvalueBoolean == true)
	}
	c28.anyOf.push(c30)
	let c31 = new Condition()
	c31.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePriorIschemicStroke && obs.ObservationdotvalueBoolean == true)
	}
	c28.anyOf.push(c31)
	let c32 = new Condition()
	c32.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePriorTransientIschemicAttack && obs.ObservationdotvalueBoolean == true)
	}
	c28.anyOf.push(c32)
	let c33 = new Condition()
	c33.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeDiabetes && obs.ObservationdotvalueBoolean == true)
	}
	c28.anyOf.push(c33)
	let c34 = new Condition()
	c34.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeEstimated10YearIncidenceCoronaryDeath && obs.ObservationdotvalueBoolean == true)
	}
	c28.anyOf.push(c34)
	let c35 = new Condition()
	c35.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeLikelihoodNonFatalMi && obs.ObservationdotvalueQuantity.Quantitydotvalue > 10)
	}
	c28.anyOf.push(c35)
	e33.precondition = c28
	e33.branchTarget = e21
	e33.next.push(e21)
	e21.nextOf.push(e33)
	e31.decisionBranch.push(e33)
	e31.next.push(e32)
	e32.nextOf.push(e31)
	e31.next.push(e33)
	e33.nextOf.push(e31)
	e30.branchTarget = e31
	e30.next.push(e31)
	e31.nextOf.push(e30)
	e27.decisionBranch.push(e30)
	e27.next.push(e28)
	e28.nextOf.push(e27)
	e27.next.push(e30)
	e30.nextOf.push(e27)
	e26.branchTarget = e27
	e26.next.push(e27)
	e27.nextOf.push(e26)
	e25.decisionBranch.push(e26)
	let e34 = new Entity()
	e34.type = Entity.DecisionBranch
	e34.isIn = new State(State.Inactive)
	let c36 = new Condition()
	c36.type = Condition.Conjunction
	let c37 = new Condition()
	c37.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeDialysisTreatment && obs.ObservationdotvalueBoolean == true)
	}
	c36.allOf.push(c37)
	e34.precondition = c36
	let e35 = new Entity()
	e35.type = Entity.DecisionTask
	e35.isIn = new State(State.Inactive)
	e35.conditional = false
	e35.id = "assess_statin_use-2"
	e35.label = "Using statins or statin/ezetimibe?"
	let e36 = new Entity()
	e36.type = Entity.DecisionBranch
	e36.isIn = new State(State.Inactive)
	let c38 = new Condition()
	c38.type = Condition.Conjunction
	let c39 = new Condition()
	c39.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeStatinEzetimibe && obs.ObservationdotvalueBoolean == false)
	}
	c38.allOf.push(c39)
	e36.precondition = c38
	let e37 = new Entity()
	e37.type = Entity.EndPoint
	e37.isIn = new State(State.Inactive)
	e37.conditional = false
	e37.id = "do_not_initiate_statins-2"
	e37.label = "do not initiate statins"
	e36.branchTarget = e37
	e36.next.push(e37)
	e37.nextOf.push(e36)
	e35.decisionBranch.push(e36)
	let e38 = new Entity()
	e38.type = Entity.DecisionBranch
	e38.isIn = new State(State.Inactive)
	let c40 = new Condition()
	c40.type = Condition.Conjunction
	let c41 = new Condition()
	c41.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeStatinEzetimibe && obs.ObservationdotvalueBoolean == true)
	}
	c40.allOf.push(c41)
	e38.precondition = c40
	let e39 = new Entity()
	e39.type = Entity.EndPoint
	e39.isIn = new State(State.Inactive)
	e39.conditional = false
	e39.id = "continue_statin_treatment-2"
	e39.label = "continue statin or statin/ezetimibe"
	e38.branchTarget = e39
	e38.next.push(e39)
	e39.nextOf.push(e38)
	e35.decisionBranch.push(e38)
	e35.next.push(e36)
	e36.nextOf.push(e35)
	e35.next.push(e38)
	e38.nextOf.push(e35)
	e34.branchTarget = e35
	e34.next.push(e35)
	e35.nextOf.push(e34)
	e25.decisionBranch.push(e34)
	e25.next.push(e26)
	e26.nextOf.push(e25)
	e25.next.push(e34)
	e34.nextOf.push(e25)
	e24.branchTarget = e25
	e24.next.push(e25)
	e25.nextOf.push(e24)
	e23.decisionBranch.push(e24)
	let e40 = new Entity()
	e40.type = Entity.DecisionBranch
	e40.isIn = new State(State.Inactive)
	let c42 = new Condition()
	c42.type = Condition.Conjunction
	let c43 = new Condition()
	c43.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeKidneyTransplant && obs.ObservationdotvalueBoolean == true)
	}
	c42.allOf.push(c43)
	e40.precondition = c42
	let e41 = new Entity()
	e41.type = Entity.EndPoint
	e41.isIn = new State(State.Inactive)
	e41.conditional = false
	e41.id = "treat_statin_kidney_transplant-2"
	e41.label = "treat with statins"
	e40.branchTarget = e41
	e40.next.push(e41)
	e41.nextOf.push(e40)
	e23.decisionBranch.push(e40)
	e23.next.push(e40)
	e40.nextOf.push(e23)
	e23.next.push(e24)
	e24.nextOf.push(e23)
	e20.subTask.push(e23)
	e23.subTaskOf = e20
	e20.subTask.push(e41)
	e41.subTaskOf = e20
	e20.subTask.push(e39)
	e39.subTaskOf = e20
	e20.subTask.push(e27)
	e27.subTaskOf = e20
	e20.subTask.push(e31)
	e31.subTaskOf = e20
	e20.subTask.push(e37)
	e37.subTaskOf = e20
	e20.subTask.push(e25)
	e25.subTaskOf = e20
	let e42 = new Entity()
	e42.type = Entity.EndPoint
	e42.isIn = new State(State.Inactive)
	e42.conditional = false
	e42.id = "treat_statin_egfr-2"
	e42.label = "treat with statins"
	e20.subTask.push(e42)
	e42.subTaskOf = e20
	let e43 = new Entity()
	e43.type = Entity.DecisionTask
	e43.isIn = new State(State.Inactive)
	e43.conditional = false
	e43.id = "assess_age_start-2"
	e43.label = "Age?"
	let e44 = new Entity()
	e44.type = Entity.DecisionBranch
	e44.isIn = new State(State.Inactive)
	let c44 = new Condition()
	c44.type = Condition.Conjunction
	let c45 = new Condition()
	c45.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeAge && obs.ObservationdotvalueQuantity.Quantitydotvalue >= 18 && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 49)
	}
	c44.allOf.push(c45)
	e44.precondition = c44
	e44.branchTarget = e23
	e44.next.push(e23)
	e23.nextOf.push(e44)
	e43.decisionBranch.push(e44)
	let e45 = new Entity()
	e45.type = Entity.DecisionBranch
	e45.isIn = new State(State.Inactive)
	let c46 = new Condition()
	c46.type = Condition.Conjunction
	let c47 = new Condition()
	c47.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeAge && obs.ObservationdotvalueQuantity.Quantitydotvalue >= 50)
	}
	c46.allOf.push(c47)
	e45.precondition = c46
	let e46 = new Entity()
	e46.type = Entity.DecisionTask
	e46.isIn = new State(State.Inactive)
	e46.conditional = false
	e46.id = "assess_egfr_value-2"
	e46.label = "eGFR value?"
	let e47 = new Entity()
	e47.type = Entity.DecisionBranch
	e47.isIn = new State(State.Inactive)
	let c48 = new Condition()
	c48.type = Condition.Conjunction
	let c49 = new Condition()
	c49.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeEgfr && obs.ObservationdotvalueQuantity.Quantitydotvalue < 60)
	}
	c48.allOf.push(c49)
	e47.precondition = c48
	e47.branchTarget = e23
	e47.next.push(e23)
	e23.nextOf.push(e47)
	e46.decisionBranch.push(e47)
	let e48 = new Entity()
	e48.type = Entity.DecisionBranch
	e48.isIn = new State(State.Inactive)
	let c50 = new Condition()
	c50.type = Condition.Conjunction
	let c51 = new Condition()
	c51.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeEgfr && obs.ObservationdotvalueQuantity.Quantitydotvalue >= 60)
	}
	c50.allOf.push(c51)
	e48.precondition = c50
	e48.branchTarget = e42
	e48.next.push(e42)
	e42.nextOf.push(e48)
	e46.decisionBranch.push(e48)
	e46.next.push(e48)
	e48.nextOf.push(e46)
	e46.next.push(e47)
	e47.nextOf.push(e46)
	e45.branchTarget = e46
	e45.next.push(e46)
	e46.nextOf.push(e45)
	e43.decisionBranch.push(e45)
	e43.next.push(e45)
	e45.nextOf.push(e43)
	e43.next.push(e44)
	e44.nextOf.push(e43)
	e20.subTask.push(e43)
	e43.subTaskOf = e20
	e20.subTask.push(e29)
	e29.subTaskOf = e20
	e20.subTask.push(e35)
	e35.subTaskOf = e20
	e20.subTask.push(e46)
	e46.subTaskOf = e20
	let e49 = new Entity()
	e49.type = Entity.DecisionTask
	e49.isIn = new State(State.Inactive)
	e49.conditional = false
	e49.id = "statin_prescribed-2"
	e49.label = "Statins prescribed?"
	let e50 = new Entity()
	e50.type = Entity.DecisionBranch
	e50.isIn = new State(State.Inactive)
	let c52 = new Condition()
	c52.type = Condition.Conjunction
	let c53 = new Condition()
	c53.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeStatinPrescribed && obs.ObservationdotvalueBoolean == true)
	}
	c52.allOf.push(c53)
	e50.precondition = c52
	let e51 = new Entity()
	e51.type = Entity.DecisionTask
	e51.isIn = new State(State.Inactive)
	e51.conditional = false
	e51.id = "fasting_serum_tgs_values-2"
	e51.label = "Check Fasting Serum TGs Values"
	let e52 = new Entity()
	e52.type = Entity.DecisionBranch
	e52.isIn = new State(State.Inactive)
	let c54 = new Condition()
	c54.type = Condition.Conjunction
	let c55 = new Condition()
	c55.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeFastingSerumTg && obs.ObservationdotvalueQuantity.Quantitydotvalue > 5.65)
	}
	c54.allOf.push(c55)
	e52.precondition = c54
	let e53 = new Entity()
	e53.type = Entity.DecisionTask
	e53.isIn = new State(State.Inactive)
	e53.conditional = false
	e53.id = "assess_malnutrition-2"
	e53.label = "Malnutrition?"
	let e54 = new Entity()
	e54.type = Entity.DecisionBranch
	e54.isIn = new State(State.Inactive)
	let c56 = new Condition()
	c56.type = Condition.Conjunction
	let c57 = new Condition()
	c57.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeMalnutrition && obs.ObservationdotvalueBoolean == false)
	}
	c56.allOf.push(c57)
	e54.precondition = c56
	let e55 = new Entity()
	e55.isIn = new State(State.Inactive)
	e55.conditional = false
	e55.involvesAction = false
	e55.id = "prescribe_lifestyle_changes-2"
	e55.label = "Lifestyle changes"
	let e56 = new Entity()
	e56.type = Entity.DecisionTask
	e56.isIn = new State(State.Inactive)
	e56.conditional = false
	e56.id = "fasting_serum_tgs_values2-2"
	e56.label = "Check Fasting Serum TGs Values (2)"
	let e57 = new Entity()
	e57.type = Entity.DecisionBranch
	e57.isIn = new State(State.Inactive)
	let c58 = new Condition()
	c58.type = Condition.Conjunction
	let c59 = new Condition()
	c59.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeFastingSerumTg && obs.ObservationdotvalueQuantity.Quantitydotvalue > 11.3)
	}
	c58.allOf.push(c59)
	e57.precondition = c58
	let e58 = new Entity()
	e58.isIn = new State(State.Inactive)
	e58.conditional = false
	e58.involvesAction = false
	e58.id = "avoid_nicotinic_acid-2"
	e58.label = "Avoid nicotinic acid"
	let e59 = new Entity()
	e59.type = Entity.DecisionTask
	e59.isIn = new State(State.Inactive)
	e59.conditional = false
	e59.id = "assess_prevent_pancreatitis-2"
	e59.label = "Prevent pancreatitis?"
	let e60 = new Entity()
	e60.type = Entity.DecisionBranch
	e60.isIn = new State(State.Inactive)
	let c60 = new Condition()
	c60.type = Condition.Conjunction
	let c61 = new Condition()
	c61.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePreventPancreatitis && obs.ObservationdotvalueBoolean == false)
	}
	c60.allOf.push(c61)
	e60.precondition = c60
	let e61 = new Entity()
	e61.type = Entity.EndPoint
	e61.isIn = new State(State.Inactive)
	e61.conditional = false
	e61.id = "do_not_prescribe_fibric_acid_pancreatitis-2"
	e61.label = "No fibric acid"
	e60.branchTarget = e61
	e60.next.push(e61)
	e61.nextOf.push(e60)
	e59.decisionBranch.push(e60)
	let e62 = new Entity()
	e62.type = Entity.DecisionBranch
	e62.isIn = new State(State.Inactive)
	let c62 = new Condition()
	c62.type = Condition.Conjunction
	let c63 = new Condition()
	c63.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePreventPancreatitis && obs.ObservationdotvalueBoolean == true)
	}
	c62.allOf.push(c63)
	e62.precondition = c62
	let e63 = new Entity()
	e63.type = Entity.EndPoint
	e63.isIn = new State(State.Inactive)
	e63.conditional = false
	e63.id = "prescribe_fibric_acid_pancreatitis-2"
	e63.label = "Prescribe fibric acid"
	e62.branchTarget = e63
	e62.next.push(e63)
	e63.nextOf.push(e62)
	e59.decisionBranch.push(e62)
	e59.next.push(e60)
	e60.nextOf.push(e59)
	e59.next.push(e62)
	e62.nextOf.push(e59)
	e58.next.push(e59)
	e59.nextOf.push(e58)
	e57.branchTarget = e58
	e57.next.push(e58)
	e58.nextOf.push(e57)
	e56.decisionBranch.push(e57)
	let e64 = new Entity()
	e64.type = Entity.DecisionBranch
	e64.isIn = new State(State.Inactive)
	let c64 = new Condition()
	c64.type = Condition.Conjunction
	let c65 = new Condition()
	c65.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeFastingSerumTg && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 11.3)
	}
	c64.allOf.push(c65)
	e64.precondition = c64
	let e65 = new Entity()
	e65.type = Entity.EndPoint
	e65.isIn = new State(State.Inactive)
	e65.conditional = false
	e65.id = "low_fasting_serum_no_followup2-2"
	e65.label = "No followup"
	e64.branchTarget = e65
	e64.next.push(e65)
	e65.nextOf.push(e64)
	e56.decisionBranch.push(e64)
	e56.next.push(e64)
	e64.nextOf.push(e56)
	e56.next.push(e57)
	e57.nextOf.push(e56)
	e55.next.push(e56)
	e56.nextOf.push(e55)
	e54.branchTarget = e55
	e54.next.push(e55)
	e55.nextOf.push(e54)
	e53.decisionBranch.push(e54)
	let e66 = new Entity()
	e66.type = Entity.DecisionBranch
	e66.isIn = new State(State.Inactive)
	let c66 = new Condition()
	c66.type = Condition.Conjunction
	let c67 = new Condition()
	c67.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeMalnutrition && obs.ObservationdotvalueBoolean == true)
	}
	c66.allOf.push(c67)
	e66.precondition = c66
	let e67 = new Entity()
	e67.isIn = new State(State.Inactive)
	e67.conditional = false
	e67.involvesAction = false
	e67.id = "prescribe_lifestyle_changes_judiciously-2"
	e67.label = "Judicious lifestyle changes"
	e67.next.push(e56)
	e56.nextOf.push(e67)
	e66.branchTarget = e67
	e66.next.push(e67)
	e67.nextOf.push(e66)
	e53.decisionBranch.push(e66)
	e53.next.push(e54)
	e54.nextOf.push(e53)
	e53.next.push(e66)
	e66.nextOf.push(e53)
	e52.branchTarget = e53
	e52.next.push(e53)
	e53.nextOf.push(e52)
	e51.decisionBranch.push(e52)
	let e68 = new Entity()
	e68.type = Entity.DecisionBranch
	e68.isIn = new State(State.Inactive)
	let c68 = new Condition()
	c68.type = Condition.Conjunction
	let c69 = new Condition()
	c69.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeFastingSerumTg && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 5.65)
	}
	c68.allOf.push(c69)
	e68.precondition = c68
	let e69 = new Entity()
	e69.type = Entity.EndPoint
	e69.isIn = new State(State.Inactive)
	e69.conditional = false
	e69.id = "low_fasting_serum_no_followup-2"
	e69.label = "No followup"
	e68.branchTarget = e69
	e68.next.push(e69)
	e69.nextOf.push(e68)
	e51.decisionBranch.push(e68)
	e51.next.push(e52)
	e52.nextOf.push(e51)
	e51.next.push(e68)
	e68.nextOf.push(e51)
	e50.branchTarget = e51
	e50.next.push(e51)
	e51.nextOf.push(e50)
	e49.decisionBranch.push(e50)
	let e70 = new Entity()
	e70.type = Entity.DecisionBranch
	e70.isIn = new State(State.Inactive)
	let c70 = new Condition()
	c70.type = Condition.Conjunction
	let c71 = new Condition()
	c71.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeStatinPrescribed && obs.ObservationdotvalueBoolean == false)
	}
	c70.allOf.push(c71)
	e70.precondition = c70
	let e71 = new Entity()
	e71.type = Entity.EndPoint
	e71.isIn = new State(State.Inactive)
	e71.conditional = false
	e71.id = "no_statin_no_followup-2"
	e71.label = "No followup"
	e70.branchTarget = e71
	e70.next.push(e71)
	e71.nextOf.push(e70)
	e49.decisionBranch.push(e70)
	e49.next.push(e50)
	e50.nextOf.push(e49)
	e49.next.push(e70)
	e70.nextOf.push(e49)
	e20.next.push(e49)
	e49.nextOf.push(e20)
	e19.subTask.push(e20)
	e20.subTaskOf = e19
	e19.subTask.push(e51)
	e51.subTaskOf = e19
	e19.subTask.push(e49)
	e49.subTaskOf = e19
	e19.subTask.push(e71)
	e71.subTaskOf = e19
	e19.subTask.push(e61)
	e61.subTaskOf = e19
	e19.subTask.push(e63)
	e63.subTaskOf = e19
	e19.subTask.push(e58)
	e58.subTaskOf = e19
	e19.subTask.push(e59)
	e59.subTaskOf = e19
	e19.subTask.push(e53)
	e53.subTaskOf = e19
	e19.subTask.push(e56)
	e56.subTaskOf = e19
	e19.subTask.push(e69)
	e69.subTaskOf = e19
	e19.subTask.push(e55)
	e55.subTaskOf = e19
	e19.subTask.push(e65)
	e65.subTaskOf = e19
	e19.subTask.push(e67)
	e67.subTaskOf = e19
	let e72 = new Entity()
	e72.type = Entity.CompositeTask
	e72.isIn = new State(State.Inactive)
	e72.conditional = false
	e72.id = "Followup_Lipid_Profile-2"
	e72.label = "Followup Lipid Profile"
	let e73 = new Entity()
	e73.type = Entity.EndPoint
	e73.isIn = new State(State.Inactive)
	e73.conditional = false
	e73.id = "yes_reassess_followup-2"
	e73.label = "Followup lipid profile"
	e72.subTask.push(e73)
	e73.subTaskOf = e72
	let e74 = new Entity()
	e74.type = Entity.DecisionTask
	e74.isIn = new State(State.Inactive)
	e74.conditional = false
	e74.id = "assess_current_treatment-2"
	e74.label = "Already on statins?"
	let e75 = new Entity()
	e75.type = Entity.DecisionBranch
	e75.isIn = new State(State.Inactive)
	let c72 = new Condition()
	c72.type = Condition.Conjunction
	let c73 = new Condition()
	c73.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePatientOnStatins && obs.ObservationdotvalueBoolean == false)
	}
	c72.allOf.push(c73)
	e75.precondition = c72
	let e76 = new Entity()
	e76.type = Entity.DecisionTask
	e76.isIn = new State(State.Inactive)
	e76.conditional = false
	e76.id = "reassess_10_year_cv_risk-2"
	e76.label = "Reassessing 10 year CV risk?"
	let e77 = new Entity()
	e77.type = Entity.DecisionBranch
	e77.isIn = new State(State.Inactive)
	let c74 = new Condition()
	c74.type = Condition.Conjunction
	let c75 = new Condition()
	c75.check = function (obs) {
		return (obs.Observationdotcode.type == Code.code10YearCvRisk && obs.ObservationdotvalueBoolean == false)
	}
	c74.allOf.push(c75)
	e77.precondition = c74
	let e78 = new Entity()
	e78.type = Entity.EndPoint
	e78.isIn = new State(State.Inactive)
	e78.conditional = false
	e78.id = "no_reassess_no_followup-2"
	e78.label = "No followup"
	e77.branchTarget = e78
	e77.next.push(e78)
	e78.nextOf.push(e77)
	e76.decisionBranch.push(e77)
	let e79 = new Entity()
	e79.type = Entity.DecisionBranch
	e79.isIn = new State(State.Inactive)
	let c76 = new Condition()
	c76.type = Condition.Conjunction
	let c77 = new Condition()
	c77.check = function (obs) {
		return (obs.Observationdotcode.type == Code.code10YearCvRisk && obs.ObservationdotvalueBoolean == true)
	}
	c76.allOf.push(c77)
	e79.precondition = c76
	e79.branchTarget = e73
	e79.next.push(e73)
	e73.nextOf.push(e79)
	e76.decisionBranch.push(e79)
	e76.next.push(e77)
	e77.nextOf.push(e76)
	e76.next.push(e79)
	e79.nextOf.push(e76)
	e75.branchTarget = e76
	e75.next.push(e76)
	e76.nextOf.push(e75)
	e74.decisionBranch.push(e75)
	let e80 = new Entity()
	e80.type = Entity.DecisionBranch
	e80.isIn = new State(State.Inactive)
	let c78 = new Condition()
	c78.type = Condition.Conjunction
	let c79 = new Condition()
	c79.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePatientOnStatins && obs.ObservationdotvalueBoolean == true)
	}
	c78.allOf.push(c79)
	e80.precondition = c78
	let e81 = new Entity()
	e81.type = Entity.EndPoint
	e81.isIn = new State(State.Inactive)
	e81.conditional = false
	e81.id = "yes_statins_no_followup-2"
	e81.label = "No followup"
	e80.branchTarget = e81
	e80.next.push(e81)
	e81.nextOf.push(e80)
	e74.decisionBranch.push(e80)
	e74.next.push(e75)
	e75.nextOf.push(e74)
	e74.next.push(e80)
	e80.nextOf.push(e74)
	e72.subTask.push(e74)
	e74.subTaskOf = e72
	let e82 = new Entity()
	e82.type = Entity.DecisionTask
	e82.isIn = new State(State.Inactive)
	e82.conditional = false
	e82.id = "assess_suspect_sec_cause-2"
	e82.label = "Suspect secondary dyslipidemia cause?"
	let e83 = new Entity()
	e83.type = Entity.DecisionBranch
	e83.isIn = new State(State.Inactive)
	let c80 = new Condition()
	c80.type = Condition.Conjunction
	let c81 = new Condition()
	c81.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeSecCause && obs.ObservationdotvalueBoolean == false)
	}
	c80.allOf.push(c81)
	e83.precondition = c80
	e83.branchTarget = e74
	e83.next.push(e74)
	e74.nextOf.push(e83)
	e82.decisionBranch.push(e83)
	let e84 = new Entity()
	e84.type = Entity.DecisionBranch
	e84.isIn = new State(State.Inactive)
	let c82 = new Condition()
	c82.type = Condition.Conjunction
	let c83 = new Condition()
	c83.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeSecCause && obs.ObservationdotvalueBoolean == true)
	}
	c82.allOf.push(c83)
	e84.precondition = c82
	let e85 = new Entity()
	e85.type = Entity.EndPoint
	e85.isIn = new State(State.Inactive)
	e85.conditional = false
	e85.id = "sec_cause_followup-2"
	e85.label = "Followup lipid profile"
	e84.branchTarget = e85
	e84.next.push(e85)
	e85.nextOf.push(e84)
	e82.decisionBranch.push(e84)
	e82.next.push(e83)
	e83.nextOf.push(e82)
	e82.next.push(e84)
	e84.nextOf.push(e82)
	e72.subTask.push(e82)
	e82.subTaskOf = e72
	e72.subTask.push(e85)
	e85.subTaskOf = e72
	e72.subTask.push(e81)
	e81.subTaskOf = e72
	e72.subTask.push(e78)
	e78.subTaskOf = e72
	e72.subTask.push(e76)
	e76.subTaskOf = e72
	e19.next.push(e72)
	e72.nextOf.push(e19)
	e0.subTask.push(e19)
	e19.subTaskOf = e0
	let e86 = new Entity()
	e86.type = Entity.CompositeTask
	e86.isIn = new State(State.Inactive)
	e86.conditional = false
	e86.id = "Evaluate_Lipid_Profile"
	e86.label = "Evaluate Lipid Profile"
	let e87 = new Entity()
	e87.type = Entity.DecisionTask
	e87.isIn = new State(State.Inactive)
	e87.conditional = false
	e87.id = "rule_out_secondary_causes"
	e87.label = "Rule out secondary causes"
	let e88 = new Entity()
	e88.type = Entity.DecisionBranch
	e88.isIn = new State(State.Inactive)
	let c84 = new Condition()
	c84.type = Condition.Conjunction
	let c85 = new Condition()
	c85.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeNoSecondaryCauses && obs.ObservationdotvalueBoolean == true)
	}
	c84.allOf.push(c85)
	e88.precondition = c84
	let e89 = new Entity()
	e89.type = Entity.EndPoint
	e89.isIn = new State(State.Inactive)
	e89.conditional = false
	e89.id = "no_secondary_causes_found"
	e89.label = "No secondary causes"
	e88.branchTarget = e89
	e88.next.push(e89)
	e89.nextOf.push(e88)
	e87.decisionBranch.push(e88)
	let e90 = new Entity()
	e90.type = Entity.DecisionBranch
	e90.isIn = new State(State.Inactive)
	let c86 = new Condition()
	c86.type = Condition.Disjunction
	let c87 = new Condition()
	c87.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeNephroticSyndrome && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c87)
	let c88 = new Condition()
	c88.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeHypothyroidism && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c88)
	let c89 = new Condition()
	c89.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeDiabetes && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c89)
	let c90 = new Condition()
	c90.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeExcessiveAlcoholConsumption && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c90)
	let c91 = new Condition()
	c91.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeLiverDisease && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c91)
	let c92 = new Condition()
	c92.check = function (obs) {
		return (obs.Observationdotcode.type == Code.code13CisRetiniocAcid && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c92)
	let c93 = new Condition()
	c93.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeAntiConvulsant && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c93)
	let c94 = new Condition()
	c94.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeHighlyActiveAntiRetroviralTherapy && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c94)
	let c95 = new Condition()
	c95.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeAndrogens && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c95)
	let c96 = new Condition()
	c96.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeOralContraceptives && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c96)
	let c97 = new Condition()
	c97.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeCorticosteroids && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c97)
	let c98 = new Condition()
	c98.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeCyclosporine && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c98)
	let c99 = new Condition()
	c99.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeSirolimus && obs.ObservationdotvalueBoolean == true)
	}
	c86.anyOf.push(c99)
	e90.precondition = c86
	let e91 = new Entity()
	e91.type = Entity.EndPoint
	e91.isIn = new State(State.Inactive)
	e91.conditional = false
	e91.id = "secondary_causes_found"
	e91.label = "Treatment or referral"
	e90.branchTarget = e91
	e90.next.push(e91)
	e91.nextOf.push(e90)
	e87.decisionBranch.push(e90)
	e87.next.push(e88)
	e88.nextOf.push(e87)
	e87.next.push(e90)
	e90.nextOf.push(e87)
	e86.subTask.push(e87)
	e87.subTaskOf = e86
	let e92 = new Entity()
	e92.type = Entity.EndPoint
	e92.isIn = new State(State.Inactive)
	e92.conditional = false
	e92.id = "no_dyslipidemia"
	e92.label = "No action"
	e86.subTask.push(e92)
	e92.subTaskOf = e86
	e86.subTask.push(e91)
	e91.subTaskOf = e86
	let e93 = new Entity()
	e93.type = Entity.DecisionTask
	e93.isIn = new State(State.Inactive)
	e93.conditional = false
	e93.id = "measure_lipid_profile"
	e93.label = "Measure lipid profile"
	let e94 = new Entity()
	e94.type = Entity.DecisionBranch
	e94.isIn = new State(State.Inactive)
	let c100 = new Condition()
	c100.type = Condition.Conjunction
	let c101 = new Condition()
	c101.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeAbnormalLipidProfile && obs.ObservationdotvalueBoolean == true)
	}
	c100.allOf.push(c101)
	e94.precondition = c100
	e94.branchTarget = e87
	e94.next.push(e87)
	e87.nextOf.push(e94)
	e93.decisionBranch.push(e94)
	let e95 = new Entity()
	e95.type = Entity.DecisionBranch
	e95.isIn = new State(State.Inactive)
	let c102 = new Condition()
	c102.type = Condition.Conjunction
	let c103 = new Condition()
	c103.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeAbnormalLipidProfile && obs.ObservationdotvalueBoolean == false)
	}
	c102.allOf.push(c103)
	e95.precondition = c102
	e95.branchTarget = e92
	e95.next.push(e92)
	e92.nextOf.push(e95)
	e93.decisionBranch.push(e95)
	e93.next.push(e95)
	e95.nextOf.push(e93)
	e93.next.push(e94)
	e94.nextOf.push(e93)
	e86.subTask.push(e93)
	e93.subTaskOf = e86
	e86.subTask.push(e89)
	e89.subTaskOf = e86
	let e96 = new Entity()
	e96.type = Entity.CompositeTask
	e96.isIn = new State(State.Inactive)
	e96.conditional = false
	e96.id = "Dyslipidemia_Treatment-1"
	e96.label = "Dyslipidemia Treatment"
	let e97 = new Entity()
	e97.type = Entity.EndPoint
	e97.isIn = new State(State.Inactive)
	e97.conditional = false
	e97.id = "prescribe_fibric_acid_pancreatitis-1"
	e97.label = "Prescribe fibric acid"
	e96.subTask.push(e97)
	e97.subTaskOf = e96
	let e98 = new Entity()
	e98.isIn = new State(State.Inactive)
	e98.conditional = false
	e98.involvesAction = false
	e98.id = "prescribe_lifestyle_changes_judiciously-1"
	e98.label = "Judicious lifestyle changes"
	let e99 = new Entity()
	e99.type = Entity.DecisionTask
	e99.isIn = new State(State.Inactive)
	e99.conditional = false
	e99.id = "fasting_serum_tgs_values2-1"
	e99.label = "Check Fasting Serum TGs Values (2)"
	let e100 = new Entity()
	e100.type = Entity.DecisionBranch
	e100.isIn = new State(State.Inactive)
	let c104 = new Condition()
	c104.type = Condition.Conjunction
	let c105 = new Condition()
	c105.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeFastingSerumTg && obs.ObservationdotvalueQuantity.Quantitydotvalue > 11.3)
	}
	c104.allOf.push(c105)
	e100.precondition = c104
	let e101 = new Entity()
	e101.isIn = new State(State.Inactive)
	e101.conditional = false
	e101.involvesAction = false
	e101.id = "avoid_nicotinic_acid-1"
	e101.label = "Avoid nicotinic acid"
	let e102 = new Entity()
	e102.type = Entity.DecisionTask
	e102.isIn = new State(State.Inactive)
	e102.conditional = false
	e102.id = "assess_prevent_pancreatitis-1"
	e102.label = "Prevent pancreatitis?"
	let e103 = new Entity()
	e103.type = Entity.DecisionBranch
	e103.isIn = new State(State.Inactive)
	let c106 = new Condition()
	c106.type = Condition.Conjunction
	let c107 = new Condition()
	c107.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePreventPancreatitis && obs.ObservationdotvalueBoolean == false)
	}
	c106.allOf.push(c107)
	e103.precondition = c106
	let e104 = new Entity()
	e104.type = Entity.EndPoint
	e104.isIn = new State(State.Inactive)
	e104.conditional = false
	e104.id = "do_not_prescribe_fibric_acid_pancreatitis-1"
	e104.label = "No fibric acid"
	e103.branchTarget = e104
	e103.next.push(e104)
	e104.nextOf.push(e103)
	e102.decisionBranch.push(e103)
	let e105 = new Entity()
	e105.type = Entity.DecisionBranch
	e105.isIn = new State(State.Inactive)
	let c108 = new Condition()
	c108.type = Condition.Conjunction
	let c109 = new Condition()
	c109.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePreventPancreatitis && obs.ObservationdotvalueBoolean == true)
	}
	c108.allOf.push(c109)
	e105.precondition = c108
	e105.branchTarget = e97
	e105.next.push(e97)
	e97.nextOf.push(e105)
	e102.decisionBranch.push(e105)
	e102.next.push(e103)
	e103.nextOf.push(e102)
	e102.next.push(e105)
	e105.nextOf.push(e102)
	e101.next.push(e102)
	e102.nextOf.push(e101)
	e100.branchTarget = e101
	e100.next.push(e101)
	e101.nextOf.push(e100)
	e99.decisionBranch.push(e100)
	let e106 = new Entity()
	e106.type = Entity.DecisionBranch
	e106.isIn = new State(State.Inactive)
	let c110 = new Condition()
	c110.type = Condition.Conjunction
	let c111 = new Condition()
	c111.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeFastingSerumTg && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 11.3)
	}
	c110.allOf.push(c111)
	e106.precondition = c110
	let e107 = new Entity()
	e107.type = Entity.EndPoint
	e107.isIn = new State(State.Inactive)
	e107.conditional = false
	e107.id = "low_fasting_serum_no_followup2-1"
	e107.label = "No followup"
	e106.branchTarget = e107
	e106.next.push(e107)
	e107.nextOf.push(e106)
	e99.decisionBranch.push(e106)
	e99.next.push(e100)
	e100.nextOf.push(e99)
	e99.next.push(e106)
	e106.nextOf.push(e99)
	e98.next.push(e99)
	e99.nextOf.push(e98)
	e96.subTask.push(e98)
	e98.subTaskOf = e96
	e96.subTask.push(e101)
	e101.subTaskOf = e96
	let e108 = new Entity()
	e108.type = Entity.DecisionTask
	e108.isIn = new State(State.Inactive)
	e108.conditional = false
	e108.id = "fasting_serum_tgs_values-1"
	e108.label = "Check Fasting Serum TGs Values"
	let e109 = new Entity()
	e109.type = Entity.DecisionBranch
	e109.isIn = new State(State.Inactive)
	let c112 = new Condition()
	c112.type = Condition.Conjunction
	let c113 = new Condition()
	c113.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeFastingSerumTg && obs.ObservationdotvalueQuantity.Quantitydotvalue > 5.65)
	}
	c112.allOf.push(c113)
	e109.precondition = c112
	let e110 = new Entity()
	e110.type = Entity.DecisionTask
	e110.isIn = new State(State.Inactive)
	e110.conditional = false
	e110.id = "assess_malnutrition-1"
	e110.label = "Malnutrition?"
	let e111 = new Entity()
	e111.type = Entity.DecisionBranch
	e111.isIn = new State(State.Inactive)
	let c114 = new Condition()
	c114.type = Condition.Conjunction
	let c115 = new Condition()
	c115.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeMalnutrition && obs.ObservationdotvalueBoolean == false)
	}
	c114.allOf.push(c115)
	e111.precondition = c114
	let e112 = new Entity()
	e112.isIn = new State(State.Inactive)
	e112.conditional = false
	e112.involvesAction = false
	e112.id = "prescribe_lifestyle_changes-1"
	e112.label = "Lifestyle changes"
	e112.next.push(e99)
	e99.nextOf.push(e112)
	e111.branchTarget = e112
	e111.next.push(e112)
	e112.nextOf.push(e111)
	e110.decisionBranch.push(e111)
	let e113 = new Entity()
	e113.type = Entity.DecisionBranch
	e113.isIn = new State(State.Inactive)
	let c116 = new Condition()
	c116.type = Condition.Conjunction
	let c117 = new Condition()
	c117.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeMalnutrition && obs.ObservationdotvalueBoolean == true)
	}
	c116.allOf.push(c117)
	e113.precondition = c116
	e113.branchTarget = e98
	e113.next.push(e98)
	e98.nextOf.push(e113)
	e110.decisionBranch.push(e113)
	e110.next.push(e111)
	e111.nextOf.push(e110)
	e110.next.push(e113)
	e113.nextOf.push(e110)
	e109.branchTarget = e110
	e109.next.push(e110)
	e110.nextOf.push(e109)
	e108.decisionBranch.push(e109)
	let e114 = new Entity()
	e114.type = Entity.DecisionBranch
	e114.isIn = new State(State.Inactive)
	let c118 = new Condition()
	c118.type = Condition.Conjunction
	let c119 = new Condition()
	c119.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeFastingSerumTg && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 5.65)
	}
	c118.allOf.push(c119)
	e114.precondition = c118
	let e115 = new Entity()
	e115.type = Entity.EndPoint
	e115.isIn = new State(State.Inactive)
	e115.conditional = false
	e115.id = "low_fasting_serum_no_followup-1"
	e115.label = "No followup"
	e114.branchTarget = e115
	e114.next.push(e115)
	e115.nextOf.push(e114)
	e108.decisionBranch.push(e114)
	e108.next.push(e114)
	e114.nextOf.push(e108)
	e108.next.push(e109)
	e109.nextOf.push(e108)
	e96.subTask.push(e108)
	e108.subTaskOf = e96
	e96.subTask.push(e102)
	e102.subTaskOf = e96
	e96.subTask.push(e107)
	e107.subTaskOf = e96
	e96.subTask.push(e112)
	e112.subTaskOf = e96
	e96.subTask.push(e99)
	e99.subTaskOf = e96
	let e116 = new Entity()
	e116.type = Entity.CompositeTask
	e116.isIn = new State(State.Inactive)
	e116.conditional = false
	e116.id = "Pharmacological_Cholesterol_Lowering_Treatment-1"
	e116.label = "Pharmacological Cholesterol Lowering Treatment"
	let e117 = new Entity()
	e117.type = Entity.EndPoint
	e117.isIn = new State(State.Inactive)
	e117.conditional = false
	e117.id = "no_statin_treatment_low_risk-1"
	e117.label = "do not initiate statins"
	e116.subTask.push(e117)
	e117.subTaskOf = e116
	let e118 = new Entity()
	e118.type = Entity.EndPoint
	e118.isIn = new State(State.Inactive)
	e118.conditional = false
	e118.id = "treat_statin_egfr-1"
	e118.label = "treat with statins"
	e116.subTask.push(e118)
	e118.subTaskOf = e116
	let e119 = new Entity()
	e119.type = Entity.EndPoint
	e119.isIn = new State(State.Inactive)
	e119.conditional = false
	e119.id = "treat_statin_high_risk-1"
	e119.label = "treat with statin"
	e116.subTask.push(e119)
	e119.subTaskOf = e116
	let e120 = new Entity()
	e120.type = Entity.EndPoint
	e120.isIn = new State(State.Inactive)
	e120.conditional = false
	e120.id = "do_not_initiate_statins-1"
	e120.label = "do not initiate statins"
	e116.subTask.push(e120)
	e120.subTaskOf = e116
	let e121 = new Entity()
	e121.type = Entity.EndPoint
	e121.isIn = new State(State.Inactive)
	e121.conditional = false
	e121.id = "treat_statin_no_dialysis-1"
	e121.label = "treat with statins or statin/ezetimibe"
	e116.subTask.push(e121)
	e121.subTaskOf = e116
	let e122 = new Entity()
	e122.type = Entity.DecisionTask
	e122.isIn = new State(State.Inactive)
	e122.conditional = false
	e122.id = "assess_kidney_transplant-1"
	e122.label = "Kidney transplant?"
	let e123 = new Entity()
	e123.type = Entity.DecisionBranch
	e123.isIn = new State(State.Inactive)
	let c120 = new Condition()
	c120.type = Condition.Conjunction
	let c121 = new Condition()
	c121.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeKidneyTransplant && obs.ObservationdotvalueBoolean == false)
	}
	c120.allOf.push(c121)
	e123.precondition = c120
	let e124 = new Entity()
	e124.type = Entity.DecisionTask
	e124.isIn = new State(State.Inactive)
	e124.conditional = false
	e124.id = "assess_dialysis_treatment-1"
	e124.label = "Treatment with dialysis?"
	let e125 = new Entity()
	e125.type = Entity.DecisionBranch
	e125.isIn = new State(State.Inactive)
	let c122 = new Condition()
	c122.type = Condition.Conjunction
	let c123 = new Condition()
	c123.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeDialysisTreatment && obs.ObservationdotvalueBoolean == false)
	}
	c122.allOf.push(c123)
	e125.precondition = c122
	let e126 = new Entity()
	e126.type = Entity.DecisionTask
	e126.isIn = new State(State.Inactive)
	e126.conditional = false
	e126.id = "assess_age_no_dialysis-1"
	e126.label = "Age?"
	let e127 = new Entity()
	e127.type = Entity.DecisionBranch
	e127.isIn = new State(State.Inactive)
	let c124 = new Condition()
	c124.type = Condition.Conjunction
	let c125 = new Condition()
	c125.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeAge && obs.ObservationdotvalueQuantity.Quantitydotvalue >= 50)
	}
	c124.allOf.push(c125)
	e127.precondition = c124
	e127.branchTarget = e121
	e127.next.push(e121)
	e121.nextOf.push(e127)
	e126.decisionBranch.push(e127)
	let e128 = new Entity()
	e128.type = Entity.DecisionBranch
	e128.isIn = new State(State.Inactive)
	let c126 = new Condition()
	c126.type = Condition.Conjunction
	let c127 = new Condition()
	c127.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeAge && obs.ObservationdotvalueQuantity.Quantitydotvalue >= 18 && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 49)
	}
	c126.allOf.push(c127)
	e128.precondition = c126
	let e129 = new Entity()
	e129.type = Entity.DecisionTask
	e129.isIn = new State(State.Inactive)
	e129.conditional = false
	e129.id = "assess_cv_risk-1"
	e129.label = "assess CV risk"
	let e130 = new Entity()
	e130.type = Entity.DecisionBranch
	e130.isIn = new State(State.Inactive)
	let c128 = new Condition()
	c128.type = Condition.Conjunction
	let c129 = new Condition()
	c129.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeNoCvRiskFactors && obs.ObservationdotvalueBoolean == true)
	}
	c128.allOf.push(c129)
	e130.precondition = c128
	e130.branchTarget = e117
	e130.next.push(e117)
	e117.nextOf.push(e130)
	e129.decisionBranch.push(e130)
	let e131 = new Entity()
	e131.type = Entity.DecisionBranch
	e131.isIn = new State(State.Inactive)
	let c130 = new Condition()
	c130.type = Condition.Disjunction
	let c131 = new Condition()
	c131.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePriorMi && obs.ObservationdotvalueBoolean == true)
	}
	c130.anyOf.push(c131)
	let c132 = new Condition()
	c132.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePriorCoronaryRevascularization && obs.ObservationdotvalueBoolean == true)
	}
	c130.anyOf.push(c132)
	let c133 = new Condition()
	c133.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePriorIschemicStroke && obs.ObservationdotvalueBoolean == true)
	}
	c130.anyOf.push(c133)
	let c134 = new Condition()
	c134.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codePriorTransientIschemicAttack && obs.ObservationdotvalueBoolean == true)
	}
	c130.anyOf.push(c134)
	let c135 = new Condition()
	c135.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeDiabetes && obs.ObservationdotvalueBoolean == true)
	}
	c130.anyOf.push(c135)
	let c136 = new Condition()
	c136.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeEstimated10YearIncidenceCoronaryDeath && obs.ObservationdotvalueBoolean == true)
	}
	c130.anyOf.push(c136)
	let c137 = new Condition()
	c137.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeLikelihoodNonFatalMi && obs.ObservationdotvalueQuantity.Quantitydotvalue > 10)
	}
	c130.anyOf.push(c137)
	e131.precondition = c130
	e131.branchTarget = e119
	e131.next.push(e119)
	e119.nextOf.push(e131)
	e129.decisionBranch.push(e131)
	e129.next.push(e131)
	e131.nextOf.push(e129)
	e129.next.push(e130)
	e130.nextOf.push(e129)
	e128.branchTarget = e129
	e128.next.push(e129)
	e129.nextOf.push(e128)
	e126.decisionBranch.push(e128)
	e126.next.push(e127)
	e127.nextOf.push(e126)
	e126.next.push(e128)
	e128.nextOf.push(e126)
	e125.branchTarget = e126
	e125.next.push(e126)
	e126.nextOf.push(e125)
	e124.decisionBranch.push(e125)
	let e132 = new Entity()
	e132.type = Entity.DecisionBranch
	e132.isIn = new State(State.Inactive)
	let c138 = new Condition()
	c138.type = Condition.Conjunction
	let c139 = new Condition()
	c139.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeDialysisTreatment && obs.ObservationdotvalueBoolean == true)
	}
	c138.allOf.push(c139)
	e132.precondition = c138
	let e133 = new Entity()
	e133.type = Entity.DecisionTask
	e133.isIn = new State(State.Inactive)
	e133.conditional = false
	e133.id = "assess_statin_use-1"
	e133.label = "Using statins or statin/ezetimibe?"
	let e134 = new Entity()
	e134.type = Entity.DecisionBranch
	e134.isIn = new State(State.Inactive)
	let c140 = new Condition()
	c140.type = Condition.Conjunction
	let c141 = new Condition()
	c141.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeStatinEzetimibe && obs.ObservationdotvalueBoolean == false)
	}
	c140.allOf.push(c141)
	e134.precondition = c140
	e134.branchTarget = e120
	e134.next.push(e120)
	e120.nextOf.push(e134)
	e133.decisionBranch.push(e134)
	let e135 = new Entity()
	e135.type = Entity.DecisionBranch
	e135.isIn = new State(State.Inactive)
	let c142 = new Condition()
	c142.type = Condition.Conjunction
	let c143 = new Condition()
	c143.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeStatinEzetimibe && obs.ObservationdotvalueBoolean == true)
	}
	c142.allOf.push(c143)
	e135.precondition = c142
	let e136 = new Entity()
	e136.type = Entity.EndPoint
	e136.isIn = new State(State.Inactive)
	e136.conditional = false
	e136.id = "continue_statin_treatment-1"
	e136.label = "continue statin or statin/ezetimibe"
	e135.branchTarget = e136
	e135.next.push(e136)
	e136.nextOf.push(e135)
	e133.decisionBranch.push(e135)
	e133.next.push(e134)
	e134.nextOf.push(e133)
	e133.next.push(e135)
	e135.nextOf.push(e133)
	e132.branchTarget = e133
	e132.next.push(e133)
	e133.nextOf.push(e132)
	e124.decisionBranch.push(e132)
	e124.next.push(e132)
	e132.nextOf.push(e124)
	e124.next.push(e125)
	e125.nextOf.push(e124)
	e123.branchTarget = e124
	e123.next.push(e124)
	e124.nextOf.push(e123)
	e122.decisionBranch.push(e123)
	let e137 = new Entity()
	e137.type = Entity.DecisionBranch
	e137.isIn = new State(State.Inactive)
	let c144 = new Condition()
	c144.type = Condition.Conjunction
	let c145 = new Condition()
	c145.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeKidneyTransplant && obs.ObservationdotvalueBoolean == true)
	}
	c144.allOf.push(c145)
	e137.precondition = c144
	let e138 = new Entity()
	e138.type = Entity.EndPoint
	e138.isIn = new State(State.Inactive)
	e138.conditional = false
	e138.id = "treat_statin_kidney_transplant-1"
	e138.label = "treat with statins"
	e137.branchTarget = e138
	e137.next.push(e138)
	e138.nextOf.push(e137)
	e122.decisionBranch.push(e137)
	e122.next.push(e123)
	e123.nextOf.push(e122)
	e122.next.push(e137)
	e137.nextOf.push(e122)
	e116.subTask.push(e122)
	e122.subTaskOf = e116
	e116.subTask.push(e133)
	e133.subTaskOf = e116
	let e139 = new Entity()
	e139.type = Entity.DecisionTask
	e139.isIn = new State(State.Inactive)
	e139.conditional = false
	e139.id = "assess_egfr_value-1"
	e139.label = "eGFR value?"
	let e140 = new Entity()
	e140.type = Entity.DecisionBranch
	e140.isIn = new State(State.Inactive)
	let c146 = new Condition()
	c146.type = Condition.Conjunction
	let c147 = new Condition()
	c147.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeEgfr && obs.ObservationdotvalueQuantity.Quantitydotvalue < 60)
	}
	c146.allOf.push(c147)
	e140.precondition = c146
	e140.branchTarget = e122
	e140.next.push(e122)
	e122.nextOf.push(e140)
	e139.decisionBranch.push(e140)
	let e141 = new Entity()
	e141.type = Entity.DecisionBranch
	e141.isIn = new State(State.Inactive)
	let c148 = new Condition()
	c148.type = Condition.Conjunction
	let c149 = new Condition()
	c149.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeEgfr && obs.ObservationdotvalueQuantity.Quantitydotvalue >= 60)
	}
	c148.allOf.push(c149)
	e141.precondition = c148
	e141.branchTarget = e118
	e141.next.push(e118)
	e118.nextOf.push(e141)
	e139.decisionBranch.push(e141)
	e139.next.push(e140)
	e140.nextOf.push(e139)
	e139.next.push(e141)
	e141.nextOf.push(e139)
	e116.subTask.push(e139)
	e139.subTaskOf = e116
	e116.subTask.push(e124)
	e124.subTaskOf = e116
	let e142 = new Entity()
	e142.type = Entity.DecisionTask
	e142.isIn = new State(State.Inactive)
	e142.conditional = false
	e142.id = "assess_age_start-1"
	e142.label = "Age?"
	let e143 = new Entity()
	e143.type = Entity.DecisionBranch
	e143.isIn = new State(State.Inactive)
	let c150 = new Condition()
	c150.type = Condition.Conjunction
	let c151 = new Condition()
	c151.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeAge && obs.ObservationdotvalueQuantity.Quantitydotvalue >= 18 && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 49)
	}
	c150.allOf.push(c151)
	e143.precondition = c150
	e143.branchTarget = e122
	e143.next.push(e122)
	e122.nextOf.push(e143)
	e142.decisionBranch.push(e143)
	let e144 = new Entity()
	e144.type = Entity.DecisionBranch
	e144.isIn = new State(State.Inactive)
	let c152 = new Condition()
	c152.type = Condition.Conjunction
	let c153 = new Condition()
	c153.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeAge && obs.ObservationdotvalueQuantity.Quantitydotvalue >= 50)
	}
	c152.allOf.push(c153)
	e144.precondition = c152
	e144.branchTarget = e139
	e144.next.push(e139)
	e139.nextOf.push(e144)
	e142.decisionBranch.push(e144)
	e142.next.push(e144)
	e144.nextOf.push(e142)
	e142.next.push(e143)
	e143.nextOf.push(e142)
	e116.subTask.push(e142)
	e142.subTaskOf = e116
	e116.subTask.push(e138)
	e138.subTaskOf = e116
	e116.subTask.push(e136)
	e136.subTaskOf = e116
	e116.subTask.push(e129)
	e129.subTaskOf = e116
	e116.subTask.push(e126)
	e126.subTaskOf = e116
	let e145 = new Entity()
	e145.type = Entity.DecisionTask
	e145.isIn = new State(State.Inactive)
	e145.conditional = false
	e145.id = "statin_prescribed-1"
	e145.label = "Statins prescribed?"
	let e146 = new Entity()
	e146.type = Entity.DecisionBranch
	e146.isIn = new State(State.Inactive)
	let c154 = new Condition()
	c154.type = Condition.Conjunction
	let c155 = new Condition()
	c155.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeStatinPrescribed && obs.ObservationdotvalueBoolean == true)
	}
	c154.allOf.push(c155)
	e146.precondition = c154
	e146.branchTarget = e108
	e146.next.push(e108)
	e108.nextOf.push(e146)
	e145.decisionBranch.push(e146)
	let e147 = new Entity()
	e147.type = Entity.DecisionBranch
	e147.isIn = new State(State.Inactive)
	let c156 = new Condition()
	c156.type = Condition.Conjunction
	let c157 = new Condition()
	c157.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeStatinPrescribed && obs.ObservationdotvalueBoolean == false)
	}
	c156.allOf.push(c157)
	e147.precondition = c156
	let e148 = new Entity()
	e148.type = Entity.EndPoint
	e148.isIn = new State(State.Inactive)
	e148.conditional = false
	e148.id = "no_statin_no_followup-1"
	e148.label = "No followup"
	e147.branchTarget = e148
	e147.next.push(e148)
	e148.nextOf.push(e147)
	e145.decisionBranch.push(e147)
	e145.next.push(e146)
	e146.nextOf.push(e145)
	e145.next.push(e147)
	e147.nextOf.push(e145)
	e116.next.push(e145)
	e145.nextOf.push(e116)
	e96.subTask.push(e116)
	e116.subTaskOf = e96
	e96.subTask.push(e145)
	e145.subTaskOf = e96
	e96.subTask.push(e110)
	e110.subTaskOf = e96
	e96.subTask.push(e104)
	e104.subTaskOf = e96
	e96.subTask.push(e148)
	e148.subTaskOf = e96
	e96.subTask.push(e115)
	e115.subTaskOf = e96
	e96.next.push(e1)
	e1.nextOf.push(e96)
	e86.next.push(e96)
	e96.nextOf.push(e86)
	e0.subTask.push(e86)
	e86.subTaskOf = e0
	e0.subTask.push(e5)
	e5.subTaskOf = e0
	let e149 = new Entity()
	e149.type = Entity.DecisionTask
	e149.isIn = new State(State.Inactive)
	e149.conditional = false
	e149.id = "prior_lipid_profile"
	e149.label = "Prior lipid profile?"
	let e150 = new Entity()
	e150.type = Entity.DecisionBranch
	e150.isIn = new State(State.Inactive)
	let c158 = new Condition()
	c158.type = Condition.Conjunction
	let c159 = new Condition()
	c159.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeLipidProfile && obs.ObservationdotvalueBoolean == true)
	}
	c158.allOf.push(c159)
	e150.precondition = c158
	e150.branchTarget = e19
	e150.next.push(e19)
	e19.nextOf.push(e150)
	e149.decisionBranch.push(e150)
	let e151 = new Entity()
	e151.type = Entity.DecisionBranch
	e151.isIn = new State(State.Inactive)
	let c160 = new Condition()
	c160.type = Condition.Conjunction
	let c161 = new Condition()
	c161.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeLipidProfile && obs.ObservationdotvalueBoolean == false)
	}
	c160.allOf.push(c161)
	e151.precondition = c160
	e151.branchTarget = e86
	e151.next.push(e86)
	e86.nextOf.push(e151)
	e149.decisionBranch.push(e151)
	e149.next.push(e150)
	e150.nextOf.push(e149)
	e149.next.push(e151)
	e151.nextOf.push(e149)
	e0.subTask.push(e149)
	e149.subTaskOf = e0
	e0.subTask.push(e96)
	e96.subTaskOf = e0
	e0.subTask.push(e72)
	e72.subTaskOf = e0
	
	return e0
}

export var jsonWorkflow = {"id": "Dyslipidemia_CKD","name": "Dyslipidemia CKD Workflow","composed": false,"node_type": "composite_task","workflow_state": "activeState","decisional_state": "chosenState","description": "CKD including those treated with Chronic Dialysis or Kidney Transplant","children": [{"id": "prior_lipid_profile","name": "Prior lipid profile?","composed": true,"in_workflow": "Dyslipidemia_CKD","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "1. In adults with newly identified CKD (including those treated with chronic dialysis or kidney transplantation), we recommend evaluation with a lipid profile (total cholesterol, LDL cholesterol, HDL cholesterol, triglycerides). (1C)\n2. In adults with CKD (including those treated with chronic dialysis or kidney transplantation), follow-up measurement of lipid levels is not required for the majority of patients. (Not Graded)","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_lipid_profile'><\/span><div id='code_lipid_profile' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Prior measurement of lipid profile: <label><input type='radio' name='code_lipid_profile' id='code_lipid_profile-yes' code='code_lipid_profile-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_lipid_profile' id='code_lipid_profile-no' code='code_lipid_profile-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "Dyslipidemia_Treatment-2","name": "Dyslipidemia Treatment","composed": false,"in_workflow": "Dyslipidemia_CKD","node_type": "composite_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "prior lipid profile","description": "Established CKD with previous measurement of lipid profile."},"children": [{"id": "Followup_Lipid_Profile-2","name": "Followup Lipid Profile","composed": false,"in_workflow": "Dyslipidemia_CKD","node_type": "composite_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Follow-up measurement of LDL-C (or entire lipid profile) should be reserved for instances where the results would alter management.","children": [{"id": "assess_suspect_sec_cause-2","name": "Suspect secondary dyslipidemia cause?","composed": true,"in_workflow": "Followup_Lipid_Profile-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Do you suspect the patient has developed a new secondary cause of dyslipidemia?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_sec_cause'><\/span><div id='code_sec_cause' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Suspect secondary dyslipidemia cause?: <label><input type='radio' name='code_sec_cause' id='code_sec_cause-yes' code='code_sec_cause-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_sec_cause' id='code_sec_cause-no' code='code_sec_cause-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "sec_cause_followup-2","name": "Followup lipid profile","composed": false,"in_workflow": "Followup_Lipid_Profile-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes"},"description": "Follow-up measurement of the lipid profile is suggested."},{"id": "assess_current_treatment-2","name": "Already on statins?","composed": false,"in_workflow": "Followup_Lipid_Profile-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no"},"description": "Is the patient already on a statin?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_patient_on_statins'><\/span><div id='code_patient_on_statins' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Already on statins?: <label><input type='radio' name='code_patient_on_statins' id='code_patient_on_statins-yes' code='code_patient_on_statins-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_patient_on_statins' id='code_patient_on_statins-no' code='code_patient_on_statins-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "yes_statins_no_followup-2","name": "No followup","composed": false,"in_workflow": "Followup_Lipid_Profile-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "receiving statins"},"description": "No follow-up measurement of the lipid profile is suggested."},{"id": "reassess_10_year_cv_risk-2","name": "Reassessing 10 year CV risk?","composed": false,"in_workflow": "Followup_Lipid_Profile-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no statins"},"description": "Are you reassessing 10 year CV risk to look for an indication for statin treatment?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_10_year_cv_risk'><\/span><div id='code_10_year_cv_risk' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Reassessing 10 year CV risk?: <label><input type='radio' name='code_10_year_cv_risk' id='code_10_year_cv_risk-yes' code='code_10_year_cv_risk-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_10_year_cv_risk' id='code_10_year_cv_risk-no' code='code_10_year_cv_risk-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "yes_reassess_followup-2","name": "Followup lipid profile","composed": false,"in_workflow": "Followup_Lipid_Profile-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes"},"description": "Some patients may prefer to know their levels: therefore, the need for follow-up can be assessed on a per-patient basis. \n\tHowever, there is no evidence to followup lipid profile."},{"id": "no_reassess_no_followup-2","name": "No followup","composed": false,"in_workflow": "Followup_Lipid_Profile-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no"},"description": "No follow-up measurement of the lipid profile is suggested."}]}]}]}]},{"id": "Pharmacological_Cholesterol_Lowering_Treatment-2","name": "Pharmacological Cholesterol Lowering Treatment","composed": true,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "composite_task","workflow_state": "inactiveState","decisional_state": "chosenState","children": [{"id": "assess_age_start-2","name": "Age?","composed": true,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_age'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>year<\/span>Age? <input type='number' id='code_age' code='code_age' min='1' max='120' step='1' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-120)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "assess_egfr_value-2","name": "eGFR value?","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": ">= 50 years"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_egfr'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>ml\/min\/ 1.73m2<\/span>eGFR value? <input type='number' id='code_egfr' code='code_egfr' min='1' max='200' step='1' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-200)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "treat_statin_egfr-2","name": "treat with statins","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": ">=60","description": ">=60 ml\/min\/ 1.73m2"},"description": "2.1.2: In adults aged >=50 years with CKD and eGFR>=60 ml\/min\/1.73m2 (GFR categories G1-G2) we recommend treatment with a statin. (1B)","insert": "<b>Contra-indications for statins:<\/b>\n<ul style=\"margin: 0; padding: 0 0 0 15px;\">\n\t<li>Active liver disease, high alcohol consumption or pregnancy.<\/li>\n    <li>Women with childbearing potential should only use statin if there is reliable contraception.<\/li>\n<\/ul>\n\n<h3>Recommended doses of statins in adults with CKD<\/h3>\n\n<table class=\"statin_dosages\">\n\t<tr>\n\t\t<th>Statin<\/th>\n\t\t<th><div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G1 - G2 (<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)<\/th>\n\t\t<th>\n\t\t\t<div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G3a - G5\n\t\t\t<div class=\"tooltip2\">**<span>incl. dialysis or kidney transplant patients<\/span><\/div>\n\t\t\t(<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)\n\t\t<\/th>\n\t<\/tr>\n\t<tr>\n\t\t<td><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(60 to >=90 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(up to 59 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Lovastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td><div class=\"tooltip2\">nd<span>not done or not studied<\/span><\/div><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Fluvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>80<div class=\"tooltip2\"><sup>1<\/sup><span>Data based on ALERT.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Atorvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20<div class=\"tooltip2\"><sup>2<\/sup><span>Data based on 4D.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Rosuvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>10<div class=\"tooltip2\"><sup>3<\/sup><span>Data based on AURORA.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin\/Ezetmibe<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20 \/ 10<div class=\"tooltip2\"><sup>4<\/sup><span>Data based on SHARP.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pravastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pitavastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>2 mg\/d<\/td>\n\t<\/tr>\n<\/table>\n\n<p class=\"dosage_note\">** incl. dialysis or kidney transplant patients.<\/p>\n<p class=\"dosage_note\">All statins may not be available in all countries. Lower doses than those used in major trials of statins in CKD populations may be appropriate in Asian countries. Note that rosuvastatin 40mg daily is not recommended for use in CKD 1-2 non- transplant patients, as it may increase the risk of adverse renal events. Cyclosporin inhibits the metabolism of certain statins resulting in higher blood levels. Data based on <sup>1<\/sup>ALERT, <sup>2<\/sup>4D, <sup>3<\/sup>AURORA, <sup>4<\/sup>SHARP. Abbreviations: eGFR, estimated glomerular filtration rate; GP, general population; nd, not done or not studied.<\/p>\n"},{"id": "assess_kidney_transplant-2","name": "Kidney transplant?","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","otherParents": [{"id": "assess_age_start-2","condition": {"label": "18-49 years"}}],"node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "< 60","description": "< 60 ml\/min\/ 1.73m2"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_kidney_transplant'><\/span><div id='code_kidney_transplant' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Kidney transplant?: <label><input type='radio' name='code_kidney_transplant' id='code_kidney_transplant-yes' code='code_kidney_transplant-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_kidney_transplant' id='code_kidney_transplant-no' code='code_kidney_transplant-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "treat_statin_kidney_transplant-2","name": "treat with statins","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes"},"description": "2.4: In adult kidney transplant recipients, we suggest treatment with a statin. (2B)","insert": "<b>Contra-indications for statins:<\/b>\n<ul style=\"margin: 0; padding: 0 0 0 15px;\">\n\t<li>Active liver disease, high alcohol consumption or pregnancy.<\/li>\n    <li>Women with childbearing potential should only use statin if there is reliable contraception.<\/li>\n<\/ul>\n\n<h3>Recommended doses of statins in adults with CKD<\/h3>\n\n<table class=\"statin_dosages\">\n\t<tr>\n\t\t<th>Statin<\/th>\n\t\t<th><div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G1 - G2 (<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)<\/th>\n\t\t<th>\n\t\t\t<div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G3a - G5\n\t\t\t<div class=\"tooltip2\">**<span>incl. dialysis or kidney transplant patients<\/span><\/div>\n\t\t\t(<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)\n\t\t<\/th>\n\t<\/tr>\n\t<tr>\n\t\t<td><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(60 to >=90 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(up to 59 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Lovastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td><div class=\"tooltip2\">nd<span>not done or not studied<\/span><\/div><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Fluvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>80<div class=\"tooltip2\"><sup>1<\/sup><span>Data based on ALERT.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Atorvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20<div class=\"tooltip2\"><sup>2<\/sup><span>Data based on 4D.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Rosuvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>10<div class=\"tooltip2\"><sup>3<\/sup><span>Data based on AURORA.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin\/Ezetmibe<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20 \/ 10<div class=\"tooltip2\"><sup>4<\/sup><span>Data based on SHARP.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pravastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pitavastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>2 mg\/d<\/td>\n\t<\/tr>\n<\/table>\n\n<p class=\"dosage_note\">** incl. dialysis or kidney transplant patients.<\/p>\n<p class=\"dosage_note\">All statins may not be available in all countries. Lower doses than those used in major trials of statins in CKD populations may be appropriate in Asian countries. Note that rosuvastatin 40mg daily is not recommended for use in CKD 1-2 non- transplant patients, as it may increase the risk of adverse renal events. Cyclosporin inhibits the metabolism of certain statins resulting in higher blood levels. Data based on <sup>1<\/sup>ALERT, <sup>2<\/sup>4D, <sup>3<\/sup>AURORA, <sup>4<\/sup>SHARP. Abbreviations: eGFR, estimated glomerular filtration rate; GP, general population; nd, not done or not studied.<\/p>\n"},{"id": "assess_dialysis_treatment-2","name": "Treatment with dialysis?","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_dialysis_treatment'><\/span><div id='code_dialysis_treatment' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Treatment with dialysis?: <label><input type='radio' name='code_dialysis_treatment' id='code_dialysis_treatment-yes' code='code_dialysis_treatment-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_dialysis_treatment' id='code_dialysis_treatment-no' code='code_dialysis_treatment-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "assess_statin_use-2","name": "Using statins or statin/ezetimibe?","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_statin_ezetimibe'><\/span><div id='code_statin_ezetimibe' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Using statins or statin\/ezetimibe?: <label><input type='radio' name='code_statin_ezetimibe' id='code_statin_ezetimibe-yes' code='code_statin_ezetimibe-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_statin_ezetimibe' id='code_statin_ezetimibe-no' code='code_statin_ezetimibe-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "continue_statin_treatment-2","name": "continue statin or statin/ezetimibe","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes"},"description": "2.3.2: In patients already receiving statins or statin\/ezetimibe combination at the time of dialysis initiation, we suggest that these agents be continued. (2C)","insert": "<b>Contra-indications for statins:<\/b>\n<ul style=\"margin: 0; padding: 0 0 0 15px;\">\n\t<li>Active liver disease, high alcohol consumption or pregnancy.<\/li>\n    <li>Women with childbearing potential should only use statin if there is reliable contraception.<\/li>\n<\/ul>\n\n<h3>Recommended doses of statins in adults with CKD<\/h3>\n\n<table class=\"statin_dosages\">\n\t<tr>\n\t\t<th>Statin<\/th>\n\t\t<th><div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G1 - G2 (<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)<\/th>\n\t\t<th>\n\t\t\t<div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G3a - G5\n\t\t\t<div class=\"tooltip2\">**<span>incl. dialysis or kidney transplant patients<\/span><\/div>\n\t\t\t(<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)\n\t\t<\/th>\n\t<\/tr>\n\t<tr>\n\t\t<td><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(60 to >=90 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(up to 59 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Lovastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td><div class=\"tooltip2\">nd<span>not done or not studied<\/span><\/div><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Fluvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>80<div class=\"tooltip2\"><sup>1<\/sup><span>Data based on ALERT.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Atorvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20<div class=\"tooltip2\"><sup>2<\/sup><span>Data based on 4D.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Rosuvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>10<div class=\"tooltip2\"><sup>3<\/sup><span>Data based on AURORA.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin\/Ezetmibe<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20 \/ 10<div class=\"tooltip2\"><sup>4<\/sup><span>Data based on SHARP.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pravastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pitavastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>2 mg\/d<\/td>\n\t<\/tr>\n<\/table>\n\n<p class=\"dosage_note\">** incl. dialysis or kidney transplant patients.<\/p>\n<p class=\"dosage_note\">All statins may not be available in all countries. Lower doses than those used in major trials of statins in CKD populations may be appropriate in Asian countries. Note that rosuvastatin 40mg daily is not recommended for use in CKD 1-2 non- transplant patients, as it may increase the risk of adverse renal events. Cyclosporin inhibits the metabolism of certain statins resulting in higher blood levels. Data based on <sup>1<\/sup>ALERT, <sup>2<\/sup>4D, <sup>3<\/sup>AURORA, <sup>4<\/sup>SHARP. Abbreviations: eGFR, estimated glomerular filtration rate; GP, general population; nd, not done or not studied.<\/p>\n"},{"id": "do_not_initiate_statins-2","name": "do not initiate statins","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no"},"description": "2.3.1: In adults with dialysis-dependent CKD, we suggest that statins or statin\/ezetimibe combination not be initiated. (2A)"}]},{"id": "assess_age_no_dialysis-2","name": "Age?","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_age'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>year<\/span>Age? <input type='number' id='code_age' code='code_age' min='1' max='120' step='1' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-120)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "assess_cv_risk-2","name": "assess CV risk","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "18-49 years"},"description": "Note that CV risk should be re-assessed on an annual basis, as changes in clinical condition may warrant treatment with a statin.","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_no_cv_risk_factors'><\/span><label><input type='checkbox' id='code_no_cv_risk_factors' code='code_no_cv_risk_factors' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_prior_mi,code_prior_coronary_revascularization,code_prior_ischemic_stroke,code_prior_transient_ischemic_attack,code_diabetes,code_estimated_10-year_incidence_coronary_death,code_likelihood_non_fatal_mi' mandatory='false' \/>No CV risk factors<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_prior_mi'><\/span><label><input type='checkbox' id='code_prior_mi' code='code_prior_mi' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_cv_risk_factors' mandatory='false' \/>Prior MI?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_prior_coronary_revascularization'><\/span><label><input type='checkbox' id='code_prior_coronary_revascularization' code='code_prior_coronary_revascularization' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_cv_risk_factors' mandatory='false' \/>Prior Coronary Revascularization?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_prior_ischemic_stroke'><\/span><label><input type='checkbox' id='code_prior_ischemic_stroke' code='code_prior_ischemic_stroke' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_cv_risk_factors' mandatory='false' \/>Prior ischemic stroke?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_prior_transient_ischemic_attack'><\/span><label><input type='checkbox' id='code_prior_transient_ischemic_attack' code='code_prior_transient_ischemic_attack' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_cv_risk_factors' mandatory='false' \/>Prior transient ischemic attack?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_diabetes'><\/span><label><input type='checkbox' id='code_diabetes' code='code_diabetes' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_cv_risk_factors' mandatory='false' \/>Diabetes?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_estimated_10-year_incidence_coronary_death'><\/span><label><input type='checkbox' id='code_estimated_10-year_incidence_coronary_death' code='code_estimated_10-year_incidence_coronary_death' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_cv_risk_factors' mandatory='false' \/>Estimated 10-year incidence of coronary death?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_likelihood_non_fatal_mi'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>%<\/span>Likelihood of non-fatal MI (<a href=\"https:\/\/www.mdcalc.com\/framingham-risk-score-hard-coronary-heart-disease\" target=\"_blank\">calculate<\/a>) <input type='number' id='code_likelihood_non_fatal_mi' code='code_likelihood_non_fatal_mi' min='1' max='100' step='1' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-100)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "treat_statin_high_risk-2","name": "treat with statin","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "high risk","description": "Prior MI or\nPrior Coronary revascularization or\nPrior ischemic stroke or Transient ischemic attack or\nDiabetes or\nEstimated 10-year incidence of coronary death or non-fatal MI >10% using a validated risk calculator"},"description": "2.2: In adults aged 18\u201349 years with CKD but not treated with chronic dialysis or kidney transplantation, we\nsuggest statin treatment in people with one or more of the following (2A):\n\u2022\tknown coronary disease (myocardial infarction or coronary revascularization)\n\u2022\tdiabetes mellitus\n\u2022\tprior ischemic stroke\n\u2022\testimated 10-year incidence of coronary death or non-fatal myocardial infarction >10%","insert": "<b>Contra-indications for statins:<\/b>\n<ul style=\"margin: 0; padding: 0 0 0 15px;\">\n\t<li>Active liver disease, high alcohol consumption or pregnancy.<\/li>\n    <li>Women with childbearing potential should only use statin if there is reliable contraception.<\/li>\n<\/ul>\n\n<h3>Recommended doses of statins in adults with CKD<\/h3>\n\n<table class=\"statin_dosages\">\n\t<tr>\n\t\t<th>Statin<\/th>\n\t\t<th><div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G1 - G2 (<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)<\/th>\n\t\t<th>\n\t\t\t<div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G3a - G5\n\t\t\t<div class=\"tooltip2\">**<span>incl. dialysis or kidney transplant patients<\/span><\/div>\n\t\t\t(<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)\n\t\t<\/th>\n\t<\/tr>\n\t<tr>\n\t\t<td><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(60 to >=90 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(up to 59 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Lovastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td><div class=\"tooltip2\">nd<span>not done or not studied<\/span><\/div><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Fluvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>80<div class=\"tooltip2\"><sup>1<\/sup><span>Data based on ALERT.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Atorvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20<div class=\"tooltip2\"><sup>2<\/sup><span>Data based on 4D.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Rosuvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>10<div class=\"tooltip2\"><sup>3<\/sup><span>Data based on AURORA.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin\/Ezetmibe<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20 \/ 10<div class=\"tooltip2\"><sup>4<\/sup><span>Data based on SHARP.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pravastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pitavastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>2 mg\/d<\/td>\n\t<\/tr>\n<\/table>\n\n<p class=\"dosage_note\">** incl. dialysis or kidney transplant patients.<\/p>\n<p class=\"dosage_note\">All statins may not be available in all countries. Lower doses than those used in major trials of statins in CKD populations may be appropriate in Asian countries. Note that rosuvastatin 40mg daily is not recommended for use in CKD 1-2 non- transplant patients, as it may increase the risk of adverse renal events. Cyclosporin inhibits the metabolism of certain statins resulting in higher blood levels. Data based on <sup>1<\/sup>ALERT, <sup>2<\/sup>4D, <sup>3<\/sup>AURORA, <sup>4<\/sup>SHARP. Abbreviations: eGFR, estimated glomerular filtration rate; GP, general population; nd, not done or not studied.<\/p>\n"},{"id": "no_statin_treatment_low_risk-2","name": "do not initiate statins","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no","description": "No CV risk factor or \nEstimated 10-year incidence of coronary death or non-fatal MI >10% using a validated risk calculator"}}]},{"id": "treat_statin_no_dialysis-2","name": "treat with statins or statin/ezetimibe","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": ">= 50 years"},"insert": "<b>Contra-indications for statins:<\/b>\n<ul style=\"margin: 0; padding: 0 0 0 15px;\">\n\t<li>Active liver disease, high alcohol consumption or pregnancy.<\/li>\n    <li>Women with childbearing potential should only use statin if there is reliable contraception.<\/li>\n<\/ul>\n\n<h3>Recommended doses of statins in adults with CKD<\/h3>\n\n<table class=\"statin_dosages\">\n\t<tr>\n\t\t<th>Statin<\/th>\n\t\t<th><div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G1 - G2 (<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)<\/th>\n\t\t<th>\n\t\t\t<div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G3a - G5\n\t\t\t<div class=\"tooltip2\">**<span>incl. dialysis or kidney transplant patients<\/span><\/div>\n\t\t\t(<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)\n\t\t<\/th>\n\t<\/tr>\n\t<tr>\n\t\t<td><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(60 to >=90 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(up to 59 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Lovastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td><div class=\"tooltip2\">nd<span>not done or not studied<\/span><\/div><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Fluvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>80<div class=\"tooltip2\"><sup>1<\/sup><span>Data based on ALERT.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Atorvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20<div class=\"tooltip2\"><sup>2<\/sup><span>Data based on 4D.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Rosuvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>10<div class=\"tooltip2\"><sup>3<\/sup><span>Data based on AURORA.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin\/Ezetmibe<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20 \/ 10<div class=\"tooltip2\"><sup>4<\/sup><span>Data based on SHARP.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pravastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pitavastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>2 mg\/d<\/td>\n\t<\/tr>\n<\/table>\n\n<p class=\"dosage_note\">** incl. dialysis or kidney transplant patients.<\/p>\n<p class=\"dosage_note\">All statins may not be available in all countries. Lower doses than those used in major trials of statins in CKD populations may be appropriate in Asian countries. Note that rosuvastatin 40mg daily is not recommended for use in CKD 1-2 non- transplant patients, as it may increase the risk of adverse renal events. Cyclosporin inhibits the metabolism of certain statins resulting in higher blood levels. Data based on <sup>1<\/sup>ALERT, <sup>2<\/sup>4D, <sup>3<\/sup>AURORA, <sup>4<\/sup>SHARP. Abbreviations: eGFR, estimated glomerular filtration rate; GP, general population; nd, not done or not studied.<\/p>\n"}]}]}]}]},{"hidden": true}]},{"id": "statin_prescribed-2","name": "Statins prescribed?","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Were any statins prescribed for cholesterol lowering treatment?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_statin_prescribed'><\/span><div id='code_statin_prescribed' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Any statins prescribed for cholesterol lowering treatment?: <label><input type='radio' name='code_statin_prescribed' id='code_statin_prescribed-yes' code='code_statin_prescribed-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_statin_prescribed' id='code_statin_prescribed-no' code='code_statin_prescribed-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "no_statin_no_followup-2","name": "No followup","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no"}},{"id": "fasting_serum_tgs_values-2","name": "Check Fasting Serum TGs Values","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_fasting_serum_tg'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>mmol\/L<\/span>Fasting serum TGs value <input type='number' id='code_fasting_serum_tg' code='code_fasting_serum_tg' min='1' max='100' step='0.01' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-100)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "low_fasting_serum_no_followup-2","name": "No followup","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "<=5.65mmol/l","description": "<=5.65mmol\/l (>500mg\/dl)"}},{"id": "assess_malnutrition-2","name": "Malnutrition?","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": ">5.65mmol/l","description": ">5.65mmol\/l (>500mg\/dl)"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_malnutrition'><\/span><div id='code_malnutrition' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Malnutrition?: <label><input type='radio' name='code_malnutrition' id='code_malnutrition-yes' code='code_malnutrition-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_malnutrition' id='code_malnutrition-no' code='code_malnutrition-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "prescribe_lifestyle_changes_judiciously-2","name": "Judicious lifestyle changes","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "atomic_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes","description": "Malnutrition found."},"description": "Prescribe Therapeutic Lifestyle Changes judiciously with caution.","children": [{"hidden": true},{"id": "fasting_serum_tgs_values2-2","name": "Check Fasting Serum TGs Values (2)","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","otherParents": [{"id": "prescribe_lifestyle_changes-2","condition": null}],"node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_fasting_serum_tg'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>mmol\/L<\/span>Fasting serum TGs value <input type='number' id='code_fasting_serum_tg' code='code_fasting_serum_tg' min='1' max='100' step='0.01' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-100)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "low_fasting_serum_no_followup2-2","name": "No followup","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "<=11.3mmol/l","description": "<=11.3mmol\/l (<=1000mg\/dl)"}},{"id": "avoid_nicotinic_acid-2","name": "Avoid nicotinic acid","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "atomic_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": ">11.3mmol/l","description": ">11.3mmol\/l (<=1000mg\/dl)"},"description": "Nicotinic Acid has not been well studied in advanced CKD and therefore is not recommended for the treatment of severe hypertriglyceridemia.","children": [{"id": "assess_prevent_pancreatitis-2","name": "Prevent pancreatitis?","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Have a conversation with patient regarding pros and cons of treatment with statin vs. fibric acid derivatives and their preference, especially regarding prevention of pancreatitis. (Concomitant therapy with fibric acid derivative and a statin is not recommended in patient with CKD due to the potential for toxicity.)","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_prevent_pancreatitis'><\/span><div id='code_prevent_pancreatitis' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Does the patient place high value on preventing pancreatitis?: <label><input type='radio' name='code_prevent_pancreatitis' id='code_prevent_pancreatitis-yes' code='code_prevent_pancreatitis-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_prevent_pancreatitis' id='code_prevent_pancreatitis-no' code='code_prevent_pancreatitis-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "prescribe_fibric_acid_pancreatitis-2","name": "Prescribe fibric acid","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes","description": "Patient places high value on preventing pancreatitis."},"description": "Fibric acid derivatives could be considered. \n\tIf considered, fibric acid should be dose adjusted for kidney function. \n\tFibric acid derivatives might be warranted in patients who place a relatively high value in preventing pancreatitis and a relatively low value on the risk of CV disease."},{"id": "do_not_prescribe_fibric_acid_pancreatitis-2","name": "No fibric acid","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no","description": "Patient does not place high value on preventing pancreatitis."},"description": "Fibric acid derivatives should not be considered."}]}]}]}]},{"id": "prescribe_lifestyle_changes-2","name": "Lifestyle changes","composed": false,"in_workflow": "Dyslipidemia_Treatment-2","node_type": "atomic_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no","description": "No malnutrition found."},"description": "Prescribe Therapeutic Lifestyle Changes:\n\u2022\tLow Fat diet (<15% total calories)\n\u2022\tReduce monosaccharides & disaccharides intake\n\u2022\tReduce total amount of dietary carbohydrates\n\u2022\tUse fish oils to replace some long-chain TGs","children": []}]}]}]}]}]},{"id": "Evaluate_Lipid_Profile","name": "Evaluate Lipid Profile","composed": false,"in_workflow": "Dyslipidemia_CKD","node_type": "composite_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no profile","description": "Newly identified CKD or established CKD with no prior measurement of lipid profile."},"children": [{"id": "measure_lipid_profile","name": "Measure lipid profile","composed": true,"in_workflow": "Evaluate_Lipid_Profile","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "1.\tTotal cholesterol\n2.\tLDL cholesterol \n3.\tHDL cholesterol \n4.\tTriglycerides","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_abnormal_lipid_profile'><\/span><div id='code_abnormal_lipid_profile' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Abnormal lipid profile?: <label><input type='radio' name='code_abnormal_lipid_profile' id='code_abnormal_lipid_profile-yes' code='code_abnormal_lipid_profile-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_abnormal_lipid_profile' id='code_abnormal_lipid_profile-no' code='code_abnormal_lipid_profile-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "no_dyslipidemia","name": "No action","composed": false,"in_workflow": "Evaluate_Lipid_Profile","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "normal","description": "No abnormal lipid profile."},"description": "No further measurement of lipid profile."},{"id": "rule_out_secondary_causes","name": "Rule out secondary causes","composed": false,"in_workflow": "Evaluate_Lipid_Profile","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "abnormal","description": "Abnormal lipid profile."},"description": "Investigate and treat remediable secondary causes of dyslipidemia.","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_no_secondary_causes'><\/span><label><input type='checkbox' id='code_no_secondary_causes' code='code_no_secondary_causes' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_nephrotic_syndrome,code_hypothyroidism,code_diabetes,code_excessive_alcohol_consumption,code_liver_disease,code_13-cis-retinioc_acid,code_anti_convulsant,code_highly_active_anti-retroviral_therapy,code_androgens,code_oral_contraceptives,code_corticosteroids,code_cyclosporine,code_sirolimus' mandatory='false' \/>No secondary causes<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_nephrotic_syndrome'><\/span><label><input type='checkbox' id='code_nephrotic_syndrome' code='code_nephrotic_syndrome' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Nephrotic syndrome?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_hypothyroidism'><\/span><label><input type='checkbox' id='code_hypothyroidism' code='code_hypothyroidism' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Hypothyroidism?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_diabetes'><\/span><label><input type='checkbox' id='code_diabetes' code='code_diabetes' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Diabetes?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_excessive_alcohol_consumption'><\/span><label><input type='checkbox' id='code_excessive_alcohol_consumption' code='code_excessive_alcohol_consumption' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Excessive alcohol consumption?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_liver_disease'><\/span><label><input type='checkbox' id='code_liver_disease' code='code_liver_disease' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Liver disease?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_13-cis-retinioc_acid'><\/span><label><input type='checkbox' id='code_13-cis-retinioc_acid' code='code_13-cis-retinioc_acid' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>13-cis-retinioc acid?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_anti_convulsant'><\/span><label><input type='checkbox' id='code_anti_convulsant' code='code_anti_convulsant' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Anti-convulsant?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_highly_active_anti-retroviral_therapy'><\/span><label><input type='checkbox' id='code_highly_active_anti-retroviral_therapy' code='code_highly_active_anti-retroviral_therapy' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Highly active anti-retroviral therapy?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_androgens'><\/span><label><input type='checkbox' id='code_androgens' code='code_androgens' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Androgens?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_oral_contraceptives'><\/span><label><input type='checkbox' id='code_oral_contraceptives' code='code_oral_contraceptives' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Oral contraceptives?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_corticosteroids'><\/span><label><input type='checkbox' id='code_corticosteroids' code='code_corticosteroids' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Corticosteroids?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_sirolimus'><\/span><label><input type='checkbox' id='code_sirolimus' code='code_sirolimus' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_secondary_causes' mandatory='false' \/>Sirolimus?<\/label><\/td><\/tr><\/table>\n","children": [{"id": "secondary_causes_found","name": "Treatment or referral","composed": false,"in_workflow": "Evaluate_Lipid_Profile","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "secondary causes","description": "Some secondary causes found."},"description": "Remediable (secondary) causes of dyslipidemia found. Treat secondary causes or refer to specialist."},{"id": "no_secondary_causes_found","name": "No secondary causes","composed": false,"in_workflow": "Evaluate_Lipid_Profile","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no","description": "No secondary causes found."},"description": "No remediable (secondary) causes of dyslipidemia found."}]}]},{"id": "Dyslipidemia_Treatment-1","name": "Dyslipidemia Treatment","composed": false,"in_workflow": "Dyslipidemia_CKD","node_type": "composite_task","workflow_state": "inactiveState","decisional_state": "chosenState","children": [{"id": "evaluate_severity_dyslipidemia","name": "Evaluate severity dyslipidemia","composed": false,"in_workflow": "Dyslipidemia_CKD","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Assess fasting triglycerides and LDL-C","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_fasting_triglycerides'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>mmol\/L<\/span>Fasting triglycerides <input type='number' id='code_fasting_triglycerides' code='code_fasting_triglycerides' min='1' max='100' step='0.01' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-100)<\/div><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_ldl_cholesterol'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>mmol\/L<\/span>LDL cholesterol <input type='number' id='code_ldl_cholesterol' code='code_ldl_cholesterol' min='1' max='100' step='0.01' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-100)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "severe_dyslipidemia","name": "Referral","composed": false,"in_workflow": "Dyslipidemia_CKD","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "severe","description": "1.Fasting Triglycerides > 11.3mmol\/l (1000 mg\/dl); or\n2. LDL-C > 4.9 mmol\/l(190 mg\/dl)"},"description": "Consider referral to a specialist for further evaluation."},{"id": "Followup_Lipid_Profile-1","name": "Followup Lipid Profile","composed": false,"in_workflow": "Dyslipidemia_CKD","node_type": "composite_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "not severe","description": "1.Fasting Triglycerides <= 11.3mmol\/l (1000 mg\/dl); and\n2. LDL-C <= 4.9 mmol\/l(190 mg\/dl)"},"description": "Follow-up measurement of LDL-C (or entire lipid profile) should be reserved for instances where the results would alter management.","children": [{"id": "assess_suspect_sec_cause-1","name": "Suspect secondary dyslipidemia cause?","composed": true,"in_workflow": "Followup_Lipid_Profile-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Do you suspect the patient has developed a new secondary cause of dyslipidemia?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_sec_cause'><\/span><div id='code_sec_cause' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Suspect secondary dyslipidemia cause?: <label><input type='radio' name='code_sec_cause' id='code_sec_cause-yes' code='code_sec_cause-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_sec_cause' id='code_sec_cause-no' code='code_sec_cause-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "sec_cause_followup-1","name": "Followup lipid profile","composed": false,"in_workflow": "Followup_Lipid_Profile-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes"},"description": "Follow-up measurement of the lipid profile is suggested."},{"id": "assess_current_treatment-1","name": "Already on statins?","composed": false,"in_workflow": "Followup_Lipid_Profile-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no"},"description": "Is the patient already on a statin?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_patient_on_statins'><\/span><div id='code_patient_on_statins' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Already on statins?: <label><input type='radio' name='code_patient_on_statins' id='code_patient_on_statins-yes' code='code_patient_on_statins-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_patient_on_statins' id='code_patient_on_statins-no' code='code_patient_on_statins-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "yes_statins_no_followup-1","name": "No followup","composed": false,"in_workflow": "Followup_Lipid_Profile-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "receiving statins"},"description": "No follow-up measurement of the lipid profile is suggested."},{"id": "reassess_10_year_cv_risk-1","name": "Reassessing 10 year CV risk?","composed": false,"in_workflow": "Followup_Lipid_Profile-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no statins"},"description": "Are you reassessing 10 year CV risk to look for an indication for statin treatment?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_10_year_cv_risk'><\/span><div id='code_10_year_cv_risk' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Reassessing 10 year CV risk?: <label><input type='radio' name='code_10_year_cv_risk' id='code_10_year_cv_risk-yes' code='code_10_year_cv_risk-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_10_year_cv_risk' id='code_10_year_cv_risk-no' code='code_10_year_cv_risk-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "yes_reassess_followup-1","name": "Followup lipid profile","composed": false,"in_workflow": "Followup_Lipid_Profile-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes"},"description": "Some patients may prefer to know their levels: therefore, the need for follow-up can be assessed on a per-patient basis. \n\tHowever, there is no evidence to followup lipid profile."},{"id": "no_reassess_no_followup-1","name": "No followup","composed": false,"in_workflow": "Followup_Lipid_Profile-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no"},"description": "No follow-up measurement of the lipid profile is suggested."}]}]}]}]}]},{"id": "Pharmacological_Cholesterol_Lowering_Treatment-1","name": "Pharmacological Cholesterol Lowering Treatment","composed": true,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "composite_task","workflow_state": "inactiveState","decisional_state": "chosenState","children": [{"id": "assess_age_start-1","name": "Age?","composed": true,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_age'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>year<\/span>Age? <input type='number' id='code_age' code='code_age' min='1' max='120' step='1' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-120)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "assess_egfr_value-1","name": "eGFR value?","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": ">= 50 years"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_egfr'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>ml\/min\/ 1.73m2<\/span>eGFR value? <input type='number' id='code_egfr' code='code_egfr' min='1' max='200' step='1' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-200)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "treat_statin_egfr-1","name": "treat with statins","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": ">=60","description": ">=60 ml\/min\/ 1.73m2"},"description": "2.1.2: In adults aged >=50 years with CKD and eGFR>=60 ml\/min\/1.73m2 (GFR categories G1-G2) we recommend treatment with a statin. (1B)","insert": "<b>Contra-indications for statins:<\/b>\n<ul style=\"margin: 0; padding: 0 0 0 15px;\">\n\t<li>Active liver disease, high alcohol consumption or pregnancy.<\/li>\n    <li>Women with childbearing potential should only use statin if there is reliable contraception.<\/li>\n<\/ul>\n\n<h3>Recommended doses of statins in adults with CKD<\/h3>\n\n<table class=\"statin_dosages\">\n\t<tr>\n\t\t<th>Statin<\/th>\n\t\t<th><div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G1 - G2 (<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)<\/th>\n\t\t<th>\n\t\t\t<div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G3a - G5\n\t\t\t<div class=\"tooltip2\">**<span>incl. dialysis or kidney transplant patients<\/span><\/div>\n\t\t\t(<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)\n\t\t<\/th>\n\t<\/tr>\n\t<tr>\n\t\t<td><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(60 to >=90 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(up to 59 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Lovastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td><div class=\"tooltip2\">nd<span>not done or not studied<\/span><\/div><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Fluvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>80<div class=\"tooltip2\"><sup>1<\/sup><span>Data based on ALERT.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Atorvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20<div class=\"tooltip2\"><sup>2<\/sup><span>Data based on 4D.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Rosuvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>10<div class=\"tooltip2\"><sup>3<\/sup><span>Data based on AURORA.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin\/Ezetmibe<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20 \/ 10<div class=\"tooltip2\"><sup>4<\/sup><span>Data based on SHARP.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pravastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pitavastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>2 mg\/d<\/td>\n\t<\/tr>\n<\/table>\n\n<p class=\"dosage_note\">** incl. dialysis or kidney transplant patients.<\/p>\n<p class=\"dosage_note\">All statins may not be available in all countries. Lower doses than those used in major trials of statins in CKD populations may be appropriate in Asian countries. Note that rosuvastatin 40mg daily is not recommended for use in CKD 1-2 non- transplant patients, as it may increase the risk of adverse renal events. Cyclosporin inhibits the metabolism of certain statins resulting in higher blood levels. Data based on <sup>1<\/sup>ALERT, <sup>2<\/sup>4D, <sup>3<\/sup>AURORA, <sup>4<\/sup>SHARP. Abbreviations: eGFR, estimated glomerular filtration rate; GP, general population; nd, not done or not studied.<\/p>\n"},{"id": "assess_kidney_transplant-1","name": "Kidney transplant?","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","otherParents": [{"id": "assess_age_start-1","condition": {"label": "18-49 years"}}],"node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "< 60","description": "< 60 ml\/min\/ 1.73m2"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_kidney_transplant'><\/span><div id='code_kidney_transplant' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Kidney transplant?: <label><input type='radio' name='code_kidney_transplant' id='code_kidney_transplant-yes' code='code_kidney_transplant-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_kidney_transplant' id='code_kidney_transplant-no' code='code_kidney_transplant-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "treat_statin_kidney_transplant-1","name": "treat with statins","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes"},"description": "2.4: In adult kidney transplant recipients, we suggest treatment with a statin. (2B)","insert": "<b>Contra-indications for statins:<\/b>\n<ul style=\"margin: 0; padding: 0 0 0 15px;\">\n\t<li>Active liver disease, high alcohol consumption or pregnancy.<\/li>\n    <li>Women with childbearing potential should only use statin if there is reliable contraception.<\/li>\n<\/ul>\n\n<h3>Recommended doses of statins in adults with CKD<\/h3>\n\n<table class=\"statin_dosages\">\n\t<tr>\n\t\t<th>Statin<\/th>\n\t\t<th><div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G1 - G2 (<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)<\/th>\n\t\t<th>\n\t\t\t<div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G3a - G5\n\t\t\t<div class=\"tooltip2\">**<span>incl. dialysis or kidney transplant patients<\/span><\/div>\n\t\t\t(<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)\n\t\t<\/th>\n\t<\/tr>\n\t<tr>\n\t\t<td><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(60 to >=90 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(up to 59 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Lovastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td><div class=\"tooltip2\">nd<span>not done or not studied<\/span><\/div><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Fluvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>80<div class=\"tooltip2\"><sup>1<\/sup><span>Data based on ALERT.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Atorvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20<div class=\"tooltip2\"><sup>2<\/sup><span>Data based on 4D.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Rosuvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>10<div class=\"tooltip2\"><sup>3<\/sup><span>Data based on AURORA.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin\/Ezetmibe<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20 \/ 10<div class=\"tooltip2\"><sup>4<\/sup><span>Data based on SHARP.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pravastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pitavastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>2 mg\/d<\/td>\n\t<\/tr>\n<\/table>\n\n<p class=\"dosage_note\">** incl. dialysis or kidney transplant patients.<\/p>\n<p class=\"dosage_note\">All statins may not be available in all countries. Lower doses than those used in major trials of statins in CKD populations may be appropriate in Asian countries. Note that rosuvastatin 40mg daily is not recommended for use in CKD 1-2 non- transplant patients, as it may increase the risk of adverse renal events. Cyclosporin inhibits the metabolism of certain statins resulting in higher blood levels. Data based on <sup>1<\/sup>ALERT, <sup>2<\/sup>4D, <sup>3<\/sup>AURORA, <sup>4<\/sup>SHARP. Abbreviations: eGFR, estimated glomerular filtration rate; GP, general population; nd, not done or not studied.<\/p>\n"},{"id": "assess_dialysis_treatment-1","name": "Treatment with dialysis?","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_dialysis_treatment'><\/span><div id='code_dialysis_treatment' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Treatment with dialysis?: <label><input type='radio' name='code_dialysis_treatment' id='code_dialysis_treatment-yes' code='code_dialysis_treatment-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_dialysis_treatment' id='code_dialysis_treatment-no' code='code_dialysis_treatment-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "assess_statin_use-1","name": "Using statins or statin/ezetimibe?","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_statin_ezetimibe'><\/span><div id='code_statin_ezetimibe' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Using statins or statin\/ezetimibe?: <label><input type='radio' name='code_statin_ezetimibe' id='code_statin_ezetimibe-yes' code='code_statin_ezetimibe-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_statin_ezetimibe' id='code_statin_ezetimibe-no' code='code_statin_ezetimibe-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "continue_statin_treatment-1","name": "continue statin or statin/ezetimibe","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes"},"description": "2.3.2: In patients already receiving statins or statin\/ezetimibe combination at the time of dialysis initiation, we suggest that these agents be continued. (2C)","insert": "<b>Contra-indications for statins:<\/b>\n<ul style=\"margin: 0; padding: 0 0 0 15px;\">\n\t<li>Active liver disease, high alcohol consumption or pregnancy.<\/li>\n    <li>Women with childbearing potential should only use statin if there is reliable contraception.<\/li>\n<\/ul>\n\n<h3>Recommended doses of statins in adults with CKD<\/h3>\n\n<table class=\"statin_dosages\">\n\t<tr>\n\t\t<th>Statin<\/th>\n\t\t<th><div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G1 - G2 (<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)<\/th>\n\t\t<th>\n\t\t\t<div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G3a - G5\n\t\t\t<div class=\"tooltip2\">**<span>incl. dialysis or kidney transplant patients<\/span><\/div>\n\t\t\t(<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)\n\t\t<\/th>\n\t<\/tr>\n\t<tr>\n\t\t<td><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(60 to >=90 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(up to 59 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Lovastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td><div class=\"tooltip2\">nd<span>not done or not studied<\/span><\/div><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Fluvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>80<div class=\"tooltip2\"><sup>1<\/sup><span>Data based on ALERT.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Atorvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20<div class=\"tooltip2\"><sup>2<\/sup><span>Data based on 4D.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Rosuvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>10<div class=\"tooltip2\"><sup>3<\/sup><span>Data based on AURORA.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin\/Ezetmibe<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20 \/ 10<div class=\"tooltip2\"><sup>4<\/sup><span>Data based on SHARP.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pravastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pitavastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>2 mg\/d<\/td>\n\t<\/tr>\n<\/table>\n\n<p class=\"dosage_note\">** incl. dialysis or kidney transplant patients.<\/p>\n<p class=\"dosage_note\">All statins may not be available in all countries. Lower doses than those used in major trials of statins in CKD populations may be appropriate in Asian countries. Note that rosuvastatin 40mg daily is not recommended for use in CKD 1-2 non- transplant patients, as it may increase the risk of adverse renal events. Cyclosporin inhibits the metabolism of certain statins resulting in higher blood levels. Data based on <sup>1<\/sup>ALERT, <sup>2<\/sup>4D, <sup>3<\/sup>AURORA, <sup>4<\/sup>SHARP. Abbreviations: eGFR, estimated glomerular filtration rate; GP, general population; nd, not done or not studied.<\/p>\n"},{"id": "do_not_initiate_statins-1","name": "do not initiate statins","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no"},"description": "2.3.1: In adults with dialysis-dependent CKD, we suggest that statins or statin\/ezetimibe combination not be initiated. (2A)"}]},{"id": "assess_age_no_dialysis-1","name": "Age?","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_age'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>year<\/span>Age? <input type='number' id='code_age' code='code_age' min='1' max='120' step='1' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-120)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "assess_cv_risk-1","name": "assess CV risk","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "18-49 years"},"description": "Note that CV risk should be re-assessed on an annual basis, as changes in clinical condition may warrant treatment with a statin.","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_no_cv_risk_factors'><\/span><label><input type='checkbox' id='code_no_cv_risk_factors' code='code_no_cv_risk_factors' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_prior_mi,code_prior_coronary_revascularization,code_prior_ischemic_stroke,code_prior_transient_ischemic_attack,code_diabetes,code_estimated_10-year_incidence_coronary_death,code_likelihood_non_fatal_mi' mandatory='false' \/>No CV risk factors<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_prior_mi'><\/span><label><input type='checkbox' id='code_prior_mi' code='code_prior_mi' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_cv_risk_factors' mandatory='false' \/>Prior MI?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_prior_coronary_revascularization'><\/span><label><input type='checkbox' id='code_prior_coronary_revascularization' code='code_prior_coronary_revascularization' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_cv_risk_factors' mandatory='false' \/>Prior Coronary Revascularization?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_prior_ischemic_stroke'><\/span><label><input type='checkbox' id='code_prior_ischemic_stroke' code='code_prior_ischemic_stroke' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_cv_risk_factors' mandatory='false' \/>Prior ischemic stroke?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_prior_transient_ischemic_attack'><\/span><label><input type='checkbox' id='code_prior_transient_ischemic_attack' code='code_prior_transient_ischemic_attack' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_cv_risk_factors' mandatory='false' \/>Prior transient ischemic attack?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_diabetes'><\/span><label><input type='checkbox' id='code_diabetes' code='code_diabetes' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_cv_risk_factors' mandatory='false' \/>Diabetes?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_estimated_10-year_incidence_coronary_death'><\/span><label><input type='checkbox' id='code_estimated_10-year_incidence_coronary_death' code='code_estimated_10-year_incidence_coronary_death' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_no_cv_risk_factors' mandatory='false' \/>Estimated 10-year incidence of coronary death?<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_likelihood_non_fatal_mi'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>%<\/span>Likelihood of non-fatal MI (<a href=\"https:\/\/www.mdcalc.com\/framingham-risk-score-hard-coronary-heart-disease\" target=\"_blank\">calculate<\/a>) <input type='number' id='code_likelihood_non_fatal_mi' code='code_likelihood_non_fatal_mi' min='1' max='100' step='1' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-100)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "treat_statin_high_risk-1","name": "treat with statin","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "high risk","description": "Prior MI or\nPrior Coronary revascularization or\nPrior ischemic stroke or Transient ischemic attack or\nDiabetes or\nEstimated 10-year incidence of coronary death or non-fatal MI >10% using a validated risk calculator"},"description": "2.2: In adults aged 18\u201349 years with CKD but not treated with chronic dialysis or kidney transplantation, we\nsuggest statin treatment in people with one or more of the following (2A):\n\u2022\tknown coronary disease (myocardial infarction or coronary revascularization)\n\u2022\tdiabetes mellitus\n\u2022\tprior ischemic stroke\n\u2022\testimated 10-year incidence of coronary death or non-fatal myocardial infarction >10%","insert": "<b>Contra-indications for statins:<\/b>\n<ul style=\"margin: 0; padding: 0 0 0 15px;\">\n\t<li>Active liver disease, high alcohol consumption or pregnancy.<\/li>\n    <li>Women with childbearing potential should only use statin if there is reliable contraception.<\/li>\n<\/ul>\n\n<h3>Recommended doses of statins in adults with CKD<\/h3>\n\n<table class=\"statin_dosages\">\n\t<tr>\n\t\t<th>Statin<\/th>\n\t\t<th><div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G1 - G2 (<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)<\/th>\n\t\t<th>\n\t\t\t<div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G3a - G5\n\t\t\t<div class=\"tooltip2\">**<span>incl. dialysis or kidney transplant patients<\/span><\/div>\n\t\t\t(<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)\n\t\t<\/th>\n\t<\/tr>\n\t<tr>\n\t\t<td><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(60 to >=90 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(up to 59 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Lovastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td><div class=\"tooltip2\">nd<span>not done or not studied<\/span><\/div><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Fluvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>80<div class=\"tooltip2\"><sup>1<\/sup><span>Data based on ALERT.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Atorvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20<div class=\"tooltip2\"><sup>2<\/sup><span>Data based on 4D.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Rosuvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>10<div class=\"tooltip2\"><sup>3<\/sup><span>Data based on AURORA.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin\/Ezetmibe<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20 \/ 10<div class=\"tooltip2\"><sup>4<\/sup><span>Data based on SHARP.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pravastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pitavastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>2 mg\/d<\/td>\n\t<\/tr>\n<\/table>\n\n<p class=\"dosage_note\">** incl. dialysis or kidney transplant patients.<\/p>\n<p class=\"dosage_note\">All statins may not be available in all countries. Lower doses than those used in major trials of statins in CKD populations may be appropriate in Asian countries. Note that rosuvastatin 40mg daily is not recommended for use in CKD 1-2 non- transplant patients, as it may increase the risk of adverse renal events. Cyclosporin inhibits the metabolism of certain statins resulting in higher blood levels. Data based on <sup>1<\/sup>ALERT, <sup>2<\/sup>4D, <sup>3<\/sup>AURORA, <sup>4<\/sup>SHARP. Abbreviations: eGFR, estimated glomerular filtration rate; GP, general population; nd, not done or not studied.<\/p>\n"},{"id": "no_statin_treatment_low_risk-1","name": "do not initiate statins","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no","description": "No CV risk factor or \nEstimated 10-year incidence of coronary death or non-fatal MI >10% using a validated risk calculator"}}]},{"id": "treat_statin_no_dialysis-1","name": "treat with statins or statin/ezetimibe","composed": false,"in_workflow": "Pharmacological_Cholesterol_Lowering_Treatment-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": ">= 50 years"},"insert": "<b>Contra-indications for statins:<\/b>\n<ul style=\"margin: 0; padding: 0 0 0 15px;\">\n\t<li>Active liver disease, high alcohol consumption or pregnancy.<\/li>\n    <li>Women with childbearing potential should only use statin if there is reliable contraception.<\/li>\n<\/ul>\n\n<h3>Recommended doses of statins in adults with CKD<\/h3>\n\n<table class=\"statin_dosages\">\n\t<tr>\n\t\t<th>Statin<\/th>\n\t\t<th><div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G1 - G2 (<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)<\/th>\n\t\t<th>\n\t\t\t<div class=\"tooltip2\">eGFR<span>estimated glomerular filtration rate<\/span><\/div> G3a - G5\n\t\t\t<div class=\"tooltip2\">**<span>incl. dialysis or kidney transplant patients<\/span><\/div>\n\t\t\t(<a href=\"img\/Prognosis of CKD by GFR and albuminuria category.png\" target=\"_blank\" style=\"font-weight: normal\">details<\/a>)\n\t\t<\/th>\n\t<\/tr>\n\t<tr>\n\t\t<td><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(60 to >=90 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t\t<td><span style=\"font-size: 14px;\">(up to 59 ml\/min\/1.73m&sup2)<\/span><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Lovastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td><div class=\"tooltip2\">nd<span>not done or not studied<\/span><\/div><\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Fluvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>80<div class=\"tooltip2\"><sup>1<\/sup><span>Data based on ALERT.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Atorvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20<div class=\"tooltip2\"><sup>2<\/sup><span>Data based on 4D.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Rosuvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>10<div class=\"tooltip2\"><sup>3<\/sup><span>Data based on AURORA.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin\/Ezetmibe<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>20 \/ 10<div class=\"tooltip2\"><sup>4<\/sup><span>Data based on SHARP.<\/span><\/div> mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pravastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Simvastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>40 mg\/d<\/td>\n\t<\/tr>\n\t<tr>\n\t\t<td>Pitavastatin<\/td>\n\t\t<td><div class=\"tooltip2\">GP<span>general population<\/span><\/div><\/td>\n\t\t<td>2 mg\/d<\/td>\n\t<\/tr>\n<\/table>\n\n<p class=\"dosage_note\">** incl. dialysis or kidney transplant patients.<\/p>\n<p class=\"dosage_note\">All statins may not be available in all countries. Lower doses than those used in major trials of statins in CKD populations may be appropriate in Asian countries. Note that rosuvastatin 40mg daily is not recommended for use in CKD 1-2 non- transplant patients, as it may increase the risk of adverse renal events. Cyclosporin inhibits the metabolism of certain statins resulting in higher blood levels. Data based on <sup>1<\/sup>ALERT, <sup>2<\/sup>4D, <sup>3<\/sup>AURORA, <sup>4<\/sup>SHARP. Abbreviations: eGFR, estimated glomerular filtration rate; GP, general population; nd, not done or not studied.<\/p>\n"}]}]}]}]},{"hidden": true}]},{"id": "statin_prescribed-1","name": "Statins prescribed?","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Were any statins prescribed for cholesterol lowering treatment?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_statin_prescribed'><\/span><div id='code_statin_prescribed' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Any statins prescribed for cholesterol lowering treatment?: <label><input type='radio' name='code_statin_prescribed' id='code_statin_prescribed-yes' code='code_statin_prescribed-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_statin_prescribed' id='code_statin_prescribed-no' code='code_statin_prescribed-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "no_statin_no_followup-1","name": "No followup","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no"}},{"id": "fasting_serum_tgs_values-1","name": "Check Fasting Serum TGs Values","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_fasting_serum_tg'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>mmol\/L<\/span>Fasting serum TGs value <input type='number' id='code_fasting_serum_tg' code='code_fasting_serum_tg' min='1' max='100' step='0.01' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-100)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "low_fasting_serum_no_followup-1","name": "No followup","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "<=5.65mmol/l","description": "<=5.65mmol\/l (>500mg\/dl)"}},{"id": "assess_malnutrition-1","name": "Malnutrition?","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": ">5.65mmol/l","description": ">5.65mmol\/l (>500mg\/dl)"},"inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_malnutrition'><\/span><div id='code_malnutrition' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Malnutrition?: <label><input type='radio' name='code_malnutrition' id='code_malnutrition-yes' code='code_malnutrition-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_malnutrition' id='code_malnutrition-no' code='code_malnutrition-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "prescribe_lifestyle_changes_judiciously-1","name": "Judicious lifestyle changes","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "atomic_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes","description": "Malnutrition found."},"description": "Prescribe Therapeutic Lifestyle Changes judiciously with caution.","children": [{"hidden": true},{"id": "fasting_serum_tgs_values2-1","name": "Check Fasting Serum TGs Values (2)","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","otherParents": [{"id": "prescribe_lifestyle_changes-1","condition": null}],"node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_fasting_serum_tg'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>mmol\/L<\/span>Fasting serum TGs value <input type='number' id='code_fasting_serum_tg' code='code_fasting_serum_tg' min='1' max='100' step='0.01' size='2' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-100)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "low_fasting_serum_no_followup2-1","name": "No followup","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "<=11.3mmol/l","description": "<=11.3mmol\/l (<=1000mg\/dl)"}},{"id": "avoid_nicotinic_acid-1","name": "Avoid nicotinic acid","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "atomic_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": ">11.3mmol/l","description": ">11.3mmol\/l (<=1000mg\/dl)"},"description": "Nicotinic Acid has not been well studied in advanced CKD and therefore is not recommended for the treatment of severe hypertriglyceridemia.","children": [{"id": "assess_prevent_pancreatitis-1","name": "Prevent pancreatitis?","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Have a conversation with patient regarding pros and cons of treatment with statin vs. fibric acid derivatives and their preference, especially regarding prevention of pancreatitis. (Concomitant therapy with fibric acid derivative and a statin is not recommended in patient with CKD due to the potential for toxicity.)","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/niche.cs.dal.ca\/ns\/cig\/kidney_statins.owl#code_prevent_pancreatitis'><\/span><div id='code_prevent_pancreatitis' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Does the patient place high value on preventing pancreatitis?: <label><input type='radio' name='code_prevent_pancreatitis' id='code_prevent_pancreatitis-yes' code='code_prevent_pancreatitis-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='code_prevent_pancreatitis' id='code_prevent_pancreatitis-no' code='code_prevent_pancreatitis-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "prescribe_fibric_acid_pancreatitis-1","name": "Prescribe fibric acid","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "yes","description": "Patient places high value on preventing pancreatitis."},"description": "Fibric acid derivatives could be considered. \n\tIf considered, fibric acid should be dose adjusted for kidney function. \n\tFibric acid derivatives might be warranted in patients who place a relatively high value in preventing pancreatitis and a relatively low value on the risk of CV disease."},{"id": "do_not_prescribe_fibric_acid_pancreatitis-1","name": "No fibric acid","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no","description": "Patient does not place high value on preventing pancreatitis."},"description": "Fibric acid derivatives should not be considered."}]}]}]}]},{"id": "prescribe_lifestyle_changes-1","name": "Lifestyle changes","composed": false,"in_workflow": "Dyslipidemia_Treatment-1","node_type": "atomic_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "no","description": "No malnutrition found."},"description": "Prescribe Therapeutic Lifestyle Changes:\n\u2022\tLow Fat diet (<15% total calories)\n\u2022\tReduce monosaccharides & disaccharides intake\n\u2022\tReduce total amount of dietary carbohydrates\n\u2022\tUse fish oils to replace some long-chain TGs","children": []}]}]}]}]}]}]}]}]}