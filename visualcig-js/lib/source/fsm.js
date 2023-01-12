function FSM() {
	return this;
}

FSM.prototype = DataSource.prototype;
FSM.prototype.constructor = FSM;

FSM.prototype.setup = function(wf) {
    let e = wf.createWorkflow();

    this._objects = [];
    this._visitWf(e);

    console.log("objects:");
    this._objects.forEach((o) => console.log(o.type, ":", o.id));
}

FSM.prototype._visitWf = function(e) {
    this._objects.push(e);

    if (e.subTask)
        e.subTask.forEach((s) => this._visitWf(s));
    
    if (e.next)
        e.next.forEach((n) => this._visitWf(n));

    if (e.decisionBranch)
        e.decisionBranch.forEach((d) => this._visitWf(d));

    if (e.branchTarget)
        this._visitWf(e.branchTarget);
}

FSM.prototype.submitObservation = function(reference, rdf) {
    // ...
}

FSM.prototype.resetObservations = function(el) {}

FSM.prototype.resetAllObservations = function() {}

FSM.prototype.resetSource = function() {}

FSM.prototype.initFromSource = function() {}


class Entity {
	static EndPoint = 'EndPoint';
	static CompositeTask = 'CompositeTask';
	static DecisionTask = 'DecisionTask';
	static DecisionBranch = 'DecisionBranch';

    constructor(type) {
		this.type = type;
	}

	conditional;
	type;
	precondition;
	isIn;
	next = [];
	nextOf = [];
	subTask = [];
	decisionBranch = [];
	branchTarget;
	involvesAction;

    checkIn = function(state) {
        return state == this.isIn.type || 
            this.isIn.subStates.some(x => x == state);
    }
}

class Condition {
	static Disjunction = 'Disjunction';
	static Conjunction = 'Conjunction';

	constructor(type) {
		this.type = type;
	}

	type;
	conditionMet;
	anyOf = [];
	allOf = [];
	
	check;
}

class State {
	static Ready = 'Ready';
	static Active = 'Active';
	static Inactive = 'Inactive';
	static Completed = 'Completed';
	static Discarded = 'Discarded';
	static NotDone = 'NotDone';
	static Done = 'Done';
	static Activated = 'Activated';

	constructor(type) {
		this.type = type;

        switch (this.type) {
            case NotDone:
                this.subStates.push(State.Inactive);
                this.subStates.push(State.Ready);
                this.subStates.push(State.Active);
                break;

	        case Done: 
                this.subStates.push(State.Completed);
                this.subStates.push(State.Discarded);
                break;

	        case Activated:
                this.subStates.push(State.Active);
                this.subStates.push(State.Completed);
                break;
        }
	}

	type;
    subStates = [];
}

// regex replace:
// isIn.type == ([^\);]+)
// with:
// checkIn($1)

function run(entity) {
	if (entity.conditional == true
		&& entity.precondition.conditionMet == true
		&& entity.checkIn(State.Ready)) {
	
		entity.isIn.type = State.Active;
        return true;
	}
	
	if (entity.checkIn(State.Inactive)
		&& entity.nextOf.length > 0
		&& entity.nextOf.some(x0 => x0.checkIn(State.Completed))) {
	
		entity.isIn.type = State.Ready;
        return true;
	}
	
	if (entity.checkIn(State.Inactive)
		&& entity.nextOf.every(x1 => x1.checkIn(State.Discarded))
		&& entity.nextOf.length > 0) {
	
		entity.isIn.type = State.Discarded;
        return true;
	}
	
	if (entity.type == Entity.EndPoint
		&& entity.checkIn(State.Active)) {
	
		entity.isIn.type = State.Completed;
        return true;
	}
	
	if (entity.involvesAction == false
		&& entity.checkIn(State.Active)) {
	
		entity.isIn.type = State.Completed;
        return true;
	}
	
	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Active)
		&& entity.subTask.length > 0) {
	
		entity.subTask.forEach(x2 => { if (x2.checkIn(State.Inactive)
			&& x2.nextOf.length == 0) { x2.isIn.type = State.Ready } });
        return true;
	}
	
	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Discarded)
		&& entity.subTask.length > 0) {
	
		entity.subTask.forEach(x3 => { if (x3.checkIn(State.NotDone)) { x3.isIn.type = State.Discarded } });
        return true;
	}
	
	if (entity.type == Entity.CompositeTask
		&& entity.checkIn(State.Active)
		&& entity.subTask.length > 0
		&& entity.subTask.some(x4 => x4.checkIn(State.Completed))
		&& entity.subTask.every(x5 => x5.checkIn(State.Done))) {
	
		entity.isIn.type = State.Completed;
        return true;
	}
	
	if (entity.type == Entity.CompositeTask
		&& entity.subTask.length > 0
		&& entity.checkIn(State.NotDone)
		&& entity.subTask.every(x6 => x6.checkIn(State.Discarded))) {
	
		entity.isIn.type = State.Discarded;
        return true;
	}
	
	if (entity.type == Entity.DecisionTask
		&& entity.checkIn(State.Activated)
		&& entity.decisionBranch.length > 0) {
	
		entity.decisionBranch.forEach(x7 => { if (x7.checkIn(State.Inactive)) { x7.isIn.type = State.Ready } });
        return true;
	}
	
	if (entity.decisionBranch.length > 0
		&& entity.decisionBranch.some(x8 => x8.checkIn(State.Active))
		&& entity.checkIn(State.Active)) {
	
		entity.isIn.type = State.Completed;
        return true;
	}
	
	if (entity.type == Entity.DecisionTask
		&& entity.checkIn(State.Completed)
		&& entity.decisionBranch.length > 0) {
	
		entity.decisionBranch.forEach(x9 => { if (x9.checkIn(State.Ready)) { x9.isIn.type = State.Discarded } });
        return true;
	}
	
	if (entity.type == Entity.DecisionBranch
		&& entity.checkIn(State.Active)
		&& entity.branchTarget.checkIn(State.Inactive)) {
	
		entity.branchTarget.isIn.type = State.Ready;
        return true;
	}
	
	if (entity.type == Condition.Disjunction
		&& entity.anyOf.length > 0
		&& entity.anyOf.some(x10 => x10.conditionMet == true)) {
	
		entity.conditionMet = true;
        return true;
	}
	
	if (entity.type == Condition.Conjunction
		&& entity.allOf.every(x11 => x11.conditionMet == true)) {
	
		entity.conditionMet = true;
        return true;
	}
}