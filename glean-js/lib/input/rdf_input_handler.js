// (prefixes.ns: set by constructor)
const prefixes = {
    xsd: 'http://www.w3.org/2001/XMLSchema#',
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    fhir: 'http://hl7.org/fhir/',
    gl: 'http://niche.cs.dal.ca/ns/glean/base.owl#'
};

function RdfInputHandler(ns) {
    prefixes.ns = ns;

    this._inputMap = {};

    return this;
}

RdfInputHandler.prototype = Object.create(InputHandler.prototype);
RdfInputHandler.prototype.constructor = RdfInputHandler;

RdfInputHandler.prototype.submitInputData = async function (element) {
    element = $(element);

    var container = element.closest('table');
    if (container.length == 0) {
        container = element.closest('div#main-container');
        container = container.find('div.input-form:visible');
    }

    const check = this._checkInputData(container);
    if (check !== true) {
        console.error("submitInputData", check);
        this.cig.get().onInputError(element, check);

        return;
    }

    const taskId = container.closest('.input-form').attr('task-id');
    this.cig.get().onUserInput(taskId);

    // 'await' not allowed in lambda for each()
    const elements = jQuery.makeArray(container);
    for (var el2 of elements) {
        el2 = $(el2);

        const reference = this.cig.get()._source.taskRef(taskId);

        var rdf = null;
        try {
            rdf = await extractRdfData(el2,
                (stmt, store) => this._onExtractedStmt(reference, stmt, store),
                { insertUserInput: true, includeOptionalFalses: false }
            );
            // console.log("rdf:", rdf);

        } catch (e) {
            console.error(e); // JSON.stringify(e, null, 4));

            this.cig.get().onInputError(element, e);

            return;
        }

        // no error
        this.cig.get().onInputError(element, false);

        this._onNewInput(taskId, rdf);

        // console.log("rdf?", rdf);
        this.cig.get().submitObservation(reference, rdf);
    }
}

RdfInputHandler.prototype._onExtractedStmt = function (reference, stmt, store) {
    const taskUri = prefixes.ns + reference.taskId;
    store.addQuad(
        namedNode(taskUri),
        namedNode(prefixes.gl + "hasInputData"),
        stmt.subject);

    return stmt;
}

// keep user input; store under its associated code

RdfInputHandler.prototype._onNewInput = function (id, rdf) {
    const stmts = rdf.store.getQuads(null, namedNode(prefixes.fhir + 'Observation.code'), null);

    let codeMap = {};
    // per code, insert associated user value into inputMap
    for (let stmt of stmts) {
        let code = stmt.object.id;
        var value = undefined;

        // value depends on type

        var values = rdf.store.getQuads(stmt.subject, namedNode(prefixes.fhir + 'Observation.valueBoolean', null));
        if (values.length > 0)
            value = (values[0].object.value === 'true');

        if (value === undefined) {
            var values = rdf.store.getQuads(stmt.subject, namedNode(prefixes.fhir + 'Observation.valueInteger', null));
            if (values.length > 0)
                value = values[0].object.value;
        }

        if (value === undefined) {
            values = rdf.store.getQuads(stmt.subject, namedNode(prefixes.fhir + 'Observation.valueQuantity', null));
            if (values.length > 0)
                value = rdf.store.getQuads(values[0].object, namedNode(prefixes.fhir + 'Quantity.value', null))[0]
                    .object.value;
        }

        codeMap[code] = value;
    }
    this._inputMap[id] = codeMap;

    // console.log("_newInput:", id, this._inputMap);
}

// try populate input field with prior user input, based on its associated code

RdfInputHandler.prototype._tryPopulateInput = async function (id, el) {
    if (!(id in this._inputMap))
        return;

    let codeMap = this._inputMap[id];

    // extract annotations of input element
    let rdf = await extractRdfData(el, (quad) => quad, { insertUserInput: false });
    const stmts = rdf.store.getQuads(null, namedNode(prefixes.fhir + 'Observation.code'), null);

    // console.log("_tryPopulateInput:", el, rdf);

    // for each code, see if value was previously entered
    for (let stmt of stmts) {
        let code = stmt.object.id;
        const id = localName(code);

        let value = codeMap[code];
        // console.log("populate:", code, id, this._inputMap);
        if (value === undefined)
            continue;

        // if so, update input element
        el.find(`[id=${id}]`).each((idx, field) => {
            field = $(field);

            if (!field || field.prop('tagName') != 'INPUT') { // try radio buttons
                field = el.find(`[id=${id + (value ? "-yes" : "-no")}]`);
                field.prop('checked', true);

                return;
            }

            if (!field) {
                console.error(`cannot find field with id: ${id}`)
                return;
            }

            if (field.prop('type') == 'checkbox')
                field[0].checked = value;
            else
                field.val(value);
        });
    }
}

// - helper code

// TODO doesn't work (currently loading from script tags)
// import { N3 } from './N3.dist.js';
// import { rdfa } from './rdfa.dist.js';

function localName(uri) {
    let idx = uri.indexOf("#");
    if (idx === -1)
        idx = uri.lastIndexOf("/");

    return uri.substring(idx + 1);
}

function ground(stmt) {
    stmt.subject = groundNode(stmt.subject);
    stmt.object = groundNode(stmt.object);

    return stmt;
}

function groundNode(node) {
    if (node.termType == 'BlankNode')
        return { termType: 'NamedNode', value: prefixes.ns + node.value }
    else
        return node;
}

function find(subject, targetPrp, store) {
    var stmts = store.getQuads(subject, null, null);
    for (var i = 0; i < stmts.length; i++) {
        var stmt = stmts[i];
        if (stmt._predicate.id == targetPrp)
            return stmt._subject;
        else {
            var found = find(stmt._object, targetPrp, store);
            if (found)
                return found;
        }
    }
}

const DataFactory = N3.DataFactory;
const { namedNode, blankNode, literal, defaultGraph, quad } = N3.DataFactory;

function parseRdf(rdf) {
    return new Promise((resolve, reject) => {

        const store = new N3.Store();
        const parser = new N3.Parser();
        parser.parse(rdf,
            (error, quad, prefixes) => {
                // console.log(error, quad, prefixes);
                if (error !== null)
                    reject(error);
                else if (quad)
                    store.addQuad(quad);
                else
                    resolve(store);
            });
    });
}

async function extractRdfData(el, onQuad, config) {
    const store = new N3.Store({ prefixes: prefixes });

    await new Promise((resolve, reject) => {
        const rdfaParser = new rdfa.RdfaParser({ contentType: 'text/html' })
            .on('data', (quad, etc) => store.addQuad(quad))
            .on('error', reject)
            .on('end', () => {
                if (config.insertUserInput)
                    insertUserInput(el, store, onQuad, config);
                resolve();
            });

        rdfaParser.write(el.html());
        rdfaParser.end();

        //$('#curDateTime').attr('content', new Date().toISOString());
    });

    const writer = new N3.Writer({ prefixes: prefixes });
    store.forEach(stmt => { writer.addQuad(stmt); });

    return new Promise((resolve, reject) => {
        writer.end((error, result) => {
            if (result)
                resolve({ str: result, store: store });
            else
                reject(error);
        });
    });
}

function insertUserInput(el, store, onQuad, config) {
    // (also include input element itself, if needed)
    el.find('input').addBack('input').each((idx, input) => {
        input = $(input);
        var code = input.attr('code');
        var prp = input.attr('property');

        var include = true;
        var value = "";

        switch (input.attr('type')) {
            case 'text':
                value = input.val();
                break;

            case 'number':
                value = input.val() * 1;
                break;

            case 'checkbox':
                value = input.is(':checked');
                if (!config.includeOptionalFalses && input.attr('mandatory') !== 'true' && !value)
                    include = false;
                break;

            case 'radio':
                if (input.is(':checked')) {
                    value = input.attr('value') === 'yes';
                    if (value)
                        code = code.substring(0, code.indexOf("-yes"));
                    else
                        code = code.substring(0, code.indexOf("-no"));
                    prp = input.parent().closest('div').attr("property");

                } else
                    return;

                break;

            default:
                // only interested in input types listed above
                return;
        }

        console.log("user input:", "code =", code, "prp =", prp, "value = ", value);

        // look for relevant code stmt in extracted rdf
        var codeStmt = store.getQuads(null, null, (prefixes.ns + code))[0];
        if (!codeStmt) {
            console.error("could not find rdf statement for code:", (prefixes.ns + code));
            return;
        }

        // console.log("code:", codeStmt);

        // starting from code-stmt subject, look for value-stmt with given property
        // (due to way input UI is structured; will always be nested this way)
        // (either same subject as code-stmt, or stmt linked to code-stmt)
        var start = codeStmt._subject;
        var subject = find(start, prp, store);

        // remove prior value-stmt, if any (we're manually inserting the value)
        var valueStmt = store.getQuads(subject, prp, null)[0];
        store.removeQuad(valueStmt);

        if (include) {
            // insert new value-stmt with user input value
            const quad = { subject: subject, property: prp, object: literal(value) };
            store.addQuad(quad.subject, quad.property, quad.object);

            // code-stmt will link to any value-stmt
            // (again due to way input UI & annotations are structured)
            onQuad(codeStmt, store);

        } else {
            store.removeQuad(codeStmt);
        }
    });
}