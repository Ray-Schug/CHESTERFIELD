/*  var customListGroupName = "CC-UT-UC";
var AccountNumberfield = "Service Number";
var generateNewNumbercheckBox = "Generate New Service Number";
if (appTypeArray[1] == "ResidentialCompanionMeter")
	AccountNumberfield = "Domestic Service Number";

var currentASITRows = loadASITable(customListGroupName, capId);
var accountNumber = "";

//check all ASIT checkboxes 
for (i in currentASITRows) {
	if (currentASITRows[i]["Select to Copy"].fieldValue == "CHECKED") {
		accountNumber = currentASITRows[i]["Account Number"].fieldValue;
		break;
	}
}

if (accountNumber != null && accountNumber != "") {
	editAppSpecific(AccountNumberfield, accountNumber, capId);
	removeASITable(customListGroupName, capId);
} else {
	if (AInfo[generateNewNumbercheckBox] == "CHECKED") {
		var sequenceNumber = generateNewSerivceNumber();
		editAppSpecific(AccountNumberfield, sequenceNumber, capId);
		removeASITable(customListGroupName, capId);
	}
}
function generateNewSerivceNumber() {
	var Agency = servProvCode;
	var Group = appTypeArray[0];
	var Type = appTypeArray[1];
	var Subtype = appTypeArray[2];
	var Category = appTypeArray[3];
	var isTempCap = false;
	var capBiz = aa.proxyInvoker.newInstance("com.accela.aa.aamain.cap.CapBusiness").getOutput();
	var altID = capBiz.getNextAltId(Agency, Group, Type, Subtype, Category, capId.getID1(), capId.getID2(), capId.getID3(), null, false, isTempCap, false);
	return altID;
}
*/
var newServNumber = Number(lookup("NEW_CONNECTION_SERVICE_NUMBER","SERVICE_NUMBER"));
var count = 1;
if (AInfo["Utility Type"] == "Water" && !feeExists("WATERCAPITAL")){
addFee("WATERCAPITAL","CC-UTL-SC","FINAL",1,"Y")}

if (AInfo["Utility Type"] == "Water" && !feeExists("WATERMETER")){
addFee("WATERMETER","CC-UTL-SC","FINAL",1,"Y")}

if (AInfo["Utility Type"] == "Water" && AInfo["Connection Type"] == "F" && !feeExists("SEWERSERVICE")){
addFee("SEWERSERVICE","CC-UTL-SC","FINAL",1,"Y")}

if (AInfo["Utility Type"] == "Sewer" && !feeExists("SEWERCAPITAL")){
addFee("SEWERCAPITAL","CC-UTL-SC","FINAL",1,"Y")}

if (AInfo["Utility Type"] == "Sewer" && !feeExists("SEWERSERVICE") && AInfo["Connection Type"] != "F"){
addFee("SEWERSERVICE","CC-UTL-SC","FINAL",1,"Y")}

if (AInfo["Utility Type"] == "Both" && !feeExists("WATERCAPITAL")){
addFee("WATERCAPITAL","CC-UTL-SC","FINAL",1,"Y")}

if (AInfo["Utility Type"] == "Both" && !feeExists("WATERMETER")){
addFee("WATERMETER","CC-UTL-SC","FINAL",1,"Y")}

if (AInfo["Utility Type"] == "Both" && AInfo["Connection Type"] == "F" && !feeExists("SEWERSERVICE")){
addFee("SEWERSERVICE","CC-UTL-SC","FINAL",1,"Y")}

if (AInfo["Utility Type"] == "Both" && !feeExists("SEWERCAPITAL")){
addFee("SEWERCAPITAL","CC-UTL-SC","FINAL",1,"Y")}
if (AInfo["Generate New Service Number"] == "CHECKED" && AInfo["Service Number"] ==null) {
editAppSpecific("Service Number",lookup("NEW_CONNECTION_SERVICE_NUMBER","SERVICE_NUMBER"));
editLookup("NEW_CONNECTION_SERVICE_NUMBER","SERVICE_NUMBER",zeroPad(newServNumber+count,8));
}
//Add Fees
