function CIGBase(config) {
	this._config = config;

	if (config.source)
		this._source = config.source;
	
	if (config.input) {
		this._input = config.input;
		// if 'input' (inputHandler) is given in config,
		// and resolver (input.cig property) was not yet set,
		// setup the inputHandler with this cig's resolver 
		if (!this._input.cig)
			this._input.cig = this._createResolver();
	}
	
	return this;
}

CIGBase.prototype.constructor = CIGBase;

CIGBase.prototype._createResolver = function() {
	return new DefaultCIGResolver(this);
}

// subclasses need to implement:
// update({ transits, operations, adds })
//		transits: [{ node, workflowState, decisionState, propagate (optional) }] (mandatory; can be empty)
// 		operations: [{ source, target, type }] (mandatory; can be empty)
//		adds: [{ parent, data }] (optional)

CIGBase.prototype.show = function () {
	this.showFromView(this._source.defaultWfView);

	// get states from source
	this.refresh();
}

CIGBase.prototype.showFromView = function (wfView) {
	this._data = wfView;
	this.id = wfView.id;

	// ('data' object will be main workflow node itself)
	this._workflow = { id: this._data.id, data: this._data };

	this._initView();

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


// - NodeUpdate

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


// CIG Resolver

function CIGResolver() {
	return
}

CIGResolver.prototype.constructor = CIGResolver;

CIGResolver.prototype.get = function() {}


function DefaultCIGResolver(defaultCig) {
	CIGResolver.call(this);

	this._defaultCig = defaultCig;

	return this;
}

DefaultCIGResolver.prototype = Object.create(CIGResolver.prototype);

DefaultCIGResolver.prototype.get = function() {
	return this._defaultCig;
}