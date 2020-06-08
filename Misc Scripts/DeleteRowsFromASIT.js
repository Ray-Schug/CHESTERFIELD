// delete ASIT rows data by rowID

var capID = "14CAP-00000-00B7A";
var capIDModel = aa.cap.getCapIDModel('14CAP', '00000', '00B7A').getOutput();

// table name
var tableName = "BUNNIASIT";
// Create a HashMap.
var searchConditionMap = aa.util.newHashMap(); // Map<columnName, List<columnValue>>
// Create a List object to add the value of Column.
var columnName = "column1";
var valuesList = aa.util.newArrayList();
valuesList.add("test");
valuesList.add("999");
searchConditionMap.put(columnName, valuesList);

var appSpecificTableInfo = aa.appSpecificTableScript.getAppSpecificTableInfo(capIDModel, tableName, searchConditionMap /** Map<columnName, List<columnValue>> **/ );
if (appSpecificTableInfo.getSuccess()) {
	var appSpecificTableModel = appSpecificTableInfo.getOutput().getAppSpecificTableModel();
	var tableFields = appSpecificTableModel.getTableFields(); // List
	if (tableFields != null && tableFields.size() > 0) {
		var deleteIDsArray = []; // delete ASIT data rows ID
		for (var i = 0; i < tableFields.size(); i++) {
			var fieldObject = tableFields.get(i); // BaseField
			// get the column name.
			var columnName = fieldObject.getFieldLabel();
			// get the value of column
			var columnValue = fieldObject.getInputValue();
			// get the row ID 
			var rowID = fieldObject.getRowIndex();
			aa.print(columnName + ": " + columnValue + "   rowID: " + rowID);
			if (!contains(deleteIDsArray, rowID)) {
				deleteIDsArray.push(rowID);
			}
		}
		deletedAppSpecificTableInfors(tableName, capIDModel, deleteIDsArray);
	}
}



/**
 * Delete ASIT rows data by rowID, format: Array[rowID]
 **/
function deletedAppSpecificTableInfors(tableName, capIDModel, deleteIDsArray /** Array[rowID] **/ ) {
	if (deleteIDsArray == null || deleteIDsArray.length == 0) {
		return;
	}

	var asitTableScriptModel = aa.appSpecificTableScript.createTableScriptModel();
	var asitTableModel = asitTableScriptModel.getTabelModel();
	var rowList = asitTableModel.getRows();
	asitTableModel.setSubGroup(tableName);
	for (var i = 0; i < deleteIDsArray.length; i++) {
		var rowScriptModel = aa.appSpecificTableScript.createRowScriptModel();
		var rowModel = rowScriptModel.getRow();
		rowModel.setId(deleteIDsArray[i]);
		rowList.add(rowModel);
	}
	return aa.appSpecificTableScript.deletedAppSpecificTableInfors(capIDModel, asitTableModel);
}

// Check array whether contains object
function contains(arr, obj) {
	var i = arr.length;
	while (i--) {
		if (arr[i] === obj) {
			return true;
		}
	}
	return false;
}
aa.print("success");