//var myCapId = "20170103-00001"; 
//var myCapId = "17PR0005"; 
//var myCapId = "17CP0007";
//var myCapId = "17ES0003";
var myCapId = "ELE2017-00002";
var myUserId = "DOMINGO";

eventName = "";
/* ASA  */ var eventName = "ApplicationSubmitAfter";
/* ASIUA */ //var eventName = "ApplicationSpecificInfoUpdateAfter";
/* WTUA */  //var eventName = "WorkflowTaskUpdateAfter";  wfTask = "Plan Revisions";	  wfStatus = "Ready to Issue";  wfDateMMDDYYYY = "08/31/2016";
/* IRSA */  //var eventName = "InspectionResultSubmitAfter" ; inspResult = "Pass"; inspResultComment = "Comment";  inspType = "Check Job Status"
/* ISA  */  //var eventName = "InspectionScheduleAfter" ; inspType = "Roofing"
/* PRA  */  //var eventName = "PaymentReceiveAfter";  
/* FAB  */  //var eventName = "FeeAssessBefore"; FeeItemsList = new java.lang.String("[CC-BLD-G-002|CC-BLD-G-003|CC-BLD-G-004|CC-BLD-G-005]"); FeeItemsQuantityList = new java.lang.String("[1|1|1|1]"); NumberOfFeeItems = 4;
var useProductScript = false;  // set to true to use the "productized" master scripts (events->master scripts), false to use scripts from (events->scripts)
var runEvent = true; // set to true to simulate the event and run all std choices/scripts for the record type.  

/* master script code don't touch */ aa.env.setValue("EventName",eventName); var vEventName = eventName;  var controlString = eventName;  var tmpID = aa.cap.getCapID(myCapId).getOutput(); if(tmpID != null){aa.env.setValue("PermitId1",tmpID.getID1()); 	aa.env.setValue("PermitId2",tmpID.getID2()); 	aa.env.setValue("PermitId3",tmpID.getID3());} aa.env.setValue("CurrentUserID",myUserId); var preExecute = "PreExecuteForAfterEvents";var documentOnly = false;var SCRIPT_VERSION = 3.0;var useSA = false;var SA = null;var SAScript = null;var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS","SUPER_AGENCY_FOR_EMSE"); if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") { 	useSA = true; 		SA = bzr.getOutput().getDescription();	bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS","SUPER_AGENCY_INCLUDE_SCRIPT"); 	if (bzr.getSuccess()) { SAScript = bzr.getOutput().getDescription(); }	}if (SA) {	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",SA,useProductScript));	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",SA,useProductScript));	/* force for script test*/ showDebug = true; eval(getScriptText(SAScript,SA,useProductScript));	}else {	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",null,useProductScript));	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",null,useProductScript));	}	eval(getScriptText("INCLUDES_CUSTOM",null,useProductScript));if (documentOnly) {	doStandardChoiceActions2(controlString,false,0);	aa.env.setValue("ScriptReturnCode", "0");	aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");	aa.abortScript();	}var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX",vEventName);var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";var doStdChoices = true;  var doScripts = false;var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice ).getOutput().size() > 0;if (bzr) {	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice ,"STD_CHOICE");	doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice ,"SCRIPT");	doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";	}	function getScriptText(vScriptName, servProvCode, useProductScripts) {	if (!servProvCode)  servProvCode = aa.getServiceProviderCode();	vScriptName = vScriptName.toUpperCase();	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();	try {		if (useProductScripts) {			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);		} else {			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");		}		return emseScript.getScriptText() + "";	} catch (err) {		return "";	}}logGlobals(AInfo); if (runEvent && typeof(doStandardChoiceActions) == "function" && doStdChoices) try {doStandardChoiceActions(controlString,true,0); } catch (err) { logDebug(err.message) } if (runEvent && typeof(doScriptActions) == "function" && doScripts) doScriptActions(); var z = debug.replace(/<BR>/g,"\r");  aa.print(z); 

//
// User code goes here
//
//

// fix the logDebug issue.
var original_func = logDebug;

logDebug = function(dstr) {
    aa.print(dstr);
    return original_func(dstr);
}

try {
        // FeeItemsList = new java.lang.String("[CC-BLD-001]"); 
        // FeeItemsQuantityList = new java.lang.String("[1]"); 
        // NumberOfFeeItems = 1;
		showDebug = true;
		// aa.print("Application Expiration Date: " + dateAdd(fileDate,180));
		// aa.print("Balance due: " + balanceDue);
		// aa.print("Balance due: " + currencyFormat(balanceDue));
		//aa.sendMail("noreply-accela@accela.com", "ddejesus@razavi.com", "", "Results", "emailText");
        // if (appMatch("Planning/RightofWay/NA/NA")) {
        //     aa.print("Calculating...");
        //     var dueDays = 10;
        //     var taskList = new Array("Airport", "Assessor", "Budget", "Building Inspection", "County Library", "Department of Transportation",
        //         "Economic Development", "Environmental Engineering", "Fire and Life Safety", "GIS/IST", "GIS-EDM Utilities", "Police", "School Board", "Schools Research and Planning",
        //         "Utilities", "VA Department of Transportation", "COMCAST", "General Services", "Risk Management", "Department of Health", "Parks and Recreation", "Verizon",
        //         "Right of Way");
        //     calcWFTDueDate(taskList, dueDays, fileDate, true);
        // }    
        // 

        //documentScripts();
        //getEnvValues();
        // var feesArray = loadFees();
        // var feeItemsArray = new Array;
        // for (f in feesArray) {
        //     var fee = feesArray[f];
        //     feeItemsArray.push(fee.code.toString());
        // }
        // documentObject(feeItemsArray);

        // for (i in feeItemsArray) {
        //     aa.print(feeItemsArray[i]);
        // }
        //feeAssess2();
        //documentObject(sysDate, true);
        //calcFee_CC_LU_ZC_CC_LU_ZC_03();

        // logDebug("<m"+"eta charset='utf-8'>");
        // logDebug("<m"+"eta name='viewport' content='width=device-width, initial-scale=1'>");
        // logDebug("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>");
        // logDebug("<s" + "cript src='https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>");
        // logDebug("<s" + "cript src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>");
        // logDebug("<div class='container'>");
        // logDebug("<h1>Bootstrap Section</h1>");
        // logDebug("<div class='row'>");
        // logDebug("<div class='col-sm-4' style='background-color:lavender;''>");
        // logDebug("<a href='#'>Skip to main content</a>");
        // logDebug("</div>");
        // logDebug("<div class='col-sm-8'>");
        // logDebug("<p>More text here.</p>");
        // logDebug("</div>");
        // logDebug("</div>");
        // 
        // var ctl = aa.cap.getCapTypeList(null).getOutput();
        // for (i in ctl) {
        //     documentObject(ctl[i]);
        // }
 
        // documentObject(systemUserObj);
        // aa.print("currentUser rate: " + systemUserObj.getRate1()); 

        // var UserID = "DDEJESUS";
        // var systemUserObjResult = aa.person.getUser(UserID.toUpperCase());

        // if (systemUserObjResult.getSuccess()) {
        //     var systemUserObj = systemUserObjResult.getOutput();
        //     //documentObject(systemUserObj);
        //     //for(x in systemUserObj)
        //     //aa.print("systemUserObj:" + x);

        //     aa.print("Assigned User Full Name:" + systemUserObj.getFullName());
        //     aa.print("getBillingRate:" + systemUserObj.getRate1());
        //     aa.print("class " + systemUserObj.class);

        // }

        //documentObject(aa.finance, true);
        
        // var tree = new Tree();
        // for (var i = 0; i < 10; i++) {
        //     tree.addValue(Math.floor((Math.random() * 100) + 1));
        // }
        // tree.traverse();

	}
catch (err) {
	aa.print("A JavaScript Error occured: " + err.message);
	}
// end user code
//aa.env.setValue("ScriptReturnCode", "1"); 	aa.env.setValue("ScriptReturnMessage", debug)
//
//

function getEnvValues() {
    var k = aa.env.getParamValues();
    var em = k.keys();
    aa.print("Environment values: \r\n");

    while (em.hasMoreElements()) {
        var key = em.nextElement();
        var value = k.get(key);
        aa.print(key + " = " + value + "\r\n");
    }
}


function isInArray(array, search) {
    return array.indexOf(search) >= 0;
}

function documentScripts() {
    try {
        var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
        //documentObject(emseBiz, true);
        var scriptList = emseBiz.getScriptNameListByServProvCode(aa.getServiceProviderCode());
        if (scriptList) {
            for (var i in scriptList[0]) {
                var scriptObject = scriptList[0][i];
                aa.print("//------------------- Start of " + scriptObject.toUpperCase() + " ---------------------------");
                documentScript(scriptObject);
                aa.print("//------------------ End of " + scriptObject.toUpperCase() + " ---------------------------\n");
            }
        }
        //var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
    } catch(err) {
        aa.print("A JavaScript Error occured: " + err.message);
    }
}

function documentScript(scriptName) {
    var scriptText = getScriptText(scriptName, aa.getServiceProviderCode(), useProductScript);
    aa.print(scriptText);
}

function documentBizDomain(bizType) {
    try {
        var b = aa.proxyInvoker.newInstance("com.accela.aa.aamain.systemConfig.BizDomainBusiness").getOutput()
        bl = b.getRBizDomains(aa.getServiceProviderCode()).toArray();

        for (i in bl) {
            if (bl[i].getType() && bl[i].getType().equals(bizType)) {
                aa.print(bl[i].getType() + " " + bl[i].getBizDomain().replace(":", ";").replace("/", "!").replace("*", "~"));
                var bizDomScriptResult = aa.bizDomain.getBizDomain(bl[i].getBizDomain());
                if (bizDomScriptResult.getSuccess()) {
                    bizDomScriptArray = bizDomScriptResult.getOutput().toArray();
                    //documentObject(bizDomScriptArray[0]);
                    for (var i in bizDomScriptArray) {
                        if (bizDomScriptArray[i].getDescription()) {
                            aa.print(bizDomScriptArray[i].getBizdomainValue() + " " + bizDomScriptArray[i].getDescription());
                        }
                    }
                }
            }
        }
    } catch(err) {
        aa.print("A JavaScript Error occured: " + err.message);
    }
}

function getScriptAction(strControl)
    {
    var actArray = new Array();
    var maxLength = String("" + maxEntries).length;
    
    var bizDomScriptResult = aa.bizDomain.getBizDomain(strControl);
    
    if (bizDomScriptResult.getSuccess())
        {
        bizDomScriptArray = bizDomScriptResult.getOutput().toArray()
        
        for (var i in bizDomScriptArray)
            {
            // this list is sorted the same as the UI, no reason to re-sort
            
            var myObj= new pairObj(bizDomScriptArray[i].getBizdomainValue());
            myObj.load(bizDomScriptArray[i].getDescription());
            if (bizDomScriptArray[i].getAuditStatus() == 'I') myObj.enabled = false;
            actArray.push(myObj);
            }
        }
    
    return actArray;
    }


function documentObject(obj, showFunctions) {
    if (!showFunctions) showFunctions = false;
    aa.print("Object:" + obj.toString());
    aa.print("Property| Type| Value");
    for (var property in obj) {
        if (!showFunctions) {
            if (!getType(obj[property]).toString().toLowerCase().equals("function"))
                aa.print(property + "|" + getType(obj[property]) + "|\"" + obj[property] + "\"");
        } else {
            aa.print(property + "|" + getType(obj[property]) + "|\"" + obj[property] + "\"");
        }
    }
}

function getType(obj) {
    if (obj === null) return "[object Null]"; // special case
    //if(obj instanceof javaobject) return obj.getClass();
    return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
}

function currencyFormat (num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

// function logDebug(dstr) {
//     if (showDebug) {
//         aa.print(dstr)
//             //emailText += dstr + "<br>";
//             //aa.debug(aa.getServiceProviderCode() + " : " + aa.env.getValue("CurrentUserID"), dstr);
//     }
// }

