// Enter your script here...

if (wfTask == 'Community Enhancement' && wfStatus == 'Inspection Required PM') 
{deactivateTask("Community Enhancement"); 
newChildID = createChild("Enforcement","Property Maintenance","NA","NA","");
    saveCapId = capId;
    capId = newChildID;
    scheduleInspection("Initial",1,currentUserID,null,"Auto Scheduled");
    capId = saveCapId;
    }

if (wfTask == 'Community Enhancement' && wfStatus == 'Inspection Required ZC') 
{deactivateTask("Community Enhancement"); 
newChildID = createChild("Enforcement","Zoning Code Compliance","NA","NA","");
    saveCapId = capId;
    capId = newChildID;
    scheduleInspection("Initial",1,currentUserID,null,"Auto Scheduled");
    deactivateTask("Initiation");
    activateTask("Investigation");
    capId = saveCapId;
    }