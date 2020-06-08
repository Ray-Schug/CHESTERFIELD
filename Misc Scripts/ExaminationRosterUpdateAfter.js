/*------------------------------------------------------------------------------------------------------/
| BEGIN Event Specific Variables
/------------------------------------------------------------------------------------------------------*/
// Mail From
var mailFrom = "Auto_Sender@achievo.com";
//Mail CC
var mailCC = "ethan.mo@achievo.com";
var dateFormat = "yyyy-MM-dd";
var timeFormat = "hh:mm:ss a";
var acaWebServiceSite = "http://aa-demo.achievo.com/710/DEMO";

/*------------------------------------------------------------------------------------------------------/
| END Event Specific Variables
/------------------------------------------------------------------------------------------------------*/


function main() {
	var actionType = aa.env.getValue("actionType");
	var rosterModelList = aa.env.getValue("ExamRosterList");
	scheduleRosterAfter(rosterModelList, actionType);

}

function scheduleRosterAfter(rosterModelList, actionType) {
	if (rosterModelList == null || rosterModelList == "") {
		return false;
	}

	var it = rosterModelList.iterator();
	var templateName;
	var oldExamRosterList = aa.env.getValue("OldExamRosterList");
	var count = 0;
	while (it.hasNext()) {
		var rosterModel = it.next();

		var rosterID = rosterModel.getProviderRosterPKModel().getRosterNbr();
		var capIDModel = constructCapIDModel(rosterModel);
		var email = getEmailbyRosterID(capIDModel);
		var exam;
		var emailParameters;
		count++;
		if (email != "") {
			//send email and save to document as attachment.
			if ("schedule" == actionType) {
				templateName = "NOTICE OF EXAM SCHEDULED";
				var examResult = aa.examination.getExaminationModelByRosterID(rosterID);
				if (examResult.getSuccess() && examResult.getOutput() != null) {
					exam = examResult.getOutput();
				} else {
					continue;
				}
				emailParameters = getParamsForSchedule(exam, capIDModel);
			} else if ("reschedule" == actionType) {
				templateName = "NOTICE OF EXAM RESCHEDULED";
				var examResult = aa.examination.getExaminationModelByRosterID(rosterID);
				if (examResult.getSuccess() && examResult.getOutput() != null) {
					exam = examResult.getOutput();
				} else {
					continue;
				}
				emailParameters = getParamsForReschedule(oldExamRosterList.get(count - 1), rosterModel, exam, capIDModel);
			} else if ("unschedule" == actionType) {
				templateName = "NOTICE OF EXAM CANCELLED";
				emailParameters = getParamsForUnschedule(rosterModel, capIDModel);
			} else if ("updateScore" == actionType) {
				var examResult = aa.examination.getExaminationModelByRosterID(rosterID);
				if (examResult.getSuccess() && examResult.getOutput() != null) {
					exam = examResult.getOutput();
				} else {
					continue;
				}
				if (isPass(exam)) {
					templateName = "NOTICE OF PASSED EXAMINATION";
				} else {
					templateName = "NOTICE OF FAILED EXAM";
				}
				emailParameters = getParamsForUpdate(rosterModel, exam, capIDModel);
			}
			var fileNames = [];
			var isSuccessResult = aa.document.sendEmailAndSaveAsDocument(mailFrom, email,
				mailCC, templateName, emailParameters, capIDModel, fileNames);
			aa.print(isSuccessResult.getSuccess());
			if (isSuccessResult.getSuccess()) {
				aa.log("Send email successful.");
			} else {
				aa.log("Send email fail.");
			}
		} else {
			aa.log("Send email address empty.");

		}
	}

}

//Construct CapIDModel from rosterModel.
function constructCapIDModel(rosterModel) {
	var b1PerId1 = rosterModel.getB1PerId1();
	var b1PerId2 = rosterModel.getB1PerId2();
	var b1PerId3 = rosterModel.getB1PerId3();
	var capIDModel = aa.cap.createCapIDScriptModel(b1PerId1, b1PerId2, b1PerId3);

	return capIDModel;

}

function getParamsForUnschedule(rosterModel, capID) {
	var params = aa.util.newHashtable();
	var eventID = rosterModel.getProviderEventID();
	setExamNameAndProviderName(eventID);
	var examName = aa.env.getValue("examName");
	var providerName = aa.env.getValue("providerName");
	var examDate = formatDate(rosterModel.getProviderEventModel().getStartTime(), dateFormat);
	var startTime = formatDate(rosterModel.getProviderEventModel().getStartTime(), timeFormat);
	var endTime = formatDate(rosterModel.getProviderEventModel().getEndTime(), timeFormat);
	addParameter(params, "$$PrimaryContactName$$", getCapPrimaryContactName(capID));
	addParameter(params, "$$ExaminationName$$", examName);
	addParameter(params, "$$RecordType$$", getCapType(capID));
	addParameter(params, "$$AlternateID$$", getAltID(capID));
	addParameter(params, "$$ProviderName$$", providerName);
	addParameter(params, "$$ExaminationDate$$", examDate);
	addParameter(params, "$$ExaminationStartTime$$", startTime);
	addParameter(params, "$$ExaminationEndTime$$", endTime);
	addParameter(params, "$$ExaminationComments$$", getComments(rosterModel));
	addParameter(params, "$$Url$$", getACAUrl(capID));
	var oldSite = "";
	var oldExamSiteModel = rosterModel.getProviderEventModel().getrProviderLocationModel();
	var count = 0;
	if (oldExamSiteModel != null) {
		oldSite = appendAddress(oldSite, oldExamSiteModel.getAddress1());
		oldSite = appendAddress(oldSite, oldExamSiteModel.getAddress2());
		oldSite = appendAddress(oldSite, oldExamSiteModel.getAddress3());
		oldSite = appendAddress(oldSite, oldExamSiteModel.getCity());
		oldSite = appendAddress(oldSite, oldExamSiteModel.getState());
		oldSite = appendAddress(oldSite, oldExamSiteModel.getZip());
		count++;
	}
	aa.print(count);
	addParameter(params, "$$ExaminationSite$$", oldSite);
	return params;
}

function getParamsForReschedule(oldRosterModel, rosterModel, exam, capID) {
	var params = aa.util.newHashtable();
	addParameter(params, "$$PrimaryContactName$$", getCapPrimaryContactName(capID));
	addParameter(params, "$$RecordType$$", getCapType(capID));
	addParameter(params, "$$AlternateID$$", getAltID(capID));
	addParameter(params, "$$Url$$", getACAUrl(capID));
	if (oldRosterModel != null) {
		var eventID = oldRosterModel.getProviderEventID();
		setExamNameAndProviderName(eventID);
		var examName = aa.env.getValue("examName");
		var providerName = aa.env.getValue("providerName");
		var oldExamDate = formatDate(oldRosterModel.getProviderEventModel().getStartTime(), dateFormat);
		var oldStartTime = formatDate(oldRosterModel.getProviderEventModel().getStartTime(), timeFormat);
		var oldEndTime = formatDate(oldRosterModel.getProviderEventModel().getEndTime(), timeFormat);
		addParameter(params, "$$OldExaminationName$$", examName);
		addParameter(params, "$$OldProviderName$$", providerName);
		addParameter(params, "$$OldExaminationDate$$", oldExamDate);
		addParameter(params, "$$OldExaminationStartTime$$", oldStartTime);
		addParameter(params, "$$OldExaminationEndTime$$", oldEndTime);
		addParameter(params, "$$OldExaminationComments$$", getComments(oldRosterModel));

		var oldSite = "";
		var oldExamSiteModel = oldRosterModel.getProviderEventModel().getrProviderLocationModel();
		if (oldExamSiteModel != null && oldExamSiteModel.getAddress1() != null) {
			oldSite = oldExamSiteModel.getAddress1();
			oldSite = appendAddress(oldSite, oldExamSiteModel.getZip());
		}
		addParameter(params, "$$OldExaminationSite$$", oldSite);
		if (oldExamSiteModel != null) {
			addParameter(params, "$$OldDrivingDirections$$", oldExamSiteModel.getDrivingDirections());
			addParameter(params, "$$OldAccessibilityDescription$$", oldExamSiteModel.getHandicapAccessible());
		} else {
			addParameter(params, "$$OldDrivingDirections$$", "");
			addParameter(params, "$$OldAccessibilityDescription$$", "");
		}
	}

	var examDate = formatDate(exam.getExamDate(), dateFormat);
	var startTime = formatDate(exam.getStartTime(), timeFormat);
	var endTime = formatDate(exam.getEndTime(), timeFormat);
	var examSiteModel = aa.examination.getExamSiteByExamModel(exam);
	addParameter(params, "$$PrimaryContactName$$", getCapPrimaryContactName(capID));
	addParameter(params, "$$RecordType$$", getCapType(capID));
	addParameter(params, "$$AlternateID$$", getAltID(capID));
	addParameter(params, "$$ExaminationName$$", exam.getExamName());
	addParameter(params, "$$ProviderName$$", exam.getProviderName());
	addParameter(params, "$$ExaminationDate$$", examDate);
	addParameter(params, "$$ExaminationStartTime$$", startTime);
	addParameter(params, "$$ExaminationEndTime$$", endTime);
	addParameter(params, "$$ExaminationComments$$", exam.getComments());
	if (examSiteModel.getSuccess()) {
		addParameter(params, "$$DrivingDirections$$", examSiteModel.getOutput().getDrivingDirections());
		addParameter(params, "$$AccessibilityDescription$$", examSiteModel.getOutput().getHandicapAccessible());
	} else {
		addParameter(params, "$$DrivingDirections$$", "");
		addParameter(params, "$$AccessibilityDescription$$", "");
	}
	addParameter(params, "$$ExaminationSite$$", getExamSite(exam));
	return params;
}

function getParamsForSchedule(exam, capID) {
	var params = aa.util.newHashtable();
	var examDate = formatDate(exam.getExamDate(), dateFormat);
	var startTime = formatDate(exam.getStartTime(), timeFormat);
	var endTime = formatDate(exam.getEndTime(), timeFormat);
	var examSiteModel = aa.examination.getExamSiteByExamModel(exam);
	addParameter(params, "$$PrimaryContactName$$", getCapPrimaryContactName(capID));
	addParameter(params, "$$RecordType$$", getCapType(capID));
	addParameter(params, "$$AlternateID$$", getAltID(capID));
	addParameter(params, "$$ExaminationName$$", exam.getExamName());
	addParameter(params, "$$ProviderName$$", exam.getProviderName());
	addParameter(params, "$$ExaminationDate$$", examDate);
	addParameter(params, "$$ExaminationStartTime$$", startTime);
	addParameter(params, "$$ExaminationEndTime$$", endTime);
	addParameter(params, "$$ExaminationComments$$", exam.getComments());
	addParameter(params, "$$Url$$", getACAUrl(capID));

	if (examSiteModel.getSuccess() && examSiteModel.getOutput() != null) {
		addParameter(params, "$$DrivingDirections$$", examSiteModel.getOutput().getDrivingDirections());
		addParameter(params, "$$AccessibilityDescription$$", examSiteModel.getOutput().getHandicapAccessible());
	} else {
		addParameter(params, "$$DrivingDirections$$", "");
		addParameter(params, "$$AccessibilityDescription$$", "");
	}
	addParameter(params, "$$ExaminationSite$$", getExamSite(exam));
	return params;
}

function getParamsForUpdate(rosterModel, exam, capID) {
	var params = aa.util.newHashtable();
	var examName = exam.getExamName();
	var providerName = exam.getProviderName();
	var examDate = "";
	var startTime = "";
	var endTime = "";
	var finalScore;
	if (exam.getExamDate() != null) {
		examDate = formatDate(exam.getExamDate(), dateFormat);
		startTime = formatDate(exam.getStartTime(), timeFormat);
		endTime = formatDate(exam.getEndTime(), timeFormat);
	}
	if ("passfail".equalsIgnoreCase(exam.getGradingStyle().trim())) {
		if (isPass(exam)) {
			finalScore = "Pass";
		} else {
			finalScore = "Fail";
		}
	} else if ("percentage".equalsIgnoreCase(exam.getGradingStyle().trim())) {
		finalScore = exam.getFinalScore() + "%";
	} else {
		finalScore = exam.getFinalScore();
	}

	addParameter(params, "$$PrimaryContactName$$", getCapPrimaryContactName(capID));
	addParameter(params, "$$Url$$", getACAUrl(capID));
	addParameter(params, "$$RecordType$$", getCapType(capID));
	addParameter(params, "$$AlternateID$$", getAltID(capID));
	addParameter(params, "$$ExaminationName$$", examName);
	addParameter(params, "$$ProviderName$$", providerName);
	addParameter(params, "$$ExaminationScore$$", finalScore);
	addParameter(params, "$$PassingScore$$", getPassingScore(exam));
	addParameter(params, "$$ExaminationDate$$", examDate);
	addParameter(params, "$$ExaminationStartTime$$", startTime);
	addParameter(params, "$$ExaminationEndTime$$", endTime);
	addParameter(params, "$$ExaminationSite$$", getExamSite(exam));
	addParameter(params, "$$ExaminationComments$$", getComments(rosterModel));

	return params;
}

function getACAUrl(capID) {
	var acaUrl = "";
	if (capID == null || capID.getCapID() == null) {
		return acaUrl;
	}
	var capIDModel = capID.getCapID();
	var capResult = aa.cap.getCap(capIDModel.getID1(), capIDModel.getID2(), capIDModel.getID3());
	if (!capResult.getSuccess()) {
		return acaUrl;
	}
	var cap = capResult.getOutput().getCapModel();
	acaUrl = acaWebServiceSite + "/urlrouting.ashx?type=1000";
	acaUrl += "&Module=" + cap.getModuleName();
	acaUrl += "&capID1=" + capIDModel.getID1() + "&capID2=" + capIDModel.getID2() + "&capID3=" + capIDModel.getID3();
	acaUrl += "&agencyCode=" + aa.getServiceProviderCode();
	return acaUrl;
}

function getComments(roster) {
	var result = aa.examination.getXRefExaminationProviderModelByRoster(roster);
	var comments = "";
	if (result.getSuccess()) {
		var exam = result.getOutput();
		if (exam != null) {
			comments = exam.getComments();
		}
	}
	return comments;
}

function formatDate(date, dateFormat) {
	var dateStr = "";
	if (date != null) {
		dateStr = aa.util.formatDate(date, dateFormat);
	}
	return dateStr;
}

function getExamSite(exam) {
	var examSite = aa.examination.getExamSiteByExamModel(exam);
	var site = "";
	if (examSite.getSuccess() && examSite.getOutput() != null) {
		var location = examSite.getOutput();
		site = appendAddress(site, location.getAddress1());
		site = appendAddress(site, location.getAddress2());
		site = appendAddress(site, location.getAddress3());
		site = appendAddress(site, location.getCity());
		site = appendAddress(site, location.getState());
		site = appendAddress(site, location.getZip());
	}
	aa.print(site);
	return site;
}

function appendAddress(addressStr, newAddress) {
	var address = "";
	if (newAddress != null && newAddress != "") {
		if (addressStr != null && addressStr != "") {
			address = addressStr + ", " + newAddress;
		} else {
			address = newAddress;
		}
	} else {
		address = addressStr;
	}
	return address;
}

function getCapPrimaryContactName(capIDModel) {
	var capContactResult = aa.cap.getCapPrimaryContact(capIDModel);
	var contactName = "";
	if (capContactResult.getSuccess()) {
		var capContact = capContactResult.getOutput();
		if (capContact != null) {
			if (capContact.getFirstName() != null) {
				contactName += capContact.getFirstName() + " ";
			}
			if (capContact.getMiddleName() != null) {
				contactName += capContact.getMiddleName() + " ";
			}
			if (capContact.getLastName() != null) {
				contactName += capContact.getLastName();
			}
		}
	}
	return contactName;
}

function getCapType(capIDModel) {
	var capType = "";
	var capScriptModel = aa.cap.getCap(capIDModel.getCapID());
	if (capScriptModel.getSuccess()) {
		capType = capScriptModel.getOutput().getCapType().toString();
	}
	return capType;
}

function getAltID(capIDModel) {
	var altID = "";
	var capScriptModel = aa.cap.getCap(capIDModel.getCapID());
	if (capScriptModel.getSuccess()) {
		altID = capScriptModel.getOutput().getCapModel().getAltID();
	}
	return altID;
}
//Judge the user passed the exam or not.
function isPass(examModel) {
	var gradeingStyle = examModel.getGradingStyle().trim();
	var finalScore = examModel.getFinalScore();
	var passScore = examModel.getPassingScore();
	var result = true;
	if ("passfail".equalsIgnoreCase(gradeingStyle) && passScore == null) {
		if (finalScore < 1.0) {
			result = false;
		}
	} else if (!"none".equalsIgnoreCase(gradeingStyle) && finalScore < passScore) {
		result = false;
	}
	return result;
}

function getPassingScore(examModel) {
	var passingScore;
	var passScore = examModel.getPassingScore();
	var gradeingStyle = examModel.getGradingStyle().trim();
	if ("score".equalsIgnoreCase(gradeingStyle)) {
		passingScore = passScore;
	} else if ("percentage".equalsIgnoreCase(gradeingStyle)) {
		passingScore = passScore + "%";
	} else if ("passfail".equalsIgnoreCase(gradeingStyle)) {
		passingScore = "Pass";
	} else {
		passingScore = "";
	}
	return passingScore;
}

//get contact primary person email address by roster ID.
function getEmailbyRosterID(capIDModel) {
	var capContactResult = aa.cap.getCapPrimaryContact(capIDModel);
	if (capContactResult.getSuccess()) {
		var capContact = capContactResult.getOutput();
		if (capContact != null && capContact.getPeople() != null && capContact.getPeople().getEmail()) {
			return capContact.getPeople().getEmail();
		}
	}
	return "";
}

function setExamNameAndProviderName(eventID) {
	var examMapResult = aa.examination.getExamNameAndProviderName(eventID);
	if (examMapResult.getSuccess()) {
		var examMap = examMapResult.getOutput();
		examName = examMap.get("examName");
		providerName = examMap.get("providerName");
		aa.env.setValue("examName", examName);
		aa.env.setValue("providerName", providerName);
	}
}


//Add value to map.
function addParameter(pamaremeters, key, value) {
	if (key != null) {
		if (value == null) {
			value = "";
		}

		pamaremeters.put(key, value);
	}
}
aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "Update scores successful");
main();