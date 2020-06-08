var inspectionID = "4268962";
var capID = aa.cap.getCapID("14CAP", "00000", "00049").getOutput();
var inspectionScript = aa.inspection.getInspection(capID, inspectionID).getOutput();
var inspection = inspectionScript.getInspection();
var desiredDateScript = aa.date.parseDate("2014-02-20");
var times = desiredDateScript.getEpochMilliseconds();
var desiredDate = aa.date.transToJavaUtilDate(times);
inspection.getActivity().setDesiredDate(desiredDate);
inspection.getActivity().setDesiredTime("AM");
inspection.getActivity().setDesiredTime2("10:00");
var result = aa.inspection.editInspection(inspectionScript);
if (result.getSuccess()) {
	aa.print("successful");
} else {
	aa.print("fail");
}