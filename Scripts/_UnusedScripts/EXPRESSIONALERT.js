/*
	Program: expressionAlert.js
	Trigger: Expression Builder
	Client: CCVA
	Input Parameters: alertMessage - string
	
 */

var showDebug = false; // set to true to see debug messages in popup window
var br = "<BR>";

var alertMessage = "";

alertMessage += aa.env.getValue("alertMessage");

aa.env.setValue("ScriptReturnMessage", alertMessage);
aa.env.setValue("ScriptReturnCode", "1");