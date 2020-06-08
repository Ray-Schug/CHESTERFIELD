var servProvCode = aa.env.getValue("ServiceProviderCode");
var capId = getCapId(); // CapId object
var capType = aa.env.getValue("RecordType").toString();
var checkInDocuments = aa.env.getValue("CheckedinDocuments");
var altID = aa.env.getValue("AlternateID");
var capStatus = aa.env.getValue("CapStatus");
var year = aa.date.getCurrentDate().getYear();
var month = aa.date.getCurrentDate().getMonth();
var day = aa.date.getCurrentDate().getDayOfMonth();
var currentDate = month + "/" + day + "/" + year;
var sysDate = aa.date.getCurrentDate();
var currentDate = dateFormatted(sysDate.getMonth(), sysDate.getDayOfMonth(), sysDate.getYear(), "");
var error = "";
var message = "";
var br = "<br>";

/*------------------------------------------------------------------------------------------------------/
| END Event Specific Variables
/------------------------------------------------------------------------------------------------------*/
var checkedinFileName = '';
var docSeqNbr = '';
var firstName = '';
var middleName = '';
var lastName = '';
var planReview = "Plan Review";
var needCorrection = "Need Corrections";
var wfObj = aa.workflow.getTasks(capId).getOutput();
var stepnumber;
var processID;
var workflowTaskStatus = capStatus;

aa.print("RecordType			=:" + capType);
aa.print("ServiceProviderCode  =:" + servProvCode);
aa.print("Alt ID  =:" + altID);
aa.print("CapStatus  =:" + capStatus);
aa.print("PreviousDocID  =:" + aa.env.getValue("PreviousDocID"));


/*------------update original document status by previours document id-------------------------*/
var previousDocID = aa.env.getValue("PreviousDocID").toString();
var result = aa.document.getDocumentByPK(previousDocID);
if (result.getSuccess()) {
	var orgDocModel = result.getOutput();
	if (orgDocModel != null) {
		orgDocModel.setDocStatus("");
		aa.document.updateDocument(orgDocModel);

	}
}


/*-------------get checked in document name.........................*/

if (checkInDocuments != null && checkInDocuments.length > 0) {
	for (var i = 0; i < checkInDocuments.length; i++) {
		var documentModel = checkInDocuments[i];
		docSeqNbr = documentModel.getDocumentNo();
		checkedinFileName = documentModel.getFileName();
	}
}

/*------------------------------------------------------------------------------------------------------/
| update the current workflow task Plan Review to Need Corrections
/------------------------------------------------------------------------------------------------------*/
for (i in wfObj) {
	fTask = wfObj[i];
	//complete the "Plan Review" task
	if (planReview.equals(fTask.getTaskDescription())) {
		aa.print("Complete the task: Plan Review");
		stepnumber = fTask.getStepNumber();
		processID = fTask.getProcessID();
		aa.workflow.adjustTask(capId, stepnumber, processID, "N", "Y", null, null);
	}
	if (needCorrection.equals(fTask.getTaskDescription())) {
		aa.print("Active the task: Need Corrections");
		stepnumber = fTask.getStepNumber();
		processID = fTask.getProcessID();
		aa.workflow.adjustTask(capId, stepnumber, processID, "Y", "N", null, null);
	}
}


/*------------------------------------------------------------------------------------------------------/
| send email to applicant
/------------------------------------------------------------------------------------------------------*/
var capContactResult = aa.people.getCapContactByCapID(capId);
if (capContactResult.getSuccess()) {
	var email = '';
	var primaryFlag = '';
	var Contacts = capContactResult.getOutput();
	for (var contactIdx in Contacts) {
		primaryFlag = Contacts[contactIdx].getCapContactModel().getPrimaryFlag();
		email = Contacts[contactIdx].getCapContactModel().getEmail();
		firstName = Contacts[contactIdx].getCapContactModel().getFirstName();
		middleName = Contacts[contactIdx].getCapContactModel().getMiddleName();
		lastName = Contacts[contactIdx].getCapContactModel().getLastName();
		if ('Y' == primaryFlag) {
			if (email != '') {
				break;
			}
		}
	}
}
var host = "https://10.50.70.35:5443";
var documentLink = host + "/portlets/document/documentReviewCommentsList.do?mode=list&entityType=CAP&from=CAP&docSeqNbr=" + docSeqNbr;

var mailFrom = "shell.wang@achievo.com";
var mailCC = "Cindy.q@beyondsoft.com";

var subject = "Plan Review Result for your Application " + altID;
var applicant = buildFullName(firstName, middleName, lastName);
sendNotificationEmail(mailFrom, email, mailCC, subject, documentLink, applicant, capType, altID, workflowTaskStatus, checkedinFileName);

function buildFullName(firstName, middleName, lastName) {
	var fullName = "";
	if (firstName && firstName != null) {
		fullName += firstName;
	}
	if (middleName && middleName != null) {
		fullName += " " + middleName
	}
	if (lastName && lastName != null) {
		fullName += " " + lastName
	}
	return fullName;
}

function sendNotificationEmail(from, to, cc, subject, documentLink, applicant, capType, altID, workflowTaskStatus, checkedinFileName) {

	var templateName = "EXTERNALDOCREVIEWCOMPLETED";
	var emailParameters = aa.util.newHashtable();
	addParameter(emailParameters, "$$applicant$$", applicant);
	addParameter(emailParameters, "$$AltID$$", altID);
	addParameter(emailParameters, "$$CapType$$", capType);
	addParameter(emailParameters, "$$workflowTaskStatus$$", workflowTaskStatus);
	addParameter(emailParameters, "$$reviewLink$$", documentLink);
	addParameter(emailParameters, "$$subject$$", subject);

	sendNotification(to, templateName, emailParameters, null);
}

function getCapId() {

	var s_id1 = aa.env.getValue("PermitId1");
	var s_id2 = aa.env.getValue("PermitId2");
	var s_id3 = aa.env.getValue("PermitId3");

	var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);
	if (s_capResult.getSuccess())
		return s_capResult.getOutput();
	else {
		logMessage("**ERROR: Failed to get capId: " + s_capResult.getErrorMessage());
		return null;
	}
}

function dateFormatted(pMonth, pDay, pYear, pFormat) {
	var mth = "";
	var day = "";
	var ret = "";
	if (pMonth > 9)
		mth = pMonth.toString();
	else
		mth = "0" + pMonth.toString();

	if (pDay > 9)
		day = pDay.toString();
	else
		day = "0" + pDay.toString();

	if (pFormat == "YYYY-MM-DD")
		ret = pYear.toString() + "-" + mth + "-" + day;
	else
		ret = "" + mth + "/" + day + "/" + pYear.toString();

	return ret;
}

/*
 * add parameter
 */
function addParameter(pamaremeters, key, value) {
	if (key != null) {
		if (value == null) {
			value = "";
		}
		pamaremeters.put(key, value);
	}
}

/*
 * Send notification
 */
function sendNotification(userEmailTo, templateName, params, reportFile) {
	var result = null;
	result = aa.document.sendEmailAndSaveAsDocument(mailFrom, userEmailTo, mailCC, templateName, params, getCapScriptModel(), reportFile);
	if (result.getSuccess()) {
		aa.log("Send email successfully!");
		return true;
	} else {
		aa.log("Fail to send mail.");
		return false;
	}
}

function getCapScriptModel() {
	var s_id1 = aa.env.getValue("PermitId1");
	var s_id2 = aa.env.getValue("PermitId2");
	var s_id3 = aa.env.getValue("PermitId3");
	return aa.cap.createCapIDScriptModel(s_id1, s_id2, s_id3);
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

function logMessage(str) {
	message += str + br;
}

if (error && error.length > 0) {
	aa.env.setValue("ScriptReturnCode", "1");
	aa.env.setValue("ScriptReturnMessage", error);
} else {
	aa.env.setValue("ScriptReturnCode", "0");
	aa.env.setValue("ScriptReturnMessage", message);
}