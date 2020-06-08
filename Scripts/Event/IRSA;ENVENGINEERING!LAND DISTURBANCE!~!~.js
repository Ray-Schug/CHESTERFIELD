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
if (inspType.equals("VSMP")) {
	var newCapId = createChild("EnvEngineering","ESC Notice to Comply","NA","NA","");
	var sCapId = capId; // save current capId.
	capId = newCapId; // use child capId
	scheduleInspection("Follow-up",7,currentUserID,null,"Auto Scheduled");
	capId = sCapId; // restore capId.
} else if(matches(inspResult,"Not Approved","Rain Not Approved")) {
	var newCapId = createChild("EnvEngineering","ESC Notice to Comply","NA","NA","");
	var sCapId = capId; // save current capId.
	capId = newCapId; // use child capId
	scheduleInspection("Follow-up",7,currentUserID,null,"Auto Scheduled");
	capId = sCapId; // restore capId.
} 