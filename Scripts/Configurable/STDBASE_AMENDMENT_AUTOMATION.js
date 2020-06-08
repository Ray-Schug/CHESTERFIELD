/*

Title : Amendment Automation (After) 
Purpose : perform actions related to amendment, on parent and amendment record(s)
Author: Yazan Barghouth 
 
 Functional Area : AV:(After all), ACA: (CTRCA only)
 
 JSON Example : 
{
  "Building/Commercial/Company/amman05": {
    "ConvertToRealCAPAfter": [
      {
      "prescript": "",
        "incrementParentID": true,
        "assignWorkflow": "PAY_REV_Y",
        "feeIncrementStart":2,
        "feeAssess": "Amendment",
        "feeSchedule": "AMMAN05",
        "feeItem": "AMM05-F1",
        "feeQty": "200",
        "deActivateParentTasks": true,
        "activateParentTask": "Received|Pending Inspec. Failed",
        "postScript": ""
      }
    ]
  }
}
 * 
 */

// This should be included in all Configurable Scripts
eval(getScriptText("CONFIGURABLE_SCRIPTS_COMMON"));
var scriptSuffix = "AMENDMENT_AUTOMATION";
try {
	var settingsArray = [];

	if (isConfigurableScript(settingsArray, scriptSuffix)) {

		//not supported in ASA (ACA)
		if (controlString == "ApplicationSubmitAfter" && isPublicUser) {
			//reset settingsArray, this will make script do nothing.
			settingsArray = new Array();
		}

		for (s in settingsArray) {
			var rules = settingsArray[s];

			//Execute PreScript
			var preScript = rules.preScript;
			if (!matches(preScript, null, "")) {
				eval(getScriptText(preScript));
			}

			var parentCapId = getAmendmentParentACAandAV();
			if (parentCapId == null) {
				logDebug("**INFO: could not get Amendment-Parent for " + capId);
				continue;
			}

			var countChilds = 0;
			if (rules.incrementParentID) {
				countChilds = updateAltIdAmendId(parentCapId);
			}

			if (rules.assignWorkflow != "") {
				aa.workflow.deleteAndAssignWorkflow(capId, rules.assignWorkflow, false);
			}

			if (countChilds >= parseInt(rules.feeIncrementStart)) {
				if (rules.feeSchedule != "") {
					var feeItem = rules.feeItem;
					var feeQty = rules.feeQty;
					var feeRecCapId = null;
					if (rules.feeAssess == "Parent") {
						feeRecCapId = parentCapId;
					} else if (rules.feeAssess == "Amendment") {
						feeRecCapId = capId;
					} else {
						logDebug("**INFO -- feeAssess not valid: " + feeAssess);
					}

					if (feeRecCapId != null) {
						addFee(feeItem, rules.feeSchedule, "FINAL", feeQty, "Y", feeRecCapId);
					}
				}//fee sched is set
			}//updatedCount >= feeIncrementStart

			if (rules.deActivateParentTasks) {
				deactivateAllActiveTasks(parentCapId);
			}

			var activateParentTask = rules.activateParentTask;
			if (activateParentTask != "") {
				activateParentTask = activateParentTask.split("|");
				activateTasks(parentCapId, activateParentTask);
			}

			var postScript = rules.postScript;
			if (!matches(postScript, null, "")) {
				eval(getScriptText(postScript));
			}
		}//for all settings
	}//isConf()
} catch (ex) {
	logDebug("**ERROR: Exception while verification the rules for " + scriptSuffix + ". Error: " + ex);
}

/**
 * get parent record capId, works in both AV and ACA(ConvertToRealCapAfter)
 * @returns CapIdModel of parent record
 */
function getAmendmentParentACAandAV() {
	var ret = null;
	if (controlString == "ConvertToRealCAPAfter" && isPublicUser) {
		var sessionParentId = aa.env.getValue("ParentCapID");
		if (sessionParentId == null || sessionParentId == "" || sessionParentId == "." || typeof sessionParentId === 'undefined') {
			return null;
		}
		return sessionParentId;
	} else {
		var recordParents = aa.cap.getProjectByChildCapID(capId, "Amendment", "").getOutput();
		if (recordParents != null && recordParents.length > 0) {
			return recordParents[0].getProjectID();
		} else {
			return null;
		}
	}
}

/**
 * update altId for all children Complete records, of same type as current record.<br/>
 * new altId is parentId concatenated with "-" and a seq number, starts from 1.
 * @param parentCapId parent record CapIdModel
 * @returns {Number} number of Complete children found for parentCapId
 */
function updateAltIdAmendId(parentCapId) {
	currCap = aa.cap.getCap(capId).getOutput();
	currAppType = currCap.getCapType().toString();

	var childsArray = getChildren(currAppType, parentCapId);
	var parentCapModel = aa.cap.getCap(parentCapId);
	if (!parentCapModel.getSuccess()) {
		logDebug("**INFO could not get parent CapModel " + parentCapModel.getErrorMessage());
		//this is a fail, nothing updated, to prevent addFee() (in case feeIncrementStart=0)
		return -1;
	}
	parentCapModel = parentCapModel.getOutput();
	parentCapModel = parentCapModel.getCapModel();
	var parentAltIdPrefix = parentCapModel.getAltID() + "-";

	var childsToUpdate = aa.util.newArrayList();

	var countChildRecords = 0;
	var lastN = 0;
	//find last seq for parentCustomId-n
	for (c in childsArray) {
		var child = childsArray[c];
		var childCapModel = aa.cap.getCap(child).getOutput();

		if (!childCapModel.isCompleteCap()) {
			continue;
		}

		//counts actual child records (skipping NOT Completed records)
		++countChildRecords;

		if (child.getCustomID().startsWith(parentAltIdPrefix)) {
			//get max (last) n from current amendment-IDs and collect childs wih no amendment-ID
			var seq = child.getCustomID().substring(child.getCustomID().lastIndexOf("-") + 1);
			if (isNaN(seq)) {
				continue;
			}
			seq = parseInt(seq);

			if (lastN < seq) {
				lastN = seq;
			}
		} else {
			childsToUpdate.add(child);
		}
	}//for all childs

	//current record (last child) is not included in getChildren() call above when event is CTRCA
	//we need to add it to childsToUpdate list 
	if (controlString == "ConvertToRealCAPAfter" && isPublicUser) {
		childsToUpdate.add(capId);
		++countChildRecords;
	}

	//update childs with no amend-id
	for (var u = 0; u < childsToUpdate.size(); u++) {
		++lastN;
		var newAltId = parentAltIdPrefix + lastN;
		var updateResult = aa.cap.updateCapAltID(childsToUpdate.get(u), newAltId);
		if (!updateResult.getSuccess()) {
			--lastN;//prevent skipping seq
			logDebug("**INFO Updating Child Failed, Error: " + updateResult.getErrorMessage());
		}
	}//for all childs to update
	return countChildRecords;
}

/**
 * activate a task or more for targetCapId
 * @param targetCapId record capId to update
 * @param taskNamesArray array of task names to activate
 * @returns {Boolean} true if success, false otherwise
 */
function activateTasks(targetCapId, taskNamesArray) {
	var tasks = aa.workflow.getTasks(targetCapId);
	if (!tasks.getSuccess()) {
		logDebug("**INFO: Failed to get workflow Tasks: " + tasks.getErrorMessage());
		return false;
	} else {
		tasks = tasks.getOutput();
	}

	for (t in tasks) {
		var task = tasks[t];
		if (arrayContainsValue(taskNamesArray, task.getTaskDescription())) {
			var updteResult = aa.workflow.adjustTask(targetCapId, task.getStepNumber(), "Y", "N", null, null);
			if (updteResult.getSuccess()) {
				logDebug("**INFO: Failed to adjustTask() Task: [" + task.getTaskDescription() + "] error: " + updteResult.getErrorMessage());
			}
		}//task exist
	}
	return true;
}

/**
 * deactivates all active tasks for targetCapId
 * @param targetCapId capIdModel for target record
 * @returns {Boolean} true if success, false otherwise
 */
function deactivateAllActiveTasks(targetCapId) {
	var t = aa.workflow.getTasks(targetCapId);
	if (t.getSuccess())
		wfObj = t.getOutput();
	else {
		logDebug("**INFO: deactivateAllActiveTasks() Failed to get workflow Tasks: " + t.getErrorMessage());
		return false;
	}
	for (i in wfObj) {
		fTask = wfObj[i];
		if (fTask.getActiveFlag().equals("Y")) {
			var deact = aa.workflow.adjustTask(targetCapId, fTask.getStepNumber(), "N", fTask.getCompleteFlag(), null, null);
			if (!deact.getSuccess()) {
				logDebug("**INFO: deactivateAllActiveTasks() Failed " + deact.getErrorMessage());
			}
		}
	}
	return true;
}