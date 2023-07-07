# glean.js

The `glean.js` module is a fully in-browser platform for visualising and executing [GLEAN workflows](https://github.com/william-vw/glean).

## How to use

1. Manually author a GLEAN workflow. You can base yourself on the [exemplar workflow](wf/test/cig/example.n3). In general, your workflow should use the GLEAN constructs defined in the [glean ontology](https://github.com/william-vw/glean/blob/main/glean-core/src/main/resources/logic/glean.owl). You will also need to define [HL7 FHIR ActivityDefinitions](https://www.hl7.org/fhir/activitydefinition.html) with data constraints on allowed user input data - these are also included in the [exemplar](wf/test/cig/input/).

2. Convert your GLEAN workflow into an executable format. For this purpose, use the `genjs` tool (part of [`glean-core`](https://github.com/william-vw/glean/tree/main/glean-core)) compiled into a jar file here. For instance, to convert the exemplar workflow:
```
java -jar genjs.jar -folder [your local path/]glean/glean-js/wf/test -cig example -ns http://example.org/
```
Where:
- `folder` is a directory with a `cig/` subfolder keeping all CIG-related artefacts. The tool will generate a `tmp/` folder for temporary output and an `out/` folder with the final output.
- `name` is the name of your CIG file (without extension) under the `cig/` subfolder ("example" for the exemplar workflow).
- `ns` is the namespace used to define your GLEAN workflow tasks ("http://example.org/" is the one used in the exemplar workflow).

3. Copy and update one of the example [`tree`](ex1_cig_tree.html) or [`form`](ex1_cig_form.html) HTML files to respectively get an interactive workflow or a data-oriented form. You will have to replace the `FSM` constructor with the relative path to your executable workflow file (e.g., `"/wf/test/out/example_local.js"`), and the `RdfInputHandler` argument with your CIG namespace (e.g., `"http://example.org/"`).

4. Run a local HTML server to view your HTML file (e.g., `python3 -m http.server`, pointing your browser to [http://localhost:8000](http://localhost:8000)).

## A bit more detail

Looking at the contents of an [example HTML file](ex1_cig_tree.html):
```
let inputHandler = new RdfInputHandler("http://example.org/");

let source = new FSM("/wf/test/out/example_local.js");
await source.load();

let cig = new VisualCIG({ source: source, input: inputHandler, container: '#main-container' });
cig.show();
```

The [`InputHandler`](lib/input/input_handler.js) will get user input values, i.e., manually entered into the workflow, and provide them to the [`DataSource`](lib/source/data_source.js) for processing. Currently, we implemented an [`RdfInputHandler`](lib/input/rdf_input_handler.js) that extracts user input as RDF data, which is structured using RDFa annotations from the HTML input forms. These RDFa-annotated HTML input forms are automatically generated in step (2) above - you can find them under the `tmp/html` folder in your given directory (see [here](wf/test/tmp/html/decision1_report.html) for an example).

The [`DataSource`](lib/source/data_source.js) will subsequently process this input data and update task states accordingly. The [`FSM`](lib/source/fsm.js) data source is a JavaScript engine that implements the Finite State Machine (FSM) execution semantics of GLEAN, as defined [here](https://github.com/william-vw/glean/tree/main/glean-core/src/main/resources/logic/workflow) in N3. Essentially, the user input (RDF data) is converted into an set of JavaScript objects; the FSM engine then checks whether this new data requires any tasks to transition to new states, and, if so, updates the workflow state. Alternatively, the [`DataServer`](lib/source/server.js) data source allows for communication with a FHIR-compliant web server; any user input is sent to the server, which then calculates new task states and returns them to the data source. To act as a FHIR-compliant web server, you can look into the [`fhir-server`](https://github.com/william-vw/glean/tree/main/fhir-server) module.

The [`CIG`](lib/cig/cig_base.js) represents a concrete visualization of a CIG - currently, we support [`VisualCIG`](lib/cig/cig_tree.js), which shows an interactive visual workflow, and [`CIGForm`](lib/cig/cig_form.js), which shows a data-oriented form geared towards quick data entry. The [`CIG`](lib/cig/cig_base.js) receives task state updates from the [`DataSource`](lib/source/data_source.js) and updates its visualization accordingly.