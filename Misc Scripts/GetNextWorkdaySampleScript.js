/*------------------------------------------------------------------------------------------------------/
| <===========Prepare Initialized Parameters 
/------------------------------------------------------------------------------------------------------*/
//Set the capID and inspectionID in order to get inspSequenceNumber. 
var capID = aa.cap.getCapID("14CAP", "00000", "005US").getOutput();
var inspectionID = 92150;
var workingDayCount = 3;
var inspSequenceNumber = getInspSequenceNumber(capID, inspectionID);
var servProvCode = aa.getServiceProviderCode();

//Set the workingDays fromDate.
var dateTimeUtil = aa.proxyInvoker.newInstance("com.accela.aa.util.DateTimeUtil", aa.util.toObjectArray([servProvCode]).getOutput()).getOutput();
var fromDate = dateTimeUtil.getAgencyCurrentDate(servProvCode);
aa.print("The fromDate of getWorkingDays is: " + convertDateToString(fromDate));

//Set the workingDays endDate.
var endDate = aa.util.dateDiff(fromDate, "Day", 3);
aa.print("The endDate of getWorkingDays is: " + convertDateToString(endDate));

//Set the workingDays firstAvailableDate.
var firstAvailableDate = fromDate;
aa.print("The firstAvailableDate of getWorkingDays is: " + convertDateToString(firstAvailableDate));

//Set the workingDayQueryModel property values.
var workingDayQuery = aa.proxyInvoker.newInstance("com.accela.aa.inspection.assign.model.WorkingDayQueryModel").getOutput();
workingDayQuery.setFromDate(fromDate);
workingDayQuery.setEndDate(endDate);
workingDayQuery.setServProvCode(servProvCode);
workingDayQuery.setCount(workingDayCount);
workingDayQuery.setFirstAvailableDate(firstAvailableDate);
workingDayQuery.setInspSeqNum(inspSequenceNumber);


//Whether validate the cut off time, "true" for only IVR/ACA.
var isValidateCutOffTime = true;
//Whether validate the schedule number of day, "true" for only IVR/ACA.
var isValidateScheduleNumOfDays = true;
//Enable for ACA.
var isGettingDataFromACA = true;
//Include startDate or not.
var isIncludeGivenDay = true;
var isValidateEventScheduleAllocatedUnits = false;

/*------------------------------------------------------------------------------------------------------/
| <=========== Main Logic
/------------------------------------------------------------------------------------------------------*/
aa.print("*******************Get NextWorkingDays Start*************************");
var nextWorkingDayResult = aa.calendar.getNextWorkDay(capID, workingDayQuery, isValidateCutOffTime,
	isValidateScheduleNumOfDays, isGettingDataFromACA, isIncludeGivenDay, isValidateEventScheduleAllocatedUnits);

if (nextWorkingDayResult.getSuccess()) {


	var nextWorkingDayList = nextWorkingDayResult.getOutput();

	if (nextWorkingDayList != null && nextWorkingDayList.size() > 0) {
		aa.print("Successfully get nextWorkingDays on the cap: " + capID);
		for (var i = 0; i < nextWorkingDayList.size(); i++) {
			var dateAndTimesModel = nextWorkingDayList.get(i);
			var date = dateAndTimesModel.getDate();
			aa.print("The workingDay is: " + convertDateToString(date));
		}
	} else {
		aa.print("There are no workingDays on the cap: " + capID);
	}
} else {
	aa.print("**ERROR: Failed get nextWorkingDay does not account for agency holidays: " + nextWorkingDayResult.getErrorMessage());
}
aa.print("*******************Get NextWorkingDays End*************************");

/*------------------------------------------------------------------------------------------------------/
| <===========Helper Functions
/------------------------------------------------------------------------------------------------------*/
//get the InspSequenceNumber
function getInspSequenceNumber(capID, inspectionID) {
	var inspSequenceNumber = null;
	var inspectionResult = aa.inspection.getInspection(capID, inspectionID);
	if (inspectionResult.getSuccess()) {
		var inspectionModel = inspectionResult.getOutput().getInspection();
		var inspectionGroup = inspectionModel.getActivity().getInspectionGroup();
		var inspectionType = inspectionModel.getInspectionType();
		var inspectionTypesResult = aa.inspection.getInspectionType(inspectionGroup, inspectionType);
		if (inspectionTypesResult.getSuccess()) {
			var inspectionTypes = inspectionTypesResult.getOutput();
			if (inspectionTypes) {
				for (var i in inspectionTypes) {
					var inspectionTypeModel = inspectionTypes[i];
					if (inspectionTypeModel.getGroupCode().toUpperCase().equals(inspectionGroup.toUpperCase()) && inspectionTypeModel.getType().toUpperCase().equals(inspectionType.toUpperCase())) {
						inspSequenceNumber = inspectionTypeModel.getSequenceNumber();
					}
				}
			}
		} else {
			aa.print("Failed retrieving inspection Type: " + inspectionTypesResult.getErrorMessage());
		}
	}
	return inspSequenceNumber;
}

function convertDateToString(date) {
	return aa.util.formatDate(date, "MM/dd/yyyy");
}