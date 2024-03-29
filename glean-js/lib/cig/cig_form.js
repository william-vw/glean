function CIGForm(config) {
    CIGBase.call(this, config);
    return this;
}

CIGForm.prototype = Object.create(CIGBase.prototype);
CIGForm.prototype.constructor = CIGForm;

CIGForm.prototype._settings = {
    composite: {
        bgcolor: [194, 42, 100] // HSl
    }
}

CIGForm.prototype._updateView = function (transits) {
    transits.forEach(t => this._updateNode(t.node));
}

CIGForm.prototype._initView = function () {
    let json = this._data;
    this._initForm(json);
}

CIGForm.prototype._initForm = function (data) {
    this._initFormEl(data, { element: $(this._config.container) }, false);

    // when radio buttons are clicked, submit the form directly
    $('input[type=radio]').click(e => this._input.submitInputData(e.target));
}

CIGForm.prototype._initFormEl = function (d, parentEntry, duplicate) {
    // can yield multiple new elements
    // (in case of multiple parent elements)
    const newEntries = this._create(d, parentEntry, duplicate);

    if (d.children) {
        // once we've had multiple elements, all elements in this branch
        // will be duplicated
        const duplicate2 = (duplicate ? true : newEntries.length > 1);

        for (var newEntry of newEntries) {
            let children = this._fixOrder(d, d.children);
            // first show composed's, then next's
            [true, false].forEach(isComposed => {
                children
                    .filter(child => child.composed === isComposed)
                    .forEach(child => this._initFormEl(child, newEntry, duplicate2));
            });
        }
    }
}

// TODO other-parent stuff really messes up things
// should really consider printing JSON where all paths are exhaustively listed

// when both parents are at *same* depth - 1, need to print "other-parent" first
// (ordering *always* needs to be fixed; see WorkflowD3TreePrinter#print(NodeLink))

CIGForm.prototype._fixOrder = function (d, children) {
    if (children.length == 0)
        return children;

    const childIds = children.map(c => c.id);

    // if any, will always be first child that contains grandchild with other-parent
    const child = children[0];
    if (child.children) {
        const grandchild = child.children.filter(c => !c.hidden)[0];

        // if grandchild has other-parent at same level as its parent
        if (grandchild.otherParents && childIds.includes(grandchild.otherParents[0].id)) {
            const otherParent = this._source.findNodeById(grandchild.otherParents[0].id).data;
            const idx = childIds.indexOf(otherParent.id);

            // ensure that other-parent is first in array of children
            // (i.e., will be printed first)
            if (idx !== 0) {
                let copy = children.slice();
                copy.splice(idx, 1);
                copy.splice(0, 0, otherParent);

                return copy;
            }
        }
    }

    return children;
}

CIGForm.prototype._create = function (d, parentEntry, duplicate) {
    if (d.hidden)
        return;

    // console.log("creating:", d.id, "(duplicate?", duplicate, ")");

    // - create appropriate content for element

    // (treat atomic tasks with input-form as decision tasks)
    if (d.inputForm)
        d.node_type = 'decision_task';

    var content = null;
    switch (d.node_type) {

        case 'decision_task':
            if (d.description)
                content =
                    `<div class='description'>
                        <span class='name'>${d.name}</span>
                        <span class='tooltip3'><img src='img/qm.svg' /><span>${d.description}</span></span>
                        ${d.inputForm}
                    </div>`;
                else
                    content = `${d.name} d.inputForm`;
            break;

        case 'atomic_task':
        case 'endpoint':
            // let's just all call them endpoints
            d.node_type = 'endpoint';

            content = "<div class='horizontal-placeholder'></div>";
            content += "<div class='endpoint'>";
            content += `<b>Recommend</b>: ${d.name}.`;
            if (d.description)
                content += " " + d.description;
            content += "</div>";
            break;

        case 'composite_task':
            const num = this._getWorkflowNum(d, 0);
            var hsl = this._settings.composite.bgcolor.slice();
            hsl[2] -= (num * 5);

            content = "";
            if (d.depth > 0)
                content = "<div class='horizontal-placeholder'></div>";
            content +=
                `<div class='composite' style="background: hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)">
                    <h4 class='node-name'>${d.name}</h4>`;
            // content += "<div class='vertical-placeholder'>&nbsp;</div>";
            if (d.description)
                content += `<p class='node-description'>${d.description}</p>`;
            content +=
                `<div class='children'>
                    <div class='composed'></div>
                </div>`;
            content += '</div>';
            break;

        default:
            console.error("unknown node type:", d);
            return;
    }

    const newEl = $(
        `<div class='form-node' id='${d.id}' style='display: none' node_type='${d.node_type}'>
            ${content}
        </div>`
    );
    if (d.node_type == 'decision_task')
        newEl.addClass('input-form');

    switch (d.node_type) {

        case 'decision_task':
            $("<div class='horizontal-placeholder'></div>").insertBefore(newEl.find('table'));

            // - add error placeholder
            newEl.append("<div class='input-error'>");

            // - add submit & reset button (in case of non radio-button elements)
            if (newEl.find('input').not('[type=radio]').length > 0) {
                let container = newEl.find('table');

                // if only 1 form element, then add submit btn as extra td 
                if (container.find('tr').length == 1)
                    container = container.find('tr');
                else
                    container = container.append('<tr></tr>').find('tr:last-child');

                container.append(
                    "<td>" +
                    "<input type='submit' value='submit'></input>" +
                    "</td>"
                );
            }

            this._input.setupInput(newEl, d, 'form');
            break;
    }

    const parentEl = parentEntry.element;
    // (append new element to parent)
    this._appendChildEl(d, parentEl, newEl);

    // - deal with other-parent(s)

    // this involves copying the element under the other-parent;
    // updating 'id' attributes to be unique, creating new id-like attributes

    const ret = this._disambiguateElement(d, parentEntry, duplicate, newEl);
    return ret;
}

// get number of parent workflows
CIGForm.prototype._getWorkflowNum = function (d, num) {
    if (d.in_workflow === undefined)
        return num;
    else
        return this._getWorkflowNum(this._source.findNodeById(d.in_workflow).data, num + 1);
}

CIGForm.prototype._disambiguateElement = function (d, parentEntry, duplicate, newEl) {
    if (d.otherParents || duplicate) {
        // (cannot have duplicate ids!)
        newEl.attr('id', null);
        newEl.attr('duplicate-id', d.id);
    }

    // element with other-parent is appended to both parents;
    // means its input nodes will have duplicate ids (e.g., 'code_age')
    // priorPath includes ids of the specific parents those elements were appended to
    // so, path can thus be used to disambiguate these input ids

    let priorPath = parentEntry.path;

    let path = priorPath;
    // in case of other-parent, use parent's id to disambiguate
    // (if needed, append to prior path)
    if (d.otherParents) {
        const parentEl = parentEntry.element;
        path = (priorPath ? priorPath + "." : "") + parentEl.attr('id');
        // console.log("adding to path:", parentEl.attr('id'));
    }

    const ret = [{ element: newEl, path: path }];

    if (d.otherParents) {
        for (var otherParent of d.otherParents) {
            const newEl2 = newEl.clone();
            this._input.setupInput(newEl2, d);

            // append as direct child of other-parent as well
            const otherParentEl = $(`#${otherParent.id}`);
            this._appendChildEl(d, otherParentEl, newEl2);

            // append other-parent id to parent path (if-any)
            let path2 = (priorPath ? priorPath + "." : "") + otherParent.id;
            // console.log("adding (2):", otherParent.id);

            this._disambiguateInput(newEl2, path2);
            ret.push({ element: newEl2, path: path2 });
        }
    }

    // update (original) inputs  with path-ified id, if needed
    // (do this after elements were potentially cloned)
    if (path)
        this._disambiguateInput(newEl, path);

    return ret;
}

CIGForm.prototype._disambiguateInput = function (newEl, path) {
    newEl.find('input').not('[type = submit]').each((idx, input) => {
        input = $(input);
        input.attr('id', path + "." + input.attr('id'));

        if (input.attr('mutex-with')) {
            var mutexes = input.attr('mutex-with').split(",");
            mutexes = mutexes.map(mutex => path + "." + mutex);
            input.attr('mutex-with', mutexes.join(","));
        }
    });
}

CIGForm.prototype._appendChildEl = function (d, parentEl, newEl) {
    if (d.composed)
        // if composed element, append to parent's inner div
        // (this div includes composed elements of parent)
        parentEl.find('> div.composite > div.children > div.composed').append(newEl);
    else
        parentEl.append(newEl);
}

CIGForm.prototype._updateNode = function (node) {
    this._update(node.data);
}

CIGForm.prototype._update = function (d) {
    // console.log("update:", d.id);

    // root will be the workflow itself
    if (d.depth == 0) {
        this._show(d);
        return;
    }

    if (d.workflow_state == 'activeState' || d.workflow_state == 'completedState')
        this._show(d);
    else
        this._hide(d);
}

CIGForm.prototype._show = function (d) {
    const el = this._findNextElementWithId(d.id);
    // console.log("showing:", d.id, el.css('display'), el);

    if (el.css('display') == 'block')
        return false;

    el.css('display', 'block');

    // only when input form element is shown
    if (el.hasClass('input-form')) {
        // many other form-nodes will be nested here'
        // so only consider direct child table
        let form = el.find('table').first();

        this._input.inputShown(d.id, form);
    }

    return true;
}

CIGForm.prototype._findNextElementWithId = function (id) {
    var el = $(`#${id}`);
    // dealing with duplicate elements (see #_create());
    // (these are identified with 'duplicate-id', not id)
    if (el.length == 0) {
        // there will be multiple elements with same duplicate-id
        // find the one within the current path (i.e., with visible parent)
        var parent = $(`[duplicate-id = ${id}]`).parent().filter(function () {
            return this.style.display == 'block';
        });
        // if multiple within the current path:
        // get the one at deepest level
        if (parent.length > 1)
            parent = parent.sort((a, b) => $(a).parents().length > $(b).parents().length ? -1 : 1)[0];

        // this parent will have only 1 element with this 'id'
        el = $(parent).find(`[duplicate-id = ${id}]`);
    }

    return el;
}

CIGForm.prototype._hide = function (d) {
    var el = $(`#${d.id}`);

    // no problem with hiding all duplicate elements
    // (only one should be shown)
    if (el.length == 0) {
        el = $(`[duplicate-id = ${d.id}]`)
    }
    // console.log("hiding:", d.id, el);

    // reset input fields
    el.find('input[type=radio]').prop('checked', false);
    el.find('input[type=checkbox]').prop('checked', false);
    el.find('input[type=number]').prop('value', "");

    el.css('display', 'none');
}

CIGBase.prototype._getErrorEl = function(element) {
	return element.closest('.form-node').find('.input-error').first();
}