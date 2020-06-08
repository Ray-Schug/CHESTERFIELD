if (exists(inspResult,["Approved","Corrections Required"]) && inspType.indexOf("Final") < 0) { 
	// Update Permit Expiration Date
	var expField = "Permit Expiration Date";
	var expDateNew = jsDateToASIDate(new Date(dateAdd(null,180)));
	logDebug("Updating " + expField + " to " + expDateNew);
	editAppSpecific(expField, expDateNew);
}
//Amusement Final 275 Days
if (inspType.equals("Amusement Final") && inspResult.equals("Approved")){
	// Update Permit Expiration Date
	var expField = "Permit Expiration Date";
	var expDateNew = jsDateToASIDate(new Date(dateAdd(null,275)));
	logDebug("Updating " + expField + " to " + expDateNew);
	editAppSpecific(expField, expDateNew);
}