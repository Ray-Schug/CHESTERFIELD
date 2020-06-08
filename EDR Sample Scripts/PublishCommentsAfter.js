var documentID= aa.env.getValue("DocumentID");
var documentModel =aa.env.getValue("DocumentModel");
var associationModel= aa.env.getValue("DocumentEntityAssociationModel");
var callerId = aa.getAuditID();
var taskItemModel = null;
var mailFrom = "Auto_Sender@Accela.com";
var mailCC = "jacob.lu@achievo.com";

if(associationModel != null && associationModel != "")
{
	var processId = associationModel.getEntityID2()
	var stepNbr = associationModel.getEntityID3();
	var result = aa.document.getTaskItemModel();
	if (result.getSuccess())
	{
		taskItemModel = result.getOutput();
		taskItemModel.setProcessID(processId);
		taskItemModel.setStepNumber(stepNbr);
	}
}

//notice reviewers.
noticeReviewers();

//update status of review Tasks.
updateStatusOfMyReviewTasks();

//prohibit To-be Resubmit
disableToBeResubmit();

/*
 * disable toBeResubmit flag of the checked-in document
 */
function disableToBeResubmit()
{
	//get current document model by documentID
	var adsDocumentModel = aa.document.getDocumentByPK(documentID).getOutput();
	
	if ("RESUBMIT".equals(adsDocumentModel.getCategoryByAction()))
	{
		//get parent seq number
		var checkInDocumentId = adsDocumentModel.getParentSeqNbr();
		if(checkInDocumentId != null || !"".equals(checkInDocumentId))
		{
			//get check-in document by documentID
			var checkInDocument = aa.document.getDocumentByPK(checkInDocumentId).getOutput();
			
			//set original check-in document model's resubmit is false
			checkInDocument.setResubmit(false);
			
			//update original check-in document model
			aa.document.updateDocument(checkInDocument);
		}
	}
	
	
}

/*
 * noticecation reviewers
 */
function noticeReviewers()
{
	var result = aa.document.getRelatedReviewers(documentID, taskItemModel);
	if(result.getSuccess())
	{
		var reviewers = result.getOutput();
		// send email to reviewers for every document
		if (reviewers != null && reviewers.size() > 0)
		{
			for (var j = 0; j < reviewers.size(); j++)
			{
				var userId = reviewers.get(j).getEntityID1();
	
				if(userId != null && userId != "" && !callerId.equals(userId))
				{		
					// use user id to get the user info and get the user email.
					var reviewerResult = aa.people.getSysUserByID(userId);
					if(reviewerResult.getSuccess())
					{
						reviewer = reviewerResult.getOutput();
						var emailTo = reviewer.getEmail();
						if(emailTo != null)
						{				
							var templateName = "PUBLISH";
							//get cap model
							var capScriptModel = aa.cap.getCap(getCapID().getCapID()).getOutput();
							//get publish template params
							var publishParams = getParamsForPublish(documentModel, capScriptModel.getCapModel(), reviewer);
							sendNotification(emailTo, templateName, publishParams, null);
						}
					}
				}
			}
		}
		aa.env.setValue("ScriptReturnMessage", "Notice reviewers successfully.");
		aa.env.setValue("ScriptReturnCode", "0");
	}
	else
	{
		aa.print("ERROR: Failed to get associate reviewers: " + result.getErrorMessage());
	}
}

/*
 * update review status
 */
function updateStatusOfMyReviewTasks()
{
	//get review tasks 
	var result = aa.document.getRelatedReviewers(documentID, taskItemModel);
	
	if(result.getSuccess())
	{
		var reviewTasks = result.getOutput();
		if (reviewTasks != null && reviewTasks.size() > 0)
		{
			//get sysUserModel by callerId
			var sysUserModel = aa.people.getSysUserByID(callerId).getOutput();
			//get department
			var department = sysUserModel.getDeptOfUser();
		
			for (var j = 0; j < reviewTasks.size(); j++)
			{
				var reviewTask = reviewTasks.get(j);
				//check the review task is assign to current user or current department. 
				if (callerId.equals(reviewTask.getEntityID1()) 
				 || (department.equals(reviewTask.getEntityID()) && reviewTask.getEntityID1() == null ))
				{
					//set review status as "reviewed"
					reviewTask.setStatus("reviewed");
					//update review task
					var updateResult = aa.document.updateReviewTask(reviewTask);
					if(updateResult.getSuccess())
					{
						aa.log("update status of my review tasks successfully!");
					}
					else
					{
						aa.log("Fail to update status of my review tasks.");
					}
				}
			}
		}
		aa.env.setValue("ScriptReturnMessage", "update status of my review tasks successfully.");
		aa.env.setValue("ScriptReturnCode", "0");
	}
	else
	{
		aa.print("ERROR: Failed to get review tasks: " + result.getErrorMessage());
	}
}

/*
 * get params for resubmit
 */
function getParamsForPublish(docModel, capModel, reviewer)
{
	// use user id to get the user info and get the user Full Name.
	var reviewerResult = aa.people.getSysUserByID(callerId).getOutput();

	var params = aa.util.newHashtable();
	addParameter(params, "$$documentName$$", docModel.getName());
	addParameter(params, "$$reviewersName$$", getPeopleFullName(reviewer));
	addParameter(params, "$$reviewerName$$", getPeopleFullName(reviewerResult));
	addParameter(params, "$$alternateID$$", capModel.getAltID());
	addParameter(params, "$$recordType$$", capModel.getAppTypeAlias());
	return params;
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
    var id1 = documentModel.getID1();
	var id2 = documentModel.getID2();
	var id3 = documentModel.getID3();
    return aa.cap.createCapIDScriptModel(id1, id2, id3);
}

/*
 * Get full name from PeopleModel.
 */
function getPeopleFullName(people) {
    var emptyString = /^\s*$/;
    var result = '';

    if (people != null) {
        result = people.getFullName();

        if (!result || emptyString.test(result)) {
            var firstName = people.getFirstName();
            var middleName = people.getMiddleName();
            var lastName = people.getLastName();

            if (firstName && !emptyString.test(firstName)) {
                result = firstName;
            }

            if (middleName && !emptyString.test(middleName)) {
                if (result && !emptyString.test(result)) {
                    result += ' ';
                }

                result += middleName;
            }

            if (lastName && !emptyString.test(lastName)) {
                if (result && !emptyString.test(result)) {
                    result += ' ';
                }

                result += lastName;
            }
        }
    }

    return result;
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


  