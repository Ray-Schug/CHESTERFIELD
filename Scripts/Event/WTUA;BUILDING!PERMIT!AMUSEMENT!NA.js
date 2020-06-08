if (wfTask == "Completion" && wfStatus == "Inspection complete" && AInfo["Permanent installation?"] != "Yes"){
	deactivateTask("Annual Inspection");
	activateTask("Closure");
}