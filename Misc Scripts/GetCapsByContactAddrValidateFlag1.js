validatedFlag = "Y";
group = "Building";
type = "Les";
subType = "APO";
category = "Address";

//set openDateFrom
var openDateFrom = aa.date.getCurrentDate(); //09/27/2012
openDateFrom.setYear(2012);
openDateFrom.setMonth(8); //0-11
openDateFrom.setDayOfMonth(27);

//set openDateTo
var openDateTo = aa.date.getCurrentDate(); //10/11/2012
openDateTo.setYear(2012);
openDateTo.setMonth(9); //0-11
openDateTo.setDayOfMonth(11);

result = aa.cap.getCapTypeModel();
capType = result.getOutput();
capType.setGroup(group);
capType.setType(type);
capType.setSubType(subType);
capType.setCategory(category);

myResult = aa.cap.getCapsByContactAddrValidateFlag(capType, validatedFlag, openDateFrom, openDateTo);
if (myResult.getSuccess()) {
	capModelAaary = myResult.getOutput();
	aa.print("Success");
	aa.print("Size: " + capModelAaary.length);
	for (var i = 0; i < capModelAaary.length; i++) {
		aa.print("CAP[" + i + "] : " + capModelAaary[i].getCapID().toString());
	}
} else {
	aa.print("getCapsByContactAddrValidateFlag: " + myResult.getErrorMessage());
}