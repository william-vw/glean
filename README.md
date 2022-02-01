# GuideLine Execution and Abstraction in N3 (GLEAN)

See [here](https://projects.cs.dal.ca/niche/glean/) for general GLEAN documentation, which accompanies the paper "Explainable Decision Support Using Task Network Models in Notation3: Computerizing Lipid Management Clinical Guidelines as Interactive Task Networks" submitted to the AIME conference. It provides all the same core GLEAN resources; this project adds testing code.

Using [WorkflowTest](https://github.com/william-vw/glean/blob/main/src/main/java/wvw/glean/workflow/WorkflowTest.java), you can run a set of test files for Task Network Model (TNM) constructs found under [resources/test](https://github.com/william-vw/glean/tree/main/src/main/resources/test).

Using [CIGTest](https://github.com/william-vw/glean/blob/main/src/main/java/wvw/glean/cig/CIGTest.java), you can direct the lipid management workflow at runtime by manually inserting new patient health parameters, and checking the impact on workflow task states.

Using [WorkflowPrinter](https://github.com/william-vw/glean/blob/main/src/main/java/wvw/glean/workflow/print/WorkflowPrinter.java), you can convert a GLEAN guideline to JSON format, which can be loaded into a visualization tool. We have developed a visualization tool prototype (soon to be released): this tool (**a**) interacts with an HL7 FHIR server to guide the workflow at runtime given a concrete patient profile, and (**b**) includes a UI generator to automatically produce UIs for health data input based on HL7 FHIR resources [**1**].

Under [resources/logic](https://github.com/william-vw/glean/tree/main/src/main/resources/logic), all relevant N3 rules and OWL ontologies can be found. Subfolder  [resources/logic/gen](https://github.com/william-vw/glean/tree/main/src/main/resources/logic) contains the N3 implementation of the high-level state transition formalism; in the form of N3 rules that produce linear logic rules from state transitions (with or without logging).

Under [resources/cig/lipid](https://github.com/william-vw/glean/tree/main/src/main/resources/cig/lipid), you can find computerized guidelines for lipid management (chronic kidney disease) using GLEAN.
<br /> <br />
[**1**] Van Woensel, W., Abidi, S., Abidi, S.S.R. Towards Model-Driven Semantic Interfaces for Electronic Health Records on Multiple Platforms Using Notation3. http://ceur-ws.org/Vol-3055/paper4.pdf
