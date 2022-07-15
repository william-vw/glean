# FHIR Server

This server accepts data input from a workflow client, and returns state transitions for workflow tasks (if any). 

The FHIR server relies on the [glean-core](https://github.com/william-vw/glean/glean-core) module to load the corresponding GLEAN TNM (i.e., workflow), together with the GLEAN FSM execution semantics, into an N3 reasoner to execute the workflow. (It currently utilizes [jen3](https://github.com/william-vw/jen3), a fork of [Apache Jena](http://jena.apache.org), to serve as N3 reasoner and work with RDF.) It further relies on [HAPI FHIR](https://hapifhir.io/) as a Java HL7 FHIR library to support the FHIR communication protocols.