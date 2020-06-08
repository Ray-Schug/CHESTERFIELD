//Description:
//This sample script is used to update a workflow task for each agenda record in the meeting when meeting's status is completed.
//When a meeting is complete they may want to update a workflow task for every one of the records;
//Event Name: MeetingUpdateAfter
//-----------------------------------------------------------------------------------------------------------

var meetingModelList = aa.env.getValue("MeetingModelList");
var userID = 'ADMIN'; //User ID = workflow task action by
var taskStatus = 'DPQA Approved'; //WorkFlow Task update status
var meetingStatus = 'COMPLETED'; //Meeting Status 

var updateFlag = false;
var sysUser = aa.people.getSysUserByID(userID).getOutput();
if (meetingModelList.size() > 0) {
	for (var i = 0; i < meetingModelList.size(); i++) {
		var model = meetingModelList.get(i);
		if (model && model.getMeetingStatus() == meetingStatus) {
			updateTask(model, sysUser);
		}
	}
	if (updateFlag) {
		aa.env.setValue("ScriptReturnMessage", "Updated tasks' status successfully.");
	}
}



function updateTask(meetingModel, user) {
	var capIDListResult = aa.meeting.getMeetingAgendaItems(meetingModel.getMeetingGroupId(), meetingModel.getMeetingId());
	if (capIDListResult.getSuccess()) {
		var capIDList = capIDListResult.getOutput();
		for (var i = 0; i < capIDList.size(); i++) {
			var capIDModel = capIDList.get(i);
			var taskResult = aa.workflow.getTasks(capIDModel);
			if (taskResult.getSuccess()) {
				var taskItems = taskResult.getOutput();
				for (var j = 0; j < taskItems.length; j++) {
					var taskItem = taskItems[j];
					//This condition controls the updated task.
					if (taskItem.getActiveFlag() == 'Y' && taskItem.getCompleteFlag() == 'N') {
						var result = aa.workflow.handleYDisposition(capIDModel, taskItem.getStepNumber(), taskStatus,
							null, null, null, user);
						if (result.getSuccess()) {
							aa.print(taskItem.getTaskDescription() + ' updated successfully. CapID:' + capIDModel);
							updateFlag = true;
							break;
						}
					}
				}
			}
		}
	}
}