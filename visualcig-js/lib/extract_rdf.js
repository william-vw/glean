// TODO doesn't work (currently loading from script tags)
// import { N3 } from './N3.dist.js';
// import { rdfa } from './rdfa.dist.js';

function localName(uri) {
    return uri.substring(uri.indexOf("#") + 1);
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

const DataFactory = N3.DataFactory;
const { namedNode, blankNode, literal, defaultGraph, quad } = N3.DataFactory;

// prefixes.ns: set by client code
const prefixes = {
    xsd: 'http://www.w3.org/2001/XMLSchema#',
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    fhir: 'http://hl7.org/fhir/',
    gl: 'http://niche.cs.dal.ca/ns/glean/base.owl#'
};

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
                resolve(result);
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
        var codeStmt = store.getQuads(null, null, prefixes.ns + code)[0];
        if (!codeStmt) {
            console.error("could not find rdf statement for code:", code);
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