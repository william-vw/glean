function InputHandler() {
    return this;
}

InputHandler.prototype.constructor = InputHandler;

InputHandler.prototype.setupInput = async function (el, d, prefix) {
    // set task-id on parent input-form as common way to get, well, task-id
    // (some elements can have id, others duplicate-id)
    el.closest('.input-form').attr('task-id', d.id);

    // (other forms can be appended to this el later on; 
    // so need to get submit buttons now)
    const submit = el.find('input[value=submit]');
    submit.on("click", (e) => this.submitInputData(e.target));

    // register listener for enter-key for input-fields
    el.find('input').not('input[type=submit]')
        .keypress((e) => {
            if (e.which == 13) // enter
                submit.trigger("click");
        });

    // el.find("input[value=reset]").on("click", (e) => { 
    //     let id = $(e.target).parents('.infobox').attr('id');
    //     this.resetObservations(id);
    // });

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

    if (prefix) {
        el.find('input[type=radio]').each((idx, radio) => {
            radio = $(radio);
            // for cig_composite: make sure name attr is unique per type of cig
            // (else, auto-populating input of other cig can mess up prior selection)
            radio.attr('name', prefix + ":" + radio.attr('name'));
        });
    }
}

InputHandler.prototype.inputShown = async function (id, el) {
    let inputs = el.find('input');
    // console.log("shown:", el, inputs);
    
    if (inputs.length > 0) {
        // put focus on first input element
        inputs.get(0).focus();

        // try populating the input elements
        this._tryPopulateInput(id, el);
    }
}

InputHandler.prototype._tryPopulateInput = function (id, el) { }

InputHandler.prototype.submitInputData = async function (element) { }

// NOTE: currently assumes only 1 type of input element per info-box
InputHandler.prototype._checkInputData = function (el) {
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