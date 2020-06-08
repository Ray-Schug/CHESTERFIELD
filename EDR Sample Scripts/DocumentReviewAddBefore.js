aa.print("DocumentReviewAddBefore/After Start");

var mailFrom	= 'Auto_Sender@Accela.com';
var mailCC = 'jacob.lu@achievo.com';

var entityAssociationModels = aa.env.getValue("DocumentReviewModels");
if(entityAssociationModels != null)
{
	aa.print("DocumentReviewModels Length is:"+entityAssociationModels.size());
	var it = entityAssociationModels.iterator();
	while(it.hasNext())
	{
		var model = it.next();
		aa.print("Task ID			=:" + model.getResID());
		aa.print("Document ID		=:" + model.getDocumentID());
		aa.print("Department		=:" + model.getEntityID());
		aa.print("User ID		=:" + model.getEntityID1());
		aa.print("Workflow Task ID		=:" + model.getEntityID2());
		aa.print("Workflow Task Step Number		=:" + model.getEntityID3());
		aa.print("Assign Pages		=:" + model.getTaskReviewPages());
		aa.print("Assign Comments	=:" + model.getTaskReviewComments());
		
		var userID = model.getEntityID1();
		if(userID && userID !='' && userID !=null)
		{
			sendEmailByUserID(userID);
		}
		else if(model.getEntityID() && model.getEntityID()!='' &&model.getEntityID()!=null )
		{
			sendEmailByDeptName(model.getEntityID());

		}
	 }	 
}
else
{
	  aa.print("ERROR: Cannot find the parameter 'DocumentReviewModels'.");
}

aa.env.setValue("ScriptReturnCode","0");
aa.env.setValue("ScriptReturnMessage", "DocumentReviewAddBefore/After  End");

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
		var templateName = "DOCUMENT_REVIEW_ADD_BEFORE";
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
	var model = entityAssociationModels.get(0);
	var id1 = model.getID1();
	var id2 = model.getID2();
	var id3 = model.getID3();
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