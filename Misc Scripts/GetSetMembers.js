// getSetMembers(): total number of the SetMember status.

var setSearchScript = aa.set.getSetDetailsScriptModel().getOutput();
setSearchScript.setSetMemberStatus("SetMemberStatus");

var setMembers = aa.set.getSetMembers(setSearchScript);
if (setMembers.getSuccess()) {
	aa.print("Size : " + setMembers.getOutput().size());
	aa.print("getSetMembers Successfully");
} else {
	aa.print("getSetMembers Failed!");
}