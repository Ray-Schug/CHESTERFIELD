//Alex Charlton added for renewals 092619
try {
    newChildID = null;   
    qDate = "";
    
    if (appMatch('*/*/Conveyance/Installation') && wfStatus == 'Completed') {
		 
	comment("Checking what License to Create");
	if (appMatch('Building/Permit/Conveyance/Installation')) {
	     newChildID = createChildLic('Building', 'Permit', 'Conveyance', 'Annual', '');
             }	

	
	 if (newChildID){	
            copyAppSpecific(newChildID); comment('Copying ASI - New Permit id = ' + newChildID);
            copyASITables(capId,newChildID); comment('Copying ASIT - New License id = ' + newChildID);

	
            updateAppStatus('Active', 'Created from Application', newChildID);
            editAppName(capName, newChildID);
	    theShortNotes = getShortNotes(capId);
	    updateShortNotes(theShortNotes, newChildID);
         }

         // ************START expiration Date code Options 
	 //default to 12 months from today
         comment("Checking on what the renewal date should be set to");

         numberOfMonths = 12;

          
         // if Semi, change to 6 months form today        
         if (AInfo['License Duration'] == 'Semi-Annual') {
	       numberOfMonths = 6;
               }

         if (AInfo['Annual Quarter'] == 'Q4 - December') {
	       numberOfMonths = 12;
               qDate = '12/31/2020'
               }
         if (AInfo['Annual Quarter'] == 'Q1 - March') {
	       numberOfMonths = 12;
               qDate = '03/31/2021'
               }
         if (AInfo['Annual Quarter'] == 'Q2 - June') {
	       numberOfMonths = 12;
               qDate = '6/30/2021'
               }
         if (AInfo['Annual Quarter'] == 'Q3 - September') {
	       numberOfMonths = 12;
               qDate = '9/30/2021'
               }


    
          tmpNewDate = dateAddMonths(null, numberOfMonths);
	  comment("TMP NEW Date Default = "+tmpNewDate);
	  today = new Date(); comment('Today = ' + today);
	  theMonth = today.getMonth(); comment('the month = ' + theMonth);
	  theYear = today.getFullYear(); comment('The Year = ' + theYear);
	  nextYear = theYear + 1; comment('Next Year = ' + nextYear);

         // Set for 3/31 renewals
         if (appMatch('Licenses/Security Company/*/*')) {
	         if (matches(theMonth, '0', '1')) {
		     tmpNewDate = '03/31/'+ theYear;
	             }	
		 else{
		     tmpNewDate = '03/31/'+ nextYear;
		     }
                 logDebug("New Date 3/31 will be: " + tmpNewDate);
		 }

         // Set for 6/30 renewals
         if (appMatch('Licenses/Taxi Business/*/*') || appMatch('Licenses/Business Vehicle/*/*')) {
	         if (matches(theMonth, '0', '1','2','3','4','5')) {
		     tmpNewDate = '06/30/'+ theYear;
	             }	
		 else{
		     tmpNewDate = '06/30/'+ nextYear;
		     }
                 logDebug("New Date 6/30 will be: " + tmpNewDate);
		 }

         // Set for 9/30 renewals
         if (appMatch('Licenses/Non-Consent Tow Company/*/*')) {
	         if (matches(theMonth,'0','1','2','3','4','5','6','7','8')) {
		     tmpNewDate = '09/30/'+ theYear;
	             }	
		 else{
		     tmpNewDate = '09/30/'+ nextYear;
		     }
                 logDebug("New Date 9/30 will be: " + tmpNewDate);
		 }
 
          if (AInfo['Annual Quarter'] == 'Q4 - December') {
	        tmpNewDate = '12/31/'+ nextYear;
               }
 
        if (AInfo['Annual Quarter'] == 'Q1 - March') {
	        tmpNewDate = '3/31/'+ nextYear;
               }
         if (AInfo['Annual Quarter'] == 'Q2 - June') {
	        tmpNewDate = '6/30/'+ nextYear;
               }
         if (AInfo['Annual Quarter'] == 'Q3 - September') {
	        tmpNewDate = '9/30/'+ nextYear;
               }


 
         
         // set the expiratipon date
	 comment("TMP NEW Date after checks = "+tmpNewDate);
         
	 saveId = capId;
	 if (newChildID){
            capId = newChildID;
         }

         thisLic = new licenseObject(capIDString,capId) ; thisLic.setStatus("Active");  thisLic.setExpiration(dateAdd(tmpNewDate,0));
         capId = saveId;

         // This code gives the License the same # as tha APP 
          if (newChildID){
             newChildIdString = newChildID.getCustomID();editIdString = capIDString.substr(0,14)+'A'; aa.cap.updateCapAltID(newChildID,editIdString); 
          }

 }
        // ******************END expiration Date code Options

	


// If setting the Licecense status manually from the workflow

if (wfTask == 'Annual Status' && wfStatus == 'About to Expire') {
	 lic = new licenseObject(capIDString);
	 lic.setStatus('About to Expire');
	 }

} catch (err) {
	logDebug("A JavaScript Error occured: " + err.message + " In Line " + err.lineNumber);
}