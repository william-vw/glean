# VisualCIG.js

The VisualCIG.js module supplies visualization capabilities for [GLEAN workflows](https://github.com/william-vw/glean).

It visualizes the workflow in the browser as either an interactive workflow or data-oriented form using [D3](https://d3js.org/). Health data inputted into the visualization is (1) packaged as a FHIR EHR record, using [N3.js](https://github.com/rdfjs/N3.js/) and [rdfa.js](https://github.com/rubensworks/rdfa-streaming-parser.js), (2) sent to the CDS Server using [fhir.js](https://github.com/FHIR/fhir.js/), after which (3) the visualization is updated based on the server response.

To run the NodeJS project, follow the regular steps to install and run the tool:
- `npm install` (install dependencies in `package.json`)
- `node app.js` (run the tool)  

Afterwards, to view a particular workflow, point your browser towards `http://localhost:3005/[html file]` (e.g., http://localhost:3005/statin_cig.html)

## Setup

The [statin_cig.html](statin_cig.html) and [statin_cig_form.html](statin_cig_form.html) files show how to setup a workflow visualization:

- After [printing the workflow JSON code](https://github.com/william-vw/glean/tree/main/glean-core#visualization), ensure the JSON file was written to the `json/` folder and then refer to it in the following call: `cig.show("json/[json file]", config);`

- Depending on whether you would like a workflow- or form-based visualization, use the following import statements:  
`import { VisualCIG } from '/lib/cig_tree.js';` OR  
`import { VisualCIG } from '/lib/cig_form.js';`

- The `config` object in the HTML file shows the namespace that will be used to annotate health data:
```
const config = { 
    ...
    ns: 'http://niche.cs.dal.ca/ns/cig/kidney_statins.owl#' 
}
```

This namespace will have to match the one given in the [CIGServer](https://github.com/william-vw/glean/blob/main/fhir-server/src/main/java/wvw/cig/fhir/server/CIGServer.java)#initialize method (fhir-server module).

Other configuration:

- The [fhir_client.js](lib/fhir_client.js) file includes a `config` object where a different FHIR server URL (`baseUrl` attribute) can be specified.


## FHIR Server

The visualization expects that the [fhir-server](https://github.com/william-vw/glean/fhir-server) module is up and running. It will contact this server for initializing the workflow state, sending inputted health data, and getting subsequent state updates.
