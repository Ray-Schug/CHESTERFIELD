// User Configurable Parameters
var SCRIPT_VERSION = 2.0;
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS"));
eval(getScriptText("INCLUDES_ACCELA_GLOBALS"));
eval(getScriptText("INCLUDES_CUSTOM"));

function getScriptText(vScriptName) {
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
	return emseScript.getScriptText() + "";
}


//Parameters Initialization
showMessage = true;
showDebug = true;
var s_id1 = aa.env.getValue("PermitId1");
var s_id2 = aa.env.getValue("PermitId2");
var s_id3 = aa.env.getValue("PermitId3");
var targetCapID = aa.cap.getCapID(s_id1, s_id2, s_id3).getOutput();
var serviceProviderCode = aa.getServiceProviderCode();
var currentUserID = aa.getAuditID();

/** Adding addresses(according to new address) to a record. **/
//Set the new addressModel attributes.
var newAddressModel = aa.proxyInvoker.newInstance("com.accela.aa.aamain.address.AddressModel").getOutput();
newAddressModel.setCapID(targetCapID);
newAddressModel.setServiceProviderCode(serviceProviderCode);
newAddressModel.setAuditID(currentUserID);
newAddressModel.setPrimaryFlag("Y");

//Create new address for cap.
createAddresses(targetCapID, newAddressModel);



/** Adding addresses(look up refAddress) to a record. **/
//Set the search refAddressModel attributes.
/**var searchRefAddressModel = aa.proxyInvoker.newInstance("com.accela.aa.aamain.address.RefAddressModel").getOutput();
searchRefAddressModel.setStreetName("CLAUSS");
searchRefAddressModel.setUnitStart("10A");

//Look up the refAddressModel.
var searchResult = aa.address.getRefAddressByServiceProviderRefAddressModel(searchRefAddressModel);
if (searchResult.getSuccess())
{
	var refAddressModelArray = searchResult.getOutput();
	for (yy in refAddressModelArray)
	{
		var refAddressModel = refAddressModelArray[yy];

		//Set the new addressModel attributes.
		var newAddressModel = refAddressModel.toAddressModel();
		newAddressModel.setCapID(targetCapID);
		newAddressModel.setServiceProviderCode(serviceProviderCode);
		newAddressModel.setAuditID(currentUserID);
		newAddressModel.setPrimaryFlag("Y");
        
		//Create new address for cap.
        createAddresses(targetCapID, newAddressModel);
	}
} 
**/