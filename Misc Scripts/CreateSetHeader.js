//Provide EMSE API: createSetHeader() to Ceate a Set 

var SetID = "EMSE SETID1025";
var SetTitle = "EMSE SET1025";
var SetStatusComment = "Create a Set by EMSE";
var SetStatus = "Pending";
var SetType = "All Given";

var setscript = aa.set.getSetHeaderScriptModel().getOutput();
setscript.setSetID(SetID);
setscript.setSetTitle(SetTitle);
setscript.setSetStatusComment(SetStatusComment);
setscript.setSetStatus(SetStatus);
setscript.setRecordSetType(SetType);
setscript.setServiceProviderCode("NYC");
setscript.setAuditDate(aa.date.getCurrentDate());
setscript.setAuditID("Admin");



setscript = aa.set.createSetHeader(setscript);
if (setscript.getSuccess()) {
	aa.print("createSetHeader Successfully");
} else {
	aa.print("createSetHeader Failed");
	aa.print(setscript.getErrorMessage());
}