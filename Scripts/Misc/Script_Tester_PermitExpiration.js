var myCapId = "20200529-004";
var myUserId = "ADMIN";
var myUserId = "RSCHUG";

/* ASA  */  var eventName = "ApplicationSubmitAfter";
/* CTRCA */  //var eventName = "ConvertToRealCapAfter";
/* WTUA */  //var eventName = "WorkflowTaskUpdateAfter";  wfTask = "Fees Pending";	  wfStatus = "Issue License";  wfDateMMDDYYYY = "01/27/2015";
/* IRSA */  //var eventName = "InspectionResultSubmitAfter" ; inspResult = "Failed"; inspResultComment = "Comment";  inspType = "Roofing"
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
}

if (runEvent && typeof(doStandardChoiceActions) == "function" && doStdChoices) try {doStandardChoiceActions(controlString,true,0); } catch (err) { logDebug(err.message) } 
if (runEvent && typeof(doScriptActions) == "function" && doScripts) doScriptActions(); 

//
// User code goes here
//

try {
	showDebug = true;
	logDebug(">>>>> Starting Custom Code");
// ASA
// Update Permit Expiration Date
logDebug("fileDate: " + new Date(fileDate));
var expField = "Permit Expiration Date";
var expDateNew = jsDateToASIDate(new Date(dateAdd(fileDate,180)));
logDebug("Updating " + expField + " to " + expDateNew);
editAppSpecific(expField, expDateNew);

// WTUA Permit Issuance: Issued
wfTask = "Permit Issuance", wfStatus = "Issued";
if (wfTask == "Permit Issuance" && wfStatus == "Issued") { 
	// Update Permit Expiration Date
	var expField = "Permit Expiration Date";
	var expDateNew = jsDateToASIDate(new Date(dateAdd(null,180)));
	logDebug("Updating " + expField + " to " + expDateNew);
	editAppSpecific(expField, expDateNew);
}

// IRSA
inspResult = "Approved", inspType = "Building Final";
if (exists(inspResult,["Approved","Corrections Required"]) && inspType.indexOf("Final") < 0) { 
	// Update Permit Expiration Date
	var expField = "Permit Expiration Date";
	var expDateNew = jsDateToASIDate(new Date(dateAdd(null,180)));
	logDebug("Updating " + expField + " to " + expDateNew);
	editAppSpecific(expField, expDateNew);
}

if (false) {
	if (!addressExistsOnCap()) {	// Check if address exists
		showMessage = true;
		comment("Missing address");
		cancel = true;
	}
	if (!parcelExistsOnCap()) {	// Check if address exists
		showMessage = true;
		comment("Missing parcel");
		cancel = true;
	}
	if (!ownerExistsOnCap()) {	// Check if address exists
		showMessage = true;
		comment("Missing owner");
		cancel = true;
	}
}

	logDebug(">>>>> Finished Custom Code");
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

