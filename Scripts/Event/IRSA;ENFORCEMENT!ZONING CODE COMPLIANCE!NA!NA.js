if (inspType == "Initial" && inspResult == "Violation") {var inspComment = inspObj.getInspection().getResultComment(); inspComment != null;
                scheduleInspectDate("Follow-up",dateAdd(null,1,"Y"),currentUserID,null,inspComment);
				closeTask("Investigation","In Violation","Updated Via Script",null);
				activateTask("Notice"); updateTask("Notice","Pending Notice","Updated Via Script",null);
				}


if (inspType == "Initial" && inspResult == "10 Day In Violation"){var inspComment = inspObj.getInspection().getResultComment(); inspComment != null;
                scheduleInspectDate("Follow-up",dateAdd(null,13,"Y"),currentUserID,null,inspComment);
				closeTask("Investigation","In Violation","Updated Via Script",null);
				activateTask("Notice"); updateTask("Notice","Pending Notice","Updated Via Script",null); updateAppStatus("In Violation","")
				}