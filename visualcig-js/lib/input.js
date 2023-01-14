$(document).ready((e) => {
    // TODO potential for race condition
    $('#reset_source').on('click', () => source.resetSource());
});

async function setupInput(el, d) {
    // set task-id on parent input-form as common way to get, well, task-id
    // (some elements can have id, others duplicate-id)
    el.closest('.input-form').attr('task-id', d.id);

    // (other forms can be appended to this el later on; 
    // so need to get submit buttons now)
    const submit = el.find('input[value=submit]');
    // register listener for enter-key for input-fields
    el.find('input').not('input[type=submit]')
        .keypress((e) => {
            if (e.which == 13) // enter
                submit.trigger("click");
        });

    // register listener for ensuring mutex property for checkboxes (if needed)
    el.find('input[type=checkbox]').each((idx, checkbox) => {
        checkbox = $(checkbox);
        checkbox.change(() => {
            if (checkbox.is(":checked")) {
                if (checkbox.attr('mutex-with')) {
                    const mutexes = checkbox.attr('mutex-with').split(",");
                    mutexes.forEach(mutex => {
                        $("#" + mutex.replace('\.', '\\\.')).prop('checked', false);
                    });
                }
            }
        });
    });

    // populate UI elements if needed
    if (d.input)
        populateInput(d);
}

async function populateInput(d) {
    const store = await parseRdf(d.input);

    const codes = store.getQuads(null, namedNode(prefixes.fhir + 'Observation.code'), null);
    for (var code of codes) {
        const id = localName(code.object.value);
        var value = undefined;

        var values = store.getQuads(code.subject, namedNode(prefixes.fhir + 'Observation.valueBoolean', null));
        if (values.length > 0)
            value = (values[0].object.value === 'true');

        if (value === undefined) {
            var values = store.getQuads(code.subject, namedNode(prefixes.fhir + 'Observation.valueInteger', null));
            if (values.length > 0)
                value = values[0].object.value;
        }

        if (value === undefined) {
            values = store.getQuads(code.subject, namedNode(prefixes.fhir + 'Observation.valueQuantity', null));
            if (values.length > 0)
                value = store.getQuads(values[0].object, namedNode(prefixes.fhir + 'Quantity.value', null))[0]
                    .object.value;
        }

        // console.log("server input:", d.id, code, value);
        if (value !== undefined) {
            const parent = $(`[task-id = ${d.id}]`);
            parent.find(`[id$=${id}]`).each((idx, field) => {
                field = $(field);

                if (!field || field.prop('tagName') != 'INPUT') { // try radio buttons
                    field = parent.find(`[id$=${id + (value ? "-yes" : "-no")}]`);
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

        } else
            console.error("unsupported input type:", code);
    }
}

async function submitInputData(element) {
    element = $(element);

    var container = element.closest('table');
    if (container.length == 0) {
        container = element.closest('div#main-container');
        container = container.find('div.input-form:visible');
    }

    const error = element.closest('.form-node').find('.input-error');

    const check = checkInputData(container);
    if (check !== true) {
        console.error("submitInputData", check);
        error.css('display', 'block')
        error.html(check);

        return;
    }

    const taskId = container.closest('.input-form').attr('task-id');
    cig.onUserInput(taskId);

    // 'await' not allowed in lambda for each()
    const elements = jQuery.makeArray(container);
    for (var el2 of elements) {
        el2 = $(el2);

        // (cig: global variable set in html code);
        const reference = cig.taskRef(taskId);

        var rdf = null;
        try {
            rdf = await extractRdfData(el2,
                (stmt, store) => onExtractedStmt(reference, stmt, store),
                { includeOptionalFalses: false }
            );
            // console.log("rdf:", rdf);

        } catch (e) {
            console.error(e); // JSON.stringify(e, null, 4));

            error.css('display', 'block')
            error.html(e);

            return;
        }

        error.css('display', 'none');

        // console.log("rdf?", rdf);

        const node = cig.findNodeById(taskId);
        node.data.input = rdf.str;
        // console.log("input (from user)?", node.data.input);

        source.submitObservation(reference, rdf);
    }
}

function onExtractedStmt(reference, stmt, store) {
    const taskUri = prefixes.ns + reference.taskId;
    store.addQuad(
        namedNode(taskUri),
        namedNode(prefixes.gl + "hasInputData"),
        stmt.subject);

    return stmt;
}

// NOTE: currently assumes only 1 type of input element per info-box
function checkInputData(el) {
    var inputs = el.find('input[type=number]');
    if (inputs.length > 0) {
        const array = inputs.toArray();
        if (!array.every(input => input.value !== ""))
            return "Some input values are missing.";
    }

    inputs = el.find('input[type=checkbox]');
    if (inputs.length > 0) {
        const array = inputs.toArray();
        if (!array.some((input) => input.checked))
            return "Please check at least one option.";
    }

    inputs = el.find('input[type=radio]');
    if (inputs.length > 0) {
        const array = inputs.toArray();
        if (!array.some((input) => input.checked))
            return "Please select an option.";
    }

    return true;
}