try {
	logDebug("Entering IRSA:BUILDING/*/*/*");
	var inspBillable = inspObj.getInspection().getActivity().getInspBillable();
	logDebug("Inspection Billable checkbox = " + inspBillable + ". And Inspection Result = " + inspResult);
	
	if (inspBillable == "Y" && matches(inspResult,"Corrections Required")) {
		addFeeWithExtraData("REINSPECTION","CC-BLD-ADMIN","FINAL",1,"Y",capId,inspType+" ("+Math.round(inspTotalTime)+")");
	}
} catch (err) {
    logDebug("A JavaScript Error occurred: " + err.message + " In Line " + err.lineNumber + " of " + err.fileName + " Stack " + err.stack);
}
//If Inspection Result is "Approved" for Inspection Type "Building Final" close the Inspections Workflow Task.//
if (inspType.equals("Building Final") && inspResult.equals("Approved")){
	closeTask("Inspections","CO Ready to Issue","Updated based on Completed Inspection Result","");
	}
//If Inspection Result is "Approved" for Inspection Type "Property Conversion Inspection" close the Inspections Workflow Task.//
if (inspType.equals("Property Conversion Inspection") && inspResult.equals("Approved")){
	closeTask("Inspections","Approved","Updated based on Completed Inspection Result","");
	}
//If Inspection Result is "Approved" for Inspection Type "Home Inspection" close the Inspections Workflow Task.//
if (inspType.equals("Home Inspection") && inspResult.equals("Approved")){
	closeTask("Inspections","Approved","Updated based on Completed Inspection Result","");
	}
//If Inspection Result is "Approved" for Inspection Type "Rental Inspection" close the Inspections Workflow Task.//
if (inspType.equals("Rental Inspection") && inspResult.equals("Approved")){
	closeTask("Inspections","Approved","Updated based on Completed Inspection Result","");
	}
//If Inspection Result is "Approved" for Inspection Type "Amusement Final" close the Inspections Workflow Task.//
if (inspType.equals("Amusement Final") && inspResult.equals("Approved")){
	closeTask("Inspections","Completed","Updated based on Completed Inspection Result","");
	}
//If Inspection Result is "Approved" for Inspection Type "Boiler" close the Inspections Workflow Task.//
if (inspType.equals("Boiler") && inspResult.equals("Approved")){
	closeTask("Inspections","Completed","Updated based on Completed Inspection Result","");
	}
//If Inspection Result is "Approved" for Inspection Type "Electrical Final" close the Inspections Workflow Task.//
if (inspType.equals("Electrical Final") && inspResult.equals("Approved")){
	closeTask("Inspections","Completed","Updated based on Completed Inspection Result","");
	}
//If Inspection Result is "Approved" for Inspection Type "Gas Final" close the Inspections Workflow Task.//
if (inspType.equals("Gas Final") && inspResult.equals("Approved")){
	closeTask("Inspections","Completed","Updated based on Completed Inspection Result","");
	}
//If Inspection Result is "Approved" for Inspection Type "Mechanical Final" close the Inspections Workflow Task.//
if (inspType.equals("Mechanical Final") && inspResult.equals("Approved")){
	closeTask("Inspections","Completed","Updated based on Completed Inspection Result","");
	}
//If Inspection Result is "Approved" for Inspection Type "Plumbing Final" close the Inspections Workflow Task.//
if (inspType.equals("Plumbing Final") && inspResult.equals("Approved")){
	closeTask("Inspections","Completed","Updated based on Completed Inspection Result","");
	}
//If Inspection Result is "Approved" for Inspection Type "Elevator Final" close the Inspections Workflow Task.//
if (inspType.equals("Elevator Final") && inspResult.equals("Approved")){
	closeTask("Inspections","Completed","Updated based on Completed Inspection Result","");
	}
//If Inspection Result is "Approved" for Inspection Type "Sign Final" close the Inspections Workflow Task.//
if (inspType.equals("Sign Final") && inspResult.equals("Approved")){
	closeTask("Inspections","Completed","Updated based on Completed Inspection Result","");
	}