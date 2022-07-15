#|
$JSON
	{ 	
		"authURL": [ "punya.appinventor.mit.edu" ],
		"YaVersion": "238", "Source": "Form", 
		"Properties": {
			"$Name": "Screen1", "$Type": "Form", "$Version": "27", "AppName": "COPDPatientDiary", "Title": "Screen1",
			"$Components": [ {
				"$Name": "VerticalScrollArrangement1", "$Type": "VerticalScrollArrangement", "$Version":"1", "Width":"-2",
				"$Components": [  
					{
	"$Name": "linkedDataForm_0", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_0", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_0_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_cough"
}, {
	"$Name": "layout_0_1", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
	"$Components": [ {
		"$Name": "prefix_0_1", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "Is your cough, wheezing or stridor less, the same or worse than usual?"
	}, {
		"$Name": "textbox_0_1", "$Type": "TextBox", "$Version": "7", "Width": "50", "Hint": "", "NumbersOnly": "True", 
		"ObjectType": "xsd:numeric", "PropertyURI": "http://hl7.org/fhir/Observation.valueInteger" 
	}, {
		"$Name": "suffix_0_1", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "(1-10, 1 is least, 5 is same, 10 is worst)"
	} ]
} ]
	} ]
}, {
	"$Name": "linkedDataForm_1", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_1", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_1_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_phlem_amount"
}, {
	"$Name": "layout_1_1", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
	"$Components": [ {
		"$Name": "prefix_1_1", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "Is your amount of phlem, sputum or mucus, less, the same or worse than usual?"
	}, {
		"$Name": "textbox_1_1", "$Type": "TextBox", "$Version": "7", "Width": "50", "Hint": "", "NumbersOnly": "True", 
		"ObjectType": "xsd:numeric", "PropertyURI": "http://hl7.org/fhir/Observation.valueInteger" 
	}, {
		"$Name": "suffix_1_1", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "(1-10, 1 is least, 5 is same, 10 is worst)"
	} ]
} ]
	} ]
}, {
	"$Name": "linkedDataForm_2", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_2", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_2_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_phlem_color"
}, {
	"$Name": "checkbox_2_1", "$Type": "CheckBox", "$Version": "2", "Width": "-2", 
	"PropertyURI": "http://hl7.org/fhir/Observation.valueBoolean", "Text": "Is the color of phlem, sputum or mucus green, yellow or rust-colored, and is this different from usual?"
} ]
	} ]
}, {
	"$Name": "linkedDataForm_3", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_3", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_3_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_phlem_blood"
}, {
	"$Name": "checkbox_3_1", "$Type": "CheckBox", "$Version": "2", "Width": "-2", 
	"PropertyURI": "http://hl7.org/fhir/Observation.valueBoolean", "Text": "Is there significant blood in the phlem, sputum or mucus, beyond flecks or streaks?"
} ]
	} ]
}, {
	"$Name": "linkedDataForm_4", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_4", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_4_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_activity_exertion"
}, {
	"$Name": "layout_4_1", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
	"$Components": [ {
		"$Name": "prefix_4_1", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "Please rate your exertion level when performing activities."
	}, {
		"$Name": "textbox_4_1", "$Type": "TextBox", "$Version": "7", "Width": "50", "Hint": "", "NumbersOnly": "True", 
		"ObjectType": "xsd:numeric", "PropertyURI": "http://hl7.org/fhir/Observation.valueInteger" 
	}, {
		"$Name": "suffix_4_1", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "(1-10, 1 is least, 5 is same, 10 is worst)"
	} ]
} ]
	} ]
}, {
	"$Name": "linkedDataForm_5", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_5", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_5_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_use_inhaler"
}, {
	"$Name": "checkbox_5_1", "$Type": "CheckBox", "$Version": "2", "Width": "-2", 
	"PropertyURI": "http://hl7.org/fhir/Observation.valueBoolean", "Text": "Have you used your inhaler more often than usual?"
} ]
	} ]
}, {
	"$Name": "linkedDataForm_6", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_6", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_6_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_chest_pain"
}, {
	"$Name": "checkbox_6_1", "$Type": "CheckBox", "$Version": "2", "Width": "-2", 
	"PropertyURI": "http://hl7.org/fhir/Observation.valueBoolean", "Text": "Please indicate whether you have chest pain."
} ]
	} ]
}, {
	"$Name": "linkedDataForm_7", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_7", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_7_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_cyanosis"
}, {
	"$Name": "checkbox_7_1", "$Type": "CheckBox", "$Version": "2", "Width": "-2", 
	"PropertyURI": "http://hl7.org/fhir/Observation.valueBoolean", "Text": "Please indicate whether you have cyanosis (blue/grey coloration around lips, fingernails)."
} ]
	} ]
}, {
	"$Name": "linkedDataForm_8", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_8", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_8_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_confusion"
}, {
	"$Name": "checkbox_8_1", "$Type": "CheckBox", "$Version": "2", "Width": "-2", 
	"PropertyURI": "http://hl7.org/fhir/Observation.valueBoolean", "Text": "Please indicate whether you are feeling confused or have excessive drowsiness."
} ]
	} ]
}, {
	"$Name": "linkedDataForm_9", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_9", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_9_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_swollen_ankle"
}, {
	"$Name": "checkbox_9_1", "$Type": "CheckBox", "$Version": "2", "Width": "-2", 
	"PropertyURI": "http://hl7.org/fhir/Observation.valueBoolean", "Text": "Please indicate whether your ankles are swollen."
} ]
	} ]
}, {
	"$Name": "linkedDataForm_10", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_10", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_10_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_rr"
}, {
	"$Name": "linkedDataForm_10_1", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/Observation.valueQuantity",
	"$Components": [ {
		"$Name": "layout_10_1", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_10_11_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Quantity.system", "Text": "http://unitsofmeasure.org"
}, {
	"$Name": "textbox_10_11_1", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Quantity.code", "Text": "{Breaths}/min"
}, {
	"$Name": "layout_10_11_2", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
	"$Components": [ {
		"$Name": "prefix_10_11_2", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "Your objectively measured respiratory rate."
	}, {
		"$Name": "textbox_10_11_2", "$Type": "TextBox", "$Version": "7", "Width": "50", "Hint": "", "NumbersOnly": "True", 
		"ObjectType": "xsd:numeric", "PropertyURI": "http://hl7.org/fhir/Quantity.value" 
	}, {
		"$Name": "suffix_10_11_2", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "(1-200)"
	} ]
} ]
	} ]
} ]
	} ]
}, {
	"$Name": "linkedDataForm_11", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_11", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_11_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_hr"
}, {
	"$Name": "linkedDataForm_11_1", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/Observation.valueQuantity",
	"$Components": [ {
		"$Name": "layout_11_1", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_11_11_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Quantity.system", "Text": "http://unitsofmeasure.org"
}, {
	"$Name": "textbox_11_11_1", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Quantity.code", "Text": "{beats}/min"
}, {
	"$Name": "layout_11_11_2", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
	"$Components": [ {
		"$Name": "prefix_11_11_2", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "Your objectively measured heart rate."
	}, {
		"$Name": "textbox_11_11_2", "$Type": "TextBox", "$Version": "7", "Width": "50", "Hint": "", "NumbersOnly": "True", 
		"ObjectType": "xsd:numeric", "PropertyURI": "http://hl7.org/fhir/Quantity.value" 
	}, {
		"$Name": "suffix_11_11_2", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "(1-400)"
	} ]
} ]
	} ]
} ]
	} ]
}, {
	"$Name": "linkedDataForm_12", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_12", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_12_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_activity_level"
}, {
	"$Name": "layout_12_1", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
	"$Components": [ {
		"$Name": "prefix_12_1", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "Your level of activity as recorded by your smartwatch throughout the day."
	}, {
		"$Name": "textbox_12_1", "$Type": "TextBox", "$Version": "7", "Width": "50", "Hint": "", "NumbersOnly": "True", 
		"ObjectType": "xsd:numeric", "PropertyURI": "http://hl7.org/fhir/Observation.valueInteger" 
	}, {
		"$Name": "suffix_12_1", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": ""
	} ]
} ]
	} ]
}, {
	"$Name": "linkedDataForm_13", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_13", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_13_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_o2_sat"
}, {
	"$Name": "linkedDataForm_13_1", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/Observation.valueQuantity",
	"$Components": [ {
		"$Name": "layout_13_1", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_13_11_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Quantity.system", "Text": "http://unitsofmeasure.org"
}, {
	"$Name": "textbox_13_11_1", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Quantity.code", "Text": "%"
}, {
	"$Name": "layout_13_11_2", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
	"$Components": [ {
		"$Name": "prefix_13_11_2", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "Your objectively measured O2 saturation."
	}, {
		"$Name": "textbox_13_11_2", "$Type": "TextBox", "$Version": "7", "Width": "50", "Hint": "", "NumbersOnly": "True", 
		"ObjectType": "xsd:numeric", "PropertyURI": "http://hl7.org/fhir/Quantity.value" 
	}, {
		"$Name": "suffix_13_11_2", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "(1-100)"
	} ]
} ]
	} ]
} ]
	} ]
}, {
	"$Name": "linkedDataForm_14", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/DiagnosticReport.result",
	"$Components": [ {
		"$Name": "layout_14", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_14_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Observation.code", "Text": "http://niche.cs.dal.ca/copd_ui.n3#code_body_temp"
}, {
	"$Name": "linkedDataForm_14_1", "$Type": "LinkedDataForm", "$Version": "3", "Width": "-2",
	"PropertyURI": "http://hl7.org/fhir/Observation.valueQuantity",
	"$Components": [ {
		"$Name": "layout_14_1", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
		"$Components": [ {
	"$Name": "textbox_14_11_0", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Quantity.system", "Text": "http://unitsofmeasure.org"
}, {
	"$Name": "textbox_14_11_1", "$Type": "TextBox", "$Version": "7", "Visible": "False", 
	"PropertyURI": "http://hl7.org/fhir/Quantity.code", "Text": "Cel"
}, {
	"$Name": "layout_14_11_2", "$Type": "HorizontalArrangement", "$Version": "3", "Width": "-2",
	"$Components": [ {
		"$Name": "prefix_14_11_2", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "Your objectively measured body temperature."
	}, {
		"$Name": "textbox_14_11_2", "$Type": "TextBox", "$Version": "7", "Width": "50", "Hint": "", "NumbersOnly": "True", 
		"ObjectType": "xsd:numeric", "PropertyURI": "http://hl7.org/fhir/Quantity.value" 
	}, {
		"$Name": "suffix_14_11_2", "$Type": "Label", "$Version": "5", "Width": "-1075",
		"Text": "(1-100)"
	} ]
} ]
	} ]
} ]
	} ]
} 
					, {
						"$Name": "Button1", "$Type": "Button", "$Version": "6", "Text": "submit" 
					}				
				]
			}, {
				"$Name": "LinkedData1",
				"$Type": "LinkedData",
				"$Version": "3"
			} ]
		}
	}
|#