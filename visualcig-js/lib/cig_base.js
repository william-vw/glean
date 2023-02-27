export function CIGBase(input) {
	this._input = input;
	input._cig = this;
	
	return this;
}

CIGBase.prototype.constructor = CIGBase;

// - start API

// subclasses need to implement:
// findNodeByName(name)
// findNodeById(id)
// update({ transits, operations, adds })
//		transits: [{ node, workflowState, decisionState, propagate (optional) }] (mandatory; can be empty)
// 		operations: [{ source, target, type }] (mandatory; can be empty)
//		adds: [{ parent, data }] (optional)

CIGBase.prototype.show = function (source) {
	this._source = source;

	let wf = source.wfView;
	this._data = wf;
	this.id = wf.id;
	this._config = config;

	// console.log("config", config);
	if (config.ns)
		prefixes.ns = config.ns;

	// ('data' object will be workflow node itself)
	this._workflow = { id: this._data.id, data: this._data };

	this._initView();

	this.refresh();
}

CIGBase.prototype.submitObservation = function (reference, rdf) {
	let updates = this._source.submitObservation(reference, rdf);

	this.update({ transits: updates, operations: [] });
}

CIGBase.prototype.resetObservations = function (id) {
	let updates = this._source.resetObservations(id);

	this.update({ transits: updates, operations: [] });
}

CIGBase.prototype.resetAllObservations = function () {
	let updates = this._source.resetAllObservations();

	this.update({ transits: updates, operations: [] });
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

CIGBase.prototype.refresh = function() {
	let updates = this._source.refresh(this._source.workflowRef());

	this.update({ transits: updates, operations: [] });
}

// - end API