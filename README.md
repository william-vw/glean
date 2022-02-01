# GuideLine Execution and Abstraction in N3 (GLEAN)

See [here](https://projects.cs.dal.ca/niche/glean/) for general GLEAN documentation, which accompanies the paper "Explainable Decision Support Using Task Network Models in Notation3: Computerizing Lipid Management Clinical Guidelines as Interactive Task Networks" submitted to the AIME conference. It provides all the same core GLEAN resources; this project adds testing code.

You can clone this repo and create a Java project to execute the tests. It will be easier to use [Eclipse](https://www.eclipse.org/ide/) as the repo already includes the necessary project files (but you can use any IDE really). The repo directly includes all dependencies as jar files ([lib/](https://github.com/william-vw/glean/tree/main/lib) folder).

Using [WorkflowTest](https://github.com/william-vw/glean/blob/main/src/main/java/wvw/glean/workflow/WorkflowTest.java), you can run a set of test files for Task Network Model (TNM) constructs, which are found under [resources/test](https://github.com/william-vw/glean/tree/main/src/main/resources/test).

Using [CIGTest](https://github.com/william-vw/glean/blob/main/src/main/java/wvw/glean/cig/CIGTest.java), you can direct the lipid management workflow at runtime by manually inserting new patient health parameters, and checking the impact on workflow task states.

Using [WorkflowPrinter](https://github.com/william-vw/glean/blob/main/src/main/java/wvw/glean/workflow/print/WorkflowPrinter.java), you can convert a GLEAN guideline to JSON format, which can be loaded into a visualization tool. We have developed a visualization tool prototype (soon to be released): this tool (**a**) interacts with an HL7 FHIR server to guide the workflow at runtime given a concrete patient profile, and (**b**) includes a UI generator to automatically produce UIs for health data input based on HL7 FHIR resources.

Under [resources/logic](https://github.com/william-vw/glean/tree/main/src/main/resources/logic), all relevant N3 rules and OWL ontologies can be found. Subfolder  [resources/logic/gen](https://github.com/william-vw/glean/tree/main/src/main/resources/logic) contains the N3 implementation of the high-level state transition formalism; in the form of N3 rules that produce linear logic rules from state transitions (with or without logging). Using [WorkflowLogic](https://github.com/william-vw/glean/blob/main/src/main/java/wvw/glean/workflow/WorkflowLogic.java) you can generate a single file containing all linear logic rules for the state transition rules.

Under [resources/cig/lipid](https://github.com/william-vw/glean/tree/main/src/main/resources/cig/lipid), you can find computerized guidelines for lipid management (chronic kidney disease) using GLEAN.
