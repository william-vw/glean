function FSM() {
	return this;
}

FSM.prototype = DataSource.prototype;
FSM.prototype.constructor = FSM;

FSM.prototype.setup = function (wf) {
	this._wf = wf;

	let e = wf.createWorkflow();

	this._objects = [];
	this._visitWf(e);

	// console.log("[FSM] objects:", this._objects);
}

FSM.prototype._visitWf = function (e) {
	this._objects.push(e);

	if (e.subTask)
		e.subTask.forEach((s) => this._visitWf(s));

	if (e.next)
		e.next.forEach((n) => this._visitWf(n));

	if (e.decisionBranch)
		e.decisionBranch.forEach((d) => this._visitWf(d));

	if (e.precondition)
		this._objects.push(e.precondition);

	if (e.branchTarget)
		this._visitWf(e.branchTarget);
}

FSM.prototype.initFromSource = function () {
	this._runAll();

	// let toActivate = cig._data.children[0];
	// let node = cig.findNodeById(toActivate.id)
	// let transits = [{ node: node, workflowState: 'activeState', decisionState: undefined }];
	// cig.update({ transits: transits, operations: [] });
}

FSM.prototype.submitObservation = function (reference, rdf) {
	let nodeAdtMap = this._wf.nodeAdtMap;

	// console.log(nodeAdtMap);
	// console.log(rdf.str);

	let typeUri = "http://hl7.org/fhir/Observation";

	for (let typeQuad of rdf.store.getQuads(null, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", typeUri)) {
		let r = typeQuad._subject.id;

		let root = this._toObject(r, nodeAdtMap, rdf.store);
		console.log("root", root);
	}

	cig.update({ transits: [], operations: [] });
}

FSM.prototype._toObject = function (r, nodeAdtMap, store) {
	let typeQuad = store.getQuads(r, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", null)[0];
	let typeUri = typeQuad._object.id;

	if (!(typeUri in nodeAdtMap)) {
		throw `[FSM.toObject] cannot find ${typeUri} in property type map`
	}

	let clsObj = nodeAdtMap[typeUri];
	// console.log("clsObj", clsObj);
	let obj = Object.create(eval(`this._wf.${clsObj.name}`))

	for (let prpQuad of store.getQuads(r, null, null)) {
		if (prpQuad._predicate.id in clsObj) {
			// console.log("quad:", prpQuad);
			let prpObj = clsObj[prpQuad._predicate.id];
			// console.log("prpObj", prpObj);

			let value = null;

			// - object
			if (prpObj.type) {

				// - nested object
				if (prpQuad._object.termType == "BlankNode") {
					value = this._toObject(prpQuad._object.id, nodeAdtMap, store);

					// - constant
				} else {
					let typeObj = nodeAdtMap[prpObj.type];
					let cnstObj = typeObj[prpQuad._object.id];

					value = eval(`this._wf.${typeObj.name}.${cnstObj.name}`);
				}

				// - literal
			} else {
				let rdfObj = prpQuad._object;
				let jsonObj = rdfObj.toJSON();

				if (rdfObj.id.endsWith("boolean"))
					value = (jsonObj.value == "true");
				else
					value = Number(jsonObj.value);
				// throw `[toObject] unsupported literal: ${rdfObj.id}`;
			}

			obj[prpObj.name] = value;
		}
	}

	return obj;
}

FSM.prototype.resetObservations = function (el) { }

FSM.prototype.resetAllObservations = function () { }

FSM.prototype.resetSource = function () { }


class Entity {
	static EndPoint = 'EndPoint';
	static CompositeTask = 'CompositeTask';
	static DecisionTask = 'DecisionTask';
	static DecisionBranch = 'DecisionBranch';

	constructor(type) {
		this.type = type;
	}

	conditional;
	type;
	precondition;
	isIn;
	next = [];
	nextOf = [];
	subTask = [];
	decisionBranch = [];
	branchTarget;
	involvesAction;

	checkIn = function (state) {
		return state == this.isIn.type ||
			this.isIn.subStates.some(x => x == state);
	}
}

class Condition {
	static Disjunction = 'Disjunction';
	static Conjunction = 'Conjunction';

	constructor(type) {
		this.type = type;
	}

	type;
	conditionMet;
	anyOf = [];
	allOf = [];

	check;
}

class State {
	static Ready = 'Ready';
	static Active = 'Active';
	static Inactive = 'Inactive';
	static Completed = 'Completed';
	static Discarded = 'Discarded';
	static NotDone = 'NotDone';
	static Done = 'Done';
	static Activated = 'Activated';

	constructor(type) {
		this.type = type;

		switch (this.type) {
			case State.NotDone:
				this.subStates.push(State.Inactive);
				this.subStates.push(State.Ready);
				this.subStates.push(State.Active);
				break;

			case State.Done:
				this.subStates.push(State.Completed);
				this.subStates.push(State.Discarded);
				break;

			case State.Activated:
				this.subStates.push(State.Active);
				this.subStates.push(State.Completed);
				break;
		}
	}

	type;
	subStates = [];
}

FSM.prototype._runAll = function (obs) {
	let cnt = 0;
	let allUpdates = {};

	do {
		this._updated = [];

		for (let entity of this._objects) {
			this._runOn(entity, obs);
		}

		console.log("[FSM.runAll] updated?", this._updated.map(u => u.id + ":" + u.isIn.type).join(", "));

		this._updated.forEach(u => { if (u.id) allUpdates[u.id] = u.isIn.type });

	} while (this._updated.length > 0);

	console.log("[FSM.runAll] allUpdated?", JSON.stringify(allUpdates, null, 4));
}

// regex replace:
// isIn.type == ([^\);]+)
// with:
// checkIn($1)

FSM.prototype._runOn = function (entity, obs) {
	if (obs) {
		if (!entity.conditionMet
			&& entity.type == Condition.Disjunction
			&& entity.anyOf.length > 0
			&& entity.anyOf.some(x10 => x10.check(obs))) {

			entity.conditionMet = true;
			this._updated.push(entity);
		}

		if (!entity.conditionMet
			&& entity.type == Condition.Conjunction
			&& entity.allOf.every(x11 => x11.check(obs))) {

			entity.conditionMet = true;
			this._updated.push(entity);
		}
	}

	if (entity.conditional == true
		&& entity.precondition.conditionMet == true
		&& entity.checkIn(State.Ready)) {

		entity.isIn.type = State.Active;
		this._updated.push(entity);
	}

	if (entity.conditional == false
		&& entity.checkIn(State.Ready)) {

		entity.isIn.type = State.Active;
		this._updated.push(entity);
	}

	if (entity.checkIn
		&& entity.checkIn(State.Inactive)
		&& entity.nextOf.length > 0
		&& entity.nextOf.some(x0 => x0.checkIn(State.Completed))) {

		entity.isIn.type = State.Ready;
		this._updated.push(entity);
	}

	if (entity.checkIn
		&& entity.checkIn(State.Inactive)
		&& entity.nextOf.every(x1 => x1.checkIn(State.Discarded))
		&& entity.nextOf.length > 0) {

		entity.isIn.type = State.Discarded;
		this._updated.push(entity);
	}

	if (entity.type == Entity.EndPoint
		&& entity.checkIn(State.Active)) {

		entity.isIn.type = State.Completed;
		this._updated.push(entity);
	}

	if (entity.involvesAction == false
		&& entity.checkIn(State.Active)) {

		entity.isIn.type = State.Completed;
		this._updated.push(entity);
	}

	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Active)
		&& entity.subTask.length > 0) {

		entity.subTask.forEach(x2 => {
			if (x2.checkIn(State.Inactive)
				&& x2.nextOf.length == 0) {
				x2.isIn.type = State.Ready
				this._updated.push(x2);
			}
		});
	}

	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Discarded)
		&& entity.subTask.length > 0) {

		entity.subTask.forEach(x3 => {
			if (x3.checkIn(State.NotDone)) {
				x3.isIn.type = State.Discarded
				this._updated.push(x3);
			}
		});
	}

	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Active)
		&& entity.subTask.length > 0
		&& entity.subTask.some(x4 => x4.checkIn(State.Completed))
		&& entity.subTask.every(x5 => x5.checkIn(State.Done))) {

		entity.isIn.type = State.Completed;
		this._updated.push(entity);
	}

	if (entity.type == Entity.CompositeTask
		&& entity.subTask.length > 0
		&& entity.checkIn(State.NotDone)
		&& entity.subTask.every(x6 => x6.checkIn(State.Discarded))) {

		entity.isIn.type = State.Discarded;
		this._updated.push(entity);
	}

	if (entity.type == Entity.DecisionTask
		&& entity.checkIn(State.Activated)
		&& entity.decisionBranch.length > 0) {

		entity.decisionBranch.forEach(x7 => {
			if (x7.checkIn(State.Inactive)) {
				x7.isIn.type = State.Ready
				this._updated.push(x7);
			}
		});
	}

	if (entity.type == Entity.DecisionTask
		&& entity.decisionBranch.length > 0
		&& entity.decisionBranch.some(x8 => x8.checkIn(State.Active))
		&& entity.checkIn(State.Active)) {

		entity.isIn.type = State.Completed;
		this._updated.push(entity);
	}

	if (entity.type == Entity.DecisionTask
		&& entity.checkIn(State.Completed)
		&& entity.decisionBranch.length > 0) {

		entity.decisionBranch.forEach(x9 => {
			if (x9.checkIn(State.Ready)) {
				x9.isIn.type = State.Discarded
				this._updated.push(x9);
			}
		});
	}

	if (entity.type == Entity.DecisionBranch
		&& entity.checkIn(State.Active)
		&& entity.branchTarget.checkIn(State.Inactive)) {

		entity.branchTarget.isIn.type = State.Ready;
		this._updated.push(entity.branchTarget);
	}
}