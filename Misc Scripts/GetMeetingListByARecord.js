//Description: CheckMeetingStatusType
//This sample script is for prevent anyone to update workflow when a meeting is not complete.
//Make user cannot update workflow or ASI until the meeting has taken place, 
//these will be triggered by WorkflowTaskUpdateBefore and ApplicationSpecificInfoUpdateBefore events.
//Event Name: WorkflowTaskUpdateBefore,ApplicationSpecificInfoUpdateBefore
//-----------------------------------------------------------------------------------------------------------
var meetingType = "DISCIPLINARY_HEARING";
var capID1 = aa.env.getValue("PermitId1");
var capID2 = aa.env.getValue("PermitId2");
var capID3 = aa.env.getValue("PermitId3");
var capIDModel = aa.cap.createCapIDScriptModel(capID1, capID2, capID3).getCapID();
var meetingResult = aa.meeting.getMeetingsByCAP(capIDModel, false);

if (meetingResult.getSuccess()) {
	var xAppList = meetingResult.getOutput();
	// Checking if there are meetings in the Record.
	if (xAppList.size() > 0) {
		for (var i = 0; i < xAppList.size(); i++) {
			var xAppModel = xAppList.get(i);
			var tmpType = xAppModel.getMeeting().getMeetingType().toString();
			if (meetingType == tmpType) {
				var meetingModel = xAppModel.getMeeting();
				//Validate by meeting status.
				if (meetingModel && meetingModel.getMeetingStatus() != 'COMPLETED') {
					aa.print("Failed");
					aa.env.setValue("ScriptReturnMessage", "A disciplinary hearing meeting is in processing, you cannot update workflow.");
					aa.env.setValue("ScriptReturnCode", "-1");
					break;
				}
			}
			if (i == (xAppList.size() - 1)) {
				aa.env.setValue("ScriptReturnMessage", "Meeting is complete!");
				aa.env.setValue("ScriptReturnCode", "0");
			}
		}
	}
}