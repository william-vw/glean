function FSM() {
	return this;
}

FSM.prototype = DataSource.prototype;
FSM.prototype.constructor = FSM;

FSM.prototype.setup = function (wf) {
	this._wf = wf;

	let e = wf.createWorkflow();

	this._entities = [];
	this._entityMap = {};

	this._visitWf(e);

	// console.log("[FSM] objects:", this._entities);
}

FSM.prototype._visitWf = function (e) {
	if (e.id && (e.id in this._entityMap))
		return;

	this._entities.push(e);
	if (e.id)
		this._entityMap[e.id] = e;

	this._forEachNext(e, this._visitWf);
}

FSM.prototype.initFromSource = function () {
	this._transitAll();

	// let node = cig.findNodeById(cig._data.children[0].id)
	// let transits = [{ node: node, workflowState: 'activeState', decisionState: undefined }];
	// cig.update({ transits: transits, operations: [] });
}

FSM.prototype.submitObservation = function (reference, rdf) {
	let e = this._entityMap[reference.taskId];
	
	// in case of prior observation, reset first
	if (e.hasInputData)
		this.resetObservations(e.id);

	let nodeAdtMap = this._wf.nodeAdtMap;

	// console.log(nodeAdtMap);
	// console.log(rdf.str);

	let quad = rdf.store.getQuads(null, "http://niche.cs.dal.ca/ns/glean/base.owl#hasInputData", null)[0];
	let obs = this._toObject(quad._object.id, nodeAdtMap, rdf.store);
	console.log("[FSM] obs:", obs);

	// keep obs for corresponding entity
	e.hasInputData = obs;

	this._transitAll(obs);
}

FSM.prototype.resetObservations = function (id) {
	console.log("[FSM] reset", id);
	let e = this._entityMap[id];

	let transits = {};
	this._reset(e, true, false, State.Inactive, transits);

	cig.update({ transits: Object.values(transits), operations: [] });

	this._transitAll();
}

FSM.prototype.resetAllObservations = function () { }

FSM.prototype._reset = function (e, first, upward, newState, transits) {
	if (e.id && (e.id in transits))
		return;

	// reset
	if (e.conditionMet)
		e.conditionMet = false;
	if (e.isIn)
		e.isIn.type = newState;

	// new transit
	if (e.id)
		transits[e.id] = this._transitFor(e);

	// propagate
	if (!upward)
		this._forEachNext(e, (e) =>
			this._reset(e, false, false, State.Inactive, transits)
		);

	if ((first || upward) && e.subTaskOf)
		this._reset(e.subTaskOf, false, true, State.Active, transits);
}

FSM.prototype.resetSource = function () { }

class Entity {
	static EndPoint = 'EndPoint';
	static CompositeTask = 'CompositeTask';
	static DecisionTask = 'DecisionTask';
	static DecisionBranch = 'DecisionBranch';

	constructor(type) {
		this.type = type;
	}

	hasInputData;
	conditional;
	conditionMet;
	type;
	precondition;
	isIn;
	next = [];
	nextOf = [];
	subTask = [];
	subTaskOf;
	decisionBranch = [];
	branchTarget;
	involvesAction;

	checkIn = function (state) {
		if (state == this.isIn.type)
			return true;

		switch (state) {
			case State.NotDone:
				return this.isIn.type == State.Inactive ||
					this.isIn.type == State.Ready ||
					this.isIn.type == State.Active

			case State.Done:
				return this.isIn.type == State.Completed ||
					this.isIn.type == State.Discarded;

			case State.Activated:
				return this.isIn.type == State.Active ||
					this.isIn.type == State.Completed
		}
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
	}

	type;
}

FSM.prototype._transitAll = function (obs) {
	let updates = this._runAll(obs);
	console.log("[FSM] updates:", updates);

	let transits = [];
	for (let id in updates)
		transits.push(this._transitFor(updates[id].entity));

	cig.update({ transits: transits, operations: [] });
	console.log("after transit:\n", this._print());
}

FSM.prototype._runAll = function (obs) {
	// let cnt = 0;
	let allUpdates = {};

	do {
		this._updated = [];

		for (let entity of this._entities)
			this._runOn(entity, obs);

		console.log("[FSM] updated:", this._updated);
		this._updated.forEach(u => { if (u.entity && u.entity.id) allUpdates[u.entity.id] = u });

	} while (this._updated.length > 0);

	return allUpdates;
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

	if (entity.precondition
		&& entity.precondition.conditionMet == true
		&& entity.checkIn(State.Ready)) {

		entity.isIn.type = State.Active;
		this._updated.push({ entity: entity, reason: "preconditionMet" });
	}

	if (entity.conditional == false
		&& entity.checkIn(State.Ready)) {

		entity.isIn.type = State.Active;
		this._updated.push({ entity: entity, reason: "readyUnconditional" });
	}

	if (entity.checkIn
		&& entity.checkIn(State.Inactive)
		&& entity.nextOf.length > 0
		&& entity.nextOf.some(x0 => x0.checkIn(State.Completed))) {

		entity.isIn.type = State.Ready;
		this._updated.push({ entity: entity, reason: "inactiveNextOfSomeCompleted" });
	}

	if (entity.checkIn
		&& entity.checkIn(State.Inactive)
		&& entity.nextOf.every(x1 => x1.checkIn(State.Discarded))
		&& entity.nextOf.length > 0) {

		entity.isIn.type = State.Discarded;
		this._updated.push({ entity: entity, reason: "inactiveNextOfAllDiscarded" });
	}

	if (entity.type == Entity.EndPoint
		&& entity.checkIn(State.Active)) {

		entity.isIn.type = State.Completed;
		this._updated.push({ entity: entity, reason: "activeEndPoint" });
	}

	if (entity.involvesAction == false
		&& entity.checkIn(State.Active)) {

		entity.isIn.type = State.Completed;
		this._updated.push({ entity: entity, reason: "activeNoActionInvolved" });
	}

	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Active)
		&& entity.subTask.length > 0) {

		entity.subTask.forEach(x2 => {
			if (x2.checkIn(State.Inactive)
				&& x2.nextOf.length == 0) {
				x2.isIn.type = State.Ready
				this._updated.push({ entity: entity, reason: "inactiveNoNextOfSubOfActive" });
			}
		});
	}

	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Discarded)
		&& entity.subTask.length > 0) {

		entity.subTask.forEach(x3 => {
			if (x3.checkIn(State.NotDone)) {
				x3.isIn.type = State.Discarded
				this._updated.push({ entity: entity, reason: "notDoneSubOfDiscarded" });
			}
		});
	}

	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Active)
		&& entity.subTask.length > 0
		&& entity.subTask.some(x4 => x4.checkIn(State.Completed))
		&& entity.subTask.every(x5 => x5.checkIn(State.Done))) {

		entity.isIn.type = State.Completed;
		this._updated.push({ entity: entity, reason: "activeSubAllDone" });
	}

	if (entity.type == Entity.CompositeTask
		&& entity.subTask.length > 0
		&& entity.checkIn(State.NotDone)
		&& entity.subTask.every(x6 => x6.checkIn(State.Discarded))) {

		entity.isIn.type = State.Discarded;
		this._updated.push({ entity: entity, reason: "notDoneSubAllDiscarded" });
	}

	if (entity.type == Entity.DecisionTask
		&& entity.checkIn(State.Activated)
		&& entity.decisionBranch.length > 0) {

		entity.decisionBranch.forEach(x7 => {
			if (x7.checkIn(State.Inactive)) {
				x7.isIn.type = State.Ready
				this._updated.push({ entity: entity, reason: "inactiveBranchOfActivated" });
			}
		});
	}

	if (entity.type == Entity.DecisionTask
		&& entity.decisionBranch.length > 0
		&& entity.decisionBranch.some(x8 => x8.checkIn(State.Active))
		&& entity.checkIn(State.Active)) {

		entity.isIn.type = State.Completed;
		this._updated.push({ entity: entity, reason: "someActiveBranch" });
	}

	if (entity.type == Entity.DecisionTask
		&& entity.checkIn(State.Completed)
		&& entity.decisionBranch.length > 0) {

		entity.decisionBranch.forEach(x9 => {
			if (x9.checkIn(State.Ready)) {
				x9.isIn.type = State.Discarded
				this._updated.push({ entity: entity, reason: "readyBranchOfCompleted" });
			}
		});
	}

	if (entity.type == Entity.DecisionBranch
		&& entity.checkIn(State.Active)
		&& entity.branchTarget.checkIn(State.Inactive)) {

		entity.branchTarget.isIn.type = State.Ready;
		this._updated.push({ entity: entity, reason: "inactiveTargetOfActive" });
	}
}

FSM.prototype._transitFor = function (e) {
	let node = cig.findNodeById(e.id);
	let state = e.isIn.type.toLowerCase() + "State";

	return { node: node, workflowState: state, decisionState: undefined };
}

FSM.prototype._forEachNext = function (e, fn) {
	if (e.subTask)
		e.subTask.forEach(t => fn.call(this, t));
	if (e.next)
		e.next.forEach(t => fn.call(this, t));
	if (e.precondition)
		fn.call(this, e.precondition);
	if (e.branchTarget)
		fn.call(this, e.branchTarget);
}

FSM.prototype._print = function (entities) {
	if (!entities)
		entities = this._entities;

	let groups = {};
	entities.forEach(e => {
		if (!e.isIn)
			return;

		let group = groups[e.isIn.type];
		if (!group) {
			group = [];
			groups[e.isIn.type] = group;
		}
		if (e.id) {
			if (!group.includes(e.id))
				group.push(e.id);
		} else
			group.push(e.type);
	});

	return JSON.stringify(groups, null, 4);
}

FSM.prototype._toObject = function (r, nodeAdtMap, store) {
	let typeQuad = store.getQuads(r, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", null)[0];
	let typeUri = typeQuad._object.id;

	if (!(typeUri in nodeAdtMap)) {
		throw `[FSM] cannot find ${typeUri} in property type map`
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

					value = eval(`new this._wf.${typeObj.name}(this._wf.${typeObj.name}.${cnstObj.name})`);
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