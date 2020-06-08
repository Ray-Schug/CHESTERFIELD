//schedule inspection
//scheduleInspection(CapIDModel capID, SysUserModel inspector, ScriptDateTime scheduledDate,
//   String scheduledTime, String inspectionType, String requestComment)
//--------------------------------------------------------------------------------------------------------------------

aa.print("Schedule Inspection start.");

var capId1 = "09RES";
var capId2 = "00000";
var capId3 = "00023";
//schedule inspection
//scheduleInspection(InspectionModel inspectionModel,SysUserModel actor)
//--------------------------------------------------------------------------------------------------------------------

aa.print("Schedule Inspection start.");

var capId1 = "09CAP";
var capId2 = "00000";
var capId3 = "002BW";
var sequenceNumber = 84003066; //Inspection Type sequence number
var scheduleDateStr = "11/17/2009"; //format: "MM/dd/yyyy"
var comment = "test carry over by EMSE";
var scheduledDate = aa.date.transToJavaUtilDate(new Date(scheduleDateStr));
scheduledDate = getNextAvailableDateTime(sequenceNumber, scheduledDate);

// construct cap id model
result = aa.cap.getCapID(capId1, capId2, capId3);
if (result.getSuccess()) {
	aa.print("Get getCapID sucessfully.");
	capIDModel = aa.cap.getCapID(capId1, capId2, capId3).getOutput();
} else {
	aa.print("Get getCapID fail.");
}

// construct inspection model
inspectionScriptModel = aa.inspection.getInspectionScriptModel().getOutput();
inspectionModel = inspectionScriptModel.getInspection();
activityModel = inspectionModel.getActivity();
activityModel.setCapIDModel(capIDModel);
activityModel.setInspSequenceNumber(sequenceNumber);
activityModel.setActivityDate(scheduledDate);
activityModel.setCarryoverFlag("A"); // set carry over flag
commentModel = inspectionModel.getRequestComment();
commentModel.setText(comment);
inspectionModel.setActivity(activityModel);
inspectionModel.setRequestComment(commentModel);


// schedule the inspection
var operator = getSysUserByID("ADMIN");
result = aa.inspection.scheduleInspection(inspectionModel, operator);
if (result.getSuccess()) {
	aa.print("Schedule inspection sucessfully.");
} else {
	aa.print("Schedule inspection sucessfully.");
	aa.print(result.getErrorMessage());
}

aa.print("Schedule Inspection end.");

//get system user information.
function getSysUserByID(userId) {
	aa.print("SysUserID:: " + userId);
	var inspector = null;
	if (userId != null) {
		var inspectorResult = aa.people.getSysUserByID(userId);
		if (inspectorResult.getSuccess()) {
			inspector = inspectorResult.getOutput();
		}
	}
	return inspector;
}


// get next available date time.
// @inspTypeSeq: long
// @scheduledDate: java.util.Date
// @return java.util.Date availableScheduleDate
function getNextAvailableDateTime(inspTypeSeq, scheduledDate) {
	var inspTypeSeqArray = new Array();
	inspTypeSeqArray[0] = inspTypeSeq; //inspection type sequence number
	var scriptScheduledDate = aa.date.getScriptDateTime(scheduledDate);

	var availableScheduleDate = null;

	result = aa.inspection.getNextAvailableTime(inspTypeSeqArray, scriptScheduledDate);
	if (result.getSuccess()) {
		var availableScriptScheduleDate = result.getOutput();
		availableScheduleDate = aa.date.transToJavaUtilDate(availableScriptScheduleDate.getEpochMilliseconds());
	}

	return availableScheduleDate;
}