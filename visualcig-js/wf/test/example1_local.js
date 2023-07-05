export class Observation {
	constructor(Observationdotcode, ObservationdotvalueBoolean, ObservationdotvalueQuantity) {
		this.Observationdotcode = Observationdotcode;
		this.ObservationdotvalueBoolean = ObservationdotvalueBoolean;
		this.ObservationdotvalueQuantity = ObservationdotvalueQuantity;
	}

	Observationdotcode;
	ObservationdotvalueBoolean;
	ObservationdotvalueQuantity;
}

export class Code {
	static someCode = 'someCode';
	static someOtherCode1 = 'someOtherCode1';
	static someOtherCode2 = 'someOtherCode2';
	static someOtherCode3 = 'someOtherCode3';
	static someOtherCode4 = 'someOtherCode4';
	static someOtherCode5 = 'someOtherCode5';
	static codeNone = 'codeNone';

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

export var nodeAdtMap = {"http://hl7.org/fhir/Observation":{"name":"Observation","http://hl7.org/fhir/Observation.code":{"name":"Observationdotcode","type":"http://hl7.org/fhir/Code"},"http://hl7.org/fhir/Observation.valueBoolean":{"name":"ObservationdotvalueBoolean"},"http://hl7.org/fhir/Observation.valueQuantity":{"name":"ObservationdotvalueQuantity","type":"http://hl7.org/fhir/ValueQuantity"}},"http://hl7.org/fhir/Code":{"name":"Code","http://example.org/some_code":{"name":"someCode"},"http://example.org/some_other_code1":{"name":"someOtherCode1"},"http://example.org/some_other_code2":{"name":"someOtherCode2"},"http://example.org/some_other_code3":{"name":"someOtherCode3"},"http://example.org/some_other_code4":{"name":"someOtherCode4"},"http://example.org/some_other_code5":{"name":"someOtherCode5"},"http://example.org/code_none":{"name":"codeNone"},"http://www.w3.org/1999/02/22-rdf-syntax-ns#type":{"name":"type"}},"http://hl7.org/fhir/ValueQuantity":{"name":"ValueQuantity","http://hl7.org/fhir/Quantity.value":{"name":"Quantitydotvalue"}}}


export function createWorkflow() {
	let e0 = new Entity()
	e0.type = Entity.CompositeTask
	e0.isIn = new State(State.Active)
	e0.id = "Example_Workflow"
	e0.label = "Example Workflow"
	let e1 = new Entity()
	e1.type = Entity.DecisionTask
	e1.isIn = new State(State.Inactive)
	e1.conditional = false
	e1.id = "task1"
	e1.label = "decision1?"
	let e2 = new Entity()
	e2.type = Entity.DecisionBranch
	e2.isIn = new State(State.Inactive)
	let c0 = new Condition()
	c0.type = Condition.Conjunction
	let c1 = new Condition()
	c1.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someCode && obs.ObservationdotvalueBoolean == true)
	}
	c0.allOf.push(c1)
	e2.precondition = c0
	let e3 = new Entity()
	e3.type = Entity.EndPoint
	e3.isIn = new State(State.Inactive)
	e3.conditional = false
	e3.id = "task2"
	e3.label = "endpoint1"
	e2.branchTarget = e3
	e2.next.push(e3)
	e3.nextOf.push(e2)
	e1.decisionBranch.push(e2)
	let e4 = new Entity()
	e4.type = Entity.DecisionBranch
	e4.isIn = new State(State.Inactive)
	let c2 = new Condition()
	c2.type = Condition.Conjunction
	let c3 = new Condition()
	c3.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someCode && obs.ObservationdotvalueBoolean == false)
	}
	c2.allOf.push(c3)
	e4.precondition = c2
	let e5 = new Entity()
	e5.type = Entity.DecisionTask
	e5.isIn = new State(State.Inactive)
	e5.conditional = false
	e5.id = "task3"
	e5.label = "decision2?"
	let e6 = new Entity()
	e6.type = Entity.DecisionBranch
	e6.isIn = new State(State.Inactive)
	let c4 = new Condition()
	c4.type = Condition.Disjunction
	let c5 = new Condition()
	c5.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode1 && obs.ObservationdotvalueQuantity.Quantitydotvalue > 10)
	}
	c4.anyOf.push(c5)
	let c6 = new Condition()
	c6.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode2 && obs.ObservationdotvalueQuantity.Quantitydotvalue > 5)
	}
	c4.anyOf.push(c6)
	e6.precondition = c4
	let e7 = new Entity()
	e7.type = Entity.DecisionTask
	e7.isIn = new State(State.Inactive)
	e7.conditional = false
	e7.id = "task4"
	e7.label = "decision3?"
	let e8 = new Entity()
	e8.type = Entity.DecisionBranch
	e8.isIn = new State(State.Inactive)
	let c7 = new Condition()
	c7.type = Condition.Disjunction
	let c8 = new Condition()
	c8.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode3 && obs.ObservationdotvalueBoolean == true)
	}
	c7.anyOf.push(c8)
	let c9 = new Condition()
	c9.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode4 && obs.ObservationdotvalueBoolean == true)
	}
	c7.anyOf.push(c9)
	let c10 = new Condition()
	c10.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode5 && obs.ObservationdotvalueBoolean == true)
	}
	c7.anyOf.push(c10)
	e8.precondition = c7
	let e9 = new Entity()
	e9.type = Entity.EndPoint
	e9.isIn = new State(State.Inactive)
	e9.conditional = false
	e9.id = "task6"
	e9.label = "endpoint4"
	e8.branchTarget = e9
	e8.next.push(e9)
	e9.nextOf.push(e8)
	e7.decisionBranch.push(e8)
	let e10 = new Entity()
	e10.type = Entity.DecisionBranch
	e10.isIn = new State(State.Inactive)
	let c11 = new Condition()
	c11.type = Condition.Conjunction
	let c12 = new Condition()
	c12.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeNone && obs.ObservationdotvalueBoolean == true)
	}
	c11.allOf.push(c12)
	e10.precondition = c11
	let e11 = new Entity()
	e11.type = Entity.EndPoint
	e11.isIn = new State(State.Inactive)
	e11.conditional = false
	e11.id = "task7"
	e11.label = "endpoint5"
	e10.branchTarget = e11
	e10.next.push(e11)
	e11.nextOf.push(e10)
	e7.decisionBranch.push(e10)
	e7.next.push(e10)
	e10.nextOf.push(e7)
	e7.next.push(e8)
	e8.nextOf.push(e7)
	e6.branchTarget = e7
	e6.next.push(e7)
	e7.nextOf.push(e6)
	e5.decisionBranch.push(e6)
	let e12 = new Entity()
	e12.type = Entity.DecisionBranch
	e12.isIn = new State(State.Inactive)
	let c13 = new Condition()
	c13.type = Condition.Conjunction
	let c14 = new Condition()
	c14.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode1 && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 10)
	}
	c13.allOf.push(c14)
	let c15 = new Condition()
	c15.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode2 && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 5)
	}
	c13.allOf.push(c15)
	e12.precondition = c13
	let e13 = new Entity()
	e13.type = Entity.EndPoint
	e13.isIn = new State(State.Inactive)
	e13.conditional = false
	e13.id = "task5"
	e13.label = "endpoint3"
	e12.branchTarget = e13
	e12.next.push(e13)
	e13.nextOf.push(e12)
	e5.decisionBranch.push(e12)
	e5.next.push(e12)
	e12.nextOf.push(e5)
	e5.next.push(e6)
	e6.nextOf.push(e5)
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
	e0.subTask.push(e5)
	e5.subTaskOf = e0
	e0.subTask.push(e7)
	e7.subTaskOf = e0
	e0.subTask.push(e13)
	e13.subTaskOf = e0
	e0.subTask.push(e9)
	e9.subTaskOf = e0
	e0.subTask.push(e11)
	e11.subTaskOf = e0
	
	return e0
}

export var jsonWorkflow = {"id": "Example_Workflow","name": "Example Workflow","composed": false,"node_type": "composite_task","workflow_state": "activeState","decisional_state": "chosenState","description": "Example Workflow","children": [{"id": "task1","name": "decision1?","composed": true,"in_workflow": "Example_Workflow","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Decision 1?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_code'><\/span><div id='some_code' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Data: <label><input type='radio' name='some_code' id='some_code-yes' code='some_code-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='some_code' id='some_code-no' code='some_code-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>","children": [{"id": "task2","name": "endpoint1","composed": false,"in_workflow": "Example_Workflow","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option1","description": "Option 1"},"description": "Endpoint 1"},{"id": "task3","name": "decision2?","composed": false,"in_workflow": "Example_Workflow","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option2","description": "Option 2"},"description": "Decision 2?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_other_code1'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>mmol\/L<\/span>Data 1 <input type='number' id='some_other_code1' code='some_other_code1' min='1' max='100' step='0.01' size='4' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-100)<\/div><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_other_code2'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>mmol\/L<\/span>Data 2 <input type='number' id='some_other_code2' code='some_other_code2' min='1' max='100' step='0.01' size='4' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-100)<\/div><\/td><\/tr><\/table>","children": [{"id": "task4","name": "decision3?","composed": false,"in_workflow": "Example_Workflow","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option1","description": "some_other_code1 > 10 OR some_other_code2 > 5"},"description": "Decision 3?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_other_code3'><\/span><label><input type='checkbox' id='some_other_code3' code='some_other_code3' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_none' mandatory='false' \/>Option 1<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_other_code4'><\/span><label><input type='checkbox' id='some_other_code4' code='some_other_code4' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_none' mandatory='false' \/>Option 2<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_other_code5'><\/span><label><input type='checkbox' id='some_other_code5' code='some_other_code5' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_none' mandatory='false' \/>Option 3<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/code_none'><\/span><label><input type='checkbox' id='code_none' code='code_none' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='some_other_code3,some_other_code4,some_other_code5' mandatory='false' \/>None<\/label><\/td><\/tr><\/table>","children": [{"id": "task6","name": "endpoint4","composed": false,"in_workflow": "Example_Workflow","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option1","description": "one of 3 options"},"description": "Endpoint 4"},{"id": "task7","name": "endpoint5","composed": false,"in_workflow": "Example_Workflow","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option2","description": "none"},"description": "Endpoint 5"}]},{"id": "task5","name": "endpoint3","composed": false,"in_workflow": "Example_Workflow","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option2","description": "some_other_code1 <= 10 OR some_other_code2 <= 5"},"description": "Endpoint 3"}]}]}]}