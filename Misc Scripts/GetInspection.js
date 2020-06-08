var inspectionID = "84915";
var capID = aa.cap.getCapID("14CAP", "00000", "00075").getOutput();
var result = aa.inspection.getInspection(capID, inspectionID);

if (result.getSuccess()) {
	aa.print("successful");
} else {
	aa.print("fail");
}
var inspectionModel = result.getOutput().getInspection();
var desiredTime = inspectionModel.getActivity().getDesiredTime();
var desiredTime2 = inspectionModel.getActivity().getDesiredTime2();
var desiredDate = inspectionModel.getActivity().getDesiredDate();
aa.print(desiredDate);
aa.print(desiredTime2 + " " + desiredTime);