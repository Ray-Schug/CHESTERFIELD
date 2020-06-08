aa.env.setValue("PermitId1", "07WEN");
aa.env.setValue("PermitId2", "00000");
aa.env.setValue("PermitId3", "00005");
aa.env.setValue("WorkflowStatus", "LicenseCertificationApproved");

var workflowStatus = "LicenseCertificationApproved";

var contEduName = "Chinese";
var contEduProviderName = "NewYork";
var contEduDateOfClass = "11/01/2013";
var contEduFinalScore = 80.0;


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
approveCEHs(capID);
//}


function getCapIDScriptModel(capID) {
	return aa.cap.createCapIDScriptModel(capID.getID1(), capID.getID2(), capID.getID3());
}

function getDateStr(date) {
	var dateStr = "";
	if (date != null) {
		var scriptDateTime = aa.date.getScriptDateTime(date);
		dateStr = scriptDateTime.getMonth() + "/" + scriptDateTime.getDayOfMonth() + "/" + scriptDateTime.getYear();
	}
	return dateStr;
}

function approveCEHs(capID) {
	var capIDScript = getCapIDScriptModel(capID);
	var contEdus = aa.continuingEducation.getContEducationList(capIDScript).getOutput();
	if (contEdus.length > 0) {
		var contEduList = aa.util.newArrayList();
		for (loop in contEdus) {
			var contEduModel = contEdus[loop].getContinuingEducationModel();
			var dateOfClassStr = getDateStr(contEduModel.getDateOfClass());

			if (contEduModel.getContEduName() == contEduName && contEduModel.getProviderName() == contEduProviderName && dateOfClassStr == contEduDateOfClass && contEduModel.getFinalScore() == contEduFinalScore) {
				contEduList.add(contEduModel);
			}
		}
		var result = aa.continuingEducation.autoApproveCEHs(contEduList, capID);
		aa.print(result.getOutput() + " continuing education hour(s) approved successfully.");
		var failCount = contEduList.size() - result.getOutput();
		if (failCount > 0) {
			aa.print(failCount + " continuing education hour(s) failed to approve for they have a failing score, or are not yet scored or saved.");

		}
	}
}



aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "Auto approve all Continuing Educations!");