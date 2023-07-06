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
	static someCode2 = 'someCode2';
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

export var nodeAdtMap = {"http://hl7.org/fhir/Observation":{"name":"Observation","http://hl7.org/fhir/Observation.code":{"name":"Observationdotcode","type":"http://hl7.org/fhir/Code"},"http://hl7.org/fhir/Observation.valueBoolean":{"name":"ObservationdotvalueBoolean"},"http://hl7.org/fhir/Observation.valueQuantity":{"name":"ObservationdotvalueQuantity","type":"http://hl7.org/fhir/ValueQuantity"}},"http://hl7.org/fhir/Code":{"name":"Code","http://example.org/some_code2":{"name":"someCode2"},"http://example.org/some_code":{"name":"someCode"},"http://example.org/some_other_code1":{"name":"someOtherCode1"},"http://example.org/some_other_code2":{"name":"someOtherCode2"},"http://example.org/some_other_code3":{"name":"someOtherCode3"},"http://example.org/some_other_code4":{"name":"someOtherCode4"},"http://example.org/some_other_code5":{"name":"someOtherCode5"},"http://example.org/code_none":{"name":"codeNone"},"http://www.w3.org/1999/02/22-rdf-syntax-ns#type":{"name":"type"}},"http://hl7.org/fhir/ValueQuantity":{"name":"ValueQuantity","http://hl7.org/fhir/Quantity.value":{"name":"Quantitydotvalue"}}}


export function createWorkflow() {
	let e0 = new Entity()
	e0.type = Entity.CompositeTask
	e0.isIn = new State(State.Active)
	e0.id = "Example_Workflow"
	e0.label = "Example Workflow"
	let e1 = new Entity()
	e1.type = Entity.EndPoint
	e1.isIn = new State(State.Inactive)
	e1.conditional = false
	e1.id = "task8"
	e1.label = "endpoint1"
	e0.subTask.push(e1)
	e1.subTaskOf = e0
	let e2 = new Entity()
	e2.type = Entity.CompositeTask
	e2.isIn = new State(State.Inactive)
	e2.conditional = false
	e2.id = "Example_Workflow2"
	e2.label = "sub-workflow"
	let e3 = new Entity()
	e3.type = Entity.EndPoint
	e3.isIn = new State(State.Inactive)
	e3.conditional = false
	e3.id = "task25"
	e3.label = "endpoint"
	e2.subTask.push(e3)
	e3.subTaskOf = e2
	let e4 = new Entity()
	e4.isIn = new State(State.Inactive)
	e4.conditional = false
	e4.involvesAction = false
	e4.id = "task22"
	e4.label = "task1.1"
	let e5 = new Entity()
	e5.isIn = new State(State.Inactive)
	e5.conditional = false
	e5.involvesAction = true
	e5.id = "task24"
	e5.label = "task2"
	e5.next.push(e3)
	e3.nextOf.push(e5)
	e4.next.push(e5)
	e5.nextOf.push(e4)
	e2.subTask.push(e4)
	e4.subTaskOf = e2
	let e6 = new Entity()
	e6.isIn = new State(State.Inactive)
	e6.conditional = false
	e6.involvesAction = false
	e6.id = "task23"
	e6.label = "task1.2"
	e6.next.push(e5)
	e5.nextOf.push(e6)
	e2.subTask.push(e6)
	e6.subTaskOf = e2
	e2.subTask.push(e5)
	e5.subTaskOf = e2
	let e7 = new Entity()
	e7.type = Entity.DecisionTask
	e7.isIn = new State(State.Inactive)
	e7.conditional = false
	e7.id = "task21"
	e7.label = "decision1?"
	let e8 = new Entity()
	e8.type = Entity.DecisionBranch
	e8.isIn = new State(State.Inactive)
	let c0 = new Condition()
	c0.type = Condition.Conjunction
	let c1 = new Condition()
	c1.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someCode2 && obs.ObservationdotvalueBoolean == false)
	}
	c0.allOf.push(c1)
	e8.precondition = c0
	e8.branchTarget = e6
	e8.next.push(e6)
	e6.nextOf.push(e8)
	e7.decisionBranch.push(e8)
	let e9 = new Entity()
	e9.type = Entity.DecisionBranch
	e9.isIn = new State(State.Inactive)
	let c2 = new Condition()
	c2.type = Condition.Conjunction
	let c3 = new Condition()
	c3.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someCode2 && obs.ObservationdotvalueBoolean == true)
	}
	c2.allOf.push(c3)
	e9.precondition = c2
	e9.branchTarget = e4
	e9.next.push(e4)
	e4.nextOf.push(e9)
	e7.decisionBranch.push(e9)
	e7.next.push(e9)
	e9.nextOf.push(e7)
	e7.next.push(e8)
	e8.nextOf.push(e7)
	e2.subTask.push(e7)
	e7.subTaskOf = e2
	e2.next.push(e1)
	e1.nextOf.push(e2)
	e0.subTask.push(e2)
	e2.subTaskOf = e0
	let e10 = new Entity()
	e10.type = Entity.DecisionTask
	e10.isIn = new State(State.Inactive)
	e10.conditional = false
	e10.id = "task1"
	e10.label = "decision1?"
	let e11 = new Entity()
	e11.type = Entity.DecisionBranch
	e11.isIn = new State(State.Inactive)
	let c4 = new Condition()
	c4.type = Condition.Conjunction
	let c5 = new Condition()
	c5.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someCode && obs.ObservationdotvalueBoolean == true)
	}
	c4.allOf.push(c5)
	e11.precondition = c4
	e11.branchTarget = e2
	e11.next.push(e2)
	e2.nextOf.push(e11)
	e10.decisionBranch.push(e11)
	let e12 = new Entity()
	e12.type = Entity.DecisionBranch
	e12.isIn = new State(State.Inactive)
	let c6 = new Condition()
	c6.type = Condition.Conjunction
	let c7 = new Condition()
	c7.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someCode && obs.ObservationdotvalueBoolean == false)
	}
	c6.allOf.push(c7)
	e12.precondition = c6
	let e13 = new Entity()
	e13.type = Entity.DecisionTask
	e13.isIn = new State(State.Inactive)
	e13.conditional = false
	e13.id = "task3"
	e13.label = "decision2?"
	let e14 = new Entity()
	e14.type = Entity.DecisionBranch
	e14.isIn = new State(State.Inactive)
	let c8 = new Condition()
	c8.type = Condition.Disjunction
	let c9 = new Condition()
	c9.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode1 && obs.ObservationdotvalueQuantity.Quantitydotvalue > 10)
	}
	c8.anyOf.push(c9)
	let c10 = new Condition()
	c10.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode2 && obs.ObservationdotvalueQuantity.Quantitydotvalue > 5)
	}
	c8.anyOf.push(c10)
	e14.precondition = c8
	let e15 = new Entity()
	e15.type = Entity.DecisionTask
	e15.isIn = new State(State.Inactive)
	e15.conditional = false
	e15.id = "task4"
	e15.label = "decision3?"
	let e16 = new Entity()
	e16.type = Entity.DecisionBranch
	e16.isIn = new State(State.Inactive)
	let c11 = new Condition()
	c11.type = Condition.Disjunction
	let c12 = new Condition()
	c12.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode3 && obs.ObservationdotvalueBoolean == true)
	}
	c11.anyOf.push(c12)
	let c13 = new Condition()
	c13.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode4 && obs.ObservationdotvalueBoolean == true)
	}
	c11.anyOf.push(c13)
	let c14 = new Condition()
	c14.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode5 && obs.ObservationdotvalueBoolean == true)
	}
	c11.anyOf.push(c14)
	e16.precondition = c11
	let e17 = new Entity()
	e17.type = Entity.EndPoint
	e17.isIn = new State(State.Inactive)
	e17.conditional = false
	e17.id = "task6"
	e17.label = "endpoint4"
	e16.branchTarget = e17
	e16.next.push(e17)
	e17.nextOf.push(e16)
	e15.decisionBranch.push(e16)
	let e18 = new Entity()
	e18.type = Entity.DecisionBranch
	e18.isIn = new State(State.Inactive)
	let c15 = new Condition()
	c15.type = Condition.Conjunction
	let c16 = new Condition()
	c16.check = function (obs) {
		return (obs.Observationdotcode.type == Code.codeNone && obs.ObservationdotvalueBoolean == true)
	}
	c15.allOf.push(c16)
	e18.precondition = c15
	let e19 = new Entity()
	e19.type = Entity.EndPoint
	e19.isIn = new State(State.Inactive)
	e19.conditional = false
	e19.id = "task7"
	e19.label = "endpoint5"
	e18.branchTarget = e19
	e18.next.push(e19)
	e19.nextOf.push(e18)
	e15.decisionBranch.push(e18)
	e15.next.push(e18)
	e18.nextOf.push(e15)
	e15.next.push(e16)
	e16.nextOf.push(e15)
	e14.branchTarget = e15
	e14.next.push(e15)
	e15.nextOf.push(e14)
	e13.decisionBranch.push(e14)
	let e20 = new Entity()
	e20.type = Entity.DecisionBranch
	e20.isIn = new State(State.Inactive)
	let c17 = new Condition()
	c17.type = Condition.Conjunction
	let c18 = new Condition()
	c18.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode1 && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 10)
	}
	c17.allOf.push(c18)
	let c19 = new Condition()
	c19.check = function (obs) {
		return (obs.Observationdotcode.type == Code.someOtherCode2 && obs.ObservationdotvalueQuantity.Quantitydotvalue <= 5)
	}
	c17.allOf.push(c19)
	e20.precondition = c17
	let e21 = new Entity()
	e21.type = Entity.EndPoint
	e21.isIn = new State(State.Inactive)
	e21.conditional = false
	e21.id = "task5"
	e21.label = "endpoint3"
	e20.branchTarget = e21
	e20.next.push(e21)
	e21.nextOf.push(e20)
	e13.decisionBranch.push(e20)
	e13.next.push(e20)
	e20.nextOf.push(e13)
	e13.next.push(e14)
	e14.nextOf.push(e13)
	e12.branchTarget = e13
	e12.next.push(e13)
	e13.nextOf.push(e12)
	e10.decisionBranch.push(e12)
	e10.next.push(e12)
	e12.nextOf.push(e10)
	e10.next.push(e11)
	e11.nextOf.push(e10)
	e0.subTask.push(e10)
	e10.subTaskOf = e0
	e0.subTask.push(e13)
	e13.subTaskOf = e0
	e0.subTask.push(e15)
	e15.subTaskOf = e0
	e0.subTask.push(e21)
	e21.subTaskOf = e0
	e0.subTask.push(e17)
	e17.subTaskOf = e0
	e0.subTask.push(e19)
	e19.subTaskOf = e0
	
	return e0
}

export var jsonWorkflow = {"id": "Example_Workflow","name": "Example Workflow","composed": false,"node_type": "composite_task","workflow_state": "activeState","decisional_state": "chosenState","description": "Example Workflow","children": [{"id": "task1","name": "decision1?","composed": true,"in_workflow": "Example_Workflow","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Decision 1?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_code'><\/span><div id='some_code' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Data: <label><input type='radio' name='some_code' id='some_code-yes' code='some_code-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='some_code' id='some_code-no' code='some_code-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>\n","children": [{"id": "Example_Workflow2","name": "sub-workflow","composed": false,"in_workflow": "Example_Workflow","node_type": "composite_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option1","description": "Option 1"},"description": "Example Workflow 2","children": [{"id": "task8","name": "endpoint1","composed": false,"in_workflow": "Example_Workflow","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Endpoint 1"},{"id": "task21","name": "decision1?","composed": true,"in_workflow": "Example_Workflow2","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Decision 1?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_code2'><\/span><div id='some_code2' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean'>Data: <label><input type='radio' name='some_code2' id='some_code2-yes' code='some_code2-yes' value='yes' \/>yes<\/label>&nbsp;&nbsp;<label><input type='radio' name='some_code2' id='some_code2-no' code='some_code2-no' value='no' \/>no<\/label><\/div><\/td><\/tr><\/table>","children": [{"id": "task22","name": "task1.1","composed": false,"in_workflow": "Example_Workflow2","node_type": "atomic_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option1","description": "Option 1"},"description": "Task 1.1","children": [{"hidden": true},{"id": "task24","name": "task2","composed": false,"in_workflow": "Example_Workflow2","otherParents": [{"id": "task23","condition": null}],"node_type": "atomic_task","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Task 2","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/taskStateActive'><\/span><label><input type='checkbox' id='taskStateActive' code='taskStateActive' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='taskStateCompleted' mandatory='false' \/>Active<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/taskStateCompleted'><\/span><label><input type='checkbox' id='taskStateCompleted' code='taskStateCompleted' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='taskStateActive' mandatory='false' \/>Completed<\/label><\/td><\/tr><\/table>","children": [{"id": "task25","name": "endpoint","composed": false,"in_workflow": "Example_Workflow2","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","description": "Endpoint"}]}]},{"id": "task23","name": "task1.2","composed": false,"in_workflow": "Example_Workflow2","node_type": "atomic_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option2","description": "Option 2"},"description": "Task 1.2","children": []}]}]},{"id": "task3","name": "decision2?","composed": false,"in_workflow": "Example_Workflow","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option2","description": "Option 2"},"description": "Decision 2?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_other_code1'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>mmol\/L<\/span>Data 1 <input type='number' id='some_other_code1' code='some_other_code1' min='1' max='100' step='0.01' size='4' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-100)<\/div><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_other_code2'><\/span><div property='http:\/\/hl7.org\/fhir\/Observation.valueQuantity' typeof='http:\/\/hl7.org\/fhir\/ValueQuantity'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.system' resource='http:\/\/unitsofmeasure.org'><\/span><span style='display: none' property='http:\/\/hl7.org\/fhir\/Quantity.code'>mmol\/L<\/span>Data 2 <input type='number' id='some_other_code2' code='some_other_code2' min='1' max='100' step='0.01' size='4' property='http:\/\/hl7.org\/fhir\/Quantity.value' \/> (1-100)<\/div><\/td><\/tr><\/table>\n","children": [{"id": "task4","name": "decision3?","composed": false,"in_workflow": "Example_Workflow","node_type": "decision_task","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option1","description": "some_other_code1 > 10 OR some_other_code2 > 5"},"description": "Decision 3?","inputForm": "<table><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_other_code3'><\/span><label><input type='checkbox' id='some_other_code3' code='some_other_code3' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_none' mandatory='false' \/>Option 1<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_other_code4'><\/span><label><input type='checkbox' id='some_other_code4' code='some_other_code4' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_none' mandatory='false' \/>Option 2<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/some_other_code5'><\/span><label><input type='checkbox' id='some_other_code5' code='some_other_code5' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='code_none' mandatory='false' \/>Option 3<\/label><\/td><\/tr><tr><td property='http:\/\/hl7.org\/fhir\/DiagnosticReport.result' typeof='http:\/\/hl7.org\/fhir\/Observation'><span style='display: none' property='http:\/\/hl7.org\/fhir\/Observation.code' resource='http:\/\/example.org\/code_none'><\/span><label><input type='checkbox' id='code_none' code='code_none' property='http:\/\/hl7.org\/fhir\/Observation.valueBoolean' mutex-with='some_other_code3,some_other_code4,some_other_code5' mandatory='false' \/>None<\/label><\/td><\/tr><\/table>\n","children": [{"id": "task6","name": "endpoint4","composed": false,"in_workflow": "Example_Workflow","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option1","description": "one of 3 options"},"description": "Endpoint 4"},{"id": "task7","name": "endpoint5","composed": false,"in_workflow": "Example_Workflow","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option2","description": "none"},"description": "Endpoint 5"}]},{"id": "task5","name": "endpoint3","composed": false,"in_workflow": "Example_Workflow","node_type": "endpoint","workflow_state": "inactiveState","decisional_state": "chosenState","condition": {"label": "option2","description": "some_other_code1 <= 10 OR some_other_code2 <= 5"},"description": "Endpoint 3"}]}]}]}