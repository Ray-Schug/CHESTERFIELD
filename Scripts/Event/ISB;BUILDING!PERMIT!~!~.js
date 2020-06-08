// ISB:Building/Permit/*/*
// ISB:BUILDING/PERMIT/*/*
// Permit must be Issued
if (!wasCapStatus(["Issued"])) {
        showMessage = true;
        comment('<font size=small><b>Record must be Issued to schedule inspections</b></font>');
        cancel = true;
}