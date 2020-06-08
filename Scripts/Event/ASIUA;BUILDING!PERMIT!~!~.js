/*------------------------------------------------------------------------------------------------------/
/ Program : ASIUA;Building!Permit!~!~.js
/ Event   : ApplicationSpecificInfoUpdateAfter
/
/ Initial Version: ddejesus 2016.12.23
/------------------------------------------------------------------------------------------------------*/

var appTypeArr = appTypeString.split("/");

if (appTypeArr && appTypeArr[2].toUpperCase().equals("COMMERCIAL")) {

	if (feeExists("CC-BLD-001"))
		calcFee_CC_BLD_COMM_CC_BLD_001();

	if (feeExists("CC_BLD_04"))
		calcFee_CC_BLD_COMM_CC_BLD_04();

	if (feeExists("CC_BLD_06"))
		calcFee_CC_BLD_COMM_CC_BLD_06();

	if (feeExists("CC-BLDCAE-03"))
		calcFee_CC_BLD_COMM_AE_CC_BLDCAE_03();

	if (feeExists("CC-BLD-CAG01"))
		calcFee_CC_BLD_COMM_AG_CC_BLD_CAG01();

	if (feeExists("CC-BLD-CAB01"))
		calcFee_CC_BLD_COMM_AUX_BOILER_CC_BLD_CAB01();

	if (feeExists("CC-BLD-CAF01"))
		calcFee_CC_BLD_COMM_AUX_FIRE_CC_BLD_CAF01();

	if (feeExists("CC-BLD-CAM01"))
		calcFee_CC_BLD_COMM_AUX_MECH_CC_BLD_CAM01();

	if (feeExists("CC-BLD-CAP01"))
		calcFee_CC_BLD_COMM_AUX_PLUMBING_CC_BLD_CAP01();
}

if (appTypeArr && appTypeArr[2].toUpperCase().equals("CONVEYANCE")) {
	calcFee_CC_BLD_CV_CC_BLD_CV_02();
	calcFee_CC_BLD_CV_CC_BLD_CV_03();
}

if (appTypeArr && appTypeArr[2].toUpperCase().equals("MIXEDUSE")) {
	calcFee_CC_BLD_MIXEDUSE_CC_BLDC002();
}