const SourceTypes = {
    LOCAL: 'LOCAL',
    SERVER: 'SERVER'
}

function DataSource(data) {
    this._data = data;
    return this;
}

DataSource.prototype.constructor = DataSource;

// - start API

DataSource.prototype.load = function () {
    return new Promise((resolve, reject) => {

        if ((typeof this._data) === "string")
            this._loadFromUrl(this._data, resolve, reject);
        else
            this._loadWorkflow(this._data, resolve, reject);
    });
}

DataSource.prototype.loading_start = function () {
    $('.overlay').css('display', 'block');
}

DataSource.prototype.loading_end = function () {
    $('.overlay').css('display', 'none');
}

DataSource.prototype.findNodeById = function (id) {
    return this._map[id];
}

DataSource.prototype.submitObservation = function (reference, rdf) { }

DataSource.prototype.resetObservations = function (id) { }

DataSource.prototype.resetAllObservations = function () { }

DataSource.prototype.resetSource = function () { }

DataSource.prototype.refresh = function (cig, workflowRef) { }

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
    return this.wfView.id;
}

DataSource.prototype._loadFromUrl = function (url, onSuccess, onError) {
    let ctu = (wf) => this._loadWorkflow(wf, onSuccess, onError);
    if (url.endsWith(".js"))
        import(url).then(ctu);
    else if (url.endsWith(".json"))
        d3.json(url).then(ctu);
    else {
        console.error("unknown extension:", url);
        onError();
    }
}

DataSource.prototype._loadWorkflow = function (wf, onSuccess, onError) {
    // the subclass will give us the JSON that views (CIG) will be working with
    // (e.g., for FSM - this will be a property of "wf", and not "wf" itself)
    this.wfView = this._init(wf);

    // setup a map to support findNodeById
    this._map = {};
    this._setupData(this.wfView, 0);

    onSuccess();
}

DataSource.prototype._setupData = function (d, depth) {
    d.depth = depth;
    if (d.node_type == 'composite_task')
        // (keeps whether any of the included inputs (direct children)
        // had new user input since the last refresh; needed by some subclasses)
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