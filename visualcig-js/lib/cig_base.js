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

CIGBase.prototype.load = function (data, config, callbacks) {
	const cb = () => {
		if (callbacks && callbacks.beforeRefresh)
			callbacks.beforeRefresh();

		source.initFromSource(cig.workflowRef());

		if (callbacks && callbacks.afterRefresh)
			callbacks.afterRefresh();
	};

	if ((typeof data) === "string")
		this._loadFromUrl(data, config, cb);	
	else
		this._loadWorkflow(data, config, cb);
}

CIGBase.prototype.loading_start = function () {
	$('.overlay').css('display', 'block');
}

CIGBase.prototype.loading_end = function () {
	$('.overlay').css('display', 'none');
}

CIGBase.prototype.workflowRef = function () {
	return new WorkflowReference(this._baseWorkflow(), this.id);
}

CIGBase.prototype.taskRef = function (taskId) {
	const node = this.findNodeById(taskId);

	const workflowId = node.data.in_workflow;
	const workflowRef = new WorkflowReference(this._baseWorkflow(), workflowId);

	return new TaskReference(workflowRef, taskId);
}

CIGBase.prototype.onInputFromSource = function (node, input) {
	node.data.input = input;
}

CIGBase.prototype.onUserInput = function(taskId) {}

// - end API

CIGBase.prototype._loadFromUrl = function (url, config, callback) {
	let ctu = (wf) => this._loadWorkflow(wf, config, callback);
	if (url.endsWith(".js"))
		import(url).then(ctu);
	else if (url.endsWith(".json"))
		d3.json(url).then(ctu);
	else
		console.error("unknown extension:", url);
}

CIGBase.prototype._init = function (data, config) {
	// init data source
	if (!window.source) {
		switch (config.source) {

			case SourceTypes.LOCAL:
				window.source = new FSM();
				break;

			case SourceTypes.SERVER:
				window.source = new DataServer();
				break;

			default:
				console.error(`unknown source: ${config.source}`);
		}
		// (in case of fsm, "data" will include much more initially)
		data = source.setup(data);
	}

	this.id = data.id;
	this._data = data;
	this._config = config;

	// console.log("config", config);
	if (config.ns)
		prefixes.ns = config.ns;

	// ('data' object will be workflow node itself)
	this._workflow = { id: this._data.id, data: this._data };
}

// subclasses need to implement:
// _loadWorkflow
// _baseWorkflow