var myCapId = "LDP20-0005";
var myUserId = "RSCHUG";

/* ASA  */  var eventName = "ApplicationSubmitAfter";
/* CTRCA */  //var eventName = "ConvertToRealCapAfter";
/* WTUA */  //var eventName = "WorkflowTaskUpdateAfter";  wfTask = "Fees Pending";	  wfStatus = "Issue License";  wfDateMMDDYYYY = "01/27/2015";
/* IRSA */  var eventName = "InspectionResultSubmitAfter" ; inspResult = "Failed"; inspResultComment = "Comment";  inspType = "Roofing"
/* ISA  */  //var eventName = "InspectionScheduleAfter" ; inspType = "Roofing"
/* PRA  */  //var eventName = "PaymentReceiveBefore";

var useProductInclude = true; //  set to true to use the "productized" include file (events->custom script), false to use scripts from (events->scripts)
var useProductScript = false;  // set to true to use the "productized" master scripts (events->master scripts), false to use scripts from (events->scripts)
var runEvent = true; // set to true to simulate the event and run all std choices/scripts for the record type.

/* master script code don't touch */ aa.env.setValue("EventName",eventName); var vEventName = eventName;  var controlString = eventName;  var tmpID = aa.cap.getCapID(myCapId).getOutput(); if(tmpID != null){aa.env.setValue("PermitId1",tmpID.getID1()); 	aa.env.setValue("PermitId2",tmpID.getID2()); 	aa.env.setValue("PermitId3",tmpID.getID3());} aa.env.setValue("CurrentUserID",myUserId); var preExecute = "PreExecuteForAfterEvents";var documentOnly = false;var SCRIPT_VERSION = 3.0;var useSA = false;var SA = null;var SAScript = null;var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS","SUPER_AGENCY_FOR_EMSE"); if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") { 	useSA = true; 		SA = bzr.getOutput().getDescription();	bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS","SUPER_AGENCY_INCLUDE_SCRIPT"); 	if (bzr.getSuccess()) { SAScript = bzr.getOutput().getDescription(); }	}if (SA) {	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",SA,useProductScript));	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",SA,useProductScript));	/* force for script test*/ showDebug = true; eval(getScriptText(SAScript,SA,useProductScript));	}else {	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",null,useProductScript));	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",null,useProductScript));	}	eval(getScriptText("INCLUDES_CUSTOM",null,useProductInclude));if (documentOnly) {	doStandardChoiceActions2(controlString,false,0);	aa.env.setValue("ScriptReturnCode", "0");	aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");	aa.abortScript();	} var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX",vEventName);var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";var doStdChoices = true;  var doScripts = false;var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice ).getOutput().size() > 0;if (bzr) {	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice ,"STD_CHOICE");	doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice ,"SCRIPT");	doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";	}	function getScriptText(vScriptName, servProvCode, useProductScripts) {	if (!servProvCode)  servProvCode = aa.getServiceProviderCode();	vScriptName = vScriptName.toUpperCase();	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();	try {		if (useProductScripts) {			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);		} else {			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");		}		return emseScript.getScriptText() + "";	} catch (err) {		return "";	}}logGlobals(AInfo); 

if (true) { // Override Standard Functions
	logDebug("=====");
	// var publicUserModelResult = aa.publicUser.getPublicUserByPUser(publicUserID); var publicUserEmail = ((publicUserModelResult.getSuccess() || !publicUserModelResult.getOutput()) ? publicUserModelResult.getOutput().getEmail() : ""); logDebug("publicUserEmail: " + publicUserEmail);
	var publicUserEmail = null;
	if (publicUser) {
		var publicUserModelResult = aa.publicUser.getPublicUserByPUser(publicUserID);
		if (!publicUserModelResult.getSuccess() || !publicUserModelResult.getOutput()) {
			var publicUserObj = null;
			logDebug("**WARNING** couldn't find public user " + publicUserID + " " + publicUserModelResult.getErrorMessage());
		} else {
			var publicUserObj = publicUserModelResult.getOutput();
			var userSeqNum = publicUserModelResult.getOutput().getUserSeqNum();
			var publicUserEmail = publicUserObj.getEmail();
			if (publicUserEmail == "") publicUserEmail = null;
		}
		logDebug("publicUserEmail: " + publicUserEmail + " for " + publicUserID);
	}
	logDebug("=====");
	logDebug("Overriding functions...");
	logDebug("=====");

	// Set Font colors for EMSE Standard Choice.
	stdChoiceCriteriaBeginTrue = "<font color=Blue>";
	stdChoiceCriteriaEndTrue = "</font>";
	stdChoiceCriteriaBeginFalse = "<font color=LightBlue>";
	stdChoiceCriteriaEndFalse = "</font>"
	stdChoiceActionBegin = "<font color=BlueViolet>";
	stdChoiceActionEnd = "</font>"
	stdChoiceDisabledBegin = "<font color=LightGray>";
	stdChoiceDisabledEnd = "</font>"
	stdChoiceDisabledBegin = ""; // Do not display disabled standard choices.
	stdChoiceDisabledBegin = "";

	function doStandardChoiceActions(stdChoiceEntry, doExecution, docIndent) {
		var thisDate = new Date();
		var thisTime = thisDate.getTime();
		var lastEvalTrue = false;
		stopBranch = false; // must be global scope
		logDebug("Executing : " + stdChoiceEntry + "," + doExecution + "," + docIndent + ", Elapsed Time: " + ((thisTime - startTime) / 1000) + " Seconds (Override)")
		var pairObjArray = getScriptAction(stdChoiceEntry);
		if (!doExecution) docWrite(stdChoiceEntry, true, docIndent);
		try {
			for (xx in pairObjArray) {
				doObj = pairObjArray[xx];
				if (doExecution) {
					if (doObj.enabled) {
						if (stopBranch) {
							stopBranch = false;
							break;
						}
						try {
							stdChoiceCriteriaBegin = stdChoiceCriteriaBeginFalse
							stdChoiceCriteriaEnd = stdChoiceCriteriaEndFalse
							if (eval(token(doObj.cri)) || (lastEvalTrue && doObj.continuation)) {
								stdChoiceCriteriaBegin = stdChoiceCriteriaBeginTrue
								stdChoiceCriteriaEnd = stdChoiceCriteriaEndTrue
							}
							logDebug(aa.env.getValue("CurrentUserID") + " : " + stdChoiceEntry + " : #" + doObj.ID + " : Criteria : " + stdChoiceCriteriaBegin + doObj.cri + stdChoiceCriteriaEnd, 2)
							if (eval(token(doObj.cri)) || (lastEvalTrue && doObj.continuation)) {
								logDebug(aa.env.getValue("CurrentUserID") + " : " + stdChoiceEntry + " : #" + doObj.ID + " : Action : " + stdChoiceActionBegin + doObj.act + stdChoiceActionEnd, 2)
								eval(token(doObj.act));
								lastEvalTrue = true;
							} else {
								if (doObj.elseact) {
									logDebug(aa.env.getValue("CurrentUserID") + " : " + stdChoiceEntry + " : #" + doObj.ID + " : Else : " + stdChoiceActionBegin + doObj.elseact + stdChoiceActionEnd, 2)
									eval(token(doObj.elseact));
								}
								lastEvalTrue = false;
							}
						} catch (err) {
							showDebug = 3;
							logDebug("**ERROR** An error occured in the following standard choice " + stdChoiceEntry + "#" + doObj.ID + "  Error:  " + err.message);
						}
					} else if (stdChoiceDisabledBegin != "") { // Disabled
						logDebug(stdChoiceDisabledBegin + aa.env.getValue("CurrentUserID") + " : " + stdChoiceEntry + " : #" + doObj.ID + " : <DISABLED> : " + doObj.cri + stdChoiceDisabledEnd, 2)
					}
				} else // just document
				{
					docWrite("|  ", false, docIndent);
					var disableString = "";
					if (!doObj.enabled) disableString = "<DISABLED>";
					if (doObj.elseact)
						docWrite("|  " + doObj.ID + " " + disableString + " " + doObj.cri + " ^ " + doObj.act + " ^ " + doObj.elseact, false, docIndent);
					else
						docWrite("|  " + doObj.ID + " " + disableString + " " + doObj.cri + " ^ " + doObj.act, false, docIndent);
					for (yy in doObj.branch) {
						doStandardChoiceActions(doObj.branch[yy], false, docIndent + 1);
					}
				}
			} // next sAction
			if (!doExecution) docWrite(null, true, docIndent);
		} catch (err) {
			showDebug = 3;
			var context = "doStandardChoiceActions (" + stdChoiceEntry + ")";
			logDebug("**ERROR** An error occured in " + context + " Line " + err.lineNumber + " Error:  " + err.message);
			logDebug("Stack: " + err.stack);
		}
		var thisDate = new Date();
		var thisTime = thisDate.getTime();
		logDebug("Finished: " + stdChoiceEntry + ", Elapsed Time: " + ((thisTime - startTime) / 1000) + " Seconds")
	}

	function doScriptActions() {
		var showDebug = 3;
		logDebug("Overriding doScriptActions() from INCLUDES_ACCELA_FUNCTIONS with Debug Email Version");
		try {
			include(prefix + ":" + "*/*/*/*");
			if (typeof (appTypeArray) == "object") {
				include(prefix + ":" + appTypeArray[0] + "/*/*/*");
				include(prefix + ":" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
				include(prefix + ":" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
				include(prefix + ":" + appTypeArray[0] + "/*/" + appTypeArray[2] + "/*");
				include(prefix + ":" + appTypeArray[0] + "/*/" + appTypeArray[2] + "/" + appTypeArray[3]);
				include(prefix + ":" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
				include(prefix + ":" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
				include(prefix + ":" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/" + appTypeArray[3]);
			}
		} catch (err) {
			showDebug = 3;
			var context = "doScriptActions (include)";
			logDebug("**ERROR** An error occured in " + context + " Line " + err.lineNumber + " Error:  " + err.message);
			logDebug("Stack: " + err.stack);
		}

		// Send Debug Email
		try {
			if (typeof (debugEmailTo) == "undefined") {
				debugEmailTo = "";
			}
			if (typeof (controlString) == "undefined") {
				controlString = "";
			}
			if (debugEmailTo != "") {
				var environment = (typeof (envName) == "undefined" ? "" : (envName == "PROD" ? "" : envName));
				var reportPopup = (showMessage && message.indexOf("/portlets/reports/reportShow.do?") >= 0); // Report Popup in message?
				var debugError = (debug.indexOf("**" + "ERROR") > 0); // Error in debug?
				var capIDMsg = (typeof (capIDString) == "undefined" ? "" : capIDString + " ") + (typeof (capId) == "undefined" ? "" : capId + " ");
				logDebug("showMessage (" + showMessage + ") " + (reportPopup ? " with Report Popup" : "") + " " + message.replace("/portlets/reports/reportShow.do?", "").split("**" + "ERROR").join("** ERROR"));
				logDebug("debug (" + showDebug + ") " + (debugError ? " with ERROR" : "") + ", debugEmailTo: " + debugEmailTo);
				result = aa.sendMail(sysFromEmail, debugEmailTo, "", environment + " DEBUG: " + capIDMsg + controlString + (debugError ? " - Failed" : ""), debug);
				if (result.getSuccess()) {
					logDebug(environment + " DEBUG Email sent to " + debugEmailTo);
					if (reportPopup && !debugError) {
						showDebug = false;
						aa.print(String("===== DEBUG =====<BR>" + debug).replace(/<BR>/g, "\r"));
					} // Allow Popup to show so showDebug must be false;
					if (publicUser && !debugError) {
						showDebug = false;
					} // Don't display debug message in ACA unless ERROR. So debug does prevent page from advancing.
				} else {
					logDebug("Failed to send DEBUG Email to " + debugEmailTo);
				}
				if (debugError) showDebug = true;
			}
		} catch (err) {
			showDebug = 3;
			var context = "doScriptActions (sendDebugEmail)";
			logDebug("ERROR: An error occured in " + context + " Line " + err.lineNumber + " Error:  " + err.message);
			logDebug("Stack: " + err.stack);
		}
	}

function logDebug(dstr) {
	if (typeof(debug) == "undefined") debug = "";
	if (typeof(br) == "undefined") br = "<BR>";						// Break Tag
	if (typeof (formatErrorB) == "undefined") formatErrorB = "";
	if (typeof (formatErrorE) == "undefined") formatErrorE = "";
	if (typeof (lastErrorMsg) == "undefined") lastErrorMsg = "";
	var formatErrB = "";
	var formatErrE = "";
	dstr = "" + dstr;
	if (String(dstr).indexOf("ERROR:") >= 0) {
		formatErrB = formatErrorB;
		formatErrE = formatErrorE;
		aa.print(dstr);
		dstr = formatErrB + dstr + formatErrE;
		lastErrorMsg += dstr + br;
	}
	vLevel = 1
	if (arguments.length > 1)
		vLevel = arguments[1];
	if ((showDebug & vLevel) == vLevel || vLevel == 1)
		debug += dstr + br;
	if ((showDebug & vLevel) == vLevel)
		aa.debug(aa.getServiceProviderCode() + " : " + aa.env.getValue("CurrentUserID"), dstr);
}

function scheduleInspection(iType,DaysAhead) // optional inspector ID.  This function requires dateAdd function
	{
	// DQ - Added Optional 4th parameter inspTime Valid format is HH12:MIAM or AM (SR5110) 
	// DQ - Added Optional 5th parameter inspComm ex. to call without specifying other options params scheduleInspection("Type",5,null,null,"Schedule Comment");
	var inspectorObj = null;
	var inspTime = null;
	var inspComm = "Scheduled via Script";
	if (arguments.length >= 3) 
		if (arguments[2] != null)
		{
		var inspRes = aa.person.getUser(arguments[2])
		if (inspRes.getSuccess())
			var inspectorObj = inspRes.getOutput();
		}

	if (arguments.length >= 4)
	    if (arguments[3] != null)
		    inspTime = arguments[3];
	
	if (arguments.length == 5)
	    if (arguments[4] != null)
	        inspComm = arguments[4];

	logDebug("scheduleInspection: capId: " + capId + ", inspector: " + inspectorObj + ", date: " + dateAdd(null,DaysAhead) 
		+ ", time: " + inspType + ", type: " + iType + ", comment: " + inspComm);
	var schedRes = aa.inspection.scheduleInspection(capId, inspectorObj, aa.date.parseDate(dateAdd(null,DaysAhead)), inspTime, iType, inspComm)
	
	if (schedRes.getSuccess())
		logDebug("Successfully scheduled inspection : " + iType + " for " + dateAdd(null,DaysAhead));
	else
		logDebug( "**ERROR: adding scheduling inspection (" + iType + "): " + schedRes.getErrorMessage());
	}
}

if (runEvent && typeof(doStandardChoiceActions) == "function" && doStdChoices) try {doStandardChoiceActions(controlString,true,0); } catch (err) { logDebug(err.message) } 
if (runEvent && typeof(doScriptActions) == "function" && doScripts) doScriptActions(); 

//
// User code goes here
//

if (false) {
function createLP(rlpId, rlpType) {
	var itemCap = (arguments.length > 2 && arguments[2]? arguments[2]:capId);
	var lpBoard = (arguments.length > 3 && arguments[3]? arguments[3]:null);
	var lpExpirDate = (arguments.length > 4 && arguments[4]? arguments[4]:null);
	var lpFirstName = (arguments.length > 5 && arguments[5]? arguments[5]:null);
	var lpMiddleName = (arguments.length > 6 && arguments[6]? arguments[6]:null);
	var lpLastName = (arguments.length > 7 && arguments[7]? arguments[7]:null);
	var lpBusName = (arguments.length > 8 && arguments[8]? arguments[8]:null);
	var lpAddrLine1 = (arguments.length > 9 && arguments[9]? arguments[9]:null);
	var lpAddrLine2 = (arguments.length > 10 && arguments[10]? arguments[10]:null);
	var lpAddrLine3 = (arguments.length > 11 && arguments[11]? arguments[11]:null);
	var lpAddrCity = (arguments.length > 12 && arguments[12]? arguments[12]:null);
	var lpAddrState = (arguments.length > 13 && arguments[13]? arguments[12]:null);
	var lpAddrZip = (arguments.length > 14 && arguments[14]? arguments[14]:null);
	var lpPhone1 = (arguments.length > 15 && arguments[15]? arguments[15]:null);
	var lpPhone2 = (arguments.length > 16 && arguments[16]? arguments[16]:null);
	var lpEmail = (arguments.length > 17 && arguments[17]? arguments[17]:null);
	var lpFax = (arguments.length > 18 && arguments[18]? arguments[18]:null);
	
	// Get Ref LP Object
	var rlpObj = new licenseProfObject(rlpId,rlpType);
	// 
	if (rlpObj && !rlpObj.capLicProfScriptModel) {
		var useRefLP = rlpObj.copyToRecord(capId,false); // copy from reference LP
		if (itemCap){
			var capLicenseArr = null;
			var capLicenseResult = aa.licenseScript.getLicenseProf(itemCap);
			if (capLicenseResult.getSuccess())
				{ capLicenseArr = capLicenseResult.getOutput();  }
			else
				{ logDebug("**ERROR: getting lic prof: " + capLicenseResult.getErrorMessage()); return false; }


			if (!capLicenseArr || capLicenseArr.length == 0) {
				logDebug("WARNING: no license professional available on the application:");
			}

			var capLPModel = null;
			if (capLicenseArr && capLicenseArr.length > 0) {
				for (var capLic in capLicenseArr) {
					var lpsm = capLicenseArr[capLic];
					if (lpsm && lpsm.getLicenseNbr() + "" == rlpId && lpsm.getLicenseType() + "" == rlpType) {
						capLPModel = lpsm;
						rlpObj.capLicProfScriptModel = lpsm;
					}
				}
			}
		}
	}
	// if CAP LP exists?, Skip. otherwise create CAP from parameters.
	if (rlpObj && rlpObj.capLicProfScriptModel) {
		vPrimary = "Y";
		vPrimary = (vPrimary || vPrimary == "Y"? "Y" : "N");
		if (rlpObj.setPrimary) {
			rlpObj.setPrimary(itemCap,"Y");		// make primary
		} else {
			//Get the LP from the Record
			var capLicenseResult = aa.licenseProfessional.getLicenseProf(itemCap);
			var capLicenseArr = new Array();
			var existing = false;
			if (capLicenseResult.getSuccess()) {
				capLicenseArr = capLicenseResult.getOutput();
			}

			// Make primary LP for CAP
			if (capLicenseArr != null) {
				for (capLic in capLicenseArr) {
					var lpsm = capLicenseArr[capLic];
					if (lpsm.getLicenseNbr() + "" == rlpId && lpsm.getLicenseType() + "" == rlpType && lpsm.getPrintFlag() != vPrimary) {
							lpsm.setPrintFlag(vPrimary);
							aa.licenseProfessional.editLicensedProfessional(lpsm);
					}
				}
			}
		}
		logDebug("Using exising LP Type: " + rlpType + ",  Nbr: " + rlpId);
		return true;
	} else {
		var newLic = aa.licenseProfessional.getLicenseProfessionScriptModel().getOutput();
		newLic.setAgencyCode(aa.getServiceProviderCode());
		newLic.setAuditDate(sysDate);
		newLic.setAuditID(currentUserID);
		newLic.setAuditStatus("A");

		newLic.setLicenseType(rlpType);
		newLic.setLicenseNbr(rlpId);
		newLic.setCapID(itemCap); 
		if (lpBoard) 		newLic.setLicenseBoard(lpBoard); //default the state if none was provided
		if (lpExpirDate)	newLic.setLicenseExpirDate(lpExpirDate);
		newLic.setPrintFlag("Y"); 			// Set Primary
		newLic.setSerDes("Description");	// Required

		if (lpFirstName)	newLic.setContactFirstName(lpFirstName);
		if (lpMiddleName && newLic.setContactMiddleName)	newLic.setContactMiddleName(lpMiddleName); 	//method may not available
		if (lpLastName)		newLic.setContactLastName(lpLastName);
		if (lpBusName)		newLic.setBusinessName(lpBusName);
		if (lpAddrLine1)	newLic.setAddress1(lpAddrLine1);
		if (lpAddrLine2)	newLic.setAddress2(lpAddrLine2);
		if (lpAddrLine3)	newLic.setAddress3(lpAddrLine3);
		if (lpAddrCity)		newLic.setCity(lpAddrCity);
		if (lpAddrState)	newLic.setState(lpAddrState);
		if (lpAddrZip)		newLic.setZip(lpAddrZip);
		if (lpPhone1)		newLic.setPhone1(lpPhone1);
		if (lpPhone2)		newLic.setPhone2(lpPhone2);
		if (lpEmail)		newLic.setEMailAddress(lpEmail);
		if (lpFax)			newLic.setFax(lpFax);

		var s_Result = aa.licenseProfessional.createLicensedProfessional(newLic);
		// var s_Result = aa.licenseScript.createRefLicenseProf(newLic);
		if (s_Result.getSuccess()) {
			logDebug("Successfully added License Type: " + rlpType + ",  Nbr: " + rlpId);
			return true;
		} else {
			logDebug("**ERROR: can't added License Type: " + rlpType + ",  Nbr: " + rlpId + " Reason: " + s_Result.getErrorMessage());
			return false;
		}
	}
	return false;
}
}

function getLicenseProf() {
	var licProfTypes = (arguments.length > 0 && arguments[0]? arguments[0]:null);
	var licProfIds = (arguments.length > 1 && arguments[1]? arguments[1]:null);
	var itemCap = (arguments.length > 2 && arguments[2]? arguments[2]:capId);

	var capLicenseResult = aa.licenseScript.getLicenseProf(itemCap);
	if (!capLicenseResult.getSuccess())
	{ logDebug("**ERROR: getting lic prof: " + capLicenseResult.getErrorMessage()); return false; }
	var capLicenseArr = capLicenseResult.getOutput();
	if (!capLicenseArr)
	{ logDebug("WARNING: no license professional available on the application:"); return false; }
	
	var capLicArr = [];
	for (capLic in capLicenseArr) {
		var lpsm = capLicenseArr[capLic];
		if (licProfTypes && !exists(lpsm.getLicenseType() + "",licProfTypes)) continue;
		if (licProfIds &&  !exists(lpsm.getLicenseNbr() + "",licProfIds)) continue;
		logDebug("Found License Professional with Type: " + lpsm.getLicenseType() + ", Nbr: " + lpsm.getLicenseNbr()
		+ (lpsm.getContactFirstName() || lpsm.getContactLastName()? ", Name:" + (lpsm.getContactFirstName()? " " + lpsm.getContactFirstName():"") + (lpsm.getContactLastName()? " " + lpsm.getContactLastName():""):"")
		+ (lpsm.getBusinessName()? ", BusName: " + lpsm.getBusinessName():""));
//		logDebug("lpsm: " + describe_TPS(lpsm));
		capLicArr.push(lpsm); //Found Licensed Prof of specified type and/or #
	}

	if (capLicArr.length > 0) return capLicArr;
	return false;
}

function wasCapStatus() {
	var capStatusArray = arguments.length > 0 && arguments[0]? arguments[0]:capId;
	var itemCap = arguments.length > 1 && arguments[1]? arguments[1]:capId;

	var lastCapStatus = null;
	var capStatuses = [];
	
	var capStatusResult = aa.cap.getStatusHistoryByCap(itemCap, "APPLICATION", null);
	if(!capStatusResult.getSuccess()) { 
        logDebug("ERROR: Failed to get cap status history for CAPID(" + itemCap + "). " + getCapStatus.getErrorMessage());
		return false;
    }

	var capStatuses= capStatusResult.getOutput();
	for (i in capStatuses) {
		var capStatus = capStatuses[i].getStatus();
		var capStatusDate = capStatuses[i].getStatusDate();
		logDebug("Checking " + capStatus + " " + convertDate(capStatusDate));
		if (capStatuses && !exists(capStatus, capStatuses)) continue;
		logDebug("Found " + capStatus + " " + convertDate(capStatusDate));
		return true;
	}
	
	return false;
}


try {
	showDebug = true;
	var wfTask = 'Permit Issuance'; wfStatus = 'Issued';
	var inspType = "VSMP", inspResult = "Not Approved";

//If Inspection Result is 'Approved', 'Rain Approved', 'Not Approved' or 'Rain Not Approved' then schedule another Inspection Type a certain amount of days out per Inspection Type.//
if(matches(inspResult,"Approved","Rain Approved","Not Approved","Rain Not Approved") && inspType.equals("E and SC")){
scheduleInspection("E and SC",14,currentUserID,null,"Auto Scheduled");
	}
if(matches(inspResult,"Approved","Rain Approved","Not Approved","Rain Not Approved") && inspType.equals("Undisturbed")){
scheduleInspection("Undisturbed",14,currentUserID,null,"Auto Scheduled");
	}
if(matches(inspResult,"Approved","Rain Approved","Not Approved","Rain Not Approved") && inspType.equals("Timbering Only")){
scheduleInspection("Timbering Only",168,currentUserID,null,"Auto Scheduled");
	}
if(matches(inspResult,"Approved","Rain Approved","Not Approved","Rain Not Approved") && inspType.equals("Perimeter Control Installation")){
scheduleInspection("Perimeter Control Installation",14,currentUserID,null,"Auto Scheduled");
	}
if(matches(inspResult,"Approved","Rain Approved","Not Approved","Rain Not Approved") && inspType.equals("Clearing and Grubbing")){
scheduleInspection("Clearing and Grubbing",14,currentUserID,null,"Auto Scheduled");
	}
if(matches(inspResult,"Approved","Rain Approved","Not Approved","Rain Not Approved") && inspType.equals("Rough Grading")){
scheduleInspection("Rough Grading",14,currentUserID,null,"Auto Scheduled");
	}
if(matches(inspResult,"Approved","Rain Approved","Not Approved","Rain Not Approved") && inspType.equals("Finished Grading")){
scheduleInspection("Finished Grading",14,currentUserID,null,"Auto Scheduled");
	}
if(matches(inspResult,"Approved","Rain Approved","Not Approved","Rain Not Approved") && inspType.equals("Final Stabilization")){
scheduleInspection("Final Stabilization",28,currentUserID,null,"Auto Scheduled");
	}
if(matches(inspResult,"Approved","Rain Approved","Not Approved","Rain Not Approved") && inspType.equals("Stabilized and Inactive")){
scheduleInspection("Stabilized and Inactive",168,currentUserID,null,"Auto Scheduled");
	}
if(matches(inspResult,"Approved","Rain Approved","Not Approved","Rain Not Approved") && inspType.equals("One Year Maintenance")){
scheduleInspection("One Year Maintenance",300,currentUserID,null,"Auto Scheduled");
	}
if(matches(inspResult,"Approved","Rain Approved","Not Approved","Rain Not Approved") && inspType.equals("VSMP")){
//	scheduleInspect(itemCap,iType,DaysAhead,inspectorID,inspTime,inspComment)
//	scheduleInspection(iType,DaysAhead,inspector,inspTime,inspComment)
	scheduleInspection("VSMP",90,currentUserID,null,"Auto Scheduled");
}
//If Inspection Result is 'One Year Maintenance' then schedule another One Year Maintenance Inspection Type and update Workflow Task of 'Inspections' to One Year Maintenance.//
if(matches(inspResult,"One Year Maintenance")){
scheduleInspection("One Year Maintenance",300,currentUserID,null,"Auto Scheduled");
	updateTask("Inspections","One Year Maintenance","Updated based on One Year Maintenance Inspection Result","");
	}
//If Inspection Result is 'Stabilized and Inactive' then schedule another Stabilized and Inactive Inspection Type and update Workflow Task of 'Inspections' to Stabilized and Inactive.//
if (matches(inspResult,"Stabilized and Inactive")){
scheduleInspection("Stabilized and Inactive",168,currentUserID,null,"Auto Scheduled");
	updateTask("Inspections","Stabilized and Inactive","Updated based on Stabilized and Inactive Inspection Result","");
	}
//If Inspection Result is 'Final Stabilization' then schedule another Final Stabilization Inspection Type and update Workflow Task of 'Inspections' to Final Stabilization.//
if (matches(inspResult,"Final Stabilization")){
scheduleInspection("Final Stabilization",28,currentUserID,null,"Auto Scheduled");
	updateTask("Inspections","Final Stabilization","Updated based on Final Stabilization Inspection Result","");
	}
//If Inspection Result is 'Finished Grading' then schedule another Finished Grading Inspection Type and update Workflow Task of 'Inspections' to Finished Grading.//
if (matches(inspResult,"Finished Grading")){
scheduleInspection("Finished Grading",14,currentUserID,null,"Auto Scheduled");
	updateTask("Inspections","Finished Grading","Updated based on Finished Grading Inspection Result","");
	}
//If Inspection Result is 'Rough Grading' then schedule another Rough Grading Inspection Type and update Workflow Task of 'Inspections' to Rough Grading.//
if (matches(inspResult,"Rough Grading")){
scheduleInspection("Rough Grading",14,currentUserID,null,"Auto Scheduled");
	updateTask("Inspections","Rough Grading","Updated based on Rough Grading Inspection Result","");
	}
//If Inspection Result is 'Clearing and Grubbing' then schedule another Clearing and Grubbing Inspection Type and update Workflow Task of 'Inspections' to Clearing and Grubbing.//
if (matches(inspResult,"Clearing and Grubbing")){
scheduleInspection("Clearing and Grubbing",14,currentUserID,null,"Auto Scheduled");
	updateTask("Inspections","Clearing and Grubbing","Updated based on Clearing and Grubbing Inspection Result","");
	}
//If Inspection Result is 'Perimeter Control Installation' then schedule another Perimeter Control Installation Inspection Type and update Workflow Task of 'Inspections' to Perimeter Control Installation.//
if (inspResult.equals("Perimeter Control Installation")){
scheduleInspection("Perimeter Control Installation",14,currentUserID,null,"Auto Scheduled");
	updateTask("Inspections","Perimeter Control Installation","Updated based on Perimeter Control Installation Inspection Result","");
	}
//If Inspection Result is 'Timbering Only' then schedule another Timbering Only Inspection Type and update Workflow Task of 'Inspections' to Timbering Only.//
if (inspResult.equals("Timbering Only")){
scheduleInspection("Timbering Only",168,currentUserID,null,"Auto Scheduled");
	updateTask("Inspections","Timbering Only","Updated based on Timbering Only Inspection Result","");
	}
//If Inspection Result is 'Undisturbed' then schedule another Undisturbed Inspection Type and update Workflow Task of 'Inspections' to Undisturbed//
if (inspResult.equals("Undisturbed")){
scheduleInspection("Undisturbed",14,currentUserID,null,"Auto Scheduled based on Undisturbed Inspection Result");
	updateTask("Inspections","Undisturbed","Updated based on Undisturbed Inspection Result","");
	}
//If Inspection Result is 'Pending Closure' then schedule another Pending Closure Inspection Type 56 calendar days out.//
if (matches(inspResult,"Pending Closure")){
scheduleInspection("Pending Closure",56,currentUserID,null,"Auto Scheduled");
	}
//If Inspection Result is 'Completed' then schedule another Pending Closure Inspection Type 56 calendar days out and Close Inspections Workflow Task.//
if (matches(inspResult,"Completed")){
scheduleInspection("Pending Closure",56,currentUserID,null,"Auto Scheduled");
	closeTask("Inspections","Completed","Updated based on Completed Inspection Result","");
	}
//If Inspection Result is 'Not Approved' or "Rain Not Approved" and not an VSMP then create an ESC Notice to Comply child record AND schedule a Follow-up inspection on the ESC Notice to Comply child record with a scheduled date 7 days from system date.
if(!inspType.equals("VSMP")){
	var newCapId = createChild("EnvEngineering","ESC Notice to Comply","NA","NA","");
	var sCapId = capId; // save current capId.
	capId = newCapId; // use child capId
	scheduleInspection("Follow-up",7,currentUserID,null,"Auto Scheduled");
	capId = sCapId; // restore capId.
} else if(matches(inspResult,"Not Approved","Rain Not Approved")){
	var newCapId = createChild("EnvEngineering","ESC Notice to Comply","NA","NA","");
	var sCapId = capId; // save current capId.
	capId = newCapId; // use child capId
	scheduleInspection("Follow-up",7,currentUserID,null,"Auto Scheduled");
	capId = sCapId; // restore capId.
}
} catch (err) {
	logDebug("A JavaScript Error occured: " + err.message + " at line " + err.lineNumber + " stack: "+ err.stack);
}
// end user code
var z = debug.replace(/<BR>/g,"\r");  aa.print(z);

aa.env.setValue("ScriptReturnCode", "0"); 	aa.env.setValue("ScriptReturnMessage", debug)

function describe_TPS(obj) {
	// Modified from describe to also include typeof & class of object; seperate Properties from Functions; Sort them; additional arguments.
	var newLine = "\n";
	var newLine = br;
	var newLine = "<BR>";
	var ret = "";
	var oType = null;
	var oNameRegEx = /(^set.*$)/; // find set functions
	var oNameRegEx = /(^get.*$)/; // find get functions
	var oNameRegEx = null;
	var verbose = false;
	if (arguments.length > 1) oType = arguments[1];
	if (arguments.length > 2) oNameRegEx = arguments[2];
	if (arguments.length > 3) verbose = arguments[3];
	if (obj == null) {
		ret += ": null";
		return ret;
	}
	try {
		ret += "typeof(): " + typeof (obj) + (obj && obj.getClass ? ", class: " + obj.getClass() : "") + newLine;
		var oPropArray = new Array();
		var oFuncArray = new Array();
		if (oType == null) oType = "*";
		for (var i in obj) {
			if (oNameRegEx && !oNameRegEx.test(i)) { continue; }
			if ((oType == "*" || oType == "function") && typeof (obj[i]) == "function") {
				oFuncArray.push(i);
			} else if ((oType == "*" || oType == "property") && typeof (obj[i]) != "function") {
				oPropArray.push(i);
			}
		}
		// List Properties
		oPropArray.sort();
		for (var i in oPropArray) {
			n = oPropArray[i];
			oValue = obj[n];
			if (oValue && oValue.getClass) {
//				logDebug(n + " " + oValue.getClass());
				if (oValue.getClass().toString().equals("class com.accela.aa.emse.dom.ScriptDateTime")) oValue += " " + (new Date(oValue.getEpochMilliseconds()));
				if (oValue.getClass().toString().equals("class com.accela.aa.emse.util.ScriptDateTime")) oValue += " " + (new Date(oValue.getEpochMilliseconds()));
				// if (oValue.getClass().toString().equals("class java.util.Date")) oValue += " " + convertDate(oValue);
			}
			ret += "property:" + n + " = " + oValue + newLine;
		}
		// List Functions
		oFuncArray.sort();
		for (var i in oFuncArray) {
			n = oFuncArray[i];
			oDef = String(obj[n]).replace("\n", " ").replace("\r", " ").replace(String.fromCharCode(10), " ").replace(String.fromCharCode(10), " ")
			x = oDef.indexOf(n + "()", n.length + 15);
			if (x > 15) x = x + n.length + 1;
			oName = (verbose ? oDef : "function:" + n + "()");                              // Include full definition of function if verbose
			oValue = ((n.toString().indexOf("get") == 0 && x > 0) ? obj[n]() : "");  // Get function value if "Get" function and no parameters.
			if (oValue && oValue.getClass) {
//				logDebug(n + " " + oValue.getClass());
				if (oValue.getClass().toString().equals("class com.accela.aa.emse.dom.ScriptDateTime")) oValue += " " + (new Date(oValue.getEpochMilliseconds()));
				if (oValue.getClass().toString().equals("class com.accela.aa.emse.util.ScriptDateTime")) oValue += " " + (new Date(oValue.getEpochMilliseconds()));
				// if (oValue.getClass().toString().equals("class java.util.Date")) oValue += " " + convertDate(oValue);
			}
			ret += oName + " = " + oValue + newLine;
		}
	} catch (err) {
		logDebug("Error in describe_TPS() at line " + err.lineNumber + " : " + err.message);
		logDebug("Stack: " + err.stack);
	}
	return ret;
}


function ownerExistsOnCap() {
	// Optional parameter, cap ID to load from
	var itemCap = (arguments.length> 0 && arguments[0]? arguments[0]:capId); // use cap ID if specified in args
	var primaryFlag = (arguments.length> 1 && arguments[1] == true? true:null); // Check if primary owner

	var capOwnerResult = aa.owner.getOwnerByCapId(itemCap);
	if (!capOwnerResult.getSuccess())
	{ logDebug("**ERROR: Failed to get Owner object: " + capOwnerResult.getErrorMessage()); return false; }
	var owner = capOwnerResult.getOutput();
	for (o in owner) {
		thisOwner = owner[o];
		if (owner[o] == null) continue;
		if (primaryFlag && owner[o].getPrimaryOwner() == "Y") {
			return true;
		} else if (primaryFlag == null) {
			return true;
		}
	}

	return false;

}

//check if target CAP has address
function addressExistsOnCap() {
	// Optional parameter, cap ID to load from
	//

	var itemCap = capId;
	if (arguments.length == 1)
		itemCap = arguments[0]; // use cap ID specified in args

	var fcapAddressObj = null;
	var capAddResult = aa.address.getAddressByCapId(itemCap);
	if (capAddResult.getSuccess())
		var fcapAddressObj = capAddResult.getOutput();
	else {
		logDebug("**ERROR: Failed to get Address object: " + capAddResult.getErrorType() + ":" + capAddResult.getErrorMessage());
		return false;
	}

	for (i in fcapAddressObj) {
		return true;
	}

	return false;
}

//check if target CAP has parcel
function parcelExistsOnCap()
{
	// Optional parameter, cap ID to load from
	//

	var itemCap = capId;
	if (arguments.length == 1) itemCap = arguments[0]; // use cap ID specified in args

	var fcapParcelObj = null;
	var capParcelResult = aa.parcel.getParcelandAttribute(itemCap, null);
	if (capParcelResult.getSuccess())
		var fcapParcelObj = capParcelResult.getOutput().toArray();
	else
		{ logDebug("**ERROR: Failed to get Parcel object: " + capParcelResult.getErrorType() + ":" + capParcelResult.getErrorMessage()); return false; }

	for (i in fcapParcelObj)
	{
		return true;
	}

	return false;
}

function lookup(stdChoice,stdValue) 
	{
	var strControl;
	var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice,stdValue);
	
   	if (bizDomScriptResult.getSuccess())
   		{
		var bizDomScriptObj = bizDomScriptResult.getOutput();
		strControl = "" + bizDomScriptObj.getDescription(); // had to do this or it bombs.  who knows why?
		logDebug("lookup(" + stdChoice + "," + stdValue + ") = " + strControl);
		}
	else
		{
		logDebug("lookup(" + stdChoice + "," + stdValue + ") does not exist");
		}
	return strControl;
	}

function logDebug(dstr) {
	if (typeof(debug) == "undefined") debug = "";
	if (typeof(br) == "undefined") br = "<BR>";						// Break Tag
	if (typeof(showDebug) == "undefined") showDebug = false;		// Break Tag
	if (typeof (formatErrorB) == "undefined") formatErrorB = "";
	if (typeof (formatErrorE) == "undefined") formatErrorE = "";
	if (typeof (lastErrorMsg) == "undefined") lastErrorMsg = "";
	var formatErrB = "";
	var formatErrE = "";
	dstr = "" + dstr;
	if (String(dstr).indexOf("ERROR:") >= 0) {
		formatErrB = formatErrorB;
		formatErrE = formatErrorE;
		aa.print(dstr);
		dstr = formatErrB + dstr + formatErrE;
		lastErrorMsg += dstr + br;
	}
	vLevel = 1
	if (arguments.length > 1)
		vLevel = arguments[1];
	if ((showDebug & vLevel) == vLevel || vLevel == 1)
		debug += dstr + br;
	if ((showDebug & vLevel) == vLevel)
		aa.debug(aa.getServiceProviderCode() + " : " + aa.env.getValue("CurrentUserID"), dstr);
}

