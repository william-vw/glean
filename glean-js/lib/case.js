var nextCase = 1;

function checkCase(caseNr) {
	if (nextCase != caseNr) {
		if (nextCase < caseNr)
			window.alert("Please perform step" + nextCase + " first.");
		else 
			window.alert("To perform a prior step, please refresh the page.");
		return false;
	} else {
		nextCase = caseNr + 1;
		return true;
	}
}
