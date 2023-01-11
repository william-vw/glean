let e0 = new Entity()
e0.type = Entity.CompositeTask
e0.id = "Evaluate_Lipid_Profile"
e0.label = "Evaluate lipid profile"
let e1 = new Entity()
e1.type = Entity.DecisionTask
e1.id = "rule_out_secondary_causes"
e1.label = "Rule out secondary causes"
let e2 = new DecisionBranch()
let c0 = new Condition()
let c1 = new Condition()
c0.anyOf.push(c1)
e2.condition = c0
let e3 = new Entity()
e3.type = Entity.EndPoint
e3.id = "secondary_causes_found"
e3.label = "Treatment or referral"
e2.branchTarget = e3
e1.decisionBranch.push(e2)
let e4 = new DecisionBranch()
let c2 = new Condition()
let c3 = new Condition()
c2.allOf.push(c3)
e4.condition = c2
let e5 = new Entity()
e5.type = Entity.EndPoint
e5.id = "no_secondary_causes_found"
e5.label = "No secondary causes"
e4.branchTarget = e5
e1.decisionBranch.push(e4)
e0.subTask.push(e1)
let e6 = new Entity()
e6.type = Entity.EndPoint
e6.id = "no_dyslipidemia"
e6.label = "No action"
e0.subTask.push(e6)
e0.subTask.push(e3)
let e7 = new Entity()
e7.type = Entity.DecisionTask
e7.id = "measure_lipid_profile"
e7.label = "Measure lipid profile"
let e8 = new DecisionBranch()
let c4 = new Condition()
let c5 = new Condition()
c4.allOf.push(c5)
e8.condition = c4
e8.branchTarget = e6
e7.decisionBranch.push(e8)
let e9 = new DecisionBranch()
let c6 = new Condition()
let c7 = new Condition()
c6.allOf.push(c7)
e9.condition = c6
e9.branchTarget = e1
e7.decisionBranch.push(e9)
e0.subTask.push(e7)
e0.subTask.push(e5)
