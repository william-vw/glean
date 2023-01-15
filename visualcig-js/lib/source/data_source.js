const SourceTypes = {
    LOCAL: 'LOCAL', 
    SERVER: 'SERVER'
}

function DataSource() {
	return this;
}

DataSource.prototype.constructor = DataSource;

// - start API

DataSource.prototype.setup = function(wf) {}

DataSource.prototype.submitObservation = function(reference, rdf) {}

DataSource.prototype.resetObservations = function(id) {}

DataSource.prototype.resetAllObservations = function() {}

DataSource.prototype.resetSource = function() {}

DataSource.prototype.initFromSource = function(workflowRef) {}

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

// - end API