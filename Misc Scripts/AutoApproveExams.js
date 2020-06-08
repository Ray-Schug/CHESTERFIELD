aa.env.setValue("PermitId1", "13CAP");
aa.env.setValue("PermitId2", "00000");
aa.env.setValue("PermitId3", "003AU");
aa.env.setValue("WorkflowStatus", "LicenseCertificationApproved");

//var workflowStatus = "LicenseCertificationApproved";

var examName = "test";
var examProviderName = "JEFFPROVIDER";
var examDate = "10/01/2013"; //MM/dd/yyyy
var examFinalScore = 99.0;

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
approveExams(capID);
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

function approveExams(capID) {
	var capIDScript = getCapIDScriptModel(capID);
	var exams = aa.examination.getExaminationList(capIDScript).getOutput();
	if (exams.length > 0) {
		var examList = aa.util.newArrayList();

		for (loop in exams) {
			var examModel = exams[loop].getExaminationModel();

			var examDateStr = getDateStr(examModel.getExamDate());

			if (examModel.getExamName() == examName && examModel.getProviderName() == examProviderName && examDateStr == examDate && examModel.getFinalScore() == examFinalScore) {
				examList.add(examModel);
			}
		}
		var result = aa.examination.autoApproveExams(examList, capID);
		aa.print(result.getOutput() + " examination(s) approved successfully.");
		var failCount = examList.size() - result.getOutput();
		if (failCount > 0) {
			aa.print(failCount + " examination(s) failed to approve for they have a failing score, or are not yet scored or saved.");
		}
	}
}

aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "Auto approve all passed exams!");