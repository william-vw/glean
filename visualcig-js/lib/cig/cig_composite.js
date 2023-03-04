function CIGComposite(config) {
    CIGBase.call(this, config);

    this._cigs = config.cigs;

    // 1) each individual CIG uses this composite's inputHandler
    // 2) inputHandler's _cig property is set to this composite
    
    // so, this composite will intercept all user interactions
    // (submitObservation, etc)

    for (let cig of this._cigs) {
        cig._input = this._input;
        cig._source = this._source;
    }

    return this;
}

CIGComposite.prototype = Object.create(CIGBase.prototype);
CIGComposite.prototype.constructor = CIGComposite;

CIGComposite.prototype.show = function (configs) {
    // show all composed cig's from our single source
    for (let cig of this._cigs)
        cig.showFromView(this._source.defaultWfView, config);

    // get states from source
    this.refresh();
}

CIGComposite.prototype._processUpdates = function (allUpdates) {
    // apply updates to all composed cig's
    for (let cig of this._cigs)
        allUpdates.forEachSet((updates) => cig.update({ transits: updates, operations: [] }));
}