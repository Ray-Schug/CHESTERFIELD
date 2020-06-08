function wasTaskStatus_TPS(wfstr, wfstat) {
	var useProcess = arguments.length > 2 && arguments[2]? true:false;
	var itemCap = arguments.length > 3 && arguments[3]? arguments[3]:capId;
	var processName = useProcess? arguments[2]:"";
	var wfStatArray = (wfStat && typeof(wfStat) == "string"? [wfStat]:wfStat); // Convert to array
 
	
	var workflowResult = aa.workflow.getHistory(itemCap).getOutput();
	if (!workflowResult.getSuccess()) {
		logDebug("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage());
		return false;
	}

	var wfObj = workflowResult.getOutput();
	for (var x = 0; x < wfObj.length; x++) {
		if (useProcess && !fTask.getProcessCode().equals(processName)) continue;
		if (wfstr && wfstr != wfObj[x].getTaskDescription()) continue;
		if (wfStatArray && !exists(wfTask,wfObj[x].getTaskDescription(),wfStatArray)) continue;
		return true;
	}
	return false;
}
