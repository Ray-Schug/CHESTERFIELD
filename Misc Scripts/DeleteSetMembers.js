// Delete a SetMember from SetMember List.

var capIDModel = aa.cap.getCapID("11CAP", "00000", "00076").getOutput();
var setUpdateScript = aa.set.getSetDetailsScriptModel().getOutput();
setUpdateScript.setSetID("12-CAP-00029"); //Set ID
setUpdateScript.setID1(capIDModel.getID1());
setUpdateScript.setID2(capIDModel.getID2());
setUpdateScript.setID3(capIDModel.getID3());
setUpdateScript.setServiceProviderCode("NYC");

var deleteSetMembersScript = aa.set.deleteSetMembers(setUpdateScript);
if (deleteSetMembersScript.getSuccess()) {
	aa.print("delete Set Members Successfully");
} else {
	aa.print("delete Set Members Failed!");
	aa.print(deleteSetMembersScript.getErrorMessage());
}