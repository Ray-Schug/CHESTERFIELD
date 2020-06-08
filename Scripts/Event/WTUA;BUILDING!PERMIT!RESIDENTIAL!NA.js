//if (wfTask == "Review Distribution" && wfStatus == "Routed for Review"){
//	deactivateTask("Structural Review");
//	activateTask("Addressing Review");
//	deactivateTask("Budget Review");
//	deactivateTask("Utilities Review");
//	deactivateTask("Environmental Engineering Review");
//}
//if (wfTask == "Application Submittal" && AInfo['Nature of Work'] == "Additions, Porches and Chimney" && (wfStatus == "Accepted - Plan Review Required" || wfStatus == "Accepted - Plan Review Not Required")){
// updateFee("CC_BLD_12","CC-BLD-RESIDENTIAL","FINAL",1,"N");
// updateFee("CC_BLD_02","CC-BLD-RESIDENTIAL","FINAL",1,"N");
// updateFee("CC-BLD-G-001","CC-BLD-GENERAL","FINAL",1,"N");
//}
//if (wfTask == "Review Distribution" && wfStatus == "Routed for Review" && AInfo['Nature of Work'] == "Additions, Porches and Chimney"){
// deactivateTask("Addressing Review");
// deactivateTask("Budget and Management Review");
//deactivateTask("Environmental Engineering Review");
// deactivateTask("Environmental Health Review");
// deactivateTask("Non Structural Review");
//deactivateTask("Planning Review");
//deactivateTask("Structural Review");
// deactivateTask("Transportation Review");
//deactivateTask("Utilities Review");
//}
// 10-13-19 Keith added to create AUX Permits when Building is issued
//if (wfTask == "Permit Issuance" && wfStatus == "Issued"){
//   newChildID = createChild("Building","Permit","Residential","AuxiliaryElectrical",""); copyAppSpecific(newChildID); comment("New Elec Permit app id = "+ newChildID);
//    saveCapId = capId;
//    capId = newChildID;
//    closeTask("Application Submittal","Accepted","Issued as MultiUnit","")
//    closeTask("Permit Issuance","Issued","Issued as MultiUnit","")
//    capId = saveCapId;
//   newChildID = createChild("Building","Permit","Residential","AuxiliaryMechanical",""); copyAppSpecific(newChildID); comment("New Mech Permit app id = "+ newChildID);
//    saveCapId = capId;
//    capId = newChildID;
//    closeTask("Application Submittal","Accepted","Issued as MultiUnit","")
//    closeTask("Permit Issuance","Issued","Issued as MultiUnit","")
//    capId = saveCapId;
//   newChildID = createChild("Building","Permit","Residential","AuxiliaryPlumbing",""); copyAppSpecific(newChildID); comment("New Plum Permit app id = "+ newChildID);
//    saveCapId = capId;
//    capId = newChildID;
//    closeTask("Application Submittal","Accepted","Issued as MultiUnit","")
//    closeTask("Permit Issuance","Issued","Issued as MultiUnit","")
//    capId = saveCapId;
//    }