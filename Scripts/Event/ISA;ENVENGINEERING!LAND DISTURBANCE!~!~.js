//IMSA:ENVENGINEERING/LAND DISTURBANCE/*/*
//When Pre-Construction Meeting is scheduled update Workflow Task as Scheduled.
if(matches(inspType,"Pre-Construction Meeting")){
updateTask("Pre-Construction Meeting","Scheduled","Updated based on Scheduled Inspection","");
}