//===============Test Begin===============
//var capID4Test = aa.cap.getCapID("05BLD", "00000", "00189").getOutput();
//var capModel4Test = aa.cap.getCapViewByID(capID4Test).getOutput();
//var parentCapID4Test = aa.cap.getCapID("05BLD", "00000", "00188").getOutput();
//capModel4Test.setParentCapID(parentCapID4Test);
//aa.env.setValue("CapModel", capModel4Test);
//===============Test End===============

/*------1st group trade name key in ASI------------*/
var tradeName1Key = "BusinessName1";
var tradeName2Key = "BusinessName2";



//----------------------------------------
var br = "<BR>";
var errorMessage = "";
var errorCode = 0;

function logError(error) {
    aa.print(error);
    errorMessage += error + br;
    errorCode = -1;
}

function end() {
    aa.env.setValue("ErrorCode", errorCode);
    aa.env.setValue("ErrorMessage", errorMessage);
}
//----------------------------------------

var capModel = aa.env.getValue("CapModel");
var parentCapID = capModel.getParentCapID();

copyTradeName2ASIField(parentCapID, capModel);
end();

//only copy the primary address to CapModel
function copyTradeName2ASIField(fromCapId, toCapModel) {
    aa.print("fromCapId=" + fromCapId);
    if (fromCapId == null) {
        logError("**ERROR: ParentCapID is null");
        return;
    }
    var licenseProfessionalResult = aa.licenseProfessional.getLicenseProf(fromCapId);
    if (licenseProfessionalResult.getSuccess()) {
        var licenseProfessionalScriptModel = licenseProfessionalResult.getOutput();
        if (licenseProfessionalScriptModel != null && licenseProfessionalScriptModel.length > 0) {
            var licenseProfessionalModel = licenseProfessionalScriptModel[0].getLicenseProfessionalModel();
            var businessName = licenseProfessionalModel.getBusinessName();
            var businessName2 = licenseProfessionalModel.getBusName2();
            aa.log("=================================businessName =" + businessName);
            aa.log("=================================businessName2=" + businessName2);

            var asiGroups = toCapModel.getAppSpecificInfoGroups();
            setFieldValue(tradeName1Key, businessName, asiGroups);
            setFieldValue(tradeName2Key, businessName2, asiGroups);
        }
    } else {
        logError("**ERROR: Failed to get license professional: " + licenseProfessionalResult.getErrorMessage());
    }
}

function setFieldValue(fieldName, fieldValue, asiGroups) {
    if (asiGroups == null) {
        return;
    }

    var iteGroups = asiGroups.iterator();
    while (iteGroups.hasNext()) {
        var group = iteGroups.next();
        var fields = group.getFields();
        if (fields != null) {
            var iteFields = fields.iterator();
            while (iteFields.hasNext()) {
                var field = iteFields.next();
                if (fieldName == field.getCheckboxDesc()) {
                    //field.setAttributeValue(fieldValue);
                    field.setChecklistComment(fieldValue);
                    aa.print("ChecklistComment=" + fieldValue);
                    return true;
                }
            }
        }
    }
    return false;
}