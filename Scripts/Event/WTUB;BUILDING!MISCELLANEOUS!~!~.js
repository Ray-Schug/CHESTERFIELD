//Fees must be paid before Initiation Workflow Status is Accepted//
try {
	if ((wfTask == 'Initiation' && wfStatus == 'Accepted') && balanceDue > 0) 
{
        showMessage = true;
        comment('<font size=small><b>Unpaid Fees:</b></font><br><br>Cannot Accept until Fees are Paid, Balance Due is $ ' + balanceDue);
        cancel = true;
}
    } catch (err) 
{
    logDebug("A JavaScript Error occurred: " + err.message + " In Line " + err.lineNumber + " of " + err.fileName + " Stack " + err.stack);
}