|
|  Standard INCLUDES_ACCELA_FUNCTIONS version ?.?: These were added because some events are calling older master scripts
|  They can be removed once the events are updated to use newer master scripts.
|  	function name
|  ----------
|  Modified from INCLUDES_ACCELA_FUNCTIONS
|  	function doScriptActions
|
|------------------------------------------------------------------------------------------------------
|
| Change Log :
|	04/21/2020 TRUEPOINT/MHELVICK Added loadCustomScript, getVendor, NOTIFICATION TEMPLATE functions, DIGEPLAN EDR custom functions 
|	05/??/2020 DB Added doScriptActions for sending email via ACA
|	05/??/2020 Alex Charlton Added createChildLic, getCapWorkDesModel, copyDetailedDescription, getParentCapIDForReview, appHasConditiontrue
|	05/11/2020 Ray Schug Added ownerExistsOnCap
|	05/19/2020 Ray Schug Added getLicenseProf
|	05/21/2020 Ray Schug Added wasCapStatus, wasTaskStatus_TPS, isTaskStatus_TPS
| 	06/03/2020 Ray Schug Initial Import of existing INCLUDES_CUSTOM from SUPP & PROD
|
/------------------------------------------------------------------------------------------------------*/