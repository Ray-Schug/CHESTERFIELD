aa.print("DocumentReviewUpdateAfter Start");

var mailFrom = 'kelvin.qin@achievo.com';
var mailCC = "jacob.lu@achievo.com";
var subject		= 'You have edit the review info for the document';
var emailContent	= 'This is an automated email notification to edit assign info for your Review task.  Please do not reply to this email.';

var model = aa.env.getValue("DocumentReviewModel");
var originalModel = aa.env.getValue("OriginalDocumentReviewModel");
if(model != null)
{
	aa.print("ID			=:" + model.getResID()			+" <-> original ID:"+originalModel.getResID());
	aa.print("Document ID		=:" + model.getDocumentID()		+" <-> original ID:"+originalModel.getDocumentID());
	aa.print("Entity Type		=:" + model.getEntityType()		+" <-> original ID:"+originalModel.getEntityType());
	aa.print("Entity ID		=:" + model.getEntityID()		+" <-> original ID:"+originalModel.getEntityID());
	aa.print("User ID		=:" + model.getEntityID1()		+" <-> original ID:"+originalModel.getEntityID1());
	aa.print("Process ID		=:" + model.getEntityID2()		+" <-> original ID:"+originalModel.getEntityID2());
	aa.print("Step Number		=:" + model.getEntityID3()		+" <-> original ID:"+originalModel.getEntityID3());
	aa.print("Assign Pages		=:" + model.getTaskReviewPages()	+" <-> original ID:"+originalModel.getTaskReviewPages());
	aa.print("Assign Comments	=:" + model.getTaskReviewComments()	+" <-> original ID:"+originalModel.getTaskReviewComments());

	var userID = model.getEntityID1();
	if(userID && userID !='')
	{
		sendEmailByUserID(userID);
	}
	else if(model.getEntityID() && model.getEntityID()!='')
	{
		sendEmailByDeptName(model.getEntityID());

	}

	var originalModel = aa.env.getValue("OriginalDocumentReviewModel");
	var userID = originalModel.getEntityID1();
	if(userID && userID !='')
	{
		sendEmailByUserID(userID);
	}
	else if(originalModel.getEntityID() && originalModel.getEntityID()!='')
	{
		sendEmailByDeptName(originalModel.getEntityID());

	}
}
else
{
	  aa.print("ERROR: Cannot find the parameter 'DocumentReviewModel'.");
}

aa.env.setValue("ScriptReturnCode","0");
aa.env.setValue("ScriptReturnMessage", "DocumentReviewUpdateAfter End");


/*
 * Send email by usre ID
 */
function sendEmailByUserID(userID)
{

	var peopleScriptModel = aa.people.getSysUserByID(userID);
	if(peopleScriptModel.getSuccess())
	{
		var sysUserModel = peopleScriptModel.getOutput();
		sendEmailByUserModel(sysUserModel);
	}
	else
	{
		
		aa.print("Can't get current user model by ID!");
	}
}

/*
 * Send email by Department name
 */
function sendEmailByDeptName(deptName)
{

	var peopleScriptModel = aa.people.getSysUserListByDepartmentName(deptName);
	if(peopleScriptModel.getSuccess())
	{
		var sysUserModels = peopleScriptModel.getOutput();
		for(var i = 0;i<sysUserModels.length;i++ )
		{
			var sysUserModel = sysUserModels[i];
			sendEmailByUserModel(sysUserModel);
		}
	}
	else
	{
		
		aa.print("Not any user(s) under the Department!");
	}
}


/*
 * Send email by SysUserModel
 */
function sendEmailByUserModel(sysUserModel)
{
	if(sysUserModel && sysUserModel.getEmail() != '' && sysUserModel.getEmail() !=null)
	{
		var templateName = "DOCUMENT_REVIEW_UPDATE_AFTER";
		sendNotification(sysUserModel.getEmail(), templateName, null, null);
	}
	else
	{
		
		aa.print("It have not set up any email address for current user!");
	}

}


/*
 * add parameter
 */
function addParameter(pamaremeters, key, value)
{
	if(key != null)
	{
		if(value == null)
		{
			value = "";
		}
		pamaremeters.put(key, value);
	}
}

function getCapID()
{
	var id1 = originalModel.getID1();
	var id2 = originalModel.getID2();
	var id3 = originalModel.getID3();
	return aa.cap.createCapIDScriptModel(id1, id2, id3);
}

/*
 * Send notification
 */
function sendNotification(userEmailTo,templateName,params,reportFile)
{
	var result = null;
	result = aa.document.sendEmailAndSaveAsDocument(mailFrom, userEmailTo, mailCC, templateName, params, getCapID(), reportFile);
	if(result.getSuccess())
	{
		aa.log("Send email successfully!");
		return true;
	}
	else
	{
		aa.log("Fail to send mail.");
		return false;
	}
}
