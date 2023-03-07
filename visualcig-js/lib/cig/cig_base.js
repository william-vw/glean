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
			this._input.cig = this._cigResolver();
	}

	return this;
}

CIGBase.prototype.constructor = CIGBase;

CIGBase.prototype._cigResolver = function () {
	return new DefaultCIGResolver(this);
}

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
	this._processUpdates(
		new NodeUpdates().add(
			new NodeUpdate(this._workflow.id, this._workflow,
				this._workflow.data.workflow_state,
				this._workflow.data.workflow_state)
		)
	);
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

CIGBase.prototype.onUserInput = function (taskId) { }

CIGBase.prototype.refresh = function () {
	let allUpdates = this._source.refresh();
	this._processUpdates(allUpdates);
}

CIGBase.prototype._processUpdates = function (allUpdates) {
	allUpdates.forEachSet(transits => {
		// let's sort these transits to be in hierarchical order
		// (see cig_form#_show: paths need to be made visible step-by-step)
		// (see cig_form#_transitTo: windows need to be stacked hierarchically)

		transits.sort((t1, t2) => {
			if (t1.node.data.depth < t2.node.data.depth)
				return -1;
			else if (t1.node.data.depth > t2.node.data.depth)
				return 1;
			else
				return 0;
		});

		// console.log("transits (sorted):", transits);

		// update individual nodes
		transits.forEach((t) => { 
			// console.log(transit.id, transit.node.data.workflow_state, 
			//		transit.workflowState, "(" + transit + ")");

			t.node.data.workflow_state = t.to; 
		});

		// update view
		this._updateView(transits);
	});
}

CIGBase.prototype._updateView = function (transits) { }


// - NodeUpdate

class NodeUpdate {

	constructor(id, node, from, to, inputData) {
		this.id = id;
		this.node = node;
		this.from = from;
		this.to = to;
		this.inputData = inputData;
	}

	toString() {
		return this.id + ": " + this.from + "->" + this.to + (this.inputData ? " (data)" : "");
	}
}

class NodeUpdates {

	constructor() {
		this.updates = [];
		this.sets = [];
	}

	add(update) {
		this.updates.push(update);
		return this;
	}

	addSet(updates) {
		this.sets.push(updates);
		return this;
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
			return this.updates.filter(s => s.to != "inactiveState").map(s => s.toString()).join(", ");
		}
	}
}


// CIG Resolver
// returns a "current" CIG for invoking methods on
// (e.g., submitting observations, issuing updates)
// the default implementation simply returns a preset CIG
// for cig_tree, the resolver will return the currently shown CIG

function CIGResolver() {
	return
}

CIGResolver.prototype.constructor = CIGResolver;

CIGResolver.prototype.get = function () { }


function DefaultCIGResolver(defaultCig) {
	CIGResolver.call(this);

	this._defaultCig = defaultCig;

	return this;
}

DefaultCIGResolver.prototype = Object.create(CIGResolver.prototype);

DefaultCIGResolver.prototype.get = function () {
	return this._defaultCig;
}