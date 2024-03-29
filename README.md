# GuideLine Execution and Abstraction in N3 (GLEAN)

This project allows you to execute and visualize Task Network Models (TNM), a type of workflow used by Computer Interpretable Guidelines. For more, please see [our publication](https://doi.org/10.1007/978-3-031-09342-5_1) on this work.

It consists of the following modules:

- [`glean-core`](glean-core). This module includes the Finite State Machine (FSM) implementation of TNM execution semantics, together with tests and tools.

- [`glean.js`](glean-js). This module implements a fully in-browser platform for visualizing and executing TNM.

- [`fhir-server`](fhir-server). This module implements a FHIR server that allows communication between the FSM and its visualization.

- [`ui-gen`](ui-gen). This module generates HTML input forms based on HL7 FHIR data constraints (used by glean-core). 

When referring to this work, please use the following citation:

> Van Woensel, W., Abidi, S., Tennankore, K., Worthen, G., Abidi, S.S.R. (2022). Explainable Decision Support Using Task Network Models in Notation3: Computerizing Lipid Management Clinical Guidelines as Interactive Task Networks. In: Michalowski, M., Abidi, S.S.R., Abidi, S. (eds) Artificial Intelligence in Medicine. AIME 2022. Lecture Notes in Computer Science(), vol 13263. Springer, Cham. https://doi.org/10.1007/978-3-031-09342-5_1
