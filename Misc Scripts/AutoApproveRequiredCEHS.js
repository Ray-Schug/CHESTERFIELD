aa.env.setValue("PermitId1", "13CAP");
aa.env.setValue("PermitId2", "00000");
aa.env.setValue("PermitId3", "0038V");


var taskPath = "Pass continuing education";
var nextTaskStatus = "Routing";

var capId = aa.cap.getCapID(aa.env.getValue("PermitId1"), aa.env.getValue("PermitId2"), aa.env.getValue("PermitId3")).getOutput();

var taskResult = aa.workflow.getTask(capId, taskPath);
if (taskResult.getSuccess()) {
	var sTask = taskResult.getOutput();
	sTask.getTaskItem().setDisposition(nextTaskStatus);

	// auto approve continuing educations.
	var approveResult = aa.continuingEducation.autoApproveRequiredCEHs(sTask.getTaskItem(), capId);
	if (approveResult.getSuccess()) {
		aa.env.setValue("ScriptReturnCode", "0");
		aa.env.setValue("ScriptReturnMessage", "Auto approve required continuing educations successfully!");
	} else {
		aa.env.setValue("ScriptReturnCode", "0");
		aa.env.setValue("ScriptReturnMessage", "Failed to auto approve required continuing educations.");
	}

}