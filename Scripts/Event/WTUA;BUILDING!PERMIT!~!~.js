//Permit Issuance is Issued than updated Permit Expiration Date to 180 days from system date
if (wfTask == "Permit Issuance" && wfStatus == "Issued") { 
	// Update Permit Expiration Date
	var expField = "Permit Expiration Date";
	var expDateNew = jsDateToASIDate(new Date(dateAdd(null,180)));
	logDebug("Updating " + expField + " to " + expDateNew);
	editAppSpecific(expField, expDateNew);
}