# FHIR Server

This server accepts data input from a GLEAN workflow client (e.g., VisualCIG.js), and returns state transitions for the workflow's tasks (if any). Any supported workflow needs to be loaded in the [`CIGServer#initialize`](src/main/java/wvw/cig/fhir/server/CIGServer.java) method.

The FHIR server relies on the [glean-core](https://github.com/william-vw/glean/glean-core) module to load the corresponding GLEAN TNM (i.e., workflow), together with the GLEAN FSM execution semantics, into an N3 reasoner to execute the workflow. (It currently utilizes [jen3](https://github.com/william-vw/jen3), a fork of [Apache Jena](http://jena.apache.org), to serve as N3 reasoner and work with RDF.) It has [HAPI FHIR](https://hapifhir.io/) as a dependency, a Java HL7 FHIR library that, among others, implements the FHIR communication protocols.

See the [INSTALL](INSTALL) file for running this module using an Apache Tomcat server.
