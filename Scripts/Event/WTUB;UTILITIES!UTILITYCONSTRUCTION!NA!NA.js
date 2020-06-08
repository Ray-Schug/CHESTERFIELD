//If 'Utility Construction Release' Workflow Task Status is updated to 'Release to Construction' and 
//'Approved Plans Needed' Custom Field is not 0 or 'Contract Signed Date' is blank, 
//then display error message 'Approved Plans needed must be 0 or Contract Signed Date is required'
try {
    if ((wfTask == 'Utility Construction Release' && wfStatus == 'Release to Construction' && (AInfo["Approved Plans Needed"] != 0)))
{
        showMessage = true;
        comment('<font size=small><b>Approved Plans Needed must be 0');
        cancel = true;
}
    } catch (err) 
{
    logDebug("A JavaScript Error occurred: " + err.message + " In Line " + err.lineNumber + " of " + err.fileName + " Stack " + err.stack);
}
try {
    if ((wfTask == 'Utility Construction Release' && wfStatus == 'Release to Construction' && (AInfo["Contract Signed Date"] == null)))
{
        showMessage = true;
        comment('<font size=small><b>Contract Signed Date is required');
        cancel = true;
}
    } catch (err) 
{
    logDebug("A JavaScript Error occurred: " + err.message + " In Line " + err.lineNumber + " of " + err.fileName + " Stack " + err.stack);
}