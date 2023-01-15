function DataServer() {
	return this;
}

DataServer.prototype = Object.create(DataSource.prototype);
DataServer.prototype.constructor = DataServer;

DataServer.prototype.setup = function(wf) {
    return wf;
}

DataServer.prototype.submitObservation = function(reference, rdf) {
    this._bulkSend([
        () => this._sendToServer('DELETE', this._deleteEntry('Observation', reference)),
        () => this._sendAndReceiveData('CREATE', this._taskObservationEntry(reference, rdf.str))
    ]);
}

DataServer.prototype.resetObservations = function(task) {
    // (cig: global variable set in html code)
    const workflowRef = cig.workflowRef();

    const taskRef = new TaskReference(workflowRef, task);
    console.log("resetting task:", taskRef);

    this._bulkSend([
        () => this._sendToServer('DELETE', this._deleteEntry('Observation', taskRef)),
        () => this._refreshTasks(workflowRef, true)
    ]);
}

DataServer.prototype.resetAllObservations = function() {
    const workflowRef = cig.workflowRef();
    const taskRef = new TaskReference(workflowRef, "all");

    console.log("resetting workflow:", workflowRef);
    this._bulkSend([
        () => this._sendToServer('DELETE', this._deleteEntry('Observation', taskRef)),
        () => this._refreshTasks(workflowRef, true)
    ]);
}

DataServer.prototype.resetSource = function() {
    const workflowRef = cig.workflowRef();
    const taskRef = new TaskReference(new WorkflowReference(workflowRef.baseId, "all"), "");

    console.log("resetting server");
    source._bulkSend([
        () => source._sendToServer('DELETE', source._deleteEntry('Observation', taskRef)),
        () => source._refreshTasks(workflowRef, true)
    ]);
}

DataServer.prototype.initFromSource = function(workflowRef) {
    // console.log("initFromSource:", workflowRef);
    
    this._refreshTasks(workflowRef, true);
}

DataServer.prototype._refreshTasks = function(workflowRef, initialize) {
    return this._sendAndReceiveData('SEARCH', this._queryEntry('Task',
        { workflow: workflowRef.toString(), initializing: initialize + "" }), true)
}

var bulkSending = false;

DataServer.prototype._bulkSend = async function(sends) {
    cig.loading_start();

    bulkSending = true;
    for (send of sends) {
        try {
            await send();
        } catch (e) {
            this._onError(e);
        }
    }
    bulkSending = false;

    cig.loading_end();
}

DataServer.prototype._sendData = async function(operation, entry) {
    try {
        const ret = await this._sendToServer(operation, entry);
        if (!bulkSending)
            cig.loading_end();

    } catch (e) {
        this._onError(e);
    }
}

DataServer.prototype._sendAndReceiveData = async function(operation, entry, refreshing) {
    try {
        const ret = await this._sendToServer(operation, entry);
        return this._processDataResult(ret, refreshing)

    } catch (e) {
        this._onError(e);
    }
}

DataServer.prototype._sendToServer = function(operation, entry) {
    console.log("sending:", operation, entry);

    if (!bulkSending)
        cig.loading_start();

    switch (operation) {

        case 'CREATE':
            return fhirClient.create(entry);

        case 'DELETE':
            return fhirClient.delete(entry);

        case 'SEARCH':
            return fhirClient.search(entry);

        default:
            console.error("unsupported operation:", operation);
            if (!bulkSending)
                cig.loading_end();
            break;
    }
}

DataServer.prototype._processDataResult = function(result, refreshing) {
    console.log("receiving:", result);

    return new Promise((resolve, reject) => {
        if (!result.data.entry) {
            reject("No entries returned from server.");
        }

        const data = result.data.entry;

        var transits = [];
        data.forEach(task => {
            // console.log("task", task);

            const ref = TaskReference.parse(task.resource.id);
            var taskState = task.resource.businessStatus.coding[0].code;
            taskState = taskState.toLowerCase() + "State";
            if (taskState == 'activeState')
                console.log("active (server):", ref, ref.toString(), taskState);

            const node = cig.findNodeById(ref.taskId);
            if (node) {
                transits.push({ node: node, workflowState: taskState, decisionState: undefined });

                if (refreshing) {
                    const input = task.resource.description;
                    if (input) {
                        console.log("input (from server)?", task.resource.id, input);
                        cig.onInputFromServer(node, input);
                    }
                }
            }
            //else
            //    console.error("cannot find node:", ref.taskId);
        });
        // console.log(transits);

        cig.update({ transits: transits, operations: [] });

        if (!bulkSending)
            cig.loading_end();

        resolve();
    });
}

DataServer.prototype._onError = function(e) {
    console.error(e); // JSON.stringify(e, null, 4));
    window.alert("Error contacting server (check browser console for details).");
}

DataServer.prototype._taskObservationEntry = function(reference, rdf) {
    return {
        resource: {
            resourceType: 'Observation',
            basedOn: [{ reference: reference.toString() }],
            comment: (rdf ? rdf : "")
        }
    };
}

DataServer.prototype._deleteEntry = function(type, reference, rdf) {
    return {
        resource: {
            resourceType: type,
            id: reference.toString()
        }
    };
}

DataServer.prototype._queryEntry = function(type, query) {
    return {
        type: type,
        query: query
    };
}