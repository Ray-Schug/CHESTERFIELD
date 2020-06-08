/*------------------------------------------------------------------------------------------------------/
/ Program : ASA;Building!Permit!~!~.js
/ Event   : ApplicationSubmitAfter
/
/ Initial Version: ddejesus 2016.09.12
/------------------------------------------------------------------------------------------------------*/

// set the Application Expiration Date to 180 days from Application Date.
var newAppExpDate = dateAdd(fileDate,180);
logDebug("Updating Application Expiration Date to " + newAppExpDate);
editAppSpecific("Application Expiration Date", newAppExpDate);

if (AInfo["Requesting a Walkthrough Process?"]=="Yes" && 
	(appMatch("Building/Permit/Commercial/NA") || appMatch("Building/Permit/MixedUse/NA") || appMatch("Building/Permit/Residential/NA") || appMatch("Building/Permit/Residential/Multiunit"))) {
	updateTask("Application Submittal","Walkthrough Accepted","","Updated via script.");
}

// code for other record types should be here.
logDebug("End of ASA;Building!Permit!~!~.js");
// ********