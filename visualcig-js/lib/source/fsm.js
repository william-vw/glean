function FSM(data) {
	this._data = data;
	return this;
}

FSM.prototype = Object.create(DataSource.prototype);
FSM.prototype.constructor = FSM;

FSM.prototype._init = function (wf) {
	this._wf = wf;
	this._root = wf.createWorkflow();

	this._entities = [];
	this._entityMap = {};

	this._visitWf(this._root);
	// console.log("[FSM] objects:", this._entities);

	return wf.jsonWorkflow;
}

FSM.prototype._visitWf = function (e) {
	if (e.id && (e.id in this._entityMap))
		return;

	this._entities.push(e);
	if (e.id)
		this._entityMap[e.id] = e;

	this._forEachNext(e, this._visitWf);
}

FSM.prototype.refresh = function (cig, workflowRef) {
	console.log("[FSM] initStates:", workflowRef.workflowId);
	this._transitAll(cig, workflowRef);
}

FSM.prototype.submitObservation = function (reference, rdf) {
	console.log("[FSM] submit for:", reference.taskId);
	let e = this._entityMap[reference.taskId];

	// in case of prior observation, reset all nexts of this node
	if (e.hasInputData) {
		this._resetAllNexts(e.id);
	}

	let nodeAdtMap = this._wf.nodeAdtMap;
	// console.log(nodeAdtMap);
	// console.log(rdf.str);

	let obs = [];
	for (let quad of rdf.store.getQuads(null, "http://niche.cs.dal.ca/ns/glean/base.owl#hasInputData", null)) {
		let o = this._toObject(quad._object.id, nodeAdtMap, rdf.store);
		// keep obs for corresponding entity
		e.hasInputData = o;
		obs.push(o);
	}
	console.log("[FSM] observation:", obs);
	this._transitAll(reference.workflowRef, obs);
}

FSM.prototype.resetObservations = function (id) {
	this._reset(id, []);

	const workflowRef = this.workflowRef();
	this._transitAll(workflowRef);
}

FSM.prototype._resetAllNexts = function (id) {
	let transits = [];
	this._reset(id, transits);

	console.log("[FSM] transits (reset):\n", 
		transits.map(t => `${t.node.data.id}: ${t.workflowState}`).join(", "));
	cig.update({ transits: transits, operations: [] });
}

FSM.prototype._reset = function (id, transits) {
	let e = this._entityMap[id];
	this._doReset(e, true, false, State.Active, {}, transits);
}

FSM.prototype.resetAllObservations = function () {
	console.error("NOT IMPLEMENTED YET");
}

FSM.prototype.resetSource = function () {
	console.error("NOT IMPLEMENTED YET");
}

FSM.prototype._doReset = function (e, first, upward, newState, found, transits) {
	if (e.id && (e.id in found))
		return;

	if (e.id)
		console.log("[FSM] reset:", e.id, newState);

	// reset
	if (e.conditionMet)
		e.conditionMet = false;
	if (e.isIn) {
		e.isIn.type = newState;
		transits.push(this._transitFor(e));
	}

	if (e.id)
		found[e.id] = e;

	// propagate

	if (upward) {
		// this is a super-workflow for the element
		// recursively set each 'next' of this workflow to inactive
		e.next.forEach((next) => {
			this._doReset(next, false, false, State.Inactive, found, transits)
		});

	} else {
		// recursively set all subs, nexts etc to inactive
		this._forEachNext(e, (e) =>
			this._doReset(e, false, false, State.Inactive, found, transits)
		);
	}

	// move upward in the hierarchy
	if ((first || upward) && e.subTaskOf)
		// set all super-workflows of this element to active
		this._doReset(e.subTaskOf, false, true, State.Active, found, transits);
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

class StateUpdate {

	constructor(entity, reason) {
		this.entity = entity;
		this.reason = reason;
	}

	toString = function () {
		let str = `${this.entity.id ? this.entity.id : this.entity.type}`;
		if (this.entity.isIn)
			str += `: ${this.entity.isIn.type}`;
		if (this.reason)
			str += ` (${this.reason})`;

		return str;
	}
}

FSM.prototype._transitAll = function (cig, workflowRef, obs) {
	console.log("[FSM] transit all:", workflowRef.workflowId);

	this._runAll(obs);
	// console.log("after update:\n", this._print());

	let wf = this._entityMap[workflowRef.workflowId];
	let transits = [wf, ...wf.subTask].map(s => this._transitFor(s));
	
	console.log("[FSM] transits (run):\n", 
		transits.map(t => `${t.node.data.id}: ${t.workflowState}`).join(", "));
	cig.update({ transits: transits, operations: [] });
}

FSM.prototype._runAll = function (obs) {
	// let cnt = 0;
	let allUpdates = {};

	do {
		this._updated = [];
		for (let entity of this._entities)
			this._runOn(entity, obs);

		console.log("[FSM] updated:\n", this._updated.map(u => u.toString()).join("\n"));
		this._updated.forEach(u => { if (u.entity.id) allUpdates[u.entity.id] = u.entity.isIn.type });

	} while (this._updated.length > 0);

	console.log("[FSM] allUpdates:", JSON.stringify(allUpdates, null, 4));
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
			&& entity.anyOf.some(x10 => obs.some(o => x10.check(o)))) {

			entity.conditionMet = true;
			this._updated.push(new StateUpdate(entity));
		}

		if (!entity.conditionMet
			&& entity.type == Condition.Conjunction
			&& entity.allOf.every(x11 => obs.some(o => x11.check(o)))) {

			entity.conditionMet = true;
			this._updated.push(new StateUpdate(entity));
		}
	}

	if (entity.precondition
		&& entity.precondition.conditionMet == true
		&& entity.checkIn(State.Ready)) {

		entity.isIn.type = State.Active;
		this._updated.push(new StateUpdate(entity, "preconditionMet"));
	}

	if (entity.conditional == false
		&& entity.checkIn(State.Ready)) {

		entity.isIn.type = State.Active;
		this._updated.push(new StateUpdate(entity, "readyUnconditional"));
	}

	if (entity.checkIn
		&& entity.checkIn(State.Inactive)
		&& entity.nextOf.length > 0
		&& entity.nextOf.some(x0 => x0.checkIn(State.Completed))) {

		entity.isIn.type = State.Ready;
		this._updated.push(new StateUpdate(entity, "inactiveNextOfSomeCompleted"));
	}

	if (entity.checkIn
		&& entity.checkIn(State.Inactive)
		&& entity.nextOf.every(x1 => x1.checkIn(State.Discarded))
		&& entity.nextOf.length > 0) {

		entity.isIn.type = State.Discarded;
		this._updated.push(new StateUpdate(entity, "inactiveNextOfAllDiscarded"));
	}

	if (entity.type == Entity.EndPoint
		&& entity.checkIn(State.Active)) {

		entity.isIn.type = State.Completed;
		this._updated.push(new StateUpdate(entity, "activeEndPoint"));
	}

	if (entity.involvesAction == false
		&& entity.checkIn(State.Active)) {

		entity.isIn.type = State.Completed;
		this._updated.push(new StateUpdate(entity, "activeNoActionInvolved"));
	}

	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Active)
		&& entity.subTask.length > 0) {

		entity.subTask.forEach(x2 => {
			if (x2.checkIn(State.Inactive)
				&& x2.nextOf.length == 0) {
				x2.isIn.type = State.Ready
				this._updated.push(new StateUpdate(x2, "inactiveNoNextOfSubOfActive"));
			}
		});
	}

	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Discarded)
		&& entity.subTask.length > 0) {

		entity.subTask.forEach(x3 => {
			if (x3.checkIn(State.NotDone)) {
				x3.isIn.type = State.Discarded
				this._updated.push(new StateUpdate(x3, "notDoneSubOfDiscarded"));
			}
		});
	}

	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Active)
		&& entity.subTask.length > 0
		&& entity.subTask.some(x4 => x4.checkIn(State.Completed))
		&& entity.subTask.every(x5 => x5.checkIn(State.Done))) {

		entity.isIn.type = State.Completed;
		this._updated.push(new StateUpdate(entity, "activeSubAllDone"));
	}

	if (entity.type == Entity.CompositeTask
		&& entity.subTask.length > 0
		&& entity.checkIn(State.NotDone)
		&& entity.subTask.every(x6 => x6.checkIn(State.Discarded))) {

		entity.isIn.type = State.Discarded;
		this._updated.push(new StateUpdate(entity, "notDoneSubAllDiscarded"));
	}

	if (entity.type == Entity.DecisionTask
		&& entity.checkIn(State.Activated)
		&& entity.decisionBranch.length > 0) {

		entity.decisionBranch.forEach(x7 => {
			if (x7.checkIn(State.Inactive)) {
				x7.isIn.type = State.Ready
				this._updated.push(new StateUpdate(x7, "inactiveBranchOfActivated"));
			}
		});
	}

	if (entity.type == Entity.DecisionTask
		&& entity.decisionBranch.length > 0
		&& entity.decisionBranch.some(x8 => x8.checkIn(State.Active))
		&& entity.checkIn(State.Active)) {

		entity.isIn.type = State.Completed;
		this._updated.push(new StateUpdate(entity, "someActiveBranch"));
	}

	if (entity.type == Entity.DecisionTask
		&& entity.checkIn(State.Completed)
		&& entity.decisionBranch.length > 0) {

		entity.decisionBranch.forEach(x9 => {
			if (x9.checkIn(State.Ready)) {
				x9.isIn.type = State.Discarded
				this._updated.push(new StateUpdate(x9, "readyBranchOfCompleted"));
			}
		});
	}

	if (entity.type == Entity.DecisionBranch
		&& entity.checkIn(State.Active)
		&& entity.branchTarget.checkIn(State.Inactive)) {

		entity.branchTarget.isIn.type = State.Ready;
		this._updated.push(new StateUpdate(entity, "inactiveTargetOfActive"));
	}
}

FSM.prototype._transitFor = function (e) {
	let node = this.findNodeById(e.id);
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