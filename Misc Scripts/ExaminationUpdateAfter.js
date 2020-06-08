// ********     Predefined params For Unit Test     *********
//      09CAP-00000-001TI  
aa.env.setValue("PermitId1", "09CAP");
aa.env.setValue("PermitId2", "00000");
aa.env.setValue("PermitId3", "001TR");
// *********     End of For Unit Test     *******


var taskPath = "task 1"
var nextTaskStatus = "next task";

// get values from enviroment
var capId = aa.cap.getCapID(aa.env.getValue("PermitId1"), aa.env.getValue("PermitId2"), aa.env.getValue("PermitId3")).getOutput();
var capScriptModel = aa.cap.createCapIDScriptModel(capId.getID1(), capId.getID2(), capId.getID3());

// 1. get examination passResult 
var passResult = aa.examination.isExaminationPassed(capScriptModel);
aa.print("passResult.getSuccess(): " + passResult.getSuccess());
if (passResult.getSuccess()) {
	aa.print("passResult.getOutput(): " + passResult.getOutput());
	if (passResult.getOutput().booleanValue()) {
		// 2. Get workflow task item
		var taskResult = aa.workflow.getTask(capId, taskPath);
		if (taskResult.getSuccess())
		//examination is passed
		{
			//3. update task status			
			var sTask = taskResult.getOutput();
			aa.print("get task successful : task name = " + sTask.getTaskDescription() + "; Process name = " + sTask.getProcessCode() +
				"; Disposition = " + sTask.getDisposition());
			sTask.setDisposition(nextTaskStatus);
			updateResult = aa.workflow.handleDisposition(sTask.getTaskItem(), capId);
			if (updateResult.getSuccess()) {

				aa.print("update task status successfully!")
				aa.env.setValue("ScriptReturnCode", "0");
				aa.env.setValue("ScriptReturnMessage", "update task status successfully!");

			} else {
				aa.print("ERROR: Failed to update task status!");
				aa.env.setValue("ScriptReturnCode", "0");
				aa.env.setValue("ScriptReturnMessage", "ERROR: Failed to update task status!");
			}
		} //if get task successfully
		else {
			aa.print("ERROR: Failed to get workflow task(" + capId + ") for review: " + taskResult.getErrorMessage());
			aa.env.setValue("ScriptReturnCode", "0");
			aa.env.setValue("ScriptReturnMessage", "ERROR: Failed to get workflow task(" + capId + ") for review: " + taskResult.getErrorMessage());
		} //if else getting task is failed
	} //if examination is passed
} //if get isPassed successfully
else {
	aa.print("ERROR: Failed to get isExaminationPassed(" + capId + "): " + passResult.getErrorMessage());
	aa.env.setValue("ScriptReturnCode", "0");
	aa.env.setValue("ScriptReturnMessage", "ERROR: Failed to get isExaminationPassed(" + capId + "): " + passResult.getErrorMessage());
} // if else get isPassed fail