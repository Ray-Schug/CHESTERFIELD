var parameterList = aa.util.newArrayList();

var parameter1 = aa.genericQuery.getParameterModel("SERV_PROV_CODE", "ADBC").getOutput();
var parameter2 = aa.genericQuery.getParameterModel("MODULE", "Licenses").getOutput();
var parameter3 = aa.genericQuery.getParameterModel("OPENDATE_START", "01/01/2012").getOutput();
var parameter4 = aa.genericQuery.getParameterModel("OPENDATE_END", "01/01/2013 00:00:00").getOutput();

parameterList.add(parameter1);
parameterList.add(parameter2);
parameterList.add(parameter3);
parameterList.add(parameter4);

var sqlName = "Analytics_Daily_OpenRecord";
var startRow = 0;
var endRow = 50;

var scriptResult = aa.genericQuery.query(sqlName, parameterList, startRow, endRow);

if (scriptResult.getSuccess()) {
	var returnInfo = scriptResult.getOutput();
	aa.print("Run Generic Query successfully!");

	aa.print("SQL Name: " + sqlName);
	aa.print("Return Code: " + returnInfo.getReturnCode());
	aa.print("Return Message: " + returnInfo.getReturnMessage());
	aa.print("Return Result: " + returnInfo.getResult());
	var jsonObj = eval('(' + returnInfo.getResult() + ')');
	if (jsonObj) {
		for (var i = 0; i < jsonObj.length; i++) {

			aa.print("B1_FILE_DD: " + jsonObj[i].CREATEDDATE);
			aa.print("Total Count: " + jsonObj[i].COUNT);

		}
	}
} else {
	aa.print("Run Generic Query is failed!");
}