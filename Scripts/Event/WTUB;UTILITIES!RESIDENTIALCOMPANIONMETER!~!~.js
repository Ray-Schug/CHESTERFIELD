//Fees must be paid before Workflow Status is Accepted//
try {
    if ((wfTask == 'Application Submittal' && wfStatus == 'Accepted') && balanceDue > 0) 
{
        showMessage = true;
        comment('<font size=small><b>Unpaid Fees:</b></font><br><br>Cannot Complete until Fees are Paid, Balance Due is $ ' + balanceDue);
        cancel = true;
}
    } catch (err) 
{
    logDebug("A JavaScript Error occurred: " + err.message + " In Line " + err.lineNumber + " of " + err.fileName + " Stack " + err.stack);
}
//Custom Fields are required//
try {
    if ((wfTask == 'Application Submittal' && wfStatus == 'Accepted') && (AInfo["Cycle"] == null)) 
{
        showMessage = true;
        comment('<font size=small><b>Custom Fields are Required');
        cancel = true;
}
    } catch (err) 
{
    logDebug("A JavaScript Error occurred: " + err.message + " In Line " + err.lineNumber + " of " + err.fileName + " Stack " + err.stack);
}
//Estimated Cost of Construction is required//
try {
    if ((wfTask == 'Application Submittal' && wfStatus == 'Accepted') && estValue == 0) 
{
        showMessage = true;
        comment('<font size=small><b>Estimated Cost of Construction is Required');
        cancel = true;
}
    } catch (err) 
{
    logDebug("A JavaScript Error occurred: " + err.message + " In Line " + err.lineNumber + " of " + err.fileName + " Stack " + err.stack);
}
//Address, Parcel and Owner required before Application Submittal Accepted
try {
if ((wfTask == 'Application Submittal' && wfStatus == 'Accepted')) 
{
	//Before Workflow Task Status can be selected - confirm that at least one Address, one Parcel and one Owner exists on Record.
	if (!addressExistsOnCap()) {          // Check if address exists
	   showMessage = true;
	   comment('<font size=small><b>Address is required prior to Acceptance</b></font>');
	   cancel = true;
	}
	if (!parcelExistsOnCap()) {             // Check if address exists
	   showMessage = true;
	   comment('<font size=small><b>Parcel is required prior to Acceptance</b></font>');
	   cancel = true;
	}
	if (!ownerExistsOnCap()) {            // Check if address exists
	   showMessage = true;
	   comment('<font size=small><b>Owner is required prior to Acceptance</b></font>');
	   cancel = true;
	}
}
    } catch (err) 
{
    logDebug("A JavaScript Error occurred: " + err.message + " In Line " + err.lineNumber + " of " + err.fileName + " Stack " + err.stack);
}
// WTUB:Building/Permit/*/*
	//Before Workflow Task 'Permit Issuance' Status is 'Issued' IF Licensed Professional is null then Error: Licensed Professional is Required before Permit Issuance//
	if (getLicenseProf(null,null)) {
		showMessage = true;
		comment('<font size=small><b>Licensed Professional is required prior to Issuance</b></font>');
		cancel = true;
	}