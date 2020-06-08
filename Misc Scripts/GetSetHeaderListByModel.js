//getSetHeaderListByModel()    getSetHeaderListByModel by setscript


var setscript1 = aa.set.getSetHeaderScriptModel().getOutput();
setscript.setSetID("EMSE SET1025");
setscript.setSetTitle("Emse Set");
setscript.setSetStatusComment("SetStatusComment");
setscript.setSetStatus("Pending");
setscript.setRecordSetType("All Given");
setscript.setServiceProviderCode("NYC");
setscript.setAuditDate(aa.date.getCurrentDate());
setscript.setAuditID('Admin');

setscript = aa.set.createSetHeader(setscript);


var setheadlistScript = aa.set.getSetHeaderListByModel(setscript.getOutput());
if (setheadlistScript.getSuccess()) {
	aa.print(setheadlistScript.getOutput().get(0).getSetID());
	aa.print("getSetHeaderListByModel Successfully");
} else {
	aa.print("getSetHeaderListByModel Failed");
	aa.print(setheadlistScript.getErrorMessage());
}


//get Set List by SetType.

var setscript2 = aa.set.getSetHeaderScriptModel().getOutput();
setscript2.setRecordSetType("Other");
setscript2.setServiceProviderCode("NYC");
var setheadlistScript2 = aa.set.getSetHeaderListByModel(setscript2);
if (setheadlistScript2.getSuccess()) {
	aa.print("getSetHeaderModel2 Successfully");
	for (var i = 0; i < setheadlistScript2.getOutput().size(); i++) {
		aa.print("Set " + i);
		aa.print(setheadlistScript2.getOutput().get(i).getSetID());
		aa.print(setheadlistScript2.getOutput().get(i).getSetTitle());
		aa.print(setheadlistScript2.getOutput().get(i).getSetStatusComment());
		aa.print(setheadlistScript2.getOutput().get(i).getSetStatus());
		aa.print(setheadlistScript2.getOutput().get(i).getRecordSetType());
		aa.print(setheadlistScript2.getOutput().get(i).getSetStatusDate());
		aa.print("--------------------------------------------------------");
	}
} else {
	aa.print("getSetHeaderModel2 Failed");
	aa.print(setheadlistScript2.getErrorMessage());
}


//get Set List by SetID.

var setscript3 = aa.set.getSetHeaderScriptModel().getOutput();
setscript3.setSetID("12-REC-00050");
setscript3.setServiceProviderCode("NYC");
var setheaderlistscript3 = aa.set.getSetHeaderListByModel(setscript3);
if (setheaderlistscript3.getSuccess()) {
	aa.print("getSetHeaderModel after update Successfully");
	for (var i = 0; i < setheaderlistscript3.getOutput().size(); i++) {
		aa.print(setheaderlistscript3.getOutput().get(i).getSetID());
		aa.print(setheaderlistscript3.getOutput().get(i).getSetTitle());
		aa.print(setheaderlistscript3.getOutput().get(i).getSetStatusComment());
		aa.print(setheaderlistscript3.getOutput().get(i).getSetStatus());
		aa.print(setheaderlistscript3.getOutput().get(i).getRecordSetType());
		aa.print(setheaderlistscript3.getOutput().get(i).getSetStatusDate());
	}
} else {
	aa.print("getSetHeaderModel after update Failed");
	aa.print(setheaderlistscript3.getErrorMessage());
}