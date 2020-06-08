var capIDModel = aa.cap.getCapIDModel('14CAP', '00000', '00B7A').getOutput();
var callerID = "ADMIN";
var tableName = "BUNNIASIT";
var result = aa.appSpecificTableScript.getMaxRowIdOfAppSpecificTable(capIDModel, tableName, callerID);
if (result.getSuccess()) {
	var maxRowID = result.getOutput();
	for (var i = 0; i < maxRowID; i++) {
		aa.print("test" + i);
	}
} else {
	aa.print("getMaxRowIdFail");
}