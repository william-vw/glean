export class Observation {
    constructor(Observationdotcode, ObservationdotvalueBoolean) {
        this.Observationdotcode = Observationdotcode;
        this.ObservationdotvalueBoolean = ObservationdotvalueBoolean;
    }

    Observationdotcode;
    ObservationdotvalueBoolean;
}

export class Code {
    static codeCorticosteroids = 'codeCorticosteroids';
    static codeHypothyroidism = 'codeHypothyroidism';
    static codeCyclosporine = 'codeCyclosporine';
    static codeAntiConvulsant = 'codeAntiConvulsant';
    static codeLiverDisease = 'codeLiverDisease';
    static codeOralContraceptives = 'codeOralContraceptives';
    static codeHighlyActiveAntiRetroviralTherapy = 'codeHighlyActiveAntiRetroviralTherapy';
    static codeNephroticSyndrome = 'codeNephroticSyndrome';
    static codeAndrogens = 'codeAndrogens';
    static codeExcessiveAlcoholConsumption = 'codeExcessiveAlcoholConsumption';
    static codeSirolimus = 'codeSirolimus';
    static codeDiabetes = 'codeDiabetes';
    static code13CisRetiniocAcid = 'code13CisRetiniocAcid';
    static codeNoSecondaryCauses = 'codeNoSecondaryCauses';
    static codeAbnormalLipidProfile = 'codeAbnormalLipidProfile';

    constructor(type) {
        this.type = type;
    }

    type;
}

export class Entity {
    constructor(conditionMet) {
        this.conditionMet = conditionMet;
    }

    conditionMet;
}

export function test() {
    console.log("got so far");
}