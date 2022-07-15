# GLEAN Core

This module includes the Finite State Machine (FSM) implementation of Task Network Model (TNM) execution semantics, together with a set of tests and tools described below.

You can clone this repo and create a Java project from the `pom.xml` file. It will be easier to use [Eclipse](https://www.eclipse.org/ide/) as the repo already includes the necessary project files (but you can use any IDE). The repo directly includes all dependencies as jar files (see [`lib/`](https://github.com/william-vw/glean/tree/main/lib) folder).

## Finite State Machine

All logical rules and OWL ontologies collectively implementing the FSM can be found under [resources/logic](tree/main/src/main/resources/logic):
- [State transitions](tree/main/src/main/resources/logic/workflow). A set of state transition rules, using our [custom formalism](https://doi.org/10.1007/978-3-031-09342-5_1), that govern the transitioning between task states.
- [Decisional criteria](blob/main/src/main/resources/logic/condition/condition.n3). A set of rules for checking decision criteria in TNM decision nodes.
- [GLEAN ontology](blob/main/src/main/resources/logic/glean.owl). The GLEAN ontology defining the terms to be used within GLEAN TNM.

Use the [WorkflowLogic](blob/main/src/main/java/wvw/glean/workflow/WorkflowLogic.java) class (`regenerate` method) to convert updated state transition rules into a set of Linear Logic (LL) rules.
Behind the scenes, this method utilizes the Notation3 rules in the [resources/logic/gen](tree/main/src/main/resources/logic/gen) folder, which inspect the state transition rules and generate corresponding LL rules.
To run the FSM, the generated LL rules can then be loaded into a [Notation3](https://w3c.github.io/N3/spec/) reasoner (e.g., [jen3](https://github.com/william-vw/jen3), [eye](https://github.com/josd/eye)).

## Example Guidelines

Under [resources/cig/lipid](tree/main/src/main/resources/cig/lipid), you can find GLEAN TNMs for lipid management for patients with chronic kidney disease; the top-level workflow is represented by [ckd_dyslipidemia.n3](blob/main/src/main/resources/cig/lipid/ckd_dyslipidemia.n3). In the [`input/`](tree/main/src/main/resources/cig/lipid/input) subfolder, you can find [HL7 FHIR ActivityDefinitions](https://www.hl7.org/fhir/activitydefinition.html) that specify data constraints on the health data needed by decision nodes. 

## Testing

This module includes the following tests:
- [WorkflowTest](blob/main/src/main/java/wvw/glean/workflow/WorkflowTest.java): run a set of test files for TNM constructs, which are found under [resources/test](tree/main/src/main/resources/test).
- [CIGTest](blob/main/src/main/java/wvw/glean/cig/CIGTest.java): direct the lipid management workflow at runtime by manually inserting new patient health parameters, and checking the impact on workflow task states.

## Visualization

Using [WorkflowPrinter](blob/main/src/main/java/wvw/glean/workflow/print/WorkflowPrinter.java), you can convert a GLEAN TNM to JSON format, which can be loaded into [VisualCIG.js](https://github.com/william-vw/glean/visualcig-js). In order to convert the ActivityDefinition resources into HTML forms, the module relies on the [ui-gen module](https://github.com/william-vw/glean/ui-gen).