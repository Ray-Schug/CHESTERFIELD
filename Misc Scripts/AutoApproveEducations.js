aa.env.setValue("PermitId1", "07WEN");
aa.env.setValue("PermitId2", "00000");
aa.env.setValue("PermitId3", "00005");
aa.env.setValue("WorkflowStatus", "LicenseCertificationApproved");

var workflowStatus = "LicenseCertificationApproved";

var eduName = "Bussiness";
var eduProviderName = "Haward"
var eduDegree = "MBA";



var capID = getCapId();

function getCapId() {
	var id1 = aa.env.getValue("PermitId1");
	var id2 = aa.env.getValue("PermitId2");
	var id3 = aa.env.getValue("PermitId3");

	var s_capResult = aa.cap.getCapIDModel(id1, id2, id3);
	if (s_capResult.getSuccess()) {
		return s_capResult.getOutput();
	} else {
		aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());
		return null;
	}
}

//if(workflowStatus == aa.env.getValue("WorkflowStatus"))
//{
approveEducations(capID);
//}


function getCapIDScriptModel(capID) {
	return aa.cap.createCapIDScriptModel(capID.getID1(), capID.getID2(), capID.getID3());
}


function approveEducations(capID) {
	var capIDScript = getCapIDScriptModel(capID);
	var educations = aa.education.getEducationList(capIDScript).getOutput();
	if (educations.length > 0) {
		var eduList = aa.util.newArrayList();
		for (loop in educations) {
			var eduModel = educations[loop].getEducationModel();
			if (eduModel.getEducationName() == eduName && eduModel.getProviderName() == eduProviderName && eduModel.getDegree() == eduDegree) {
				eduList.add(eduModel);
			}
		}
		var result = aa.education.autoApproveEducations(eduList, capID);
		aa.print(result.getOutput() + " education(s) approved successfully.");
	}
}


aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "Auto approve all Educations!");