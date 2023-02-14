const SourceTypes = {
    LOCAL: 'LOCAL', 
    SERVER: 'SERVER'
}

function DataSource(cig) {
    return this;
}

DataSource.prototype.constructor = DataSource;

// - start API

DataSource.prototype.load = function (data) {
    let cb = () => {
        cig.show(this._wfView);
        this.initStates();
    };

	if ((typeof data) === "string")
		this._loadFromUrl(data, cb);	
	else
		this._loadWorkflow(data, cb);
}

CIGBase.prototype.loading_start = function () {
	$('.overlay').css('display', 'block');
}

CIGBase.prototype.loading_end = function () {
	$('.overlay').css('display', 'none');
}

DataSource.prototype.findNodeById = function (id) {
    return this._map[id];
}

DataSource.prototype.submitObservation = function(reference, rdf) {}

DataSource.prototype.resetObservations = function(id) {}

DataSource.prototype.resetAllObservations = function() {}

DataSource.prototype.resetSource = function() {}

DataSource.prototype.initStates = function(workflowRef) {}

class WorkflowReference {

    constructor(baseId, workflowId) {
        this.baseId = baseId;
        this.workflowId = workflowId;
    }

    toString() {
        return this.baseId + "." + this.workflowId;
    }
}

class TaskReference {

    constructor(workflowRef, taskId) {
        this.workflowRef = workflowRef;
        this.taskId = taskId;
    }

    static parse(reference) {
        const pat = /([^\.]+?)\.([^\.]+?)\.([^\.]+)/;
        const matches = reference.match(pat);
        if (!matches) {
            console.error("cannot parse reference:", reference);
            return null;

        } else
            return new TaskReference(new WorkflowReference(matches[1], matches[2]), matches[3]);
    }

    toString() {
        return this.workflowRef + "." + this.taskId;
    }
};

DataSource.prototype.workflowRef = function () {
	return new WorkflowReference(this._baseWorkflow(), this.id);
}

DataSource.prototype.taskRef = function (taskId) {
	const node = this.findNodeById(taskId);

	const workflowId = node.data.in_workflow;
	const workflowRef = new WorkflowReference(this._baseWorkflow(), workflowId);

	return new TaskReference(workflowRef, taskId);
}

// - end API

DataSource.prototype._baseWorkflow = function () {
    return this._wfView.id;
}

DataSource.prototype._loadFromUrl = function (url, callback) {
	let ctu = (wf) => this._loadWorkflow(wf, callback);
	if (url.endsWith(".js"))
		import(url).then(ctu);
	else if (url.endsWith(".json"))
		d3.json(url).then(ctu);
	else
		console.error("unknown extension:", url);
}

DataSource.prototype._loadWorkflow = function (wf, callback) {
    // (workflow that views will be working with)
    this._wfView = this._init(wf);

    this._map = {};
    this._setupData(json, 0);

    callback();
}

DataSource.prototype._setupData = function (d, depth) {
    d.depth = depth;
    if (d.node_type == 'composite_task')
        // keeps whether any of the included inputs (direct children)
        // had new user input since the last refresh
        d.newUserInput = false;

    // wrap as data field of object
    // need separate method to receive an "external" node (e.g., _updateNode)
    // since native methods expect the original 'data'
    this._map[d.id] = { data: d };

    if (d.children) {
        for (var child of d.children)
            this._setupData(child, depth + 1);
    }
}