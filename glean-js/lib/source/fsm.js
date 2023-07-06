function FSM(data) {
	this._data = data;
	return this;
}

FSM.prototype = Object.create(DataSource.prototype);
FSM.prototype.constructor = FSM;

FSM.prototype._initSource = function (wf) {
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

FSM.prototype.refresh = function () {
	console.log("[FSM] refresh");
	
	let updates = this._transitAll();
	return updates;
}

FSM.prototype.submitObservation = function (reference, rdf) {
	console.log("[FSM] submit for:", reference.taskId);
	let e = this._entityMap[reference.taskId];

	let updates = new NodeUpdates();

	// in case of prior observation, reset all nexts of this node
	if (e.hasInputData) {
		e.hasInputData = false;
		let resets = this._resetAllNexts(e.id);
		updates.addSet(resets);
	}

	let nodeAdtMap = this._wf.nodeAdtMap;
	// console.log(nodeAdtMap);
	// console.log(rdf.str);

	let obs = [];
	let transits = new NodeUpdates();

	for (let object of rdf.store.getObjects(null, "http://niche.cs.dal.ca/ns/glean/base.owl#hasInputData")) {
		let newState = this._isTransit(object, rdf);
		
		// direct state transition
		if (newState) {
			e.isIn.type = newState;
			transits.add(this._newUpdate(e));
			
		} else {
			// regular observation
			let o = this._toObject(object, nodeAdtMap, rdf.store);
			obs.push(o);
		}
	}
	
	e.hasInputData = (transits.length() > 0 || obs.length > 0);
	console.log("[FSM] observation: " + JSON.stringify(obs, null, 4));
	
	let obsTransits = this._transitAll(obs);
	transits.addUpdates(obsTransits);
	console.log("[FSM] transits: " + transits);

	updates.addSet(transits);

	return updates;
}

FSM.prototype._isTransit = function(input, rdf) {
	for (let object of rdf.store.getObjects(input, "http://hl7.org/fhir/Observation.code")) {

		// direct state transition
		let ln = localName(object.id);
		if (ln.startsWith("taskState")) {
			return ln.substring("taskState".length);
		}
	}

	return false;
}

FSM.prototype.resetObservations = function (id) {
	let updates = new NodeUpdates();

	let resets = new NodeUpdates();
	this._reset(id, resets);
	updates.addSet(resets);
	
	let transits = this._transitAll();
	updates.addSet(transits);

	return updates;
}

FSM.prototype._resetAllNexts = function (id) {
	let updates = new NodeUpdates();
	this._reset(id, updates);

	console.log("[FSM] transits (reset):\n", updates.toString());
	
	return updates;
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

	// if (e.id)
	// 	console.log("[FSM] reset:", e.id, newState);

	// reset
	if (e.conditionMet)
		e.conditionMet = false;
	if (e.isIn) {
		e.isIn.type = newState;
		let update = this._newUpdate(e);
		if (update)
			transits.add(update);
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

	toString() {
		let str = "{";
		switch (this.type) {

			case Entity.DecisionBranch:
				str = `${this.type} (tgt: ${this.branchTarget.id})`;
				break;

			default:
				str = (this.id ? this.id : this.type);
				break;

		}
		
		if (this.isIn)
			str += `@${this.isIn.type}`;

		str += "}"

		return str;
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

	toString() {
		let str;
		if (this.check) {
			str = this.check + "";
			str = new RegExp("return (.*?)\n").exec(str)[1];
		
		} else {
			let conds = (this.type == Condition.Disjunction ? this.anyOf : this.allOf);
			str = this.type + " [" + conds.map(c => c.toString()).join(", ") + "]";
		}
		if (this.conditionMet)
			str += ": met";
		
		return str;
	}
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

	constructor(entity, newState, reason) {
		this.entity = entity;
		this.newState = newState;
		this.reason = reason;
	}

	toString = function () {
		let str = this.entity.toString();
		if (this.newState)
			str += ` -> ${this.newState}`;
		if (this.reason)
			str += ` (${this.reason})`;

		return str;
	}
}

FSM.prototype._transitAll = function (obs) {
	// console.log("[FSM] transit all");

	// this._runAll(obs);
	// let wf = this._entityMap[workflowRef.workflowId];
	// let updates = new NodeUpdates();
	// [wf, ...wf.subTask].forEach(s => updates.add(this._newUpdate(s)));
	
	let updates = new NodeUpdates();
	let transits = this._runAll(obs);
	for (let id in transits) {
		updates.add(this._newUpdate(transits[id]));
	}

	// console.log("[FSM] transits (run):", updates.toString());

	return updates;
}

FSM.prototype._runAll = function (obs) {
	// let cnt = 0;
	let allUpdates = {};

	do {
		this._updated = [];
		for (let entity of this._entities)
			this._runOn(entity, obs);

		// console.log("[FSM] updated:\n", this._updated.map(u => u.toString()).join("\n"));
		this._updated.forEach(u => { if (u.entity.id) allUpdates[u.entity.id] = u.entity });

	} while (this._updated.length > 0);

	// console.log("[FSM] allUpdates:", JSON.stringify(allUpdates, null, 4));
	return allUpdates;
}

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
		this._updated.push(new StateUpdate(entity, State.Active, "preconditionMet"));
	}

	if (entity.conditional == false
		&& entity.checkIn(State.Ready)) {

		entity.isIn.type = State.Active;
		this._updated.push(new StateUpdate(entity, State.Active, "readyUnconditional"));
	}

	if (entity.checkIn
		&& entity.checkIn(State.Inactive)
		&& entity.nextOf.length > 0
		&& entity.nextOf.some(x0 => x0.checkIn(State.Completed))) {

		entity.isIn.type = State.Ready;
		this._updated.push(new StateUpdate(entity, State.Ready, "inactiveNextOfSomeCompleted"));
	}

	if (entity.checkIn
		&& entity.checkIn(State.Inactive)
		&& entity.nextOf.every(x1 => x1.checkIn(State.Discarded))
		&& entity.nextOf.length > 0) {

		entity.isIn.type = State.Discarded;
		this._updated.push(new StateUpdate(entity, State.Discarded, "inactiveNextOfAllDiscarded"));
	}

	if (entity.type == Entity.EndPoint
		&& entity.checkIn(State.Active)) {

		entity.isIn.type = State.Completed;
		this._updated.push(new StateUpdate(entity, State.Completed, "activeEndPoint"));
	}

	if (entity.involvesAction == false
		&& entity.checkIn(State.Active)) {

		entity.isIn.type = State.Completed;
		this._updated.push(new StateUpdate(entity, State.Completed, "activeNoActionInvolved"));
	}

	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Active)
		&& entity.subTask.length > 0) {

		entity.subTask.forEach(x2 => {
			if (x2.checkIn(State.Inactive)
				&& x2.nextOf.length == 0) {

				x2.isIn.type = State.Ready
				this._updated.push(new StateUpdate(x2, State.Ready, "inactiveNoNextOfSubOfActive"));
			}
		});
	}

	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Discarded)
		&& entity.subTask.length > 0) {

		entity.subTask.forEach(x3 => {
			if (x3.checkIn(State.NotDone)) {

				x3.isIn.type = State.Discarded
				this._updated.push(new StateUpdate(x3, State.Discarded, "notDoneSubOfDiscarded"));
			}
		});
	}

	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Active)
		&& entity.subTask.length > 0
		&& entity.subTask.some(x4 => x4.checkIn(State.Completed))
		&& entity.subTask.every(x5 => x5.checkIn(State.Done))) {

		entity.isIn.type = State.Completed;
		this._updated.push(new StateUpdate(entity, State.Completed, "activeSubAllDone"));
	}

	if (entity.type == Entity.CompositeTask
		&& entity.subTask.length > 0
		&& entity.checkIn(State.NotDone)
		&& entity.subTask.every(x6 => x6.checkIn(State.Discarded))) {

		entity.isIn.type = State.Discarded;
		this._updated.push(new StateUpdate(entity, State.Discarded, "notDoneSubAllDiscarded"));
	}

	if (entity.type == Entity.DecisionTask
		&& entity.checkIn(State.Activated)
		&& entity.decisionBranch.length > 0) {

		entity.decisionBranch.forEach(x7 => {
			if (x7.checkIn(State.Inactive)) {

				x7.isIn.type = State.Ready
				this._updated.push(new StateUpdate(x7, State.Ready, "inactiveBranchOfActivated"));
			}
		});
	}

	if (entity.type == Entity.DecisionTask
		&& entity.decisionBranch.length > 0
		&& entity.decisionBranch.some(x8 => x8.checkIn(State.Active))
		&& entity.checkIn(State.Active)) {

		entity.isIn.type = State.Completed;
		this._updated.push(new StateUpdate(entity, State.Completed, "someActiveBranch"));
	}

	if (entity.type == Entity.DecisionTask
		&& entity.checkIn(State.Completed)
		&& entity.decisionBranch.length > 0) {

		entity.decisionBranch.forEach(x9 => {
			if (x9.checkIn(State.Ready)) {

				x9.isIn.type = State.Discarded
				this._updated.push(new StateUpdate(x9, State.Discarded, "readyBranchOfCompleted"));
			}
		});
	}

	if (entity.type == Entity.DecisionBranch
		&& entity.checkIn(State.Active)
		&& entity.branchTarget.checkIn(State.Inactive)) {

		entity.branchTarget.isIn.type = State.Ready;
		this._updated.push(new StateUpdate(entity.branchTarget, State.Ready, "inactiveTargetOfActive"));
	}
}

FSM.prototype._newUpdate = function (e) {
	let node = this.findNodeById(e.id);
	
	if (node) {
		let from = node.data.workflow_state;
		let to = e.isIn.type.toLowerCase() + "State";

		return new NodeUpdate(e.id, node, from, to);
	
	} else
		return false;
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
		// console.log("quad:", prpQuad);

		let prpId = prpQuad._predicate.id;

		if (!(prpId in clsObj))
			continue;
			// there can be more annotations in the html than there is in the decision logic
			// (doesn't mean there's an issue)
			// throw `Data property not in ADT ${clsObj['name']}": ${prpId}`;

		let prpObj = clsObj[prpId];
		// console.log("prpObj", prpObj);

		let value = null;

		// - object
		if (prpObj.type) {
			let objId = prpQuad._object.id;

			// - nested object
			if (prpQuad._object.termType == "BlankNode") {
				value = this._toObject(objId, nodeAdtMap, store);

			// - constant
			} else {
				let typeObj = nodeAdtMap[prpObj.type];
				if (!(objId in typeObj))
					throw `Data constant not in ADT "${typeObj['name']}": ${objId}`;

				else {
					let cnstObj = typeObj[objId];
					value = eval(`new this._wf.${typeObj.name}(this._wf.${typeObj.name}.${cnstObj.name})`);
				}
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

		if (value !== null)
			obj[prpObj.name] = value;
	}

	return obj;
}