/*
*
* CRCA;BUILDING!PEMIT!~!RENEWAL.js
*
*/

logDebug("Building Permit Renewal begin.");
aa.cap.updateAccessByACA(capId, "Y");

aa.runScript("CONVERTTOREALCAPAFTER4RENEW");

logDebug("Building Permit Renewal end.");

