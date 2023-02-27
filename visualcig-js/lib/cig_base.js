function CIGBase(input) {
	this._input = input;
	input._cig = this;
	
	return this;
}

CIGBase.prototype.constructor = CIGBase;

// - start API

class NodeUpdate {

	constructor(id, node, workflowState, decisionState) {
		this.id = id;
		this.node = node;
		this.workflowState = workflowState;
		this.decisionState = decisionState;
	}

	toString() {
		return this.id + ": " + this.workflowState;
	}
}

class NodeUpdates {

    constructor() {
		this.updates = [];
        this.sets = [];
    }

    add(update) {
        this.updates.push(update);
    }

	addSet(updates) {
		this.sets.push(updates);
	}

	forEach(fn) {
		fn(this.updates);
	}

	forEachSet(fn) {
		if (this.sets.length > 0)
			this.sets.forEach(set => fn(set.updates));
		else
			fn(this.updates);
	}

	toString() {
		if (this.sets.length > 0) {
			return this.sets.map(s => s.toString()).join("\n");
		
		} else {
			return this.updates.filter(s => s.workflowState != "inactiveState").map(s => s.toString()).join(", ");
		}
	}
}

// subclasses need to implement:
// update({ transits, operations, adds })
//		transits: [{ node, workflowState, decisionState, propagate (optional) }] (mandatory; can be empty)
// 		operations: [{ source, target, type }] (mandatory; can be empty)
//		adds: [{ parent, data }] (optional)

CIGBase.prototype.show = function (source) {
	this._source = source;

	let wf = source.wfView;
	this._data = wf;
	this.id = wf.id;
	// this._config = config;

	// ('data' object will be workflow node itself)
	this._workflow = { id: this._data.id, data: this._data };

	this._initView();

	this.refresh();
}

CIGBase.prototype.submitObservation = function (reference, rdf) {
	let allUpdates = this._source.submitObservation(reference, rdf);

	this._processUpdates(allUpdates);
}

CIGBase.prototype.resetObservations = function (id) {
	let allUpdates = this._source.resetObservations(id);

	this._processUpdates(allUpdates);
}

CIGBase.prototype.resetAllObservations = function () {
	let allUpdates = this._source.resetAllObservations();

	this._processUpdates(allUpdates);
}

CIGBase.prototype.loading_start = function () {
	$('.overlay').css('display', 'block');
}

CIGBase.prototype.loading_end = function () {
	$('.overlay').css('display', 'none');
}

CIGBase.prototype.onInputFromSource = function (node, input) {
	node.data.input = input;
}

CIGBase.prototype.onUserInput = function(taskId) {}

CIGBase.prototype.refresh = function(workflowRef) {
	if (!workflowRef)
		workflowRef = this._source.workflowRef();

	let allUpdates = this._source.refresh(workflowRef);
	this._processUpdates(allUpdates);
}

CIGBase.prototype._processUpdates = function(allUpdates) {
	allUpdates.forEachSet((updates) => this.update({ transits: updates, operations: [] }));
}

// - end API