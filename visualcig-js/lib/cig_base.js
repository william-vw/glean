export function CIGBase() {
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

CIGBase.prototype.show = function (wf) {
	this._data = wf;
	this.id = wf.id;
	this._config = config;

	// console.log("config", config);
	if (config.ns)
		prefixes.ns = config.ns;

	// ('data' object will be workflow node itself)
	this._workflow = { id: this._data.id, data: this._data };

	this._init();
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

// - end API