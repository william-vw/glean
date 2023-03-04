function CIGBase(source, input) {
	this._source = source;
	
	this._input = input;
	this.isCurrent();
	
	return this;
}

CIGBase.prototype.constructor = CIGBase;

CIGBase.prototype.isCurrent = function() {
	this._input._cig = this;
}

// - start API

class NodeUpdate {

	constructor(id, node, workflowState, decisionState, inputData) {
		this.id = id;
		this.node = node;
		this.workflowState = workflowState;
		this.decisionState = decisionState;
		this.inputData = inputData;
	}

	toString() {
		return this.id + ": " + this.workflowState + (this.inputData ? " (data)" : "");
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

CIGBase.prototype.show = function (config) {
	this.showFromView(this._source.defaultWfView, config);

	// get states from source
	this.refresh();
}

CIGBase.prototype.showFromView = function (wfView, config) {
	if (!config)
		config = {};

	this._data = wfView;
	this.id = wfView.id;
	// this._config = config;

	// ('data' object will be main workflow node itself)
	this._workflow = { id: this._data.id, data: this._data };

	this._initView(config);

	// show main workflow - will always be active
	this.update({ transits: [
		new NodeUpdate(this._workflow.id, this._workflow, this._workflow.data.workflow_state)
	], operations: [] });
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

CIGBase.prototype.onUserInput = function(taskId) {}

CIGBase.prototype.refresh = function() {
	let allUpdates = this._source.refresh();
	this._processUpdates(allUpdates);
}

CIGBase.prototype._processUpdates = function(allUpdates) {
	allUpdates.forEachSet((updates) => this.update({ transits: updates, operations: [] }));
}

// - end API