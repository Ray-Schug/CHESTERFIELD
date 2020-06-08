ASA;Building!~!~!~^`
copyParcelGisObjects();
branch("EMSE:Fees-Building");
if (appTypeArray[1] == "Residential" && matches(appTypeArray[2],"New","Manufactured Home") && AInfo['ParcelAttribute.VIR_DW_ACCESS'] == "COUNTY" && !getChildren("EnvManagement/Driveway Permit/Type1/*")) {
	childId = createChild("EnvManagement","Driveway Permit","Type1","NA","Driveway Permit Type1");
	editAppSpecific("Driveway Permit Required","Yes");
	editAppSpecific("Driveway Permit Number",childId.getCustomID());
	}

sendLPExpiredNotification(capId);
if ((appMatch("Building/Commercial/New/*") || appMatch("Building/Commercial/Multi-Family/*")) && AInfo['Driveway Permit Required'] != "No") {
	showMessage = true;
	comment("<B><Font Color=BLUE>Note:  Driveway permit may be required.</Font></B>");
	}

if (appTypeArray[1] == "Residential" && matches(appTypeArray[2],"New","Addition","Multi-Family","Accessory Structure","Pool")) {
	LDVchildId = createChild("DevelopmentSvc","Land Development Review","Project Status Determination","NA","Project Status Determination");
	}

if (appTypeArray[1] == "Residential" && matches(appTypeArray[2],"Manufactured Home")) {
	LDVchildId = createChild("DevelopmentSvc","Land Development Review","Land Use Determination","NA","Land Use Determination");
	}

aa.finance.reCalculateFees(capId,"CONT",AInfo['Valuation of Work Performed']);
`^
ASA;CodeCompliance!~!~!~^`
branch("EMSE:Fees-CODE_COMPLIANCE");
if (appTypeArray[0] == "CodeCompliance"&& appTypeArray[1] == "Code Complaint") {
	editAppSpecific("Violation Type",appTypeArray[2] );
	}

if (matches(appTypeArray[1],"Code Complaint","Abandoned Property Registry")) {
	editAppSpecific("Commission District",AInfo['ParcelAttribute.COMMISSION_DIST']);
	}

if (matches(appTypeArray[1],"Compliance Certificate")) {
	addFee("8160-010","CODE_COMPLIANCE","FINAL",1,"Y");
	branch("EMSE: APO Load Attributes");
	}
`^
ASA;DevelopmentSvc!~!~!~^`
branch("EMSE:Fees-DevelopmentSvc");
`^
ASA;Enforcement!Case!~!~^`
createPendingInspection("LEC_CASE","602: Routine Environmental");
createPendingInspection("LEC_CASE","604: Environmental Final");
createPendingInspection("LEC_CASE","646: Mine Fencing");
createPendingInspection("LEC_CASE","647: Mine Fence Affidavit");
createPendingInspection("LEC_CASE","680: Notification/Official Letter");
createPendingInspection("LEC_CASE","699: Other");
createPendingInspection("LEC_CASE","700: Land Use");
createPendingInspection("LEC_CASE","701: Junk and Litter");
createPendingInspection("LEC_CASE","702: Zoning");
createPendingInspection("LEC_CASE","703: Setback");
createPendingInspection("LEC_CASE","704: Minimum Housing");
createPendingInspection("LEC_CASE","705: Contractor Complaint");
createPendingInspection("LEC_CASE","706: Building Without Permit");
createPendingInspection("LEC_CASE","707: Lot Mowing");
createPendingInspection("LEC_CASE","708: Drainage of Filthy Fluids");
createPendingInspection("LEC_CASE","709: Right of Way");
createPendingInspection("LEC_CASE","799: Other");
`^
ASA;EnvManagement!~!~!~^`
branch("EMSE:Fees-EnvironmentalSvc");
`^
ASA;Licenses!~!~!~^`
branch("EMSE:SetContactRelationshipToContactType");
`^
ASA;Licenses!~!~!Renewal^`
aa.runScript("APPLICATIONSUBMITAFTER4RENEW");
aa.cap.updateAccessByACA(capId,"Y");
`^
ASA;Licenses!Animal!Dog!~^`
isAppRenewal=false;
if (matches(appTypeArray[3], "Application","Renewal")) {
	isAppRenewal=true;
	}

if (isAppRenewal && publicUser) {
	branch("LIC Calculate Dog License Fees");
	}

if (matches(appTypeArray[3], "Application") && !publicUser) {
	branch("LIC Calculate Dog License Fees");
	}
`^
ASA;Licenses!Business!~!Application^`
updateFee("LIC_010","LIC_BUSINESS_GENERAL","FINAL",1,"Y");
updateFee("LIC_020","LIC_BUSINESS_GENERAL","FINAL",1,"Y");
`^
ASA;Licenses!Business!~!Renewal^`
updateFee("LIC_030","LIC_BUSINESS_GENERAL","FINAL",1,"Y");
branch("EMSE:LicProfLookup:getLicenses");
expDate = aa.expiration.getLicensesByCapID(licCapId).getOutput().getB1Expiration().getExpDate();
now=aa.util.now();
tempDate=aa.util.formatDate(now, "MM/dd/YYYY");
today=aa.util.parseDate(tempDate);
today.after(expDate)?updateFee("LIC_040","LIC_BUSINESS_GENERAL","FINAL",1,"Y"):now;
`^
ASA;Licenses!Contractor!~!Application^`
updateFee("LIC_010","LIC_CONTRACTOR_GENERAL","FINAL",1,"Y");
updateFee("LIC_020","LIC_CONTRACTOR_GENERAL","FINAL",1,"Y");
`^
ASA;Licenses!Contractor!~!Renewal^`
updateFee("LIC_030","LIC_CONTRACTOR_GENERAL","FINAL",1,"Y");
branch("EMSE:LicProfLookup:getLicenses");
expDate= aa.expiration.getLicensesByCapID(licCapId).getOutput().getB1Expiration().getExpDate();
now=aa.util.now();
tempDate=aa.util.formatDate(now, "MM/dd/YYYY");
today=aa.util.parseDate(tempDate);
today.after(expDate)?updateFee("LIC_040","LIC_CONTRACTOR_GENERAL","FINAL",1,"Y"):now;
`^
ASA;Licenses!Garage-Yard Sale!License!~^`
updateFee("LIC_010","LIC_SALE_GENERAL","FINAL",1,"Y");
`^
ASA;Permits!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
ASA;Planning!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
ASA;PublicWorks!~!~!~^`
copyParcelGisObjects();
branch("EMSE: ProjectDox");
branch("EMSE:Fees-PublicWorks");
aa.finance.reCalculateFees(capId,"CONT",AInfo['Valuation of Work Performed']);
`^
ASA;ServiceRequest!~!~!~^`
branch("EMSE:ServiceRequestDuplicateCheck");
branch("EMSE:SetContactRelationshipToContactType");
`^
ASB;Building!~!~!~^`
showDebug = false;
showMessage = false;
pArr = new Array();
loadParcelAttributesFromValidated(ParcelValidatedNumber, pArr);
if (pArr["ParcelAttribute.PARCEL_CITY_CNTY"] == "City" || pArr["ParcelAttribute.T_R_A"] == "1" || pArr["ParcelAttribute.USE_CODE"] == "IN") {
	showMessage = true;
	comment("<font color = red>You may not apply for permits on addresses located within the City limits. Please check your address or contact the City of Tallahassee to process a permit.</font>");
	cancel = true;
	}
`^
ASB;CodeCompliance!~!~!~^`
showDebug = false;
showMessage = true;
pArr = new Array();
loadParcelAttributesFromValidated(ParcelValidatedNumber, pArr;
if (pArr["ParcelAttribute.PARCEL_CITY_CNTY"] == "City") {
	showMessage = true;
	comment("<font color = red>You may not apply for permits on addresses located within the City limits. Please check your address or contact the City of Tallahassee to process a permit.</font>");
	cancel = true;
	}
`^
ASB;DevelopmentSvc!~!~!~^`
showDebug = false;
showMessage = true;
pArr = new Array();
loadParcelAttributesFromValidated(ParcelValidatedNumber, pArr;
if (pArr["ParcelAttribute.PARCEL_CITY_CNTY"] == "City") {
	showMessage = true;
	comment("<font color = red>You may not apply for permits on addresses located within the City limits. Please check your address or contact the City of Tallahassee to process a permit.</font>");
	cancel = true;
	}
`^
ASB;EnvManagement!~!~!~^`
showDebug = true;
showMessage = true;
pArr = new Array();
loadParcelAttributesFromValidated(ParcelValidatedNumber, pArr);
if (appTypeArray[1] |= "Driveway Permit" && pArr["ParcelAttribute.PARCEL_CITY_CNTY"] == "City") {
	showMessage = true;
	comment("<font color = red>You may not apply for permits on addresses located within the City limits. Please check your address or contact the City of Tallahassee to process a permit.</font>");
	cancel = true;
	}
`^
ASB;Licenses!Garage-Yard Sale!License!NA^`
contFirstName = ApplicantFirstName;
contLastName = ApplicantLastName;
if (CurrentUserID.substr(0,10)=="PUBLICUSER") {
	contactList = aa.env.getValue("ContactList");
	contactArray = contactList.toArray();
	contFirstName = contactArray[0].getFirstName();
	contLastName = contactArray[0].getLastName();
	}

var cnv=0;
message="";
cnt = cntAssocGarageSales(AddressHouseNumber,AddressStreetName, AddressCity, AddressState, AddressZip,contFirstName,contLastName);
if (cnt >= 3) {
	showMessage = true;
	cancel=true;
	}
`^
ASIUA;Building!~!~!~^`
var myCapId = capId.getCustomID();
showDebug = false;
showMessage = 0;
aa.finance.reCalculateFees(capId,"CONT",AInfo['Valuation of Work Performed']);
branch("EMSE:Fees-Building");
if ((appMatch("Building/Residential/*/*") || appMatch("Building/Commercial/*/*")) && isTaskStatus("Quality Check","Ready to Issue") == "True" && (AInfo['Inspections Added'] == null || AInfo['Inspections Added'] == "UNCHECKED")) {
	branch("EMSE:Add-Inspections-Building");
	showMessage = true;
	comment("<font color = red>Branched to EMSE:Add-Inspections-Building</font>");
	}

if (appTypeArray[0] == "Building" && appTypeArray[1] == "Residential" && isTaskActive("Flood Indemnity") == "True" && getAppSpecific("Flood Declarations Covenent Received") == "Yes" && getAppSpecific("Flood Indemnity Required") == "CHECKED") {
	closeTask("Flood Indemnity","Flood Indemnity Completed","Auto Complete of Flood Indemnity- Updated by Script","");
	activateTask("Quality Check");
	updateTask("Quality Check","In Progress","Started by Script","");
	}
`^
ASIUA;CodeCompliance!Abandoned Property Registry!~!~^`
showMessage = true;
showDebug = 1;
branch("EMSE: APO Load Attributes");
`^
ASIUA;CodeCompliance!Code Complaint!~!~^`
showMessage = true;
showDebug = 1;
branch("EMSE: APO Load Attributes");
branch("EMSE:Fees-CodeCompliance");
`^
ASIUA;CodeCompliance!Compliance Certificate!~!~^`
showMessage = true;
showDebug = 1;
branch("EMSE: APO Load Attributes");
if (AInfo['ParcelAttribute.VIR_BLD_CD_NUM'] != null && capStatus == "Received") {
	editAppSpecific("Open Code Bld #",AInfo['ParcelAttribute.VIR_BLD_CD_NUM']);
	editAppSpecific("Open Code Bld Status",AInfo['ParcelAttribute.VIR_BLD_CD_STAT']);
	editAppSpecific("Open Code Bld Balance",AInfo['ParcelAttribute.VIR_BLD_CD_BAL']);
	} else {
	editAppSpecific("Open Code Bld Balance",0);
	}

if (AInfo['ParcelAttribute.VIR_ENV_CD_NUM'] != null && capStatus == "Received") {
	editAppSpecific("Open Code Env #",AInfo['ParcelAttribute.VIR_ENV_CD_NUM']);
	editAppSpecific("Open Code Env Status",AInfo['ParcelAttribute.VIR_ENV_CD_STAT']);
	editAppSpecific("Open Code Env Balance",AInfo['ParcelAttribute.VIR_ENV_CD_BAL']);
	} else {
	editAppSpecific("Open Code Env Balance",0);
	}

if (AInfo['ParcelAttribute.VIR_ZON_CD_NUM'] != null && capStatus == "Received") {
	editAppSpecific("Open Code Zoning #",AInfo['ParcelAttribute.VIR_ZON_CD_NUM']);
	editAppSpecific("Open Code Zoning Status",AInfo['ParcelAttribute.VIR_ZON_CD_STAT']);
	editAppSpecific("Open Code Zoning Balance",AInfo['ParcelAttribute.VIR_ZON_CD_BAL']);
	} else {
	editAppSpecific("Open Code Zoning Balance",0);
	}

if (AInfo['ParcelAttribute.VIR_JUNK_CD_NUM'] != null && capStatus == "Received") {
	editAppSpecific("Open Code Junk #",AInfo['ParcelAttribute.VIR_JUNK_CD_NUM']);
	editAppSpecific("Open Code Junk Status",AInfo['ParcelAttribute.VIR_JUNK_CD_STAT']);
	editAppSpecific("Open Code Junk Balance",AInfo['ParcelAttribute.VIR_JUNK_CD_BAL']);
	} else {
	editAppSpecific("Open Code Junk Balance",0);
	}

if (AInfo['ParcelAttribute.VIR_ADD_CD_NUM'] != null && capStatus == "Received") {
	editAppSpecific("Open Code Addressing #",AInfo['ParcelAttribute.VIR_ADD_CD_NUM']);
	editAppSpecific("Open Code Addressing Status",AInfo['ParcelAttribute.VIR_ADD_CD_STAT']);
	editAppSpecific("Open Code Addressing Balance",AInfo['ParcelAttribute.VIR_ADD_CD_BAL']);
	} else {
	editAppSpecific("Open Code Addressing Balance",0);
	}

if (AInfo['ParcelAttribute.VIR_FIRE_CD_NUM'] != null && capStatus == "Received") {
	editAppSpecific("Open Code Fire #",AInfo['ParcelAttribute.VIR_FIRE_CD_NUM']);
	editAppSpecific("Open Code Fire Status",AInfo['ParcelAttribute.VIR_FIRE_CD_STAT']);
	editAppSpecific("Open Code Fire Balance",AInfo['ParcelAttribute.VIR_FIRE_CD_BAL']);
	} else {
	editAppSpecific("Open Code Fire Balance",0);
	}

if (AInfo['ParcelAttribute.VIR_FFL_CD_NUM'] != null && capStatus == "Received") {
	editAppSpecific("Open Code Filthy Fluids #",AInfo['ParcelAttribute.VIR_FFL_CD_NUM']);
	editAppSpecific("Open Code Filthy Fluids Status",AInfo['ParcelAttribute.VIR_FFL_CD_STAT']);
	editAppSpecific("Open Code Filthy Fluids Balance",AInfo['ParcelAttribute.VIR_FFL_CD_BAL']);
	} else {
	editAppSpecific("Open Code Filthy Fluids Balance",0);
	}

if (AInfo['ParcelAttribute.VIR_MOW_CD_NUM'] != null && capStatus == "Received") {
	editAppSpecific("Open Code Mowing #",AInfo['ParcelAttribute.VIR_MOW_CD_NUM']);
	editAppSpecific("Open Code Mowing Status",AInfo['ParcelAttribute.VIR_MOW_CD_STAT']);
	editAppSpecific("Open Code Mowing Balance",AInfo['ParcelAttribute.VIR_MOW_CD_BAL']);
	} else {
	editAppSpecific("Open Code Mowing Balance",0);
	}

if (AInfo['ParcelAttribute.VIR_RAP_CD_NUM'] != null && capStatus == "Received") {
	editAppSpecific("Open Code Refueling Assistance Program #",AInfo['ParcelAttribute.VIR_RAP_CD_NUM']);
	editAppSpecific("Open Code Refueling Assistance Program Status",AInfo['ParcelAttribute.VIR_RAP_CD_STAT']);
	editAppSpecific("Open Code Refueling Assistance Program Balance",AInfo['ParcelAttribute.VIR_RAP_CD_BAL']);
	} else {
	editAppSpecific("Open Code Refueling Assistance Program Balance",0);
	}

if (AInfo['ParcelAttribute.VIR_APR_CD_NUM'] != null && capStatus == "Received") {
	editAppSpecific("Open Code Abandoned Property Registry #",AInfo['ParcelAttribute.VIR_APR_CD_NUM']);
	editAppSpecific("Open Code Abandoned Property Registry Status",AInfo['ParcelAttribute.VIR_APR_CD_STAT']);
	editAppSpecific("Open Code Abandoned Property Registry Balance",AInfo['ParcelAttribute.VIR_APR_CD_BAL']);
	} else {
	editAppSpecific("Open Code Abandoned Property Registry Balance",0);
	}

var totalLCC;
totalLCC =0*1;
var boac;
boac = 0*1;
if (AInfo['Open Code Bld #'] != null) {
	totalLCC = totalLCC + 1;
	boac = boac + (1*AInfo['Open Code Bld Balance']);
	}

if (AInfo['Open Code Env #'] != null) {
	totalLCC = totalLCC + 1;
	boac = boac + (1*AInfo['Open Code Env Balance']);
	}

if (AInfo['Open Code Zoning #'] != null) {
	totalLCC = totalLCC + 1;
	boac = boac + (1*AInfo['Open Code Zoning Balance']);
	}

if (AInfo['Open Code Junk #'] != null) {
	totalLCC = totalLCC + 1;
	boac = boac + (1*AInfo['Open Code Junk Balance']);
	}

if (AInfo['Open Code Addressing #'] != null) {
	totalLCC = totalLCC + 1;
	boac = boac + (1*AInfo['Open Code Addressing Balance']);
	}

if (AInfo['Open Code Fire #'] != null) {
	totalLCC = totalLCC + 1;
	boac = boac + (1*AInfo['Open Code Fire Balance']);
	}

if (AInfo['Open Code Filthy Fluids #'] != null) {
	totalLCC = totalLCC + 1;
	boac = boac + (1*AInfo['Open Code Filthy Fluids Balance']);
	}

if (AInfo['Open Code Mowing #'] != null) {
	totalLCC = totalLCC + 1;
	boac = boac + (1*AInfo['Open Code Mowing Balance']);
	}

if (AInfo['Open Code Refueling Assistance Program #'] != null) {
	totalLCC = totalLCC + 1;
	boac = boac + (1*AInfo['Open Code Refueling Assistance Program Balance']);
	}

if (AInfo['Open Code Abandoned Property Registry #'] != null) {
	totalLCC = totalLCC + 1;
	boac = boac + (1*AInfo['Open Code JAbandoned Property Registry Balance']);
	}

totalLCC = editAppSpecific("Number of Cases",totalLCC);
editAppSpecific("Balance of All Cases",boac);
if (AInfo['ParcelAttribute.VIR_APR_NUM'] != null && capStatus == "Received") {
	editAppSpecific("APR #",AInfo['ParcelAttribute.VIR_APR_NUM']);
	editAppSpecific("Mortgage Company",AInfo['ParcelAttribute.VIR_APR_MC']);
	editAppSpecific("APR Status",AInfo['ParcelAttribute.VIR_APR_STAT']);
	}
`^
ASIUA;DevelopmentSvc!~!~!~^`
branch("EMSE:Fees-DevelopmentSvc");
`^
ASIUA;Enforcement!Case!~!~^`
removeFee("7018-001","FINAL");
removeFee("8030-005","FINAL");
removeFee("8030-001","FINAL");
removeFee("8030-010","FINAL");
removeFee("8031-000","FINAL");
removeFee("8031-001","FINAL");
removeFee("8031-005","FINAL");
removeFee("8031-010","FINAL");
if (AInfo['Env After the Fact Fee']!=null && AInfo['Amnesty Used']!="CHECKED") {
	updateFee("7018-001","LEC_CASE","FINAL",1,"N","N");
	}

if (AInfo['Env After the Fact Fee']!=null && AInfo['Amnesty Used']=="CHECKED") {
	updateFee("8031-000","LEC_CASE","FINAL",1,"N","N");
	}

if (AInfo['Initial Fee']!=null && AInfo['Amnesty Used']!="CHECKED") {
	updateFee("8030-001","LEC_CASE","FINAL",1,"N","N");
	}

if (AInfo['Initial Fee']!=null && AInfo['Amnesty Used']=="CHECKED") {
	updateFee("8031-001","LEC_CASE","FINAL",1,"N","N");
	}

if (AInfo['Start Date']!=null && AInfo['Amnesty Used']=="CHECKED") {
	updateFee("8031-005","LEC_CASE","FINAL",1,"N","N");
	}

if (AInfo['Start Date']!=null && AInfo['Amnesty Used']!="CHECKED") {
	updateFee("8030-005","LEC_CASE","FINAL",1,"N","N");
	}

if (AInfo['Board Adjustment to Fees']!=null && AInfo['Amnesty Used']!="CHECKED") {
	updateFee("8030-010","LEC_CASE","FINAL",1,"N","N");
	}

if (AInfo['Board Adjustment to Fees']!=null && AInfo['Amnesty Used']=="CHECKED") {
	updateFee("8030-010","LEC_CASE","FINAL",1,"N","N");
	}
`^
ASIUA;EnvManagement!~!~!~^`
branch("EMSE:Fees-EnvironmentalSvc");
`^
ASIUA;Licenses!~!~!License^`
editAppName(AInfo['Doing Business As (DBA) Name']);
`^
ASIUA;Permits!~!~!~^`
licEditExpInfo(null, AInfo['Permit Expiration Date']);
`^
ASIUA;PublicWorks!~!~!~^`
aa.finance.reCalculateFees(capId,"CONT",AInfo['Valuation of Work Performed']);
branch("EMSE:Fees-PublicWorks");
`^
ASUA;AMS!~!~!~^`
if (appStatus == "Complete") {
	completeCAP(currentUserID);
	}

if (appStatus == "Closed") {
	closeCap(currentUserID);
	}
`^
ASUA;AMS!Storm!Drain!Cleaning^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (appStatus == "Complete") {
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Work Order","Work Complete","","");
	capId = holdCapId;
	'];
	}

disableTokens = false;
`^
ASUA;AMS!Street!Light!Repair^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (appStatus == "Complete") {
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Work Order","Work Complete","","");
	capId = holdCapId;
	'];
	}

disableTokens = false;
`^
ASUA;AMS!Street!Segment!Repair^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (appStatus == "Complete") {
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Work Order","Work Complete","","");
	capId = holdCapId;
	'];
	}

disableTokens = false;
`^
ASUA;AMS!Street!Segment!Snow Removal^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (appStatus == "Complete") {
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Work Order","Work Complete","","");
	capId = holdCapId;
	'];
	}

disableTokens = false;
`^
ASUA;AMS!Water!Hydrant!Repair^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (appStatus == "Complete") {
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Work Order","Work Complete","","");
	capId = holdCapId;
	'];
	}

disableTokens = false;
`^
ASUA;Building!~!~!~^`
if (matches(capStatus,"Void")) {
	taskCloseAllExcept("Void","Permit has been Voided","");
	setTask("Payment","N","N");
	setTask("Addressing Review","N","N");
	setTask("Completeness Check","N","N");
	setTask("Driveway Review","N","N");
	setTask("Septic Sewer","N","N");
	setTask("Building Plans Review","N","N");
	setTask("Environmental Inspection Review","N","N");
	setTask("Contractor License Review","N","N");
	setTask("Fire Review","N","N");
	setTask("Environmental Plans Review","N","N");
	setTask("Quality Check","N","N");
	setTask("Issuance","N","N");
	setTask("Zoning Setback Review","N","N");
	setTask("Certificate of Occupancy","N","N");
	setTask("Certificate of Completion","N","N");
	setTask("Fiscal Initial Payment","N","N");
	setTask("Fiscal","N","N");
	setTask("Closed","N","N");
	setTask("Development Service Sign","N","N");
	setTask("Fiscal Initial Payment","N","N");
	setTask("Off Site Sign Inventory Permit","N","N");
	setTask("Permit Issuance","N","N");
	setTask("Tallahassee Historic Trust","N","N");
	setTask("Complete","N","N");
	setTask("Applicant/Resite","N","N");
	setTask("Applicant/Zoning Setback Review","N","N");
	setTask("Applicant/Building","N","N");
	setTask("Applicant/Env-Insp","N","N");
	setTask("Applicant/Contractor License","N","N");
	setTask("Flood Indeminty Check","N","N");
	setTask("Flood Indemnity","N","N");
	setTask("Intake","N","N");
	}

if (matches(capStatus,"Withdrawn")) {
	taskCloseAllExcept("Withdrawn","Permit has been Withdrawn","");
	setTask("Payment","N","N");
	setTask("Addressing Review","N","N");
	setTask("Completeness Check","N","N");
	setTask("Driveway Review","N","N");
	setTask("Septic Sewer","N","N");
	setTask("Building Plans Review","N","N");
	setTask("Environmental Inspection Review","N","N");
	setTask("Contractor License Review","N","N");
	setTask("Fire Review","N","N");
	setTask("Environmental Plans Review","N","N");
	setTask("Quality Check","N","N");
	setTask("Issuance","N","N");
	setTask("Zoning Setback Review","N","N");
	setTask("Certificate of Occupancy","N","N");
	setTask("Certificate of Completion","N","N");
	setTask("Fiscal Initial Payment","N","N");
	setTask("Fiscal","N","N");
	setTask("Closed","N","N");
	setTask("Development Service Sign","N","N");
	setTask("Fiscal Initial Payment","N","N");
	setTask("Off Site Sign Inventory Permit","N","N");
	setTask("Permit Issuance","N","N");
	setTask("Tallahassee Historic Trust","N","N");
	setTask("Complete","N","N");
	setTask("Applicant/Resite","N","N");
	setTask("Applicant/Zoning Setback Review","N","N");
	setTask("Applicant/Building","N","N");
	setTask("Applicant/Env-Insp","N","N");
	setTask("Applicant/Contractor License","N","N");
	setTask("Flood Indeminty Check","N","N");
	setTask("Flood Indemnity","N","N");
	setTask("Intake","N","N");
	}
`^
ASUA;CodeCompliance!~!~!~^`
branch("EMSE: APO Load Attributes");
`^
ASUA;Enforcement!~!~!~^`
if (capStatus == "Void") {
	taskCloseAllExcept("Void");
	}

if (capStatus == "Withdrawn") {
	taskCloseAllExcept("Withdrawn");
	}
`^
ASUA;Licenses!~!~!~^`
if (capStatus == "Void") {
	taskCloseAllExcept("Void");
	}

if (capStatus == "Withdrawn") {
	taskCloseAllExcept("Withdrawn");
	}
`^
ASUA;Permits!~!~!~^`
if (capStatus == "Withdrawn") {
	taskCloseAllExcept("Withdrawn");
	}

if (capStatus == "Void") {
	taskCloseAllExcept("Void");
	}
`^
ASUA;Planning!~!~!~^`
if (capStatus == "Withdrawn") {
	taskCloseAllExcept("Withdrawn");
	}

if (capStatus == "Void") {
	taskCloseAllExcept("Void");
	}
`^
ASUA;ServiceRequest!~!~!~^`
if (capStatus == "Void") {
	taskCloseAllExcept("Void");
	}

if (capStatus == "Withdrawn") {
	taskCloseAllExcept("Withdrawn");
	}
`^
ASUB;Building!~!~!~^`
showMessage = false;
debug = 0;
if (matches(appStatus, "Certificate of Occupancy","Certificate of Completion", "Certificate of Occupancy Redac", "Certificate of Completion Reda", "Finaled") && (AInfo['Environmental Management Do Not COFO'] == "CHECKED" || AInfo['Building Plans Review Do Not COFO'] == "CHECKED" || AInfo['Code Compliance-License Do Not COFO'] == "CHECKED" || AInfo['Development Services Do Not COFO'] == "CHECKED")) {
	cancel = true;
	endBranch();
	}

if (matches(appStatus, "Issued","Issued Redacted") && (AInfo['Environmental Management Do Not Issue'] == "CHECKED" || AInfo['Building Plans Review Do Not Issue'] == "CHECKED" || AInfo['Code Compliance-License Do Not Issue'] == "CHECKED" || AInfo['Development Services Do Not Issue'] == "CHECKED")) {
	cancel = true;
	endBranch();
	}
`^
AdditionalInfoUpdateAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("AIUA:" + appTypeArray[0] + "/*/*/*");
branch("AIUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("AIUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("AIUA:" + appTypeString);
`^
AdditionalInfoUpdateBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("AIUB:" + appTypeArray[0] + "/*/*/*");
branch("AIUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("AIUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("AIUB:" + appTypeString);
`^
ApplicationConditionAddAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ACAA:" + appTypeArray[0] + "/*/*/*");
branch("ACAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ACAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ACAA:" + appTypeString);
`^
ApplicationSpecificInfoUpdateAfter^`
copyParcelGisObjects();
showDebug = true;
showMessage= true;
branch("EMSE:GlobalFlags");
branch("ASIUA:" + appTypeArray[0] + "/*/*/*");
branch("ASIUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ASIUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ASIUA:" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
branch("ASIUA:" + appTypeString);
`^
ApplicationSpecificInfoUpdateBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ASIUB:" + appTypeArray[0] + "/*/*/*");
branch("ASIUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ASIUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ASIUB:" + appTypeString);
`^
ApplicationStatusUpdateAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ASUA:" + appTypeArray[0] + "/*/*/*");
branch("ASUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ASUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ASUA:" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
branch("ASUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
branch("ASUA:" + appTypeString);
`^
ApplicationStatusUpdateBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ASUB:" + appTypeArray[0] + "/*/*/*");
branch("ASUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ASUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ASUB:" + appTypeString);
`^
ApplicationSubmitAfter^`
copyParcelGisObjects();
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ASA:" + appTypeArray[0] + "/*/*/*");
branch("ASA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ASA:" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
branch("ASA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ASA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
branch("ASA:" + appTypeString);
`^
ApplicationSubmitBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ASB:" + appTypeArray[0] + "/*/*/*");
branch("ASB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ASB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ASB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
branch("ASB:" + appTypeString);
`^
CAA;Building!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CAA;Enforcement!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CAA;Licenses!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CAA;Permits!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CAA;Planning!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CAA;ServiceRequest!~!~!~^`
branch("EMSE:SetContactRelationshipToContactType");
`^
CAEConditionUpdateAfter^`
showDebug = true;
showMessage = false;
aa.print("Test");
`^
CEA;Enforcement!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CEA;Licenses!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CEA;Permits!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CEA;Planning!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CEA;ServiceRequest!~!~!~^`
branch("EMSE:SetContactRelationshipToContactType");
`^
CTRCA;Building!~!~!~^`
if (cap.isCreatedByACA()) {
	closeTask("Application Submittal","Accepted","Online Permit - Updated by Script","");
	closeTask("Permit Issuance","Issued","Online Permit - Updated by Script","");
	}
`^
CTRCA;Licenses!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CTRCA;Licenses!~!~!Renewal^`
aa.runScriptInNewTransaction("ConvertToRealCapAfter4Renew");
`^
CTRCA;Permits!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CTRCA;Planning!~!~!~^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

branch("EMSE:SetContactRelationshipToContactType");
`^
CTRCA;ServiceRequest!~!~!~^`
branch("EMSE:ServiceRequestDuplicateCheck");
branch("EMSE:SetContactRelationshipToContactType");
`^
ContactAddAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("CAA:" + appTypeArray[0] + "/*/*/*");
branch("CAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CAA:" + appTypeString);
`^
ContactAddBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("CAB:" + appTypeArray[0] + "/*/*/*");
branch("CAB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CAB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CAB:" + appTypeString);
`^
ContactEditAfter^`
showDebug = true;
showMessage= true;
branch("EMSE:GlobalFlags");
branch("CEA:" + appTypeArray[0] + "/*/*/*");
branch("CEA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CEA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CEA:" + appTypeString);
`^
ContactEditBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("CEB:" + appTypeArray[0] + "/*/*/*");
branch("CEB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CEB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CEB:" + appTypeString);
`^
ContactRemoveAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("CRA:" + appTypeArray[0] + "/*/*/*");
branch("CRA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CRA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CRA:" + appTypeString);
`^
ContactRemoveBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("CRB:" + appTypeArray[0] + "/*/*/*");
branch("CRB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CRB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CRB:" + appTypeString);
`^
ConvertToRealCapAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("CTRCA:" + appTypeArray[0] + "/*/*/*");
branch("CTRCA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("CTRCA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("CTRCA:" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
branch("CTRCA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
branch("CTRCA:" + appTypeString);
`^
DocumentUploadAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("DUA:" + appTypeArray[0] + "/*/*/*");
branch("DUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("DUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("DUA:" + appTypeString);
`^
DocumentUploadBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("DUB:" + appTypeArray[0] + "/*/*/*");
branch("DUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("DUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("DUB:" + appTypeString);
`^
EMSE; APO Load Attributes^`
showMessage = true;
showDebug = 1;
var today = new Date();
today = Date(aa.date.currentDate);
var aName;
var aPh;
var lpaName;
var lpaPhone;
var ownerInfo;
var feeTotal;
var aName;
var par = aa.parcel.getParcelandAttribute(capId,null);
feeTotal = AInfo['Env After the Fact Fee'] + AInfo['Initial Fee'] + AInfo['Board Adjustment to Fees'] + (AInfo['Number of Days']*AInfo['Per Day Fee']);
if (par.getSuccess()) {
	parcels = par.getOutput().toArray();
	for (x in parcels) pid = parcels[x].getParcelNumber();
	logDebug(pid);
	}

capAltId = capId.getCustomID();
addr = getCapAddress(capId);
BalanceDue = AInfo['Total Fees and Fines'];
if (appTypeArray[1] == "Code Complaint" && getAppSpecific("Complete") == null && getAppSpecific("FEE_INTITIAL - INITIAL FEE CHARGED") != null && getAppSpecific("Initial Fee") == null) {
	editAppSpecific("Initial Fee",AInfo['FEE_INTITIAL - INITIAL FEE CHARGED']);
	}

if (appTypeArray[1] == "Code Complaint" && getAppSpecific("Complete") == null && getAppSpecific("FEE_PERDAY - FEE AMOUNT PER DAY") != null && getAppSpecific("Per Day Fee") == null) {
	editAppSpecific("Per Day Fee",AInfo['FEE_PERDAY - FEE AMOUNT PER DAY']);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Junk" && getAppSpecific("Complete") == null && (AInfo['ParcelAttribute.VIR_JUNK_CD_NUM'] == null || AInfo['ParcelAttribute.VIR_JUNK_CD_NUM'] == capIDString )) {
	editRefParcelAttribute("VIR_JUNK_CD_NUM", capIDString, pid);
	editRefParcelAttribute("VIR_Y/N_JUNK_CMP", "Y", pid);
	editRefParcelAttribute("VIR_JUNK_CD_STAT",capStatus , pid);
	editRefParcelAttribute("VIR_JUNK_CD_BAL",AInfo['Total Fees and Fines'], pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Mowing" && getAppSpecific("Complete") == null && (AInfo['ParcelAttribute.VIR_MOW_CD_NUM'] == null || AInfo['ParcelAttribute.VIR_MOW_CD_NUM'] == capIDString )) {
	editRefParcelAttribute("VIR_MOW_CD_NUM", capIDString, pid);
	editRefParcelAttribute("VIR_Y/N_MOW_CMPT", "Yes", pid);
	editRefParcelAttribute("VIR_MOW_CD_STAT",capStatus , pid);
	editRefParcelAttribute("VIR_MOW_CD_BAL",AInfo['Total Fees and Fines'] , pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Abandoned Property Registry" && getAppSpecific("Complete") == null && (AInfo['ParcelAttribute.VIR_APR_CD_NUM'] == null || AInfo['ParcelAttribute.VIR_APR_CD_NUM'] == capIDString )) {
	editRefParcelAttribute("VIR_APR_CD_NUM", capIDString, pid);
	editRefParcelAttribute("VIR_Y/N_APR_CMPT", "Yes", pid);
	editRefParcelAttribute("VIR_APR_CD_STAT",capStatus , pid);
	editRefParcelAttribute("VIR_APR_CD_BAL",AInfo['Total Fees and Fines'] , pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Address Posting" && getAppSpecific("Complete") == null && (AInfo['ParcelAttribute.VIR_ADD_CD_NUM'] == null || AInfo['ParcelAttribute.VIR_ADD_CD_NUM'] == capIDString )) {
	editRefParcelAttribute("VIR_ADD_CD_NUM", capIDString, pid);
	editRefParcelAttribute("VIR_Y/N_ADD_CMPT", "Yes", pid);
	editRefParcelAttribute("VIR_ADD_CD_STAT",capStatus , pid);
	editRefParcelAttribute("VIR_ADD_CD_BAL",AInfo['Total Fees and Fines'] , pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Building Code" && getAppSpecific("Complete") == null && (AInfo['ParcelAttribute.VIR_BLD_CD_NUM'] == null || AInfo['ParcelAttribute.VIR_BLD_CD_NUM'] == capIDString )) {
	editRefParcelAttribute("VIR_BLD_CD_NUM", capIDString, pid);
	editRefParcelAttribute("VIR_Y/N_BLD_CMPT", "Yes", pid);
	editRefParcelAttribute("VIR_BLD_CD_STAT",capStatus , pid);
	editRefParcelAttribute("VIR_BLD_CD_BAL",AInfo['Total Fees and Fines'] , pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Environmental" && getAppSpecific("Complete") == null && (AInfo['ParcelAttribute.VIR_ENV_CD_NUM'] == null || AInfo['ParcelAttribute.VIR_ENV_CD_NUM'] == capIDString )) {
	editRefParcelAttribute("VIR_ENV_CD_NUM", capIDString, pid);
	editRefParcelAttribute("VIR_Y/N_ENV_CMPT", "Yes", pid);
	editRefParcelAttribute("VIR_ENV_CD_STAT",capStatus , pid);
	editRefParcelAttribute("VIR_ENV_CD_BAL",AInfo['Total Fees and Fines'] , pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Filthy Fluids" && getAppSpecific("Complete") == null && (AInfo['ParcelAttribute.VIR_FFL_CD_NUM'] == null || AInfo['ParcelAttribute.VIR_FFL_CD_NUM'] == capIDString )) {
	editRefParcelAttribute("VIR_FFL_CD_NUM", capIDString, pid);
	editRefParcelAttribute("VIR_Y/N_FFL_CMPT", "Yes", pid);
	editRefParcelAttribute("VIR_FFL_CD_STAT",capStatus , pid);
	editRefParcelAttribute("VIR_FFL_CD_BAL",AInfo['Total Fees and Fines'] , pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Fire Code" && getAppSpecific("Complete") == null && (AInfo['ParcelAttribute.VIR_FIRE_CD_NUM'] == null || AInfo['ParcelAttribute.VIR_FIRE_CD_NUM'] == capIDString )) {
	editRefParcelAttribute("VIR_FIRE_CD_NUM", capIDString, pid);
	editRefParcelAttribute("VIR_Y/N_FIRE_CMP", "Yes", pid);
	editRefParcelAttribute("VIR_FIRE_CD_STAT",capStatus , pid);
	editRefParcelAttribute("VIR_FIRE_CD_BAL",AInfo['Total Fees and Fines'] , pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Refueling Assistance" && getAppSpecific("Complete") == null && (AInfo['ParcelAttribute.VIR_RAP_CD_NUM'] == null || AInfo['ParcelAttribute.VIR_RAP_CD_NUM'] == capIDString )) {
	editRefParcelAttribute("VIR_RAP_CD_NUM", capIDString, pid);
	editRefParcelAttribute("VIR_Y/N_RAP_CMPT", "Yes", pid);
	editRefParcelAttribute("VIR_RAP_CD_STAT",capStatus , pid);
	editRefParcelAttribute("VIR_RAP_CD_BAL",AInfo['Total Fees and Fines'] , pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Zoning" && getAppSpecific("Complete") == null && (AInfo['ParcelAttribute.VIR_ZON_CD_NUM'] == null || AInfo['ParcelAttribute.VIR_ZON_CD_NUM'] == capIDString )) {
	editRefParcelAttribute("VIR_ZON_CD_NUM", capIDString, pid);
	editRefParcelAttribute("VIR_Y/N_ZON_CMPT", "Y", pid);
	editRefParcelAttribute("VIR_ZON_CD_STAT",capStatus , pid);
	editRefParcelAttribute("VIR_ZON_CD_BAL",AInfo['Total Fees and Fines'] , pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Zoning" && getAppSpecific("Complete") != null && (AInfo['ParcelAttribute.VIR_ZON_CD_NUM'] == capIDString || AInfo['ParcelAttribute.VIR_ZON_CD_NUM'] == null)) {
	editRefParcelAttribute("VIR_ZON_CD_NUM", null, pid);
	editRefParcelAttribute("VIR_Y/N_ZON_CMPT",null, pid);
	editRefParcelAttribute("VIR_ZON_CD_STAT",null, pid);
	editRefParcelAttribute("VIR_ZON_CD_BAL",null, pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Junk" && getAppSpecific("Complete") != null && AInfo['ParcelAttribute.VIR_JUNK_CD_NUM'] == capIDString) {
	editRefParcelAttribute("VIR_JUNK_CD_NUM", null, pid);
	editRefParcelAttribute("VIR_Y/N_JUNK_CMP",null , pid);
	editRefParcelAttribute("VIR_JUNK_CD_STAT",null, pid);
	editRefParcelAttribute("VIR_JUNK_CD_BAL",null, pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Address Posting" && getAppSpecific("Complete") != null && AInfo['ParcelAttribute.VIR_ADD_CD_NUM'] == capIDString) {
	editRefParcelAttribute("VIR_ADD_CD_NUM", null, pid);
	editRefParcelAttribute("VIR_Y/N_ADD_CMPT", null, pid);
	editRefParcelAttribute("VIR_ADD_CD_STAT",null, pid);
	editRefParcelAttribute("VIR_ADD_CD_BAL",null, pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Abandoned Property Registry" && getAppSpecific("Complete") != null && AInfo['ParcelAttribute.VIR_APR_CD_NUM'] == capIDString) {
	editRefParcelAttribute("VIR_APR_CD_NUM", null, pid);
	editRefParcelAttribute("VIR_Y/N_APR_CMPT",null, pid);
	editRefParcelAttribute("VIR_APR_CD_STAT",null, pid);
	editRefParcelAttribute("VIR_APR_CD_BAL",null, pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Building Code" && getAppSpecific("Complete") != null && AInfo['ParcelAttribute.VIR_BLD_CD_NUM'] == capIDString) {
	editRefParcelAttribute("VIR_BLD_CD_NUM", null, pid);
	editRefParcelAttribute("VIR_Y/N_BLD_CMPT", null, pid);
	editRefParcelAttribute("VIR_BLD_CD_STAT",null, pid);
	editRefParcelAttribute("VIR_BLD_CD_BAL",null, pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Environmental" && getAppSpecific("Complete") != null && AInfo['ParcelAttribute.VIR_ENV_CD_NUM'] == capIDString) {
	editRefParcelAttribute("VIR_ENV_CD_NUM", null, pid);
	editRefParcelAttribute("VIR_Y/N_ENV_CMPT",null, pid);
	editRefParcelAttribute("VIR_ENV_CD_STAT",null, pid);
	editRefParcelAttribute("VIR_ENV_CD_BAL",null, pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Filthy Fluids" && getAppSpecific("Complete") != null && AInfo['ParcelAttribute.VIR_FFL_CD_NUM'] == capIDString) {
	editRefParcelAttribute("VIR_FFL_CD_NUM", null, pid);
	editRefParcelAttribute("VIR_Y/N_FFL_CMPT", null, pid);
	editRefParcelAttribute("VIR_FFL_CD_STAT",null, pid);
	editRefParcelAttribute("VIR_FFL_CD_BAL",null, pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Mowing" && getAppSpecific("Complete") != null && AInfo['ParcelAttribute.VIR_MOW_CD_NUM'] == capIDString) {
	editRefParcelAttribute("VIR_MOW_CD_NUM", null, pid);
	editRefParcelAttribute("VIR_Y/N_MOW_CMPT", null, pid);
	editRefParcelAttribute("VIR_MOW_CD_STAT",null, pid);
	editRefParcelAttribute("VIR_MOW_CD_BAL",null, pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Fire Code" && getAppSpecific("Complete") != null && AInfo['ParcelAttribute.VIR_FIRE_CD_NUM'] == capIDString) {
	editRefParcelAttribute("VIR_FIRE_CD_NUM", null, pid);
	editRefParcelAttribute("VIR_Y/N_FIRE_CMP", null, pid);
	editRefParcelAttribute("VIR_FIRE_CD_STAT",null, pid);
	editRefParcelAttribute("VIR_FIRE_CD_BAL",null, pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Code Complaint" && appTypeArray[2] == "Refueling Assistance" && getAppSpecific("Complete") != null && AInfo['ParcelAttribute.VIR_RAP_CD_NUM'] == capIDString) {
	editRefParcelAttribute("VIR_RAP_CD_NUM", null, pid);
	editRefParcelAttribute("VIR_Y/N_RAP_CMPT", null, pid);
	editRefParcelAttribute("VIR_RAP_CD_STAT",null, pid);
	editRefParcelAttribute("VIR_RAP_CD_BAL",null, pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Abandoned Property Registry" && capStatus != "Closed") {
	var lpaName;
	var myLicNum;
	lpa = getLicenseProfessional(capId);
	for (x in lpa) if (lpa[x].getLicenseType().substring(0,16) == "Mortgage Company" && lpa[x].getPrintFlag() == "Y") lpaName = lpa[x].getBusinessName();
	myLicNum = lpa[x].getLicenseNbr();
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Abandoned Property Registry" && capStatus != "Closed" && (AInfo['ParcelAttribute.VIR_APR_NUM'] == null || AInfo['ParcelAttribute.VIR_APR_NUM'] == capIDString )) {
	editRefParcelAttribute("VIR_APR_NUM", capIDString, pid);
	editRefParcelAttribute("VIR_APR_MC", lpaName, pid);
	editRefParcelAttribute("VIR_APR_STAT",capStatus , pid);
	editRefParcelAttribute("VIR_APR_LICNUM",myLicNum, pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Abandoned Property Registry" && capStatus == "Closed" && (AInfo['ParcelAttribute.VIR_APR_NUM'] == null || AInfo['ParcelAttribute.VIR_APR_NUM'] == capIDString )) {
	editRefParcelAttribute("VIR_APR_NUM", null, pid);
	editRefParcelAttribute("VIR_APR_MC", null, pid);
	editRefParcelAttribute("VIR_APR_STAT",null, pid);
	editRefParcelAttribute("VIR_APR_LICNUM",null, pid);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Compliance Certificate" && AInfo['ParcelAttribute.VIR_BLD_CD_NUM'] == null) {
	editAppSpecific("Open Code Bld Balance",0);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Compliance Certificate" && AInfo['ParcelAttribute.VIR_ENV_CD_NUM'] == null) {
	editAppSpecific("Open Code Env Balance",0);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Compliance Certificate" && AInfo['ParcelAttribute.VIR_ZON_CD_NUM'] == null) {
	editAppSpecific("Open Code Zoning Balance",0);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Compliance Certificate" && AInfo['ParcelAttribute.VIR_JUNK_CD_NUM'] == null) {
	editAppSpecific("Open Code Junk Balance",0);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Compliance Certificate" && AInfo['ParcelAttribute.VIR_ADD_CD_NUM'] == null) {
	editAppSpecific("Open Code Addressing Balance",0);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Compliance Certificate" && AInfo['ParcelAttribute.VIR_FIRE_CD_NUM'] == null) {
	editAppSpecific("Open Code Fire Balance",0);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Compliance Certificate" && AInfo['ParcelAttribute.VIR_FFL_CD_NUM'] == null) {
	editAppSpecific("Open Code Filthy Fluids Balance",0);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Compliance Certificate" && AInfo['ParcelAttribute.VIR_MOW_CD_NUM'] == null) {
	editAppSpecific("Open Code Mowing Balance",0);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Compliance Certificate" && AInfo['ParcelAttribute.VIR_RAP_CD_NUM'] == null) {
	editAppSpecific("Open Code Refueling Assistance Program Balance",0);
	}

if (appTypeArray[0] == "CodeCompliance" && appTypeArray[1] == "Compliance Certificate" && AInfo['ParcelAttribute.VIR_APR_CD_NUM'] == null) {
	editAppSpecific("Open Code Abandoned Property Registry Balance",0);
	}
`^
EMSE; ProjectDox^`
showMessage = true;
myPemitNum = "";
myAppFName = "";
myAppEM = "";
myAppLName = "";
myVarPD = "";
varPD1 = "";
varPD2 = "";
varPD3 = "";
varPD4 = "";
varPD5 = "";
varPD6 = "";
varPD6C = "";
varPD7 = "";
varPD8 = "";
varPD9 = "";
varPD10 = "";
applicationNum = "";
altid = "";
var pDoxUrl;
var permitNumber;
var permitDescription;
var submitterFName;
var submitterLName;
var submitterEmail;
var projectGroup;
var ownerFName;
var owerLName;
var ownerEmail;
var projectTemplateId;
var siteGroupName;
var notifyOwnerOnFileAdd;
var securityToken;
var iMarkupXmlFileName;
var connect;
var eq;
var locationParcel;
var pDoxUrlUpDateLoc;
var zoningTypeClass;
var pdStatus;
var varPD11;
var myVarPDUd;
var varPDUd;
var nameofProject;
var par = aa.parcel.getParcelandAttribute(capId,null);
var z1;
var securityTokenUd;
pdCreate = 0*1;
var emailAddress;
var fullName;
ca = new Array();
ca = getContactArray();
for (y in ca) if (ca[y]["contactType"] == "Applicant") emailAddress = ca[y]["email"];
for (y in ca) if (ca[y]["contactType"] == "Applicant") fullName = ca[y]["fullName"];
if (par.getSuccess()) {
	parcels = par.getOutput().toArray();
	for (x in parcels) pid = parcels[x].getParcelNumber();
	}

pDoxUrl = "http://edocuments.leoncountyfl.gov/projectdox/integration/websvcapi/projectdoxproject.asmx/AddProjectUserOwnerBatch?";
varPDUd = "http://edocuments.leoncountyfl.gov/projectdox/integration/websvcapi/projectdoxproject.asmx/UpdateProjectViaProjectName?ProjectNameOfProjectToUpdate=";
permitNumber = "PermitNumber="+ capIDString + "&";
permitDescription ="PermitDescription=" + appTypeArray[2] + " " + appTypeArray[1] + " " + capName +"&";
submitterFName = "SubmitterFName=_&";
submitterLName = "SubmitterLName=" + fullName + "&";
submitterEmail = "SubmitterEmail=" + emailAddress + "&";
parcelId = pid;
locationParcel = "FieldToUpdate=Location&NewValue=" + pid +"&";
securityToken = "DCBECA73-89E7-4776-A095-0BAB15960EBF";
zoningTypeClass = "FieldToUpdate=StatusInfo&NewValue=" + AInfo['ParcelAttribute.ZONE_1'] + " / " + AInfo['Improvement Type'] + "-" + AInfo['Class Type'] +"&";
pdStatus = "FieldToUpdate=Status&NewValue="+"Waiting on Files Upload" +"&";
nameofProject = capIDString + "&";
securityTokenUd = "SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF";
if (appTypeArray[1] == "Commercial") {
	varPD6 = "&ProjectGroup=DSEM 11 Bld Applicant&OwnerFname=Jud&OwnerLName=Allen&OwnerEmail=AllenJud@leoncountyfl.gov&ProjectTemplateID=21&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[1] == "Residential") {
	varPD6 = "&ProjectGroup=DSEM 11 Bld Applicant&OwnerFname=Jud&OwnerLName=Allen&OwnerEmail=AllenJud@leoncountyfl.gov&ProjectTemplateID=8&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[1] == "EMP Permit") {
	varPD6 = "&ProjectGroup=ENV Applicant Group&OwnerFname=Nawfal&OwnerLName=Ezzagaghi&OwnerEmail=EzzagaghiN@leoncountyfl.gov&ProjectTemplateID=19&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[1] == "Environmental Impact Analysis") {
	varPD6 = "&ProjectGroup=ENV Applicant Group&OwnerFname=Nawfal&OwnerLName=Ezzagaghi&OwnerEmail=EzzagaghiN@leoncountyfl.gov&ProjectTemplateID=16&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "Natural Features Inventory") {
	varPD6 = "&ProjectGroup=ENV Applicant Group&OwnerFname=Nawfal&OwnerLName=Ezzagaghi&OwnerEmail=EzzagaghiN@leoncountyfl.gov&ProjectTemplateID=14&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[1] == "Driveway Permit") {
	varPD6 = "&ProjectGroup=DSEM Bld Applicant&OwnerFname=Nawfal&OwnerLName=Ezzagaghi&OwnerEmail=EzzagaghiN@leoncountyfl.gov&ProjectTemplateID=32&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "Policy 219") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=24&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "Exempt Process") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=25&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "Other") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=26&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "Administrative Streamlined App") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=23&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "Limited Partition") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=23&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "Concept Plan Approval - Type A") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=10&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "FDPA - Type A") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=10&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "Concept Plan Approval - Type B") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=10&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "FDPA - Type B") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=10&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "Concept Plan Approval - Type C") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=10&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "FDPA - Type C") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=10&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "Type D") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=10&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (appTypeArray[2] == "Type D Planned Unit Dev") {
	varPD6 = "&ProjectGroup=DSEM Site Plan Applicant&OwnerFname=Scott&OwnerLName=Brockmeier&OwnerEmail=BrockmeierS@leoncountyfl.gov&ProjectTemplateID=10&SiteGroupName=Growth Applicant&NotifyOwnerOnFileAdd=False&SecurityToken=DCBECA73-89E7-4776-A095-0BAB15960EBF&iMarkupXmFileName=";
	}

if (AInfo['ProjectDox Review'] == "CHECKED" && AInfo['ProjectDox Project Created'] == "UNCHECKED" || AInfo['ProjectDox Review'] == "CHECKED" && AInfo['ProjectDox Project Created'] == null) {
	myVarPD = pDoxUrl + permitNumber + permitDescription + submitterFName + submitterLName + submitterEmail + varPD6;
	editAppSpecific("ProjectDox Project Created","CHECKED");
	editAppSpecific("ProjectDox Name",capIDString);
	showMessage = false;
	openUrlInNewWindow(myVarPD);
	pdCreate = pdCreate +1;
	}

if (pdCreate < 1 &&AInfo['ProjectDox Review'] == "CHECKED" && AInfo['ProjectDox Project Created'] == "CHECKED" && AInfo['ProjectDox Email Number'] == null) {
	myVarPDUd = varPDUd + nameofProject + locationParcel + securityTokenUd;
	openUrlInNewWindow(myVarPDUd);
	}

if (pdCreate < 1 &&AInfo['ProjectDox Review'] == "CHECKED" && AInfo['ProjectDox Project Created'] == "CHECKED" && AInfo['ProjectDox Email Number'] == null) {
	myVarPDUd = varPDUd + nameofProject + zoningTypeClass + securityTokenUd;
	openUrlInNewWindow(myVarPDUd);
	}

if (pdCreate < 1 &&AInfo['ProjectDox Review'] == "CHECKED" && AInfo['ProjectDox Project Created'] == "CHECKED" && AInfo['ProjectDox Email Number'] == null) {
	myVarPDUd = varPDUd + nameofProject + pdStatus + securityTokenUd;
	openUrlInNewWindow(myVarPDUd);
	}

if (capName |= null && AInfo['ProjectDox Review'] == "CHECKED" && AInfo['ProjectDox Project Created'] == "CHECKED") {
	permitDescription = "FieldToUpdate=Description&NewValue="+ capName +"&";
	myVarPDUd = varPDUd + nameofProject + permitDescription + securityTokenUd;
	openUrlInNewWindow(myVarPDUd);
	}
`^
EMSE;ASI Copy Exceptions^`
if (Weight|Age) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (Gross Annual Sales) {
	}

if (State License Expiration Date|Currently Bonded) {
	}

if (State License Expiration Date|Currently Bonded) {
	}

if (State License Expiration Date|Currently Bonded) {
	}

if (State License Expiration Date|Currently Bonded) {
	}
`^
EMSE;Add-Inspections-Building^`
bldInsp = 0*1;
elecInsp = 0*1;
plumbInsp = 0*1;
mechInsp = 0*1;
envInsp = 0*1;
septicInsp = 0*1;
sewerInsp = 0*1;
signInsp = 0*1;
gasInsp = 0*1;
mhInsp = 0*1;
pvInsp = 0*1;
faInsp = 0*1;
poolInsp = 0*1;
demoInsp = 0*1;
fireInsp = 0*1;
drivewayInsp = 0*1;
nocInsp = 0*1;
wElecInsp = 0*1;
wMechInsp = 0*1;
wPlumbInsp = 0*1;
wDoorInsp = 0*1;
wPoolInsp = 0*1;
wRoofInsp = 0*1;
wSolarPVInsp = 0*1;
wSolarTHInsp = 0*1;
wRoofInsp = 0*1;
allInspComplete = 0*1;
allInspReq = 0*1;
var today = new Date();
today = Date(aa.date.currentDate);
if (feeExists("5004-010","INVOICED") == true) {
	mechInsp = mechInsp +1;
	}

if (feeExists("5004-015","INVOICED") == true) {
	mechInsp = mechInsp +1;
	}

if (feeExists("5004-020","INVOICED") == true) {
	mechInsp = mechInsp +1;
	}

if (feeExists("5008-003","INVOICED") == true) {
	gasInsp  = gasInsp  +1;
	}

if (feeExists("5008-005","INVOICED") == true) {
	gasInsp  = gasInsp  +1;
	}

if (feeExists("5008-010","INVOICED") == true) {
	gasInsp  = gasInsp  +1;
	}

if (feeExists("5008-001","INVOICED") == true) {
	gasInsp  = gasInsp  +1;
	}

if (feeExists("5008-015","INVOICED") == true) {
	gasInsp  = gasInsp  +1;
	}

if (feeExists("5006-010","INVOICED") == true) {
	plumbInsp  = plumbInsp  +1;
	}

if (feeExists("5006-025","INVOICED") == true) {
	plumbInsp  = plumbInsp  +1;
	}

if (feeExists("5006-030","INVOICED") == true) {
	plumbInsp  = plumbInsp  +1;
	}

if (feeExists("5006-040","INVOICED") == true) {
	plumbInsp  = plumbInsp  +1;
	}

if (feeExists("5006-045","INVOICED") == true) {
	plumbInsp  = plumbInsp  +1;
	}

if (feeExists("5006-010","INVOICED") == true) {
	plumbInsp  = plumbInsp  +1;
	}

if (feeExists("5002-010","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-050","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-015","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-035","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-030","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-080","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-040","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-085","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-045","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-090","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-095","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-100","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-105","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-110","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-115","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-120","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-125","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-130","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-135","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-140","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-145","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-150","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-155","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-160","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-165","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-170","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-175","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-020","INVOICED") == true) {
	elecInsp  = elecInsp  + 1;
	signInsp = signInsp + 1;
	}

if (feeExists("5002-025","INVOICED") == true) {
	elecInsp  = elecInsp  + 1;
	signInsp = signInsp + 1;
	}

if (feeExists("5002-055","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-,060","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-,065","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-070","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-075","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5002-180","INVOICED") == true) {
	elecInsp  = elecInsp  +1;
	}

if (feeExists("5010-020","INVOICED") == true) {
	bldInsp  = bldInsp  +1;
	}

if (feeExists("5010-010","INVOICED") == true) {
	bldInsp  = bldInsp  +1;
	}

if (feeExists("5010-025","INVOICED") == true) {
	bldInsp  = bldInsp  +1;
	}

if (feeExists("5010-015","INVOICED") == true) {
	bldInsp  = bldInsp  +1;
	}

if (feeExists("5010-055","INVOICED") == true) {
	bldInsp  = bldInsp  +1;
	}

if (feeExists("5010-045","INVOICED") == true) {
	bldInsp  = bldInsp  +1;
	}

if (feeExists("5010-030","INVOICED") == true) {
	bldInsp  = bldInsp  +1;
	}

if (feeExists("5010-050","INVOICED") == true) {
	bldInsp  = bldInsp  +1;
	}

if (feeExists("5010-060","INVOICED") == true) {
	bldInsp  = bldInsp  +1;
	}

if (feeExists("5040-010","INVOICED") == true) {
	mhInsp = mhInsp +1;
	}

if (feeExists("5010-035","INVOICED") == true) {
	poolInsp = poolInsp +1;
	}

if (feeExists("5010-040","INVOICED") == true) {
	poolInsp = poolInsp +1;
	}

if (feeExists("7015-010","INVOICED") == true) {
	envInsp = envInsp +1;
	}

if (feeExists("7015-012","INVOICED") == true) {
	envInsp = envInsp +1;
	}

if (feeExists("7015-013","INVOICED") == true) {
	envInsp = envInsp +1;
	}

if (feeExists("5020-010","INVOICED") == true) {
	fireInsp = fireInsp +1;
	}

if (feeExists("5020-015","INVOICED") == true) {
	fireInsp = fireInsp +1;
	}

if (feeExists("5017-010","INVOICED") == true) {
	nocInsp = nocInsp +1;
	}

if (feeExists("5007-010","INVOICED") == true) {
	wSolarPVInsp = wSolarPVInsp +1;
	}

if (feeExists("5007-015","INVOICED") == true) {
	wSolarTHInsp = wSolarTHInsp +1;
	}

if (appTypeArray[0] == "Building" && !appTypeArray[1] == "VelocityHall" && getAppSpecific("Improvement Type") != "Mechanical Only" && getAppSpecific("Valuation of Work Performed") >= 2500 && !isScheduled("505: Notice of Commencement")) {
	createPendingInspection("L-INSP_ALL","505: Notice of Commencement");
	}

if (appTypeArray[0] == "Building" && !appTypeArray[1] == "VelocityHall" && getAppSpecific("Improvement Type") == "Mechanical Only" && getAppSpecific("Valuation of Work Performed") >= 7500 && !isScheduled("505: Notice of Commencement")) {
	createPendingInspection("L-INSP_ALL","505: Notice of Commencement");
	}

if (matches(appTypeArray[2],"New","Addition","Multi-Family","Accessory Structure","Pool","Sign","Manufactured Home","Demolition","New Industrial","Foundation")) {
	envInsp = envInsp +1;
	}

if (AInfo['Driveway Permit Required'] == "Yes") {
	drivewayInsp = drivewayInsp +1;
	}

if (AInfo['Sewer System Type'] == "Septic") {
	septicInsp = septicInsp +1;
	}

if (AInfo['Sewer System Type'] == "Sewer") {
	sewerInsp = sewerInsp +1;
	}

if (AInfo['Photovoltaic System'] == "CHECKED") {
	pvInsp = pvInsp +1;
	}

if (AInfo['Fire Alarm'] == "CHECKED") {
	faInsp = faInsp +1;
	}

if (AInfo['Improvement Type'] == "Signs") {
	signInsp = signInsp + 1;
	}

if (isScheduled("600: Intent to Proceed Environmental")) {
	envInsp = envInsp * 0;
	}

if (checkInspectionResult("900: Building Final","Pending") || checkInspectionResult("900: Building Final","Information") || checkInspectionResult("900: Building Final","Approved") || checkInspectionResult("900: Building Final","Denied") || checkInspectionResult("900: Building Final","Correction Notice") || checkInspectionResult("900: Building Final","Partial Approval") || checkInspectionResult("900: Building Final","Approved By Script") || checkInspectionResult("900: Building Final","Cancelled") || checkInspectionResult("900: Building Final","Scheduled")) {
	bldInsp = 0*1;
	}

if (checkInspectionResult("901: Electrical Final","Pending") ||checkInspectionResult("901: Electrical Final","Information")|| checkInspectionResult("901: Electrical Final","Approved") || checkInspectionResult("901: Electrical Final","Denied") ||checkInspectionResult("901: Electrical Final","Correction Notice") || checkInspectionResult("901: Electrical Final","Partial Approval") || checkInspectionResult("901: Electrical Final","Approved By Script") || checkInspectionResult("901: Electrical Final","Cancelled") || checkInspectionResult("901: Electrical Final","Scheduled")) {
	elecInsp = 0*1;
	}

if (checkInspectionResult("902: Gas Final","Pending") ||checkInspectionResult("902: Gas Final","Information")|| checkInspectionResult("902: Gas Final","Approved") || checkInspectionResult("902: Gas Final","Denied") ||checkInspectionResult("902: Gas Final","Correction Notice") || checkInspectionResult("902: Gas Final","Partial Approval") || checkInspectionResult("902: Gas Final","Approved By Script") || checkInspectionResult("902: Gas Final","Cancelled") || checkInspectionResult("902: Gas Final","Scheduled")) {
	gasInsp = 0*1;
	}

if (checkInspectionResult("903: Mechanical Final","Pending") || checkInspectionResult("903: Mechanical Final","Information") || checkInspectionResult("903: Mechanical Final","Approved") || checkInspectionResult("903: Mechanical Final","Denied") || checkInspectionResult("903: Mechanical Final","Correction Notice") || checkInspectionResult("903: Mechanical Final","Partial Approval") || checkInspectionResult("903: Mechanical Final","Approved By Script") || checkInspectionResult("903: Mechanical Final","Cancelled") || checkInspectionResult("903: Mechanical Final","Scheduled")) {
	mechInsp = 0*1;
	}

if (checkInspectionResult("905: Plumbing Final","Pending") || checkInspectionResult("905: Plumbing Final","Information") || checkInspectionResult("905: Plumbing Final","Approved") || checkInspectionResult("905: Plumbing Final","Denied") || checkInspectionResult("905: Plumbing Final","Correction Notice") || checkInspectionResult("905: Plumbing Final","Partial Approval") || checkInspectionResult("905: Plumbing Final","Approved By Script") || checkInspectionResult("905: Plumbing Final","Cancelled") || checkInspectionResult("905: Plumbing Final","Scheduled")) {
	plumbInsp = 0*1;
	}

if (checkInspectionResult("908: Fire Final","Pending") || checkInspectionResult("908: Fire Final","Information") || checkInspectionResult("908: Fire Final","Approved") || checkInspectionResult("908: Fire Final","Denied") || checkInspectionResult("908: Fire Final","Correction Notice") || checkInspectionResult("908: Fire Final","Partial Approval") || checkInspectionResult("908: Fire Final","Approved By Script") || checkInspectionResult("908: Fire Final","Cancelled") || checkInspectionResult("908: Fire Final","Scheduled")) {
	fireInsp = 0*1;
	}

if (checkInspectionResult("904: Mobile Home Final","Pending") || checkInspectionResult("904: Mobile Home Final","Information") || checkInspectionResult("904: Mobile Home Final","Approved") || checkInspectionResult("904: Mobile Home Final","Denied") || checkInspectionResult("904: Mobile Home Final","Correction Notice") || checkInspectionResult("904: Mobile Home Final","Partial Approval") || checkInspectionResult("904: Mobile Home Final","Approved By Script") || checkInspectionResult("904: Mobile Home Final","Cancelled") || checkInspectionResult("904: Mobile Home Final","Scheduled")) {
	mhInsp = 0*1;
	}

if (checkInspectionResult("916: Swimming Pool Final","Pending") || checkInspectionResult("916: Swimming Pool Final","Information") || checkInspectionResult("916: Swimming Pool Final","Approved") || checkInspectionResult("916: Swimming Pool Final","Denied") || checkInspectionResult("916: Swimming Pool Final","Correction Notice") || checkInspectionResult("916: Swimming Pool Final","Partial Approval") || checkInspectionResult("916: Swimming Pool Final","Approved By Script") || checkInspectionResult("916: Swimming Pool Final","Cancelled") || checkInspectionResult("916: Swimming Pool Final","Scheduled")) {
	poolInsp = 0*1;
	}

if (checkInspectionResult("505: Notice of Commencement","Pending") || checkInspectionResult("505: Notice of Commencement","Information") || checkInspectionResult("505: Notice of Commencement","Approved") || checkInspectionResult("505: Notice of Commencement","Denied") || checkInspectionResult("505: Notice of Commencement","Correction Notice") || checkInspectionResult("505: Notice of Commencement","Partial Approval") || checkInspectionResult("505: Notice of Commencement","Approved By Script") || checkInspectionResult("505: Notice of Commencement","Cancelled") || checkInspectionResult("505: Notice of Commencement","Scheduled")) {
	nocInsp = 0*1;
	}

if (checkInspectionResult("909: Driveway Final","Pending") || checkInspectionResult("909: Driveway Final","Information") || checkInspectionResult("909: Driveway Final","Approved") || checkInspectionResult("909: Driveway Final","Denied") || checkInspectionResult("909: Driveway Final","Correction Notice") || checkInspectionResult("909: Driveway Final","Partial Approval") || checkInspectionResult("909: Driveway Final","Approved By Script") || checkInspectionResult("909: Driveway Final","Cancelled") || checkInspectionResult("909: Driveway Final","Scheduled")) {
	drivewayInsp = 0*1;
	}

if (checkInspectionResult("906: Sign Final","Pending") || checkInspectionResult("906: Sign Final","Information") || checkInspectionResult("906: Sign Final","Approved") || checkInspectionResult("906: Sign Final","Denied") || checkInspectionResult("906: Sign Final","Correction Notice") || checkInspectionResult("906: Sign Final","Partial Approval") || checkInspectionResult("906: Sign Final","Approved By Script") || checkInspectionResult("906: Sign Final","Cancelled") || checkInspectionResult("906: Sign Final","Scheduled")) {
	signInsp = 0*1;
	}

if (checkInspectionResult("911: Fire Alarm Final","Pending") || checkInspectionResult("911: Fire Alarm Final","Information") || checkInspectionResult("911: Fire Alarm Final","Approved") || checkInspectionResult("911: Fire Alarm Final","Denied") || checkInspectionResult("911: Fire Alarm Final","Correction Notice") || checkInspectionResult("911: Fire Alarm Final","Partial Approval") || checkInspectionResult("911: Fire Alarm Final","Approved By Script") || checkInspectionResult("911: Fire Alarm Final","Cancelled") || checkInspectionResult("911: Fire Alarm Final","Scheduled")) {
	faInsp = 0*1;
	}

if (checkInspectionResult("921: Solar PV Final","Pending") || checkInspectionResult("921: Solar PV Final","Information") || checkInspectionResult("921: Solar PV Final","Approved") || checkInspectionResult("921: Solar PV Final","Denied") || checkInspectionResult("921: Solar PV Final","Correction Notice") || checkInspectionResult("921: Solar PV Final","Partial Approval") || checkInspectionResult("921: Solar PV Final","Approved By Script") || checkInspectionResult("921: Solar PV Final","Cancelled") || checkInspectionResult("921: Solar PV Final","Scheduled")) {
	pvInsp = 0*1;
	}

if ((appMatch("Building/Residential/*/*") && bldInsp > 0) || (appMatch("Building/Commercial/*/*") && bldInsp > 0)) {
	createPendingInspection("L-INSP_ALL","100: Footing");
	createPendingInspection("L-INSP_ALL","101: Setbacks");
	createPendingInspection("L-INSP_ALL","102: Re-Bar");
	createPendingInspection("L-INSP_ALL","103: Lintel");
	createPendingInspection("L-INSP_ALL","104: Roof");
	createPendingInspection("L-INSP_ALL","105: Slab");
	createPendingInspection("L-INSP_ALL","106: Exterior Sheathing");
	createPendingInspection("L-INSP_ALL","107: Framing");
	createPendingInspection("L-INSP_ALL","108: Sprinklers");
	createPendingInspection("L-INSP_ALL","109: Insulation");
	createPendingInspection("L-INSP_ALL","110: Drywall");
	createPendingInspection("L-INSP_ALL","115: Roof Deck Re-Nail");
	createPendingInspection("L-INSP_ALL","116: Roof Secondary Barrier");
	createPendingInspection("L-INSP_ALL","199: Other Building");
	createPendingInspection("L-INSP_ALL","900: Building Final");
	}

if (appMatch("Building/*/Alteration/NA") && AInfo['Improvement Type'] == "Roof") {
	createPendingInspection("L-INSP_ALL","104: Roof");
	createPendingInspection("L-INSP_ALL","115: Roof Deck Re-Nail");
	createPendingInspection("L-INSP_ALL","116: Roof Secondary Barrier");
	createPendingInspection("L-INSP_ALL","505: Notice of Commencement");
	createPendingInspection("L-INSP_ALL","595: Re-Inspection");
	createPendingInspection("L-INSP_ALL","596: After Hours Inspection");
	createPendingInspection("L-INSP_ALL","917: Roofing Final");
	}

if (elecInsp > 0) {
	createPendingInspection("L-INSP_ALL","200: Electric Rough-In");
	createPendingInspection("L-INSP_ALL","201: Electric Rough Ceiling");
	createPendingInspection("L-INSP_ALL","202: Electric HVAC Changeout");
	createPendingInspection("L-INSP_ALL","203: Electric Service Changeout");
	createPendingInspection("L-INSP_ALL","204: Pool Electrical Bonding");
	createPendingInspection("L-INSP_ALL","205: Underground Electric");
	createPendingInspection("L-INSP_ALL","299: Other Electric");
	createPendingInspection("L-INSP_ALL","500: Temporary Power");
	createPendingInspection("L-INSP_ALL","501: Electrical Release");
	createPendingInspection("L-INSP_ALL","506: Notified Electric Provider");
	}

if (elecInsp > 0) {
	createPendingInspection("L-INSP_ALL","507: Talquin Temp Electric Release");
	createPendingInspection("L-INSP_ALL","508: Talquin Final Electric Release");
	createPendingInspection("L-INSP_ALL","509: Talquin New Cut-In & Res Meter Set");
	createPendingInspection("L-INSP_ALL","510: Talquin MH Cut-In & Meter Set");
	createPendingInspection("L-INSP_ALL","511: Talquin New Cut-In & Comm Meter Set");
	createPendingInspection("L-INSP_ALL","512: Talquin Temp Cut-In");
	createPendingInspection("L-INSP_ALL","513: Talquin Increase Service");
	createPendingInspection("L-INSP_ALL","514: Talquin Relocate Service");
	}

if (elecInsp > 0) {
	createPendingInspection("L-INSP_ALL","515: City New Cut-In & Residential Meter Set");
	createPendingInspection("L-INSP_ALL","516: City MH Cut-In & Meter Set");
	createPendingInspection("L-INSP_ALL","517: City Cut-In & Comm Meter Set");
	createPendingInspection("L-INSP_ALL","518: City Temp Cut-In");
	createPendingInspection("L-INSP_ALL","519: City Increase Service");
	createPendingInspection("L-INSP_ALL","520: City Relocate Service");
	createPendingInspection("L-INSP_ALL","521: City New Cut-In");
	createPendingInspection("L-INSP_ALL","522: City Residential Meter Set");
	createPendingInspection("L-INSP_ALL","523: City Comm Meter Set");
	createPendingInspection("L-INSP_ALL","524: City MH Meter Set");
	createPendingInspection("L-INSP_ALL","525: City Reseal Meter");
	createPendingInspection("L-INSP_ALL","526: City Reseal Meter Increase Service");
	createPendingInspection("L-INSP_ALL","527: City Reset Meter");
	createPendingInspection("L-INSP_ALL","528: City Reset Meter Increase Service");
	}

if (elecInsp > 0) {
	createPendingInspection("L-INSP_ALL","529: City Relocate Increase Service");
	createPendingInspection("L-INSP_ALL","530: City Reconnect Service");
	createPendingInspection("L-INSP_ALL","531: City Reconnect Increase Service");
	createPendingInspection("L-INSP_ALL","532: City House Meter");
	createPendingInspection("L-INSP_ALL","533: City New C/I Com Mtr Set W/CTS");
	createPendingInspection("L-INSP_ALL","534: City Interconnect Pwr Source");
	createPendingInspection("L-INSP_ALL","535: Talquin Interconncet Pwr Source");
	createPendingInspection("L-INSP_ALL","901: Electrical Final");
	}

if (appMatch("Building/Residential/*/*") && gasInsp > 0 || appMatch("Building/Commercial/*/*") && gasInsp > 0) {
	createPendingInspection("L-INSP_ALL","300: Gas Piping Test");
	createPendingInspection("L-INSP_ALL","307: Boiler");
	createPendingInspection("L-INSP_ALL","309: Underground Gas");
	createPendingInspection("L-INSP_ALL","310: Chill Water/Hot Water/Steam");
	createPendingInspection("L-INSP_ALL","398: Other Gas");
	createPendingInspection("L-INSP_ALL","502: Gas Meter Set Residential");
	createPendingInspection("L-INSP_ALL","503: Gas Meter Set Commercial");
	createPendingInspection("L-INSP_ALL","902: Gas Final");
	}

if (mechInsp > 0) {
	createPendingInspection("L-INSP_ALL","301: Ductwork");
	createPendingInspection("L-INSP_ALL","302: Range Hood");
	createPendingInspection("L-INSP_ALL","303: Refrigeration");
	createPendingInspection("L-INSP_ALL","304: Ventilation");
	createPendingInspection("L-INSP_ALL","305: HVAC");
	createPendingInspection("L-INSP_ALL","306: HVAC Chageout");
	createPendingInspection("L-INSP_ALL","308: Underground Mechanicial");
	createPendingInspection("L-INSP_ALL","310: Chill Water/Hot Water/Steam");
	createPendingInspection("L-INSP_ALL","399: Other Mechanicial");
	createPendingInspection("L-INSP_ALL","903: Mechanical Final");
	}

if (plumbInsp > 0) {
	createPendingInspection("L-INSP_ALL","400: Building Sewer");
	createPendingInspection("L-INSP_ALL","401: Plumbing Rough-In Slab");
	createPendingInspection("L-INSP_ALL","402: Plumbing Rough-In");
	createPendingInspection("L-INSP_ALL","403: Tub Set");
	createPendingInspection("L-INSP_ALL","404: Water Heater");
	createPendingInspection("L-INSP_ALL","405: Perculation");
	createPendingInspection("L-INSP_ALL","406: Septic");
	createPendingInspection("L-INSP_ALL","407: Water System");
	createPendingInspection("L-INSP_ALL","408: Mobile Home Sewer");
	createPendingInspection("L-INSP_ALL","409: Mobile Home Water");
	}

if (plumbInsp > 0) {
	createPendingInspection("L-INSP_ALL","410: COT Backflow Device");
	createPendingInspection("L-INSP_ALL","411: Talquin Backflow Device");
	createPendingInspection("L-INSP_ALL","412: Pool Pressure Test");
	createPendingInspection("L-INSP_ALL","499: Other Plumbing");
	createPendingInspection("L-INSP_ALL","905: Plumbing Final");
	}

if (envInsp > 0) {
	createPendingInspection("L-INSP_ALL","600: Intent to Proceed Environmental");
	createPendingInspection("L-INSP_ALL","601: Pre-Construction Environmental");
	createPendingInspection("L-INSP_ALL","640: Site Visit/Permit Review");
	createPendingInspection("L-INSP_ALL","660: Environmental Inspection");
	createPendingInspection("L-INSP_ALL","680: Notification/Official Letter");
	createPendingInspection("L-INSP_ALL","690: Consultation/Telephone Call");
	}

if (appMatch("Building/Commercial/*/*") && AInfo['Actual Improvement Area'] > 0) {
	createPendingInspection("L-INSP_ALL","605: Environmental Final Comm");
	}

if (appMatch("Building/Residential/*/*") && envInsp > 0) {
	createPendingInspection("L-INSP_ALL","605: Environmental Final Res");
	}

if (fireInsp > 0) {
	createPendingInspection("L-INSP_ALL","910: Firewalls");
	createPendingInspection("L-INSP_ALL","911: Fire Alarm Final");
	createPendingInspection("L-INSP_ALL","912: Fire Sprinkler Final");
	createPendingInspection("L-INSP_ALL","913: Fire SPR Interior Hydro");
	createPendingInspection("L-INSP_ALL","914: Fire SPR  Underground Hydro");
	createPendingInspection("L-INSP_ALL","908: Fire Final");
	}

if (mhInsp >0) {
	createPendingInspection("L-INSP_ALL","408: Mobile Home Sewer");
	createPendingInspection("L-INSP_ALL","409: Mobile Home Water");
	createPendingInspection("L-INSP_ALL","510: Talquin MH Cut-In & Meter Set");
	createPendingInspection("L-INSP_ALL","516: City MH Cut-In & Meter Set");
	createPendingInspection("L-INSP_ALL","524: City MH Meter Set");
	createPendingInspection("L-INSP_ALL","605: Environmental Final Res");
	createPendingInspection("L-INSP_ALL","660: Environmental Inspection");
	createPendingInspection("L-INSP_ALL","904: Mobile Home Final");
	}

if (poolInsp >0) {
	createPendingInspection("L-INSP_ALL","100: Footing");
	createPendingInspection("L-INSP_ALL","102: Re-Bar");
	createPendingInspection("L-INSP_ALL","105: Slab");
	createPendingInspection("L-INSP_ALL","111: Pool");
	createPendingInspection("L-INSP_ALL","112: Pool Fence Gate");
	createPendingInspection("L-INSP_ALL","113: Pool Re-Liner");
	createPendingInspection("L-INSP_ALL","204: Pool Electrical Bonding");
	createPendingInspection("L-INSP_ALL","412: Pool Pressure Test");
	createPendingInspection("L-INSP_ALL","916: Swimming Pool Final");
	createPendingInspection("L-INSP_ALL","660: Environmental Inspection");
	}

if (nocInsp >0) {
	createPendingInspection("L-INSP_ALL","505");
	}

if (drivewayInsp > 0) {
	createPendingInspection("L-INSP_ALL","800: Driveway Inspection");
	createPendingInspection("L-INSP_ALL","909: Driveway Final");
	}

if (appMatch("Building/*/Sign/*") && signInsp > 0) {
	createPendingInspection("L-INSP_ALL","100: Footing");
	createPendingInspection("L-INSP_ALL","101: Setbacks");
	createPendingInspection("L-INSP_ALL","102: Re-Bar");
	createPendingInspection("L-INSP_ALL","105: Slab");
	createPendingInspection("L-INSP_ALL","107: Framing");
	createPendingInspection("L-INSP_ALL","114: Sign Footing");
	createPendingInspection("L-INSP_ALL","906: Sign Final");
	}

if (bldInsp > 0) {
	editAppSpecific("Building Final Required","CHECKED");
	allInspReq = allInspReq +1;
	}

if (checkInspectionResult("900: Building Final","Approved")) {
	editAppSpecific("Building Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (drivewayInsp > 0) {
	editAppSpecific("Driveway Final Required", "CHECKED");
	allInspReq = allInspReq +1;
	}

if (checkInspectionResult("909: Driveway Final","Approved")) {
	editAppSpecific("Driveway Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (elecInsp > 0) {
	editAppSpecific("Electrical Final Required", "CHECKED");
	allInspReq = allInspReq +1;
	}

if (checkInspectionResult("901: Electrical Final","Approved")) {
	editAppSpecific("Electrical Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (appMatch("Building/Commercial/*/*") && AInfo['Actual Improvement Area'] > 0) {
	editAppSpecific("Environmental Final Required", "CHECKED");
	allInspReq = allInspReq +1;
	}

if (checkInspectionResult("605: Environmental Final Comm","Approved") || checkInspectionResult("605: Environmental Final Res","Approved")) {
	editAppSpecific("Environmental Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (fireInsp > 0) {
	editAppSpecific("Fire Final Required", "CHECKED");
	allInspReq = allInspReq +1;
	}

if (checkInspectionResult("908: Fire Final","Approved")) {
	editAppSpecific("Fire Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (gasInsp > 0) {
	editAppSpecific("Gas Final Required", "CHECKED");
	allInspReq = allInspReq +1;
	}

if (checkInspectionResult("902: Gas Final","Approved")) {
	editAppSpecific("Gas Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (mechInsp > 0) {
	editAppSpecific("Mechanical Final Required", "CHECKED");
	allInspReq = allInspReq +1;
	}

if (checkInspectionResult("903: Mechanical Final","Approved")) {
	editAppSpecific("Mechanical Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (nocInsp >0) {
	editAppSpecific("Notice of Commencement Required", "CHECKED");
	allInspReq = allInspReq +1;
	}

if (checkInspectionResult("505: Notice of Commencement","Approved")) {
	editAppSpecific("Notice of Commencement Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (plumbInsp > 0) {
	editAppSpecific("Plumbing Final Required", "CHECKED");
	allInspReq = allInspReq +1;
	}

if (checkInspectionResult("905: Plumbing Final","Approved")) {
	editAppSpecific("Plumbing Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (poolInsp >0) {
	editAppSpecific("Pool Final Required", "CHECKED");
	allInspReq = allInspReq +1;
	}

if (checkInspectionResult("916: Swimming Pool Final","Approved")) {
	editAppSpecific("Pool Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (appMatch("Building/*/Alteration/NA") && AInfo['Improvement Type'] == "Roof") {
	editAppSpecific("Roof Final Required", "CHECKED");
	allInspReq = allInspReq +1;
	}

if (checkInspectionResult("917: Roofing Final","Approved")) {
	editAppSpecific("Roof Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (mhInsp >0) {
	editAppSpecific("Mobile Home Final Required", "CHECKED");
	allInspReq = allInspReq +1;
	}

if (checkInspectionResult("904: Mobile Home Final","Approved")) {
	editAppSpecific("Mobile Home Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (signInsp > 0 editAppSpecific("Sign Final Required", "CHECKED"); allInspReq = allInspReq +1) {
	}

if (checkInspectionResult("906: Sign Final","Approved")) {
	editAppSpecific("Sign Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

if (faInsp > 0 editAppSpecific("Fire Alarm Final Required", "CHECKED"); allInspReq = allInspReq +1) {
	}

if (checkInspectionResult("911: Fire Alarm Final","Approved")) {
	editAppSpecific("Fire Alarm Final Completed", "CHECKED");
	allInspComplete = allInspComplete +1;
	}

editAppSpecific("Inspections Added","CHECKED");
if (AInfo['Final Date'] == null) {
	editAppSpecific("COFO Date",today);
	}
`^
EMSE;Add-Inspections-VelocityHall^`
showMessage = true;
logDebug = 3;
if (appMatch("Building/VelocityHall/Door-Windows/*") && AInfo['Valuation of Work Performed'] >= 2500 && !isScheduled("505: Notice of Commencement")) {
	createPendingInspection("L-WebDoorWin","505: Notice of Commencement");
	}

if (appMatch("Building/VelocityHall/Electical/*") && AInfo['Valuation of Work Performed'] >= 2500 && !isScheduled("505: Notice of Commencement")) {
	createPendingInspection("L-WEB_Elec","505: Notice of Commencement");
	}

if (appMatch("Building/VelocityHall/Mechanical/*") && AInfo['Valuation of Work Performed'] >= 7500 && !isScheduled("505: Notice of Commencement")) {
	createPendingInspection("L-WEB_Mech","505: Notice of Commencement");
	}

if (appMatch("Building/VelocityHall/Plumbing/*") && AInfo['Valuation of Work Performed'] >= 2500 && !isScheduled("505: Notice of Commencement")) {
	createPendingInspection("L-WEB_Plumb","505: Notice of Commencement");
	}

if (appMatch("Building/VelocityHall/Pool Reliner/*") && AInfo['Valuation of Work Performed'] >= 2500 && !isScheduled("505: Notice of Commencement")) {
	createPendingInspection("L-WEB_Pool","505: Notice of Commencement");
	}

if (appMatch("Building/VelocityHall/Reroof/*") && AInfo['Valuation of Work Performed'] >= 2500 && !isScheduled("505: Notice of Commencement")) {
	createPendingInspection("L-WEB_Roof","505: Notice of Commencement");
	}

if (appMatch("Building/VelocityHall/Vinyl Siding/*") && AInfo['Valuation of Work Performed'] >= 2500 && !isScheduled("505: Notice of Commencement")) {
	createPendingInspection("L-WEB_Vinyl","505: Notice of Commencement");
	}

if (appMatch("Building/VelocityHall/Door-Windows/*") && !isScheduled("900: Building Final")) {
	createPendingInspection("L-WebDoorWin","107: Framing");
	createPendingInspection("L-WebDoorWin","199: Other Building");
	createPendingInspection("L-WebDoorWin","505: Notice of Commencement");
	createPendingInspection("L-WebDoorWin","595: Re-Inspection");
	createPendingInspection("L-WebDoorWin","596: After Hours Inspection");
	createPendingInspection("L-WebDoorWin","900: Building Final");
	}

if (appMatch("Building/VelocityHall/Electrical/*") && !isScheduled("901: Electrical Final")) {
	createPendingInspection("L-WEB_Elec","200: Electric Rough-In");
	createPendingInspection("L-WEB_Elec","201: Electric Rough Ceiling");
	createPendingInspection("L-WEB_Elec","202: Electric HVAC Changeout");
	createPendingInspection("L-WEB_Elec","203: Electric Service Changeout");
	createPendingInspection("L-WEB_Elec","204: Pool Electrical Bonding");
	createPendingInspection("L-WEB_Elec","205: Underground Electric");
	createPendingInspection("L-WEB_Elec","299: Other Electric");
	createPendingInspection("L-WEB_Elec","500: Temporary Power");
	createPendingInspection("L-WEB_Elec","501: Electrical Release");
	createPendingInspection("L-WEB_Elec","506: Notified Electric Provider");
	createPendingInspection("L-WEB_Elec","507: Talquin Temp Electric Release");
	createPendingInspection("L-WEB_Elec","508: Talquin Final Electric Release");
	createPendingInspection("L-WEB_Elec","509: Talquin New Cut-In & Res Meter Set");
	createPendingInspection("L-WEB_Elec","510: Talquin MH Cut-In & Meter Set");
	createPendingInspection("L-WEB_Elec","511: Talquin New Cut-In & Comm Meter Set");
	createPendingInspection("L-WEB_Elec","512: Talquin Temp Cut-In");
	createPendingInspection("L-WEB_Elec","513: Talquin Increase Service");
	createPendingInspection("L-WEB_Elec","514: Talquin Relocate Service");
	createPendingInspection("L-WEB_Elec","515: City New Cut-In & Residential Meter Set");
	createPendingInspection("L-WEB_Elec","516: City MH Cut-In & Meter Set");
	createPendingInspection("L-WEB_Elec","517: City Cut-In & Comm Meter Set");
	createPendingInspection("L-WEB_Elec","518: City Temp Cut-In");
	createPendingInspection("L-WEB_Elec","519: City Increase Service");
	createPendingInspection("L-WEB_Elec","520: City Relocate Service");
	createPendingInspection("L-WEB_Elec","521: City New Cut-In");
	createPendingInspection("L-WEB_Elec","522: City Residential Meter Set");
	createPendingInspection("L-WEB_Elec","523: City Comm Meter Set");
	createPendingInspection("L-WEB_Elec","524: City MH Meter Set");
	createPendingInspection("L-WEB_Elec","525: City Reseal Meter");
	createPendingInspection("L-WEB_Elec","526: City Reseal Meter Increase Service");
	createPendingInspection("L-WEB_Elec","527: City Reset Meter");
	createPendingInspection("L-WEB_Elec","528: City Reset Meter Increase Service");
	createPendingInspection("L-WEB_Elec","529: City Relocate Increase Service");
	createPendingInspection("L-WEB_Elec","530: City Reconnect Service");
	createPendingInspection("L-WEB_Elec","531: City Reconnect Increase Service");
	createPendingInspection("L-WEB_Elec","532: City House Meter");
	createPendingInspection("L-WEB_Elec","533: City New C/I Com Mtr Set W/CTS");
	createPendingInspection("L-WEB_Elec","534: City Interconnect Pwr Source");
	createPendingInspection("L-WEB_Elec","535: Talquin Interconncet Pwr Source");
	createPendingInspection("L-WEB_Elec","901: Electrical Final");
	}

if (appMatch("Building/VelocityHall/Mechanical/*") && !isScheduled("903: Mechanical Final")) {
	createPendingInspection("L-WEB_Mech","301: Ductwork");
	createPendingInspection("L-WEB_Mech","306: HVAC Changeout");
	createPendingInspection("L-WEB_Mech","399: Other Mechanical");
	createPendingInspection("L-WEB_Mech","903: Mechanical Final");
	createPendingInspection("L-WEB_Mech","595: Re-Inspection");
	createPendingInspection("L-WEB_Mech","596: After Hours Inspection");
	}

if (appMatch("Building/VelocityHall/Plumbing/*") && !isScheduled("905: Plumbing Final")) {
	createPendingInspection("L-WEB_Plumb","400: Building Sewer");
	createPendingInspection("L-WEB_Plumb","404: Water Heater");
	createPendingInspection("L-WEB_Plumb","407: Water System");
	createPendingInspection("L-WEB_Plumb","410: COT Backflow Device");
	createPendingInspection("L-WEB_Plumb","411: Talquin Backflow Device");
	createPendingInspection("L-WEB_Plumb","499: Other Plumbing");
	createPendingInspection("L-WEB_Plumb","595: Re-Inspection");
	createPendingInspection("L-WEB_Plumb","596: After Hours Inspection");
	createPendingInspection("L-WEB_Plumb","905: Plumbing Final");
	}

if (appMatch("Building/VelocityHall/Pool Reliner/*") && !isScheduled("916: Swimming Pool Final")) {
	createPendingInspection("L-WEB_Pool","111: Pool");
	createPendingInspection("L-WEB_Pool","112: Pool Fence Gate");
	createPendingInspection("L-WEB_Pool","113: Pool Re-Liner");
	createPendingInspection("L-WEB_Pool","204: Pool Electrical Bonding");
	createPendingInspection("L-WEB_Pool","595: Re-Inspection");
	createPendingInspection("L-WEB_Pool","596: After Hours Inspection");
	createPendingInspection("L-WEB_Pool","916: Swimming Pool Final");
	}

if (appMatch("Building/VelocityHall/Reroof/*") && !isScheduled("917: Roofing Final")) {
	createPendingInspection("L-WEB_Roof","104: Roof");
	createPendingInspection("L-WEB_Roof","115: Roof Deck Re-Nail");
	createPendingInspection("L-WEB_Roof","116: Roof Secondary Barrier");
	createPendingInspection("L-WEB_Roof","595: Re-Inspection");
	createPendingInspection("L-WEB_Roof","596: After Hours Inspection");
	createPendingInspection("L-WEB_Roof","917: Roofing Final");
	}

if (appMatch("Building/VelocityHall/Vinyl Siding/*") && !isScheduled("900: Building Final")) {
	createPendingInspection("L-WEB_Vinyl","106: Exterior Sheathing");
	createPendingInspection("L-WEB_Vinyl","199: Other Building");
	createPendingInspection("L-WEB_Vinyl","595: Re-Inspection");
	createPendingInspection("L-WEB_Vinyl","596: After Hours Inspection");
	createPendingInspection("L-WEB_Vinyl","900: Building Final");
	}

editAppSpecific("Inspections Added","CHECKED");
`^
EMSE;AddressPrimary^`
`^
EMSE;AutoInvoiceBuildingFees^`
showMessage = true;
showDebug = 1;
feeItemArray=aa.fee.getFeeItems(capId,null,"NEW").getOutput();
if (feeItemArray) {
	for (FI in feeItemArray) branch("EMSE:InvoiceTheFee");
	}

childrenCapId = getChildren("*/*/*/*",capId);
if (typeof(childrenCapId) == "object") {
	for (eachchild in childrenCapId) invoiceCapFees(childrenCapId[eachchild]);
	}
`^
EMSE;Building-ASA-Defaults^`
if (appMatch("Building/*/Electrical/*")) {
	editAppSpecific("Improvement Type","Electrical");
	editAppSpecific("Electrical Issuance","CHECKED");
	}
`^
EMSE;Building-Combo-ContractorsReq^`
bldFee = 0*1;
mechFee = 0*1;
gasFee = 0*1;
plumbFee = 0*1;
electFee = 0*1;
pvFee = 0*1;
dwFee = 0*1;
mhFee = 0*1;
poolFee = 0*1;
roofFee = 0*1;
signFee = 0*1;
vinylFee = 0*1;
gdFee = 0*1;
aluminumFee = 0*1;
housemoverFee = 0*1;
dockFee = 0*1;
if (AInfo['MECH FEES'] > 0  || AInfo['Mech Retro Existing Install'] > 0) {
	editAppSpecific("Mechanical Final Required",CHECKED);
	editAppSpecific("Mechanical Required",CHECKED);
	}

if (AInfo['Gas Issuance'] == CHECKED) {
	editAppSpecific("Gas Final Required",CHECKED);
	editAppSpecific("Gas Required",CHECKED);
	}
`^
EMSE;CCLEmailRpt^`
showMessage = true;
showDebug = 1;
var today = new Date();
today = Date(aa.date.currentDate);
var aName;
var aPh;
var emailAddr;
var conType;
var targetAddr;
var addr;
var capAltId;
var parcels;
var pid;
var altID;
var rptName;
var BldCd;
var EnvCd;
var ZonCd;
var JunkCd;
var AddrCd;
var FireCd;
var FFLCd;
var MowCd;
var RapCd;
var AprCd;
var CaseCd;
var AprReqCd;
var aName;
var paraGraph1_01;
var paraGraph1_2;
var sp5 = " 
 
 
 
 
";
var sp1 = " 
";
var conArray;
var ccAddress;
ca = new Array();
ca = getContactArray();
for (x in ca) if(ca[x]["contactType"] == "Applicant") aName = ca[x]["fullName"];
for (x in ca) if (ca[x]["contactType"] == "Applicant") emailAddr = ca[x]["email"];
conType = "Applicant";
for (x in ca) if (ca[x]["contactType"] == "Applicant") emailAddr = ca[x]["email"];
altId = capId.getCustomID();
capAltId = capId.getCustomID();
addr = getCapAddress(capId);
targetAddr = getCapAddress(capId);
var par = aa.parcel.getParcelandAttribute(capId,null);
if (par.getSuccess()) {
	parcels = par.getOutput().toArray();
	for (x in parcels) pid = parcels[x].getParcelNumber();
	logDebug(pid);
	}

if (emailAddr != undefined && conType =="Applicant") {
	var myHashMap = aa.util.newHashMap();
	myHashMap.put("LCC_No",capIDString);
	}

if (AInfo['Send Fees Due'] == "CHECKED") {
	rptName = "Code Compliance Letter Not Paid";
	}

if (AInfo['Send Results Letter/EM'] == "CHECKED") {
	rptName = "Code Compliance Letter Info";
	}

if (AInfo['Send Parcel in City Limits EM'] == "CHECKED") {
	rptName = "Code Compliance Letter COT";
	}

if (AInfo['Send No Information Found EM'] == "CHECKED") {
	rptName = "Code Compliance Letter Info";
	}

if ((AInfo['ParcelAttribute.PARCEL_CITY_CNTY'] != "County" || AInfo['ParcelAttribute.USE_CODE'] != "OUT" || AInfo['ParcelAttribute.T_R_A'] != 2)) {
	var Jurisdiction = "City";
	} else {
	var Jurisdiction = "County";
	}

if (balanceDue == 0 && feesInvoicedTotal != 0) {
	var feesPaid = "";
	} else {
	var feesPaid = "In order to process your request, a non-refundable $90.00 payment is now due and payable to Leon County.  Please remit payment by Check or Money Order to Leon County DSEM, 435 N. Macomb St,. Tallahassee FL 32301.<br><br>";
	}

var rptSubject = "Compliance Certification - "+targetAddr+" Tallahassee Fl. and Parcel # "+pid;
if ((AInfo['Send Fees Due'] == "CHECKED" || AInfo['Send Results Letter/EM'] == "CHECKED" || AInfo['Send Parcel in City Limits EM'] == "CHECKED"|| AInfo['Send No Information Found EM'] == "CHECKED")) {
	var paraGraph1 = "Hello "+aName+",<br><br>This is to acknowledge receipt of your outstanding code and lien search request "+capAltId+" processed on "+fileDate+" for the property located at <Font><Strong>"+targetAddr+" on Parcel ID # "+pid+"</Font></Strong><br><br>";
	}

if (AInfo['Send Address/Parcel Do Not Match'] == "CHECKED") {
	var paraGraph1_01 = "Hello "+aName+",<br><br>The Parcel ID and Address that you provided do not not match.  Please verify the provided information and the Code Compliance Program will respond accordingly.<br><br>";
	}

if ((AInfo['Send Results Letter/EM'] == "CHECKED" || AInfo['Send No Information Found EM'] == "CHECKED")) {
	var paraGraph1_1 = "The Open Code Violations and Lien Research results for the above referenced property are as follows:<br><br>";
	}

if (AInfo['Send Parcel in City Limits EM'] == "CHECKED") {
	var paraGraph1_2 = "<Font><Strong>This property is located within the Tallahassee City Limits.  Please contact the City of Tallahassee Code Enforcement Office at (850) 891-6500.<br><br></Font></Strong>";
	}

var paraGraph2 = "<br>Leon County understands there is a time line for the information needed for any open code violations, complaints, and or outstanding liens that is being requested form your office.  When sending any correspondences to Leon County Code Compliance Program, please include all staff members listed below, to ensure your request is answered in a timely manner.<br><br>";
var paraInfo = "If you need additonal information, please feel free to contact staff via email or call us at (850) 606-1300.<br><br>";
var paraEMBlock = "Donald Allen -- AllenD@leoncountyfl.gov<br>Jessical Lowe -- LoweJ@leoncountyfl.gov<br>Darnell Ward -- WardD@leoncountyfl.gov<br>Eunice Johnson-Shepherd-- JohnsonE@leoncountyfl.gov<br><br>Sincerely,";
if (AInfo['Open Code Bld #'] != null && AInfo['Send Results Letter/EM'] == "CHECKED") {
	BldCd = "Building Code Case #:"+sp5+sp5+sp5+sp5+sp5+sp5+sp1+sp1+sp5+sp1+sp1+sp1+AInfo['Open Code Bld #']+sp5+" Status: "+AInfo['Open Code Bld Status']+sp5+" Fine Balance: $"+AInfo['Open Code Bld Balance']+"<br>";
	} else {
	BldCd = "";
	}

if (AInfo['Open Code Env #'] != null && AInfo['Send Results Letter/EM'] == "CHECKED") {
	EnvCd = "Environmental Code Case #:"+sp5+sp5+sp5+sp5+sp5+sp1+sp1+sp1+sp1+sp1+AInfo['Open Code Env #']+sp5+" Status: "+AInfo['Open Code Env Status']+sp5+" Fine Balance: $"+AInfo['Open Code Env Balance']+"<br>";
	} else {
	EnvCd = "";
	}

if (AInfo['Open Code Zoning #'] != null && AInfo['Send Results Letter/EM'] == "CHECKED") {
	ZonCd = "Zoning Code Case #:"+sp5+sp5+sp5+sp5+sp5+sp5+sp5+sp5+sp1+sp1+AInfo['Open Code Zoning #']+sp5 +" Status: "+AInfo['Open Code Zoning Status']+sp5+" Fine Balance: $"+AInfo['Open Code Zoning Balance']+"<br>";
	} else {
	ZonCd = "";
	}

if (AInfo['Open Code Junk #'] != null && AInfo['Send Results Letter/EM'] == "CHECKED") {
	JunkCd = "Junk Code Case #:"+sp5+sp5+sp5+sp5+sp5+sp5+sp5+sp5+sp1+sp1+sp1+sp1+sp1+sp1+AInfo['Open Code Junk #']+sp5+" Status: "+AInfo['Open Code Junk Status']+sp5+" Fine Balance: $"+AInfo['Open Code Junk Balance']+"<br>";
	} else {
	JunkCd = "";
	}

if (AInfo['Open Code Addressing #'] != null && AInfo['Send Results Letter/EM'] == "CHECKED") {
	AddrCd = "Address Code Case #:"+sp5+sp5+sp5+sp5+sp5+sp5+sp5+sp1+sp1+sp1+sp1+sp1+AInfo['Open Code Addressing #']+sp5+" Status: "+AInfo['Open Code Addressing Status']+sp5+" Fine Balance: $"+AInfo['Open Code Addressing Balance']+"<br>";
	} else {
	AddrCd= "";
	}

if (AInfo['Open Code Fire #'] != null && AInfo['Send Results Letter/EM'] == "CHECKED") {
	FireCd = "Fire Code Case #:"+sp5+sp5+sp5+sp5+sp5+sp5+sp5+sp1+sp5+sp1+sp1+sp1+sp1+sp1+sp1+AInfo['Open Code Fire #']+sp5+" Status: "+AInfo['Open Code Fire Status']+sp5+" Fine Balance: $"+AInfo['Open Code Fire Balance']+"<br>";
	} else {
	FireCd= "";
	}

if (AInfo['Open Code Filthy Fluids #'] != null && AInfo['Send Results Letter/EM'] == "CHECKED") {
	FFLCd = "Filthy Fluids Code Case #:"+sp5+sp5+sp5+sp5+sp5+sp5+sp1+sp1+sp1+AInfo['Open Code Filthy Fluids #']+sp5+" Status: "+AInfo['Open Code Filthy Fluids Status']+sp5+" Fine Balance: $"+AInfo['Open Code Filthy Fluids Balance']+"<br>";
	} else {
	FFLCd= "";
	}

if (AInfo['Open Code Mowing #'] != null && AInfo['Send Results Letter/EM'] == "CHECKED") {
	MowCd = "Mowing Code Case #:"+sp5+sp5+sp5+sp5+sp5+sp5+sp5+sp5+AInfo['Open Code Mowing #']+sp5+" Status: "+AInfo['Open Code Mowing Status']+sp5+" Fine Balance: $"+AInfo['Open Code Mowing Balance']+"<br>";
	} else {
	MowCd= "";
	}

if (AInfo['Open Code Refueling Assistance Program #'] != null && AInfo['Send Results Letter/EM'] == "CHECKED") {
	RapCd = "Refueling Assistance Program Code Case #:"+sp5+AInfo['Open Code Refueling Assistance Program #']+sp5+" Status: "+AInfo['Open Code Refueling Assistance Program Status']+sp5+" Fine Balance: $"+AInfo['Open Code Refueling Assistance Program Balance']+"<br>";
	} else {
	RapCd= "";
	}

if (AInfo['Open Code Abandoned Property Registry #'] != null && AInfo['Send Results Letter/EM'] == "CHECKED") {
	AprCd = "Abandoned Property Registry Code Case #:"+sp5+sp1+AInfo['Open Code Abandoned Property Registry #']+sp5+" Status: "+AInfo['Open Code Abandoned Property Registry Status']+sp5+" Fine Balance: $"+AInfo['Open Code Abandoned Property Registry Balance']+"<br>";
	} else {
	AprCd= "";
	}

if (AInfo['Number of Cases'] >= 1 && AInfo['Send Results Letter/EM'] == "CHECKED") {
	CaseCd = "<br>As of "+fileDate+" the Number of Code Case(s):"+sp5+AInfo['Number of Cases']+sp5+sp5+sp5+sp5+sp5+sp5+sp5+sp5+sp5+sp1+sp1+" Total Fine Balance: $"+getAppSpecific("Balance of All Cases")+"<br><br>";
	} else {
	CaseCd= "<br>";
	}

if (AInfo['Send Results Letter/EM'] == "CHECKED") {
	AprPara = "Leon County Requires that property that is subject to foreclosure proceedings be registered, and also requires that the mortgagee appoint a local representative.<br><br>";
	} else {
	AprPara ="";
	}

if (AInfo['APR Req'] == "Yes") {
	AprReqCd = "Case # "+ AInfo['ParcelAttribute.VIR_APR_NUM']+"<br>Case Status: "+AInfo['ParcelAttribute.VIR_APR_STAT']+"<br><br><Font><Strong>It appears that the referenced property may require Abandoned Property Registration.</Font></Strong><br>";
	} else {
	AprReqCd= "<Font><Strong>At this time there is no Abandoned Property Registration required.</Font></Strong><br>";
	}

if (balanceDue >= 1 && AInfo['Send Fees Due'] == "CHECKED" && wfTask == "Request Submittal" && wfStatus == "Fees Due Notice") {
	sendEmailwAttchmnt("autosender@leoncountyfl.gov",emailAddr,"",rptSubject,paraGraph1+feesPaid+paraGraph2+paraInfo+paraEMBlock,rptName,myHashMap);
	}

if ((AInfo['Send Results Letter/EM'] == "CHECKED" || AInfo['Send No Information Found EM'] == "CHECKED") && balanceDue == 0) {
	sendEmailwAttchmnt("autosender@leoncountyfl.gov",emailAddr,"",rptSubject,paraGraph1+paraGraph1_1+BldCd+EnvCd+ZonCd+JunkCd+AddrCd+FireCd+FFLCd+MowCd+RapCd+AprCd+CaseCd+AprPara+AprReqCd+paraGraph2+paraInfo+paraEMBlock,rptName,myHashMap);
	}

if (AInfo['Send Address/Parcel Do Not Match'] == "CHECKED") {
	email(emailAddr,"autosender@leoncountyfl.gov",rptSubject,paraGraph1_01+paraGraph2+paraInfo+paraEMBlock);
	}

if (AInfo['Send Parcel in City Limits EM'] == "CHECKED") {
	sendEmailwAttchmnt("autosender@leoncountyfl.gov",emailAddr,"",rptSubject,paraGraph1+paraGraph1_2+paraGraph2+paraInfo+paraEMBlock,rptName,myHashMap);
	}

if (AInfo['Send Fees Due'] == "CHECKED") {
	editAppSpecific("Send Fees Due","UNCHECKED");
	}

if (AInfo['Send No Information Found EM'] == "CHECKED") {
	editAppSpecific("Send No Information Found EM","UNCHECKED");
	}

if (AInfo['Send Parcel in City Limits EM'] == "CHECKED") {
	editAppSpecific("Send Parcel in City Limits EM","UNCHECKED");
	}

if (AInfo['Send Address/Parcel Do Not Match'] == "CHECKED") {
	editAppSpecific("Send Address/Parcel Do Not Match","UNCHECKED");
	}

if (AInfo['Send Results Letter/EM'] == "CHECKED") {
	editAppSpecific("Send Results Letter/EM","UNCHECKED");
	}
`^
EMSE;CheckChildForFee^`
`^
EMSE;EmailRptApplicant^`
conType = conArray[y].getPeople().contactType;
emailAddr = conArray[y].getPeople().email;
if (emailAddr != undefined && conType =="Applicant") {
	var myHashMap = aa.util.newHashMap();
	myHashMap.put("altID",capIDString);
	sendEmailwAttchmnt("autosender@leoncountyfl.gov",emailAddr,"","APPLICANT NOTIFICATION: The Review for "+capIDString+" is Approved","Permit Applicant,<br><br>Please contact Development Support and Environmental Management Intake Staff at (850) 606-1300 to schedule a time to pick up your permit. Any total fees due are detailed on the Attached report.<br><br>Please call if you have any questions. Thank You.","Project Fee Summary",myHashMap);
	comment("Email Address is : "+emailAddr);
	}
`^
EMSE;Fees-Building^`
showMessage = false;
showDebug = false;
surchgCntr = 0*1;
gasGroup1 = 0*1;
gasGroup2 = 0*1;
plumbingGroup1 = 0*1;
electricGroup1 = 0*1;
electricGroup2 = 0*1;
envGroup1 = 0*1;
envGroup2 = 0*1;
envGroup3 = 0*1;
mechGroup1 = 0*1;
fireGroup1 =0*1;
fireGroup2 = 0*1;
plansrevGroup1 = 0*1;
demoGroup1 = 0*1;
accGroup1 = 0*1;
indGroup1 = 0*1;
bldPlnApv = "N";
appSubApv = "N";
mechGroup1 = 0*1;
removeFee("5004-010","FINAL");
removeFee("5004-015","FINAL");
removeFee("5004-020","FINAL");
removeFee("5008-003","FINAL");
removeFee("5008-005","FINAL");
removeFee("5008-010","FINAL");
removeFee("5008-001","FINAL");
removeFee("5006-010","FINAL");
removeFee("5006-015","FINAL");
removeFee("5006-025","FINAL");
removeFee("5006-030","FINAL");
removeFee("5006-040","FINAL");
removeFee("5006-045","FINAL");
removeFee("5002-010","FINAL");
removeFee("5002-050","FINAL");
removeFee("5002-015","FINAL");
removeFee("5002-035","FINAL");
removeFee("5002-030","FINAL");
removeFee("5002-080","FINAL");
removeFee("5002-040","FINAL");
removeFee("5002-085","FINAL");
removeFee("5002-045","FINAL");
removeFee("5002-090","FINAL");
removeFee("5002-095","FINAL");
removeFee("5002-100","FINAL");
removeFee("5002-105","FINAL");
removeFee("5002-110","FINAL");
removeFee("5002-115","FINAL");
removeFee("5002-120","FINAL");
removeFee("5002-125","FINAL");
removeFee("5002-130","FINAL");
removeFee("5002-135","FINAL");
removeFee("5002-140","FINAL");
removeFee("5002-150","FINAL");
removeFee("5002-155","FINAL");
removeFee("5002-160","FINAL");
removeFee("5002-165","FINAL");
removeFee("5002-170","FINAL");
removeFee("5002-175","FINAL");
removeFee("5002-020","FINAL");
removeFee("5002-025","FINAL");
removeFee("5002-055","FINAL");
removeFee("5002-060","FINAL");
removeFee("5002-065","FINAL");
removeFee("5002-070","FINAL");
true;
removeFee("5002-180","FINAL");
removeFee("5002-145","FINAL");
removeFee("5002-075","FINAL");
removeFee("5008-020","FINAL");
removeFee("5012-010","FINAL");
removeFee("5012-015","FINAL");
removeFee("5017-010","FINAL");
removeFee("5042-010","FINAL");
removeFee("8096-010","FINAL");
removeFee("5013-010","FINAL");
removeFee("5017-010","FINAL");
removeFee("8205-010","FINAL");
removeFee("7077-010","FINAL");
removeFee("5015-010","FINAL");
removeFee("5020-010","FINAL");
removeFee("5043-010","FINAL");
removeFee("5017-010","FINAL");
removeFee("5020-015","FINAL");
removeFee("5020-010","FINAL");
removeFee("5043-020","FINAL");
removeFee("5015-015","FINAL");
removeFee("5010-010","FINAL");
removeFee("5010-015","FINAL");
removeFee("5010-020","FINAL");
removeFee("5010-025","FINAL");
removeFee("5010-030","FINAL");
removeFee("5010-035","FINAL");
removeFee("5010-040","FINAL");
removeFee("5010-045","FINAL");
removeFee("5010-050","FINAL");
removeFee("5010-055","FINAL");
removeFee("5010-060","FINAL");
removeFee("7015-013","FINAL");
removeFee("5010-065","FINAL");
removeFee("7015-015","FINAL");
if (AInfo['Class Type'] == "Industrial") {
	indGroup1 = indGroup1 +1;
	}

if (indGroup1 > 0) {
	showMessage = true;
	comment("<Font Color = red>indGroup1 Count = "+ indGroup1 +"</Font>");
	}

if (AInfo['Mech New Installation'] > 0 && feeExists("5004-010","INVOICED") == false) {
	removeFee("5004-010","FINAL");
	addFee("5004-010","BUILDING","FINAL",getAppSpecific("Mech New Installation"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Mech Retro Existing Install'] > 0 && feeExists("5004-015","INVOICED") == false) {
	removeFee("5004-015","FINAL");
	addFee("5004-015","BUILDING","FINAL",getAppSpecific("Mech Retro Existing Install"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Other Mechanical'] > 0 && feeExists("5004-020","INVOICED") == false) {
	removeFee("5004-020","FINAL");
	addFee("5004-020","BUILDING","FINAL",getAppSpecific("Other Mechanical"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Gas Issuance'] == "CHECKED" && feeExists("5008-003","INVOICED") == false) {
	removeFee("5008-003","FINAL");
	addFee("5008-003","BUILDING","FINAL",1,"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Gas Piping (Num of Outlets)'] > 4 && feeExists("5008-005","INVOICED") == false) {
	removeFee("5008-005","FINAL");
	addFee("5008-005","BUILDING","FINAL",getAppSpecific("Gas Piping (Num of Outlets)"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Conversion Burner'] >0) {
	gasGroup1 = gasGroup1 + (getAppSpecific("Conversion Burner")*1);
	}

if (AInfo['Floor Furnace'] >0) {
	gasGroup1 = gasGroup1 + (getAppSpecific("Floor Furnace")*1);
	}

if (AInfo['Incinerator'] >0) {
	gasGroup1 = gasGroup1 + (getAppSpecific("Incinerator")*1);
	}

if (AInfo['Boiler'] >0) {
	gasGroup1 = gasGroup1 + (getAppSpecific("Boiler")*1);
	}

if (AInfo['Heating/AC Unit'] >0) {
	gasGroup1 = gasGroup1 + (getAppSpecific("Heating/AC Unit")*1);
	}

if (gasGroup1 > 0 && feeExists("5008-010","INVOICED") == false) {
	removeFee("5008-010","FINAL");
	addFee("5008-010","BUILDING","FINAL",gasGroup1,"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Vented Wall Furnace'] >0) {
	gasGroup2 = gasGroup2 + (getAppSpecific("Vented Wall Furnace")*1);
	}

if (AInfo['Gas Water Heater'] >0) {
	gasGroup2 = gasGroup2 + (getAppSpecific("Gas Water Heater")*1);
	}

if (gasGroup2 > 0 && feeExists("5008-001","INVOICED") == false) {
	removeFee("5008-001","FINAL");
	addFee("5008-001","BUILDING","FINAL",gasGroup2,"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Other Gas'] > 0 && feeExists("5008-020","INVOICED") == false) {
	removeFee("5008-020","FINAL");
	addFee("5008-020","BUILDING","FINAL",getAppSpecific("Other Gas"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Plumbing Issuance'] == "CHECKED" && feeExists("5006-010","INVOICED") == false) {
	removeFee("5006-010","FINAL");
	addFee("5006-010","BUILDING","FINAL",1,"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Floor Sink/Drain'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Floor Sink/Drain")*1);
	}

if (AInfo['House Sewer New'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("House Sewer New")*1);
	}

if (AInfo['Repair/Replace '] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Repair/Replace ")*1);
	}

if (AInfo['Water Closet'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Water Closet")*1);
	}

if (AInfo['Kitchen Sink/Disposal'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Kitchen Sink/Disposal")*1);
	}

if (AInfo['Bath Tub'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Bath Tub")*1);
	}

if (AInfo['Shower'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Shower")*1);
	}

if (AInfo['Lavatory'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Lavatory")*1);
	}

if (AInfo['Clothes Washer'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Clothes Washer")*1);
	}

if (AInfo['Dish Washer'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Dish Washer")*1);
	}

if (AInfo['Drinking Fountain'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Drinking Fountain")*1);
	}

if (AInfo['Urinal'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Urinal")*1);
	}

if (AInfo['Ice machine/Maker'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Ice machine/Maker")*1);
	}

if (AInfo['Bar Sink'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Bar Sink")*1);
	}

if (AInfo['Janitor Sink'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Janitor Sink")*1);
	}

if (AInfo['Hose Bibb'] >0) {
	plumbingGroup1 =  plumbingGroup1 + (getAppSpecific("Hose Bibb")*1);
	}

if (plumbingGroup1 > 0 && feeExists("5006-015","INVOICED") == false) {
	removeFee("5006-015","FINAL");
	addFee("5006-015","BUILDING","FINAL",plumbingGroup1,"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Water Heater or Vent'] > 0 && feeExists("5006-025","INVOICED") == false) {
	removeFee("5006-025","FINAL");
	addFee("5006-025","BUILDING","FINAL",getAppSpecific("Water Heater or Vent"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Water Piping/Treatment Equipment'] > 0 && feeExists("5006-030","INVOICED") == false) {
	removeFee("5006-030","FINAL");
	addFee("5006-030","BUILDING","FINAL",getAppSpecific("Water Piping/Treatment Equipment"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Vacuum Breaker/Backflow Device'] > 0 && feeExists("5006-040","INVOICED") == false) {
	removeFee("5006-040","FINAL");
	addFee("5006-040","BUILDING","FINAL",getAppSpecific("Vacuum Breaker/Backflow Device"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Other Plumbing'] > 0 && feeExists("5006-045","INVOICED") == false) {
	removeFee("5006-045","FINAL");
	addFee("5006-045","BUILDING","FINAL",getAppSpecific("Other Plumbing"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Electrical Issuance'] == "CHECKED" && feeExists("5002-010","INVOICED") == false) {
	removeFee("5002-010","FINAL");
	addFee("5002-010","BUILDING","FINAL",1,"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Temporary Service'] > 0 && feeExists("5002-050","INVOICED") == false) {
	removeFee("5002-050","FINAL");
	addFee("5002-050","BUILDING","FINAL",getAppSpecific("Temporary Service"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Switches/Recepticals'] > 0 && feeExists("5002-015","INVOICED") == false) {
	removeFee("5002-015","FINAL");
	addFee("5002-015","BUILDING","FINAL",getAppSpecific("Switches/Recepticals"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Lighting Fixtures'] > 0  && feeExists("5002-035","INVOICED") == false) {
	removeFee("5002-035","FINAL");
	addFee("5002-035","BUILDING","FINAL",getAppSpecific("Lighting Fixtures"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Fans'] > 0 && feeExists("5002-030","INVOICED") == false) {
	removeFee("5002-030","FINAL");
	addFee("5002-030","BUILDING","FINAL",getAppSpecific("Fans"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Range/Stove/Oven'] > 0) {
	electricGroup1 =  electricGroup1 + (getAppSpecific("Range/Stove/Oven")*1);
	}

if (AInfo['Water Heater'] > 0) {
	electricGroup1 =  electricGroup1 + (getAppSpecific("Water Heater")*1);
	}

if (electricGroup1 > 0  && feeExists("5002-080","INVOICED") == false) {
	removeFee("5002-080","FINAL");
	addFee("5002-080","BUILDING","FINAL",electricGroup1,"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Clothes Dryer'] >0) {
	electricGroup2 =  electricGroup2 + (getAppSpecific("Clothes Dryer")*1);
	}

if (AInfo['Clothes Washer'] >0) {
	electricGroup2 =  electricGroup2 + (getAppSpecific("Clothes Washer")*1);
	}

if (AInfo['Garage Opener'] >0) {
	electricGroup2 =  electricGroup2 + (getAppSpecific("Garage Opener")*1);
	}

if (AInfo['Spa Pump'] >0) {
	electricGroup2 =  electricGroup2 + (getAppSpecific("Spa Pump")*1);
	}

if (AInfo['Central Vacuum'] >0) {
	electricGroup2 =  electricGroup2 + (getAppSpecific("Central Vacuum")*1);
	}

if (AInfo['Trash Compactor'] >0) {
	electricGroup2 =  electricGroup2 + (getAppSpecific("Trash Compactor")*1);
	}

if (AInfo['Attic Exhaust Fans'] >0) {
	electricGroup2 =  electricGroup2 + (getAppSpecific("Attic Exhaust Fans")*1);
	}

if (AInfo['Dish Washer/Disposal'] >0) {
	electricGroup2 =  electricGroup2 + (getAppSpecific("Dish Washer/Disposal")*1);
	}

if (AInfo['Motor to 3/4 HP and less than 600 Volts'] >0) {
	electricGroup2 =  electricGroup2 + (getAppSpecific("Motor to 3/4 HP and less than 600 Volts")*1);
	}

if (electricGroup2 > 0 && feeExists("5002-040","INVOICED") == false) {
	removeFee("5002-040","FINAL");
	addFee("5002-040","BUILDING","FINAL",electricGroup2,"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Welding Machines'] > 0 && feeExists("5002-085","INVOICED") == false) {
	removeFee("5002-085","FINAL");
	addFee("5002-085","BUILDING","FINAL",getAppSpecific("Welding Machines"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Motor over 3/4 HP less than 5 HP to 600 Volts'] > 0 && feeExists("5002-045","INVOICED") == false) {
	removeFee("5002-045","FINAL");
	addFee("5002-045","BUILDING","FINAL",getAppSpecific("Motor over 3/4 HP less than 5 HP to 600 Volts"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Motor over 5 HP less than 10 HP over 600 Volts'] > 0 && feeExists("5002-090","INVOICED") == false) {
	removeFee("5002-090","FINAL");
	addFee("5002-090","BUILDING","FINAL",getAppSpecific("Motor over 5 HP less than 10 HP over 600 Volts"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Motor over 10 HP to 25 HP over 600 Volts'] > 0 && feeExists("5002-095","INVOICED") == false) {
	removeFee("5002-095","FINAL");
	addFee("5002-095","BUILDING","FINAL",getAppSpecific("Motor over 10 HP to 25 HP over 600 Volts"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Motor over 25 HP to 100 HP over 600 Volts'] > 0 && feeExists("5002-100","INVOICED") == false) {
	removeFee("5002-100","FINAL");
	addFee("5002-100","BUILDING","FINAL",getAppSpecific("Motor over 25 HP to 100 HP over 600 Volts"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Motor over 100 HP'] > 0 && feeExists("5002-105","INVOICED") == false) {
	removeFee("5002-105","FINAL");
	addFee("5002-105","BUILDING","FINAL",getAppSpecific("Motor over 100 HP"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Rectifier to 1KVA'] > 0 && feeExists("5002-110","INVOICED") == false) {
	removeFee("5002-110","FINAL");
	addFee("5002-110","BUILDING","FINAL",getAppSpecific("Rectifier to 1KVA"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Rectifier over 1KVA to 5KVA'] > 0 && feeExists("5002-115","INVOICED") == false) {
	removeFee("5002-115","FINAL");
	addFee("5002-115","BUILDING","FINAL",getAppSpecific("Rectifier over 1KVA to 5KVA"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Rectifier over 5KVA'] > 0 && feeExists("5002-120","INVOICED") == false) {
	removeFee("5002-120","FINAL");
	addFee("5002-120","BUILDING","FINAL",getAppSpecific("Rectifier over 5KVA"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Transformer to 600 Volts'] > 0 && feeExists("5002-125","INVOICED") == false) {
	removeFee("5002-125","FINAL");
	addFee("5002-125","BUILDING","FINAL",getAppSpecific("Transformer to 600 Volts"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Transformer over 600 Volts'] > 0 && feeExists("5002-130","INVOICED") == false) {
	removeFee("5002-130","FINAL");
	addFee("5002-130","BUILDING","FINAL",getAppSpecific("Transformer over 600 Volts"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Antenna'] > 0 && feeExists("5002-135","INVOICED") == false) {
	removeFee("5002-135","FINAL");
	addFee("5002-135","BUILDING","FINAL",getAppSpecific("Antenna"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Auto Bake Oven'] > 0 && feeExists("5002-140","INVOICED") == false) {
	removeFee("5002-140","FINAL");
	addFee("5002-140","BUILDING","FINAL",getAppSpecific("Auto Bake Oven"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Diathermic'] > 0 && feeExists("5002-145","INVOICED") == false) {
	removeFee("5002-145","FINAL");
	addFee("5002-145","BUILDING","FINAL",getAppSpecific("Diathermic"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Festoon Lights'] > 0 && feeExists("5002-150","INVOICED") == false) {
	removeFee("5002-150","FINAL");
	addFee("5002-150","BUILDING","FINAL",getAppSpecific("Festoon Lights"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Plug Molding (Ln Ft)'] > 0 && feeExists("5002-155","INVOICED") == false) {
	removeFee("5002-155","FINAL");
	addFee("5002-155","BUILDING","FINAL",getAppSpecific("Plug Molding (Ln Ft)"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Motion Picture Projector'] > 0 && feeExists("5002-160","INVOICED") == false) {
	removeFee("5002-160","FINAL");
	addFee("5002-160","BUILDING","FINAL",getAppSpecific("Motion Picture Projector"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['TentShow/Circus'] > 0 && feeExists("5002-165","INVOICED") == false) {
	removeFee("5002-165","FINAL");
	addFee("5002-165","BUILDING","FINAL",getAppSpecific("TentShow/Circus"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['X-Ray Portable'] > 0 && feeExists("5002-170","INVOICED") == false) {
	removeFee("5002-170","FINAL");
	addFee("5002-170","BUILDING","FINAL",getAppSpecific("X-Ray Portable"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['X-Ray Stationary'] > 0 && feeExists("5002-175","INVOICED") == false) {
	removeFee("5002-175","FINAL");
	addFee("5002-175","BUILDING","FINAL",getAppSpecific("X-Ray Stationary"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Electric Signs to 1650 Watts'] > 0 && feeExists("5002-020","INVOICED") == false) {
	removeFee("5002-020","FINAL");
	addFee("5002-020","BUILDING","FINAL",getAppSpecific("Electric Signs to 1650 Watts"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Electric Signs over 1650 Watts'] > 0 && feeExists("5002-025","INVOICED") == false) {
	removeFee("5002-025","FINAL");
	addFee("5002-025","BUILDING","FINAL",getAppSpecific("Electric Signs over 1650 Watts"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Permanent Service/Panels Up to 200 Amps'] > 0 && feeExists("5002-055","INVOICED") == false) {
	removeFee("5002-055","FINAL");
	addFee("5002-055","BUILDING","FINAL",getAppSpecific("Permanent Service/Panels Up to 200 Amps"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Permanent Service/Panels 200-400 Amps'] > 0 && feeExists("5002-060","INVOICED") == false) {
	removeFee("5002-060","FINAL");
	addFee("5002-060","BUILDING","FINAL",getAppSpecific("Permanent Service/Panels 200-400 Amps"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Permanent Service/Panels 401-600 Amps'] > 0 && feeExists("5002-065","INVOICED") == false) {
	removeFee("5002-065","FINAL");
	addFee("5002-065","BUILDING","FINAL",getAppSpecific("Permanent Service/Panels 401-600 Amps"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Permanent Service/Panels 601-800 Amps'] > 0 && feeExists("5002-070","INVOICED") == false) {
	removeFee("5002-070","FINAL");
	addFee("5002-070","BUILDING","FINAL",getAppSpecific("Permanent Service/Panels 601-800 Amps"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Permanent Service/Panels Amps if over 800'] > 0 && feeExists("5002-075","INVOICED") == false) {
	removeFee("5002-075","FINAL");
	addFee("5002-075","BUILDING","FINAL",getAppSpecific("Permanent Service/Panels Amps if over 800"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Other Electric'] > 0 && feeExists("5002-180","INVOICED") == false) {
	removeFee("5002-180","FINAL");
	addFee("5002-180","BUILDING","FINAL",getAppSpecific("Other Electric"),"N");
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/*/*/*") && getAppSpecific("Photovoltaic System") == "CHECKED" && feeExists("5007-010","INVOICED") == false) {
	removeFee("5007-010","FINAL");
	addFee("5007-010","BUILDING","FINAL",1,"N");
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/Commercial/New/*") && AInfo['Actual Improvement Area'] > 0 && indGroup1 > 0 && feeExists("5010-020","INVOICED") == false) {
	removeFee("5010-020","FINAL");
	addFee("5010-020","BUILDING","FINAL",getAppSpecific("Actual Improvement Area"),"N");
	surchgCntr = surchgCntr +1;
	fireGroup1 = fireGroup1 +1;
	}

if (appMatch("Building/Commercial/New/*") && AInfo['Actual Improvement Area'] > 0 && indGroup1 < 1 && feeExists("5010-010","INVOICED") == false) {
	removeFee("5010-010","FINAL");
	addFee("5010-010","BUILDING","FINAL",getAppSpecific("Actual Improvement Area"),"N");
	surchgCntr = surchgCntr +1;
	fireGroup1 = fireGroup1 +1;
	}

if (appMatch("Building/*/Multi-Family/*") && AInfo['Actual Improvement Area'] > 0 && indGroup1 < 1 && feeExists("5010-010","INVOICED") == false) {
	removeFee("5010-010","FINAL");
	addFee("5010-010","BUILDING","FINAL",getAppSpecific("Actual Improvement Area"),"N");
	surchgCntr = surchgCntr +1;
	fireGroup1 = fireGroup1 +1;
	}

if (appMatch("Building/Commercial/Addition/*") && AInfo['Actual Improvement Area'] > 0 && indGroup1 < 1 && feeExists("5010-010","INVOICED") == false) {
	removeFee("5010-010","FINAL");
	addFee("5010-010","BUILDING","FINAL",getAppSpecific("Actual Improvement Area"),"N");
	surchgCntr = surchgCntr +1;
	fireGroup1 = fireGroup1 +1;
	}

if (appMatch("Building/Residential/New/*") && AInfo['Actual Improvement Area'] > 0 && feeExists("5010-025","INVOICED") == false || appMatch("Building/Residential/Addition/*") && AInfo['Actual Improvement Area'] > 0 && feeExists("5010-025","INVOICED") == false) {
	removeFee("5010-025","FINAL");
	addFee("5010-025","BUILDING","FINAL",getAppSpecific("Actual Improvement Area"),"N");
	envGroup1 = envGroup1 +1;
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/Residential/Addition/*") && AInfo['Actual Improvement Area'] > 0) {
	envGroup1 = 0*1;
	envGroup2 = envGroup2 +1;
	}

if (appMatch("Building/Residential/Accessory Structure/*") && AInfo['Actual Improvement Area'] > 0  && feeExists("5010-025","INVOICED") == false) {
	removeFee("5010-025","FINAL");
	addFee("5010-025","BUILDING","FINAL",getAppSpecific("Actual Improvement Area"),"N");
	envGroup2 = envGroup2 +1;
	surchgCntr = surchgCntr +1;
	}

if ((matches(appTypeArray[1], "Residential") && matches(appTypeArray[2], "Alteration", "Door-Windows", "Pool Reliner", "Reroof", "Vinyl Siding" ) || matches(appTypeArray[2], "Quick Turn")) && AInfo['Valuation of Work Performed'] > 0 && AInfo['Remodel/Repair/Alteration'] == "CHECKED" && feeExists("5010-015","INVOICED") == false) {
	removeFee("5010-015","FINAL");
	addFee("5010-015","BUILDING","FINAL",getAppSpecific("Valuation of Work Performed"),"N");
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/*/Addition/*") && AInfo['Actual Improvement Area'] > 0 && AInfo['Remodel/Repair/Alteration'] == "CHECKED" && feeExists("5010-015","INVOICED") == false) {
	removeFee("5010-015","FINAL");
	addFee("5010-015","BUILDING","FINAL",getAppSpecific("Valuation of Work Performed"),"N");
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/*/*/*") && getAppSpecific("Alteration Valuation without Addition") > 0 && getAppSpecific("Alteration Valuation without Addition") <= 2000 && feeExists("5010-060","INVOICED") == false) {
	removeFee("5010-060","FINAL");
	addFee("5010-060","BUILDING","FINAL",91.38,bldPlnApv);
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/*/*/*") && getAppSpecific("Alteration Valuation without Addition") >= 2000.01 && getAppSpecific("Alteration Valuation without Addition") <= 15000 && feeExists("5010-060","INVOICED") == false) {
	removeFee("5010-060","FINAL");
	addFee("5010-060","BUILDING","FINAL",212.78,bldPlnApv);
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/*/*/*") && getAppSpecific("Alteration Valuation without Addition") >= 15000.01 && getAppSpecific("Alteration Valuation without Addition") <= 50000 && feeExists("5010-060","INVOICED") == false) {
	removeFee("5010-060","FINAL");
	addFee("5010-060","BUILDING","FINAL",386.40 +(((AInfo['Alteration Valuation without Addition'] -15000)/100)*1.56),bldPlnApv);
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/*/*/*") && getAppSpecific("Alteration Valuation without Addition") >= 50000.01 && getAppSpecific("Alteration Valuation without Addition") <= 100000 && feeExists("5010-060","INVOICED") == false) {
	removeFee("5010-060","FINAL");
	addFee("5010-060","BUILDING","FINAL",998.63 +(((AInfo['Alteration Valuation without Addition'] -50000)/100)*1.41),bldPlnApv);
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/*/*/*") && getAppSpecific("Alteration Valuation without Addition") >= 100000.01 && getAppSpecific("Alteration Valuation without Addition") <= 500000 && feeExists("5010-060","INVOICED") == false) {
	removeFee("5010-060","FINAL");
	addFee("5010-060","BUILDING","FINAL",1644.80 +(((AInfo['Alteration Valuation without Addition'] -100000)/100)*.777),bldPlnApv);
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/*/*/*") && getAppSpecific("Alteration Valuation without Addition") >= 500000.01 && getAppSpecific("Alteration Valuation without Addition") <= 10000000 && feeExists("5010-060","INVOICED") == false) {
	removeFee("5010-060","FINAL");
	addFee("5010-060","BUILDING","FINAL",5305.15 +(((AInfo['Alteration Valuation without Addition'] -500000)/100)*.397),bldPlnApv);
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/VelocityHall/Reroof/NA") && AInfo['Valuation of Work Performed'] > 0 && feeExists("5010-015","INVOICED") == false) {
	removeFee("5010-015","FINAL");
	addFee("5010-015","BUILDING","FINAL",getAppSpecific("Valuation of Work Performed"),"N");
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/VelocityHall/Vinyl Siding/*") && AInfo['Valuation of Work Performed'] > 0 && feeExists("5010-015","INVOICED") == false) {
	removeFee("5010-015","FINAL");
	addFee("5010-015","BUILDING","FINAL",getAppSpecific("Valuation of Work Performed"),"N");
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/VelocityHall/Door-Windows/NA") && AInfo['Valuation of Work Performed'] > 0 && feeExists("5010-015","INVOICED") == false) {
	removeFee("5010-015","FINAL");
	addFee("5010-015","BUILDING","FINAL",getAppSpecific("Valuation of Work Performed"),"N");
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/Commercial/Alteration/*") && AInfo['Valuation of Work Performed'] > 0 && AInfo['Remodel/Repair/Alteration'] == "CHECKED" && feeExists("5010-015","INVOICED") == false) {
	removeFee("5010-015","FINAL");
	addFee("5010-015","BUILDING","FINAL",getAppSpecific("Valuation of Work Performed"),"N");
	addFee("5020-015","BUILDING","FINAL",getAppSpecific("Valuation of Work Performed"),"N");
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/VelocityHall/*/*") && AInfo['Valuation of Work Performed'] > 0 && AInfo['Remodel/Repair/Alteration'] == "CHECKED" && feeExists("5010-015","INVOICED") == false) {
	removeFee("5010-015","FINAL");
	addFee("5010-015","BUILDING","FINAL",getAppSpecific("Valuation of Work Performed"),"N");
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/Commercial/Foundation/*") && AInfo['Valuation of Work Performed'] > 0 && feeExists("5010-055","INVOICED") == false) {
	removeFee("5010-055","FINAL");
	addFee("5010-055","BUILDING","FINAL",getAppSpecific("Actual Improvement Area"),"N");
	envGroup1 = envGroup1 +1;
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/Residential/Manufactured Home/*") && AInfo['Valuation of Work Performed'] > 0 && feeExists("5040-010","INVOICED") == false) {
	removeFee("5040-010","FINAL");
	addFee("5040-010","BUILDING","FINAL",1,"N");
	envGroup1 = envGroup1 +1;
	}

if (appMatch("Building/*/Pool/*") && AInfo['New Pool In-Ground'] == "CHECKED" && AInfo['Valuation of Work Performed'] > 0 && feeExists("5010-035","INVOICED") == false) {
	removeFee("5010-035","FINAL");
	addFee("5010-035","BUILDING","FINAL",1,"N");
	envGroup1 = envGroup1 +1;
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/*/Pool/*") && AInfo['New Pool Above-Ground'] == "CHECKED" && AInfo['Valuation of Work Performed'] > 0 && feeExists("5010-040","INVOICED") == false) {
	removeFee("5010-040","FINAL");
	addFee("5010-040","BUILDING","FINAL",1,"N");
	envGroup3 = envGroup3 +1;
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Pool Liner Only'] == "CHECKED" && AInfo['Valuation of Work Performed'] > 0 && feeExists("5010-042","INVOICED") == false) {
	removeFee("5010-042","FINAL");
	addFee("5010-042","BUILDING","FINAL",1,"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Temporary Facility'] == "CHECKED" && AInfo['Valuation of Work Performed'] > 0 && feeExists("5010-045","INVOICED") == false) {
	removeFee("5010-045","FINAL");
	addFee("5010-045","BUILDING","FINAL",1,"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Move Structure'] == "CHECKED" && AInfo['Valuation of Work Performed'] > 0 && feeExists("5010-030","INVOICED") == false) {
	removeFee("5010-030","FINAL");
	addFee("5010-030","BUILDING","FINAL",1,"N");
	envGroup1 = envGroup1 +1;
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Other Building'] > 0 && AInfo['Valuation of Work Performed'] > 0 && feeExists("5010-050","INVOICED") == false) {
	removeFee("5010-050","FINAL");
	addFee("5010-050","BUILDING","FINAL",getAppSpecific("Other Building"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Commercial Plan Review'] == "CHECKED" && feeExists("5012-010","INVOICED") == false) {
	removeFee("5012-010","FINAL");
	addFee("5012-010","BUILDING","FINAL",getAppSpecific("Valuation of Work Performed"),"N");
	}

if (AInfo['Addressing Assignment'] == "CHECKED" && feeExists("8096-010","INVOICED") == false) {
	removeFee("8096-010","FINAL");
	addFee("8096-010","BUILDING","FINAL",1,"N");
	}

if (AInfo['Class Type'] == "Shed" || AInfo['Class Type'] == "Storage Building" || AInfo['Class Type'] == "Green House" || AInfo['Class Type'] == "Boat Shed/Dock" || AInfo['Class Type'] == "Pool House" || AInfo['Class Type'] == "Res Carport/Garage") {
	accGroup1 = accGroup1 +1;
	}

if (appMatch("Building/Residential/Demolition/*") && accGroup1 > 0) {
	demoGroup1 = demoGroup1 +1;
	}

if (demoGroup1 > 0 && AInfo['Utilities Attached'] != "CHECKED" && feeExists("5010-065","INVOICED") == false && feeExists("7015-015","INVOICED") == false) {
	removeFee("5010-065","FINAL");
	removeFee("7015-015","FINAL");
	addFee("7015-015","BUILDING","FINAL",getAppSpecific("Actual Improvement Area"),"N");
	}

if (demoGroup1 > 0 && AInfo['Utilities Attached'] == "CHECKED" && feeExists("5010-065","INVOICED") == false && feeExists("7015-015","INVOICED") == false) {
	removeFee("5010-065","FINAL");
	addFee("5010-065","BUILDING","FINAL",1,bldPlnApv);
	removeFee("7015-015","FINAL");
	addFee("7015-015","BUILDING","FINAL",getAppSpecific("Actual Improvement Area"),"N");
	surchgCntr = surchgCntr +1;
	}

if (accGroup1 == 0 && appMatch("Building/*/Demolition/*") && feeExists("5010-065","INVOICED") == false && feeExists("7015-015","INVOICED") == false) {
	removeFee("7015-015","FINAL");
	addFee("7015-015","BUILDING","FINAL",1001,bldPlnApv);
	removeFee("5010-065","FINAL");
	addFee("5010-065","BUILDING","FINAL",1,"N");
	surchgCntr = surchgCntr +1;
	}

if (appMatch("Building/Commercial/Demolition/*") && feeExists("5010-065","INVOICED") == false && feeExists("7015-015","INVOICED") == false) {
	removeFee("5010-065","FINAL");
	addFee("5010-065","BUILDING","FINAL",1,bldPlnApv);
	removeFee("7015-015","FINAL");
	addFee("7015-015","BUILDING","FINAL",1001,"N");
	surchgCntr = surchgCntr +1;
	demoGroup1 = demoGroup1 +1;
	}

if (appMatch("Building/Commercial/Sign/*") && AInfo['Valuation of Work Performed'] > 0 && feeExists("5010-015","INVOICED") == false) {
	removeFee("5010-015","FINAL");
	addFee("5010-015","BUILDING","FINAL",getAppSpecific("Valuation of Work Performed"),"N");
	surchgCntr = surchgCntr +1;
	}

if (appTypeArray[1] == "Residential" && matches(appTypeArray[2],"New") && AInfo['Fees Paid on LEM'] == "CHECKED") {
	envGroup1 = envGroup1 *0;
	}

if (appTypeArray[0] == "Building" && AInfo['Improvement Type'] == "Retaining Wall") {
	envGroup1 = envGroup1 +1;
	envGroup2 = envGroup2 *0;
	}

if (appMatch("Building/*/*/*") && AInfo['Resite Fee'] > 0 && feeExists("7015-014","INVOICED") == false) {
	removeFee("7015-014","FINAL");
	addFee("7015-014","BUILDING","FINAL",getAppSpecific("Resite Fee"),"N");
	}

if (envGroup1 > 0 && feeExists("7015-012","INVOICED") == false  && feeExists("5041-015","INVOICED") == false) {
	removeFee("7015-012","FINAL");
	removeFee("5041-015","FINAL");
	addFee("7015-012","BUILDING","FINAL",1,"N");
	addFee("5041-015","BUILDING","FINAL",1,"N");
	}

if (envGroup2 > 0 && appMatch("Building/Residential/*/*") && (AInfo['Actual Improvement Area'] >0 && AInfo['Actual Improvement Area'] <=1000) && feeExists("7015-010","INVOICED") == false) {
	removeFee("7015-010","FINAL");
	addFee("7015-010","BUILDING","FINAL",AInfo['Actual Improvement Area'],"N");
	}

if (envGroup2 > 0 && appMatch("Building/Residential/*/*") && AInfo['Actual Improvement Area'] > 1000 && feeExists("7015-012","INVOICED") == false && feeExists("5041-015","INVOICED") == false) {
	removeFee("7015-012","FINAL");
	removeFee("5041-015","FINAL");
	addFee("7015-012","BUILDING","FINAL",1,"N");
	addFee("5041-015","BUILDING","FINAL",1,"N");
	}

if (appMatch("Building/VelocityHall/Mechanical/NA")) {
	mechGroup1 = mechGroup1 + 1;
	}

if ((appMatch("Building/Residential/Alteration/NA") && AInfo['Improvement Type'] == "Mechanical Only") || (appMatch("Building/Commercial/Alteration/NA") && AInfo['Improvement Type'] == "Mechanical Only")) {
	mechGroup1 = mechGroup1 + 1;
	}

if (mechGroup1 > 0 && AInfo['Valuation of Work Performed'] > 7500 && feeExists("5017-010","INVOICED") == false) {
	removeFee("5017-010","FINAL");
	addFee("5017-010","BUILDING","FINAL",1,"N");
	}

if (mechGroup1 == 0 && demoGroup1 == 0 && appMatch("Building/*/*/*") && AInfo['Valuation of Work Performed'] > 2500  && feeExists("5017-010","INVOICED") == false) {
	removeFee("5017-010","FINAL");
	addFee("5017-010","BUILDING","FINAL",1,"N");
	}

if (demoGroup1 > 0 && AInfo['Valuation of Work Performed'] > 2500  && feeExists("5017-010","INVOICED") == false) {
	removeFee("5017-010","FINAL");
	addFee("5017-010","BUILDING","FINAL",1,"N");
	}

if (appMatch("Building/*/*/*") && AInfo['Valuation of Work Performed'] >= 2500  && mechGroup1 == 0 && feeExists("5017-010","INVOICED") == false) {
	removeFee("5017-010","FINAL");
	addFee("5017-010","BUILDING","FINAL",1,"N");
	}

if (fireGroup1 > 0 && feeExists("5020-010","INVOICED") == false) {
	removeFee("5020-010","FINAL");
	addFee("5020-010","BUILDING","FINAL",getAppSpecific("Actual Improvement Area"),"N");
	}

if (fireGroup2 > 0 && feeExists("5020-015","INVOICED") == false) {
	removeFee("5020-015","FINAL");
	addFee("5012-010","BUILDING","FINAL",getAppSpecific("Valuation of Work Performed"),"N");
	}

if (plansrevGroup1 > 0 && feeExists("5012-010","INVOICED") == false) {
	removeFee("5012-010","FINAL");
	addFee("5012-010","BUILDING","FINAL",getAppSpecific("Valuation of Work Performed"),"N");
	}

if (AInfo['Other Plan Review'] > 0 && feeExists("5012-015","INVOICED") == false) {
	removeFee("5012-015","FINAL");
	addFee("5012-015","BUILDING","FINAL",getAppSpecific("Other Plan Review"),"N");
	}

if (AInfo['Number of Large Documents Printed'] > 0 && feeExists("8205-010","INVOICED") == false) {
	removeFee("8205-010","FINAL");
	addFee("8205-010","BUILDING","FINAL",getAppSpecific("Number of Large Documents Printed"),"N");
	}

if (appMatch("Building/Miscellaneous/*/*") && feeExists("8207-005","INVOICED") == false && AInfo['Hours Charged'] > 0 && AInfo['Select Division'] == "Building Review-Inspection") {
	removeFee("8207-005","FINAL");
	addFee("8207-005","L-MISC","FINAL",getAppSpecific("Hours Charged"),"N");
	}

if ((AInfo['Mech New Installation'] > 0 || AInfo['Mech Retro Existing Install'] > 0)) {
	editAppSpecific("Mechanical Final Required","CHECKED");
	editAppSpecific("Mechanical Required","CHECKED");
	}

if (AInfo['Gas Issuance'] == "CHECKED") {
	editAppSpecific("Gas Final Required","CHECKED");
	editAppSpecific("Gas Required","CHECKED");
	}

if ((AInfo['New or Addition Structure'] == "CHECKED" || AInfo['Remodel/Repair/Alteration'] == "CHECKED")) {
	editAppSpecific("Building Final Required","CHECKED");
	editAppSpecific("Building Required","CHECKED");
	}

if (AInfo['Electrical Issuance'] == "CHECKED") {
	editAppSpecific("Electrical Final Required","CHECKED");
	editAppSpecific("Electric Required","CHECKED");
	}

if (AInfo['Plumbing Issuance'] == "CHECKED") {
	editAppSpecific("Plumbing Final Required","CHECKED");
	editAppSpecific("Plumbing Required","CHECKED");
	}

if (AInfo['New Pool In-Ground'] == "CHECKED") {
	editAppSpecific("Pool Final Required","CHECKED");
	editAppSpecific("Pool Required","CHECKED");
	}

if (AInfo['Pool Liner Only'] == "CHECKED") {
	editAppSpecific("Pool Final Required","CHECKED");
	editAppSpecific("Pool Required","CHECKED");
	}

if (appTypeArray[2] == "Manufactured Home") {
	editAppSpecific("Mobile Home Final Required","CHECKED");
	editAppSpecific("Mobile Home Required","CHECKED");
	}

if (fireGroup1 > 0 || fireGroup2 > 0) {
	editAppSpecific("Fire Final Required ","CHECKED");
	}

if (appTypeArray[0] == "Building" && appTypeArray[2] != "Mechanical" && getAppSpecific("Valuation of Work Performed") >= 2500 && !isScheduled("505: Notice of Commencement")) {
	createPendingInspection("L-INSP_ALL","505: Notice of Commencement");
	}

if (appTypeArray[2] == "Mechanical" && getAppSpecific("Valuation of Work Performed") >= 7500 && !isScheduled("505: Notice of Commencement")) {
	createPendingInspection("L-INSP_ALL","505: Notice of Commencement");
	}

if (AInfo['Expiration Date'] == null) {
	editAppSpecific("Expiration Date",dateAdd(AInfo['Open Date'],180));
	}

if (AInfo['Violation'] == "CHECKED" && feeExists("5013-010","INVOICED") == false) {
	removeFee("5013-010","FINAL");
	addFee("5013-010","BUILDING","FINAL",1,"N");
	}

if (surchgCntr > 0 && feeExists("5015-010","INVOICED") == false && feeExists("5043-010","INVOICED") == false) {
	removeFee("5015-010","FINAL");
	removeFee("5043-010","FINAL");
	addFee("5015-010","BUILDING","FINAL",1,"N");
	addFee("5043-010","BUILDING","FINAL",1,"N");
	}

if ((appMatch("Building/Residential/*/*") || appMatch("Building/Commercial/*/*"))) {
	showMessage = true;
	comment("<font color = red>Branched to EMSE:Add-Inspections-Building</font>");
	}

if (isTaskStatus("Quality Check","Ready to Issue") == "True") {
	showMessage = true;
	comment("<font color = red>Quality Check is Ready to Issue</font>");
	}

if ((AInfo['Inspections Added'] == null || AInfo['Inspections Added'] == "UNCHECKED")) {
	showMessage = true;
	comment("<font color = red>Inspections Added is Not Checked</font>");
	}
`^
EMSE;Fees-Building_Dummy^`
if (logDebug("We are in fee debug");) {
	}
`^
EMSE;Fees-CodeCompliance^`
showMessage = true;
showDebug = 1;
var today = new Date();
today = Date(aa.date.currentDate);
calcDays = 0*1;
AInfo['Fine Calculation Date'] = today;
totalFine = 0*1;
if (appMatch("CodeCompliance/Code Complaint/*/*") && AInfo['Complete'] == null && capStatus == "CEB LIEN" && AInfo['Complete'] == null && feeExists("8030-005","INVOICED") == false) {
	removeFee("8030-005","FINAL");
	addFee("8030-005","LEC_CASE","FINAL",1,"N");
	}

if (appMatch("CodeCompliance/Code Complaint/*/*") && AInfo['Complete'] == null  && capStatus == "CEB LIEN" && feeExists("8030-001","INVOICED") == false) {
	removeFee("8030-001","FINAL");
	addFee("8030-001","LEC_CASE","FINAL",1,"N");
	}

if (appMatch("CodeCompliance/Code Complaint/*/*") && AInfo['Complete'] == null  && capStatus == "CEB LIEN" && AInfo['Env After the Fact Fee'] >= .01 && feeExists("7018-001","INVOICED") == false) {
	removeFee("7018-015","FINAL");
	addFee("7018-001","LEC_CASE","FINAL",1,"N");
	}
`^
EMSE;Fees-DevelopmentSvc^`
if (appMatch("DevelopmentSvc/Concurrency/*/*")) {
	concurGroup1 = 0*1;
	}

if (appMatch("DevelopmentSvc/Concurrency/*/*")) {
	removeFee("8040-010","FINAL");
	removeFee("8041-010","FINAL");
	removeFee("8040-015","FINAL");
	removeFee("8044-010","FINAL");
	removeFee("8046-010","FINAL");
	}

if (appMatch("DevelopmentSvc/Concurrency/*/*") && feeExists("8040-010","INVOICED") == true) {
	concurGroup1 = concurGroup1 + (feeAmount("8040-010","INVOICED")*1);
	}

if (appMatch("DevelopmentSvc/Concurrency/*/*") && feeExists("8041-010","INVOICED") == true) {
	concurGroup1 = concurGroup1 + (feeAmount("8041-010","INVOICED")*1);
	}

if (appMatch("DevelopmentSvc/Concurrency/*/*") && getAppSpecific("Number Residential Dwelling Units") > 0 && feeExists("8040-010","INVOICED") == false) {
	removeFee("8040-010","FINAL");
	addFee("8040-010","DEVELOPMENT","FINAL",getAppSpecific("Number Residential Dwelling Units"),"N");
	}

if (appMatch("DevelopmentSvc/Concurrency/*/*") && getAppSpecific("Commercial Sq Footage") > 0 && feeExists("8041-010","INVOICED") == false) {
	removeFee("8041-010","FINAL");
	addFee("8041-010","DEVELOPMENT","FINAL",getAppSpecific("Commercial Sq Footage"),"N");
	}

if (appMatch("DevelopmentSvc/Concurrency/*/*") && getAppSpecific("Other Fee Amount") > 0 && feeExists("8040-015","INVOICED") == false) {
	removeFee("8040-015","FINAL");
	addFee("8040-015","DEVELOPMENT","FINAL",getAppSpecific("Other Fee Amount"),"N");
	}

if (appMatch("DevelopmentSvc/Concurrency/*/*") && getAppSpecific("Extension of Concurrency Certif 2yrs") >0 && feeExists("8044-010","INVOICED") == false) {
	removeFee("8044-010","FINAL");
	addFee("8044-010","DEVELOPMENT","FINAL",concurGroup1 * getAppSpecific("Extension of Concurrency Certif 2yrs") ,"N");
	}

if (appMatch("DevelopmentSvc/Concurrency/*/*") && getAppSpecific("Revision of Apv Concurrency Certif") >0 && feeExists("8046-010","INVOICED") == false) {
	removeFee("8046-010","FINAL");
	addFee("8046-010","DEVELOPMENT","FINAL",concurGroup1 * getAppSpecific("Revision of Apv Concurrency Certif") ,"N");
	}

devrGroup1 = 0*1;
dnGroup1 = 0*1;
dnGroup2 = 0*1;
dnGroup3 = 0*1;
if (appMatch("DevelopmentSvc/Land Development Review/*/*")) {
	removeFee("8065-010","FINAL");
	removeFee("8061-010","FINAL");
	removeFee("8069-010","FINAL");
	removeFee("8057-010","FINAL");
	removeFee("8058-010","FINAL");
	removeFee("8059-010","FINAL");
	removeFee("8064-010","FINAL");
	removeFee("8062-010","FINAL");
	removeFee("8100-010","FINAL");
	removeFee("8100-015","FINAL");
	removeFee("8095-010","FINAL");
	removeFee("8096-010","FINAL");
	removeFee("8060-010","FINAL");
	removeFee("8060-015","FINAL");
	removeFee("8064-010","FINAL");
	removeFee("8042-010","FINAL");
	removeFee("8056-010","FINAL");
	removeFee("8063-010","FINAL");
	}

if (appMatch("DevelopmentSvc/Land Development Review/Project Status Determination/*") && getAppSpecific("Project Status Site Built") == "CHECKED" && feeExists("8060-010","INVOICED") == false) {
	removeFee("8060-010","FINAL");
	addFee("8060-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/*/*") && getAppSpecific("Project Status Other") == "CHECKED" && feeExists("8061-010","INVOICED") == false) {
	removeFee("8061-010","FINAL");
	addFee("8061-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/Land Use Determination/*") && getAppSpecific("Land Use Determination") == "CHECKED" && feeExists("8065-010","INVOICED") == false) {
	removeFee("8065-010","FINAL");
	addFee("8065-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Address or Street Name Change/Street Renaming/*") && getAppSpecific("Street Name Change") == "CHECKED" && feeExists("8095-010","INVOICED") == false) {
	removeFee("8095-010","FINAL");
	addFee("8095-010","DEVELOPMENT","FINAL",1,"Y");
	dnGroup1 = dnGroup1 + 1;
	}

if (appMatch("DevelopmentSvc/Address or Street Name Change/Address Assignment/*") && getAppSpecific("Address Only") == "CHECKED" && feeExists("8096-010","INVOICED") == false) {
	removeFee("8096-010","FINAL");
	addFee("8096-010","DEVELOPMENT","FINAL",1,"Y");
	}

if (appMatch("DevelopmentSvc/Land Development Review/BOAA/*") && getAppSpecific("Board of Adjustment and Appeals Variance Request") == "CHECKED" && feeExists("8062-010","INVOICED") == false) {
	removeFee("8062-010","FINAL");
	addFee("8062-010","DEVELOPMENT","FINAL",1,"N");
	dnGroup1 = dnGroup1 + 1;
	}

if (appTypeArray[2] == "Alcoholic Beverage Lic Rev" && getAppSpecific("Alcoholic Beverage License Review") == "CHECKED" && feeExists("8069-010","INVOICED") == false) {
	removeFee("8069-010","FINAL");
	addFee("8069-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/*/*") && getAppSpecific("Temp Sign Application/Review") == "CHECKED" && feeExists("8056-010","INVOICED") == false) {
	removeFee("8056-010","FINAL");
	addFee("8056-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/*/*") && getAppSpecific("Other Sign Permit Compliance Review") == "CHECKED" && feeExists("8057-010","INVOICED") == false) {
	removeFee("8057-010","FINAL");
	addFee("8057-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/*/*") && getAppSpecific("Temporary Use Site Plan Review") == "CHECKED" && feeExists("8058-010","INVOICED") == false) {
	removeFee("8058-010","FINAL");
	addFee("8058-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/Annexation or De-Annexation/*") && getAppSpecific("Annexation/De-annexation Review") == "CHECKED" && feeExists("8059-010","INVOICED") == false) {
	removeFee("8059-010","FINAL");
	addFee("8059-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/*/*") && getAppSpecific("Other Jurisdiction Comp Plan Amendment Review") == "CHECKED" && feeExists("8064-010","INVOICED") == false) {
	removeFee("8064-010","FINAL");
	addFee("8064-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/*/*") && getAppSpecific("Other Jurisdiction Concurrency Application Review") == "CHECKED" && feeExists("8042-010","INVOICED") == false) {
	removeFee("8042-010","FINAL");
	addFee("8042-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/*/*") && getAppSpecific("Other Fee") > 0 && feeExists("8060-015","INVOICED") == false) {
	removeFee("8060-015","FINAL");
	addFee("8060-015","DEVELOPMENT","FINAL",getAppSpecific("Other Fee"),"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/*/*") && dnGroup1 >=1 && feeExists("8100-010","INVOICED") == false || appMatch("DevelopmentSvc/Address-Street Name Change/*/*") && dnGroup1 >=1 && feeExists("8100-010","INVOICED") == false) {
	removeFee("8100-010","FINAL");
	addFee("8100-010","DEVELOPMENT","FINAL",dnGroup1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/*/*") && dnGroup2 >=1 && feeExists("8100-015","INVOICED") == false) {
	removeFee("8100-015","FINAL");
	addFee("8100-015","DEVELOPMENT","FINAL",dnGroup2,"N");
	}

if (appMatch("DevelopmentSvc/Exempt Subdivision/*/*")) {
	removeFee("7080-010","FINAL");
	removeFee("8081-010","FINAL");
	removeFee("8079-010","FINAL");
	removeFee("8071-010","FINAL");
	removeFee("8072-010","FINAL");
	removeFee("8073-010","FINAL");
	removeFee("8074-010","FINAL");
	removeFee("8076-010","FINAL");
	removeFee("8077-010","FINAL");
	removeFee("8078-010","FINAL");
	removeFee("8092-010","FINAL");
	}

if (appMatch("DevelopmentSvc/Exempt Subdivision/*/*") && getAppSpecific("Policy 2.1.9 Review") == "CHECKED" && feeExists("8081-010","INVOICED") == false) {
	removeFee("8081-010","FINAL");
	addFee("8081-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Exempt Subdivision/*/*") && getAppSpecific("Judicial Exception") == "CHECKED" && feeExists("8079-010","INVOICED") == false) {
	removeFee("8079-010","FINAL");
	addFee("8079-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Exempt Subdivision/*/*") && getAppSpecific("Boundary Settlement") == "CHECKED" && feeExists("8071-010","INVOICED") == false) {
	removeFee("8071-010","FINAL");
	addFee("8071-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Exempt Subdivision/*/*") && getAppSpecific("Conveyance to Govt") == "CHECKED" && feeExists("8072-010","INVOICED") == false) {
	removeFee("8072-010","FINAL");
	addFee("8072-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Exempt Subdivision/*/*") && getAppSpecific("Equal or Larger") == "CHECKED" && feeExists("8073-010","INVOICED") == false) {
	removeFee("8073-010","FINAL");
	addFee("8073-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Exempt Subdivision/*/*") && getAppSpecific("Corrective Instrument") == "CHECKED" && feeExists("8074-010","INVOICED") == false) {
	removeFee("8074-010","FINAL");
	addFee("8074-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Exempt Subdivision/*/*") && getAppSpecific("Affidavit for Additional Dwelling Unit") == "CHECKED" && feeExists("8076-010","INVOICED") == false) {
	removeFee("8076-010","FINAL");
	addFee("8076-010","DEVELOPMENT","FINAL",getAppSpecific("Additional Dwelling Units"),"N");
	}

if (appMatch("DevelopmentSvc/Exempt Subdivision/*/*") && getAppSpecific("Letter of Exception") == "CHECKED" && feeExists("8077-010","INVOICED") == false) {
	removeFee("8077-010","FINAL");
	addFee("8077-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Exempt Subdivision/*/*") && getAppSpecific("Unity of Title") == "CHECKED" && feeExists("8078-010","INVOICED") == false) {
	removeFee("8078-010","FINAL");
	addFee("8078-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Exempt Subdivision/*/*") && getAppSpecific("Release Unity of Title") == "CHECKED" && feeExists("8092-010","INVOICED") == false) {
	removeFee("8092-010","FINAL");
	addFee("8092-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/*/*/*")) {
	siteGroup1 = 0*1;
	typeACap1 = 0*1;
	typeBCap1 = 0*1;
	typeCCap1 = 0*1;
	typeDCap1 = 0*1;
	typeBothAll1 = 0*1;
	typeResAmt = 0*1;
	typeNResAmt = 0*1;
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*")) {
	removeFee("8089-010","FINAL");
	removeFee("8100-010","FINAL");
	removeFee("8100-015","FINAL");
	removeFee("8100-020","FINAL");
	removeFee("8102-010","FINAL");
	removeFee("8101-010","FINAL");
	removeFee("8102-010","FINAL");
	removeFee("8103-010","FINAL");
	removeFee("8104-010","FINAL");
	removeFee("8105-010","FINAL");
	removeFee("8106-010","FINAL");
	removeFee("8107-010","FINAL");
	removeFee("8111-010","FINAL");
	removeFee("8112-010","FINAL");
	removeFee("8082-010","FINAL");
	removeFee("8083-010","FINAL");
	removeFee("8086-010","FINAL");
	removeFee("8085-010","FINAL");
	removeFee("8084-010","FINAL");
	removeFee("8068-010","FINAL");
	removeFee("8100-025","FINAL");
	removeFee("8100-020","FINAL");
	removeFee("8120-010","FINAL");
	removeFee("8121-010","FINAL");
	removeFee("8122-010","FINAL");
	removeFee("8123-010","FINAL");
	removeFee("8124-010","FINAL");
	removeFee("8309-010","FINAL");
	removeFee("8310-010","FINAL");
	removeFee("8311-010","FINAL");
	removeFee("8312-010","FINAL");
	removeFee("8313-010","FINAL");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Units") > 0 && getAppSpecific("Square Feet") > 0 && getAppSpecific("Charge Fees") == "CHECKED") {
	typeBothAll1 = typeBothAll1 + 1;
	}

if (appMatch("DevelopmentSvc/Site Plan Review/ASAP/*") && getAppSpecific("Square Feet") < 1) {
	editAppSpecific("Non-Residential Amount",0);
	}

if (appMatch("DevelopmentSvc/Site Plan Review/ASAP/*") && getAppSpecific("Units") < 1) {
	editAppSpecific("Residential Amount",0);
	}

if (appMatch("DevelopmentSvc/Site Plan Review/ASAP/*") && feeExists("8090-010","INVOICED") == false) {
	addFee("8089-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/FDPA - Type A/*") || appMatch("DevelopmentSvc/Site Plan Review/CPA - Type A/*")) {
	typeACap1 = typeACap1 +1;
	editAppSpecific("Residential Amount",0);
	editAppSpecific("Non-Residential Amount",0);
	}

if (typeACap1 > 0 && getAppSpecific("Units") > 0 && getAppSpecific("Charge Fees") == "CHECKED") {
	editAppSpecific("Residential Amount", 4476+(getAppSpecific("Units") *96));
	}

if (typeACap1 > 0 && getAppSpecific("Square Feet") > 0 && getAppSpecific("Charge Fees") == "CHECKED") {
	editAppSpecific("Non-Residential Amount", 2436+(getAppSpecific("Square Feet") *.85));
	}

if (typeACap1 > 0) {
	editAppSpecific("Res-NRes Amount",(getAppSpecific("Residential Amount")*1 + getAppSpecific("Non-Residential Amount")*1));
	}

if (typeACap1 > 0 && getAppSpecific("Res-NRes Amount") >= 6000 && typeBothAll1 >0) {
	editAppSpecific("Residential Amount",3900);
	editAppSpecific("Non-Residential Amount",2100);
	}

if (typeACap1 > 0 && getAppSpecific("Direct Legal Notice") == "CHECKED" && feeExists("8100-015","INVOICED") == false) {
	addFee("8100-015","DEVELOPMENT","FINAL",1,"N");
	}

if (typeACap1 > 0 && getAppSpecific("Units") > 0 && getAppSpecific("Charge Fees") == "CHECKED" && feeExists("8102-010","INVOICED") == false) {
	addFee("8102-010","DEVELOPMENT","FINAL",getAppSpecific("Residential Amount"),"N");
	}

if (typeACap1 > 0 && getAppSpecific("Square Feet") > 0 && getAppSpecific("Charge Fees") == "CHECKED" && feeExists("8101-010","INVOICED") == false) {
	addFee("8101-010","DEVELOPMENT","FINAL",getAppSpecific("Non-Residential Amount"),"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/FDPA - Type B/*") || appMatch("DevelopmentSvc/Site Plan Review/CPA - Type B/*")) {
	typeBCap1 = typeBCap1 +1;
	editAppSpecific("Residential Amount",0);
	editAppSpecific("Non-Residential Amount",0);
	}

if (typeBCap1 > 0 && getAppSpecific("Units") > 0 && getAppSpecific("Charge Fees") == "CHECKED") {
	editAppSpecific("Residential Amount", 6024+(getAppSpecific("Units") *78));
	}

if (typeBCap1 > 0 && getAppSpecific("Square Feet") > 0 && getAppSpecific("Charge Fees") == "CHECKED") {
	editAppSpecific("Non-Residential Amount", 3828+(getAppSpecific("Square Feet") *.56));
	}

if (typeBCap1 > 0) {
	editAppSpecific("Res-NRes Amount",(getAppSpecific("Residential Amount")*1 + getAppSpecific("Non-Residential Amount")*1));
	}

if (typeBCap1 > 0 && getAppSpecific("Res-NRes Amount") >= 12000 && typeBothAll1 >0) {
	editAppSpecific("Residential Amount",7320);
	editAppSpecific("Non-Residential Amount",4680);
	}

if (typeBCap1 > 0 && getAppSpecific("Direct Legal Notice") == "CHECKED" && feeExists("8100-025","INVOICED") == false) {
	addFee("8100-025","DEVELOPMENT","FINAL",1,"N");
	}

if (typeBCap1 > 0 && getAppSpecific("Units") > 0 && getAppSpecific("Charge Fees") == "CHECKED" && feeExists("8104-010","INVOICED") == false) {
	addFee("8104-010","DEVELOPMENT","FINAL",getAppSpecific("Residential Amount"),"N");
	}

if (typeBCap1 > 0 && getAppSpecific("Square Feet") > 0 && getAppSpecific("Charge Fees") == "CHECKED" && feeExists("8103-010","INVOICED") == false) {
	addFee("8103-010","DEVELOPMENT","FINAL",getAppSpecific("Non-Residential Amount"),"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/FDPA - Type C/*") || appMatch("DevelopmentSvc/Site Plan Review/CPA - Type C/*")) {
	typeCCap1 = typeCCap1 +1;
	editAppSpecific("Residential Amount",0);
	editAppSpecific("Non-Residential Amount",0);
	}

if (typeCCap1 > 0 && getAppSpecific("Units") > 0 && getAppSpecific("Charge Fees") == "CHECKED") {
	editAppSpecific("Residential Amount", 4500+(getAppSpecific("Units") *48));
	}

if (typeCCap1 > 0 && getAppSpecific("Square Feet") > 0 && getAppSpecific("Charge Fees") == "CHECKED") {
	editAppSpecific("Non-Residential Amount", 3756+(getAppSpecific("Square Feet") *.55));
	}

if (typeCCap1 > 0) {
	editAppSpecific("Res-NRes Amount",(getAppSpecific("Residential Amount")*1 + getAppSpecific("Non-Residential Amount")*1));
	}

if (typeCCap1 > 0 && getAppSpecific("Res-NRes Amount") >= 12000 && typeBothAll1 >0) {
	editAppSpecific("Residential Amount",6600);
	editAppSpecific("Non-Residential Amount",5400);
	}

if (typeCCap1 > 0 && getAppSpecific("Direct Legal Notice") == "CHECKED" && feeExists("8100-020","INVOICED") == false) {
	addFee("8100-020","DEVELOPMENT","FINAL",1,"N");
	}

if (typeCCap1 > 0 && getAppSpecific("Units") > 0 && getAppSpecific("Charge Fees") == "CHECKED" && feeExists("8106-010","INVOICED") == false) {
	addFee("8106-010","DEVELOPMENT","FINAL",getAppSpecific("Residential Amount"),"N");
	}

if (typeCCap1 > 0 && getAppSpecific("Square Feet") > 0 && getAppSpecific("Charge Fees") == "CHECKED" && feeExists("8105-010","INVOICED") == false) {
	addFee("8105-010","DEVELOPMENT","FINAL",getAppSpecific("Non-Residential Amount"),"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Units") > 0 && getAppSpecific("Acreage") > 0 && getAppSpecific("Charge Fees") == "CHECKED") {
	typeBothAll1 = typeBothAll1 + 1;
	}

if (appMatch("DevelopmentSvc/Site Plan Review/Type D/*")) {
	typeDCap1 = typeDCap1 +1;
	editAppSpecific("Residential Amount",0);
	editAppSpecific("Non-Residential Amount",0);
	}

if (typeDCap1 > 0 && getAppSpecific("Units") > 0 && getAppSpecific("Charge Fees") == "CHECKED") {
	editAppSpecific("Residential Amount", 3000+(getAppSpecific("Units") *2));
	}

if (typeDCap1 > 0 && getAppSpecific("Acreage")*1 > 0 && getAppSpecific("Charge Fees") == "CHECKED") {
	editAppSpecific("Non-Residential Amount", 3000+(getAppSpecific("Acreage") *12));
	}

if (typeDCap1 > 0) {
	editAppSpecific("Res-NRes Amount",(getAppSpecific("Residential Amount")*1 + getAppSpecific("Non-Residential Amount")*1));
	}

if (typeDCap1 > 0 && getAppSpecific("Res-NRes Amount") >= 6000 && typeBothAll1 >0) {
	editAppSpecific("Residential Amount",3000);
	editAppSpecific("Non-Residential Amount",3000);
	}

if (typeDCap1 > 0 && getAppSpecific("Direct Legal Notice") == "CHECKED" && feeExists("8100-020","INVOICED") == false) {
	addFee("8100-020","DEVELOPMENT","FINAL",1,"N");
	}

if (typeDCap1 > 0 && getAppSpecific("Units") > 0 && getAppSpecific("Charge Fees") == "CHECKED" && feeExists("8107-010","INVOICED") == false) {
	addFee("8107-010","DEVELOPMENT","FINAL",getAppSpecific("Residential Amount"),"N");
	}

if (typeDCap1 > 0 && getAppSpecific("Acreage") > 0 && getAppSpecific("Charge Fees") == "CHECKED" && feeExists("8111-010","INVOICED") == false) {
	addFee("8111-010","DEVELOPMENT","FINAL",getAppSpecific("Non-Residential Amount"),"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Major Modification to Approved Site Development") == "CHECKED" && feeExists("8083-010","INVOICED") == false) {
	addFee("8083-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Minor Modification to Approved Site Development") == "CHECKED" && feeExists("8082-010","INVOICED") == false) {
	addFee("8082-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Parking Standards Committee Review") == "CHECKED" && feeExists("8085-010","INVOICED") == false) {
	addFee("8085-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Request for Deviation From Development Standards") == "CHECKED" && feeExists("8086-010","INVOICED") == false) {
	addFee("8086-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Site and Development Plan Approval Extention 3 Yrs") == "CHECKED" && feeExists("8084-010","INVOICED") == false) {
	addFee("8084-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Additional (continued DRC Meeting)") > 0 && feeExists("8068-010","INVOICED") == false) {
	addFee("8068-010","DEVELOPMENT","FINAL",getAppSpecific("Additional (continued DRC Meeting)") ,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Fee in lieu of Sidwalks Comm District 1") > 0 && feeExists("8120-010","INVOICED") == false) {
	addFee("8120-010","DEVELOPMENT","FINAL",getAppSpecific("Fee in lieu of Sidwalks Comm District 1") ,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Fee in lieu of Sidwalks Comm District 2") > 0 && feeExists("8121-010","INVOICED") == false) {
	addFee("8121-010","DEVELOPMENT","FINAL",getAppSpecific("Fee in lieu of Sidwalks Comm District 2") ,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Fee in lieu of Sidwalks Comm District 3") > 0 && feeExists("8122-010","INVOICED") == false) {
	addFee("8122-010","DEVELOPMENT","FINAL",getAppSpecific("Fee in lieu of Sidwalks Comm District 3") ,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Fee in lieu of Sidwalks Comm District 4") > 0 && feeExists("8123-010","INVOICED") == false) {
	addFee("8123-010","DEVELOPMENT","FINAL",getAppSpecific("Fee in lieu of Sidwalks Comm District 4") ,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Fee in lieu of Sidwalks Comm District 5") > 0 && feeExists("8124-010","INVOICED") == false) {
	addFee("8124-010","DEVELOPMENT","FINAL",getAppSpecific("Fee in lieu of Sidwalks Comm District 5") ,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Transportation Fund District 1") > 0 && feeExists("8310-010","INVOICED") == false) {
	addFee("8310-010","DEVELOPMENT","FINAL",getAppSpecific("Transportation Fund District 1") ,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Transportation Fund District 2") > 0 && feeExists("8309-010","INVOICED") == false) {
	addFee("8309-010","DEVELOPMENT","FINAL",getAppSpecific("Transportation Fund District 2") ,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Transportation Fund District 3") && feeExists("8311-010","INVOICED") == false > 0) {
	addFee("8311-010","DEVELOPMENT","FINAL",getAppSpecific("Transportation Fund District 3") ,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Transportation Fund District 4") > 0 && feeExists("8312-010","INVOICED") == false) {
	addFee("8312-010","DEVELOPMENT","FINAL",getAppSpecific("Transportation Fund District 4") ,"N");
	}

if (appMatch("DevelopmentSvc/Site Plan Review/*/*") && getAppSpecific("Transportation Fund District 5") > 0 && feeExists("8313-010","INVOICED") == false) {
	addFee("8313-010","DEVELOPMENT","FINAL",getAppSpecific("Transportation Fund District 5") ,"N");
	}

if (appMatch("DevelopmentSvc/*/*/*")) {
	typePuvCap1 = 0 * 1;
	typeLozCap1 = 0 * 1;
	typePuvRCap1 = 0 * 1;
	typeRccCap1 = 0 * 1;
	}

if (appMatch("DevelopmentSvc/Permitted Use Verification/*/*")) {
	removeFee("8090-010","FINAL");
	removeFee("8090-015","FINAL");
	removeFee("8090-020","FINAL");
	removeFee("8091-010","FINAL");
	removeFee("8203-010","FINAL");
	}

if (appMatch("DevelopmentSvc/Permitted Use Verification/PUV/*") && getAppSpecific("Type") == "PUV") {
	typePuvCap1 = typePuvCap1 +1;
	}

if (appMatch("DevelopmentSvc/Permitted Use Verification/PUV/*") && getAppSpecific("Type") == "PUV-R") {
	typePuvRCap1 = typePuvRCap1 +1;
	}

if (appMatch("DevelopmentSvc/Permitted Use Verification/LOZ/*") && getAppSpecific("Type") == "LOZ") {
	typeLozCap1 = typeLozCap1 +1;
	}

if (appMatch("DevelopmentSvc/Permitted Use Verification/RCC/*") && getAppSpecific("Type") == "RCC") {
	typeRccCap1 = typeRccCap1 +1;
	}

if (typePuvCap1 > 0  && getAppSpecific("Change of Use") == "CHECKED"  && feeExists("8090-010","INVOICED") == false) {
	addFee("8090-010","DEVELOPMENT","FINAL",1,"N");
	}

if (typePuvCap1 > 0  && getAppSpecific("New Development") == "CHECKED" && feeExists("8090-015","INVOICED") == false) {
	addFee("8090-015","DEVELOPMENT","FINAL",1,"N");
	}

if (typeRccCap1 > 0  && getAppSpecific("Residential Compliance Certificate") == "CHECKED" && feeExists("8090-020","INVOICED") == false) {
	addFee("8090-020","DEVELOPMENT","FINAL",1,"N");
	}

if (typePuvRCap1 > 0  && getAppSpecific("Revision to PUV") > 0 && feeExists("8091-010","INVOICED") == false) {
	addFee("8091-010","DEVELOPMENT","FINAL",getAppSpecific("Revision to PUV"),"N");
	}

if (typeLozCap1 > 0  && getAppSpecific("Letter of Zoning Certification") == "CHECKED" && feeExists("8203-010","INVOICED") == false) {
	addFee("8203-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Pre-Application*/*/*") || appMatch("DevelopmentSvc/Development/*/*") || appMatch("DevelopmentSvc/Off Site Sign/*/*")) {
	removeFee("8088-010","FINAL");
	removeFee("8400-010","FINAL");
	removeFee("8405-010","FINAL");
	removeFee("8410-010","FINAL");
	removeFee("8415-010","FINAL");
	removeFee("8420-010","FINAL");
	removeFee("8425-010","FINAL");
	removeFee("8195-010","FINAL");
	removeFee("8196-010","FINAL");
	}

if (appMatch("DevelopmentSvc/Pre-Application*/*/*") && getAppSpecific("PreApp Fee") == "CHECKED" && feeExists("8088-010","INVOICED") == false) {
	addFee("8088-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/Development Agreement/*") && getAppSpecific("Development Agreement") == "CHECKED" && feeExists("8400-010","INVOICED") == false) {
	addFee("8400-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/Development Agreement/*") && getAppSpecific("Revision to Development Agreement") > 0  && feeExists("8405-010","INVOICED") == false) {
	addFee("8405-010","DEVELOPMENT","FINAL",getAppSpecific("Revision to Development Agreement"),"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/Regional Activity Center Desig/*") && getAppSpecific("Regional Activity Center Designation") == "CHECKED" && feeExists("8410-010","INVOICED") == false) {
	addFee("8410-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/DRI Development Agreement/*") && getAppSpecific("DRI Application for Development Agreement ADA") == "CHECKED" && feeExists("8415-010","INVOICED") == false) {
	addFee("8415-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/DRI Development Agreement/*") && getAppSpecific("DRI Substantial Deviation") >0  && feeExists("8420-010","INVOICED") == false) {
	addFee("8420-010","DEVELOPMENT","FINAL",getAppSpecific("DRI Substantial Deviation"),"N");
	}

if (appMatch("DevelopmentSvc/Land Development Review/DRI Development Agreement/*") && getAppSpecific("DRI Notice of Proposed Change with no substantial change") > 0  && feeExists("8425-010","INVOICED") == false) {
	addFee("8425-010","DEVELOPMENT","FINAL",getAppSpecific("DRI Notice of Proposed Change with no substantial change"),"N");
	}

if (appMatch("DevelopmentSvc/Off Site Sign - Billboards/*/*") && getAppSpecific("Plan Review") == "CHECKED" && feeExists("8195-010","INVOICED") == false) {
	addFee("8195-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Off Site Sign/*/*") && getAppSpecific("Modification to Apv Plan") > 0  && feeExists("8196-010","INVOICED") == false) {
	addFee("8196-010","DEVELOPMENT","FINAL",getAppSpecific("Modification to Apv Plan"),"N");
	}

if (appMatch("DevelopmentSvc/Miscellaneous/NA/NA") && getAppSpecific("Notice of Intent Number of Petitioners") == 1 && feeExists("8063-010","INVOICED") == false) {
	removeFee("8063-010","FINAL");
	addFee("8063-010","DEVELOPMENT","FINAL",90,"N");
	}

if (appMatch("DevelopmentSvc/Miscellaneous/NA/NA") && getAppSpecific("Notice of Intent Number of Petitioners") > 1 && feeExists("8063-010","INVOICED") == false) {
	removeFee("8063-010","FINAL");
	addFee("8063-010","DEVELOPMENT","FINAL",((getAppSpecific("Notice of Intent Number of Petitioners")-1)*30)+90,"N");
	}

if (appMatch("DevelopmentSvc/Miscellaneous/NA/NA") && (getAppSpecific("Notice of Intent Number of Petitioners") == 0 || getAppSpecific("Notice of Intent Number of Petitioners") == null) && feeExists("8063-010","INVOICED") == false) {
	removeFee("8063-010","FINAL");
	}

if (appMatch("DevelopmentSvc/Planning/Rezoning/NA")) {
	removeFee("8801-010","FINAL");
	removeFee("8801-015","FINAL");
	}

if (appMatch("DevelopmentSvc/Planning/Rezoning/NA") && feeExists("8801-010","INVOICED") == false) {
	removeFee("8801-010","FINAL");
	addFee("8801-010","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Planning/Rezoning/NA") && feeExists("8801-010","INVOICED") == false && getAppSpecific("Waive Fee") == "CHECKED") {
	removeFee("8801-010","FINAL");
	removeFee("8801-015","FINAL");
	}

if (appMatch("DevelopmentSvc/Planning/Rezoning/NA") && feeExists("8801-015","INVOICED") == false && AInfo['Comp Plan Review Filed'] == "CHECKED") {
	removeFee("8801-010","FINAL");
	removeFee("8801-015","FINAL");
	addFee("8801-015","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Planning/Comprehensive Plan/Map Amendment")) {
	removeFee("8801-020","FINAL");
	removeFee("8801-020","FINAL");
	}

if (appMatch("DevelopmentSvc/Planning/Comprehensive Plan/Map Amendment") && feeExists("8801-020","INVOICED") == false) {
	removeFee("8801-020","FINAL");
	addFee("8801-020","DEVELOPMENT","FINAL",getAppSpecific("Acres"),"N");
	}

if (appMatch("DevelopmentSvc/Planning/Comprehensive Plan/Map Amendment") && feeExists("8801-020","INVOICED") == false && getAppSpecific("Waive Fee") == "CHECKED") {
	removeFee("8801-010","FINAL");
	removeFee("8801-020","FINAL");
	}

if (appMatch("DevelopmentSvc/Planning/Comprehensive Plan/Text Amendment")) {
	removeFee("8801-025","FINAL");
	}

if (appMatch("DevelopmentSvc/Planning/Comprehensive Plan/Text Amendment") && feeExists("8801-025","INVOICED") == false) {
	removeFee("8801-025","FINAL");
	addFee("8801-025","DEVELOPMENT","FINAL",1,"N");
	}

if (appMatch("DevelopmentSvc/Planning/Comprehensive Plan/Text Amendment") && feeExists("8801-025","INVOICED") == false && getAppSpecific("Waive Fee") == "CHECKED") {
	removeFee("8801-025","FINAL");
	}
`^
EMSE;Fees-EnvironmentalSvc^`
showMessage = true;
showDebug = 1;
if (appMatch("EnvManagement/*/*/*")) {
	envAtfGroup = 0*1;
	envGroup1 = 0*1;
	envGroup2 = 0*1;
	envGroup3 = 0*1;
	envGroup4 = 0*1;
	envGroup5 = 0*1;
	}

if (appMatch("EnvManagement/*/*/*")) {
	removeFee("7008-010","FINAL");
	removeFee("7009-010","FINAL");
	removeFee("7010-010","FINAL");
	removeFee("7012-010","FINAL");
	removeFee("7014-010","FINAL");
	removeFee("7015-010","FINAL");
	removeFee("7016-010","FINAL");
	removeFee("7017-010","FINAL");
	removeFee("7018-010","FINAL");
	removeFee("7019-010","FINAL");
	removeFee("7020-010","FINAL");
	removeFee("7090-010","FINAL");
	removeFee("7091-010","FINAL");
	removeFee("8011-010","FINAL");
	removeFee("8015-010","FINAL");
	removeFee("8016-010","FINAL");
	removeFee("8020-010","FINAL");
	removeFee("8025-010","FINAL");
	removeFee("7060-010","FINAL");
	removeFee("7050-010","FINAL");
	removeFee("7081-010","FINAL");
	}

if (appMatch("EnvManagement/*/*/*")) {
	removeFee("7020-010","FINAL");
	removeFee("7018-015","FINAL");
	removeFee("7018-020","FINAL");
	removeFee("7018-025","FINAL");
	removeFee("7018-030","FINAL");
	removeFee("7066-010","FINAL");
	removeFee("7080-010","FINAL");
	removeFee("7081-010","FINAL");
	removeFee("7084-010","FINAL");
	removeFee("7087-010","FINAL");
	removeFee("7082-010","FINAL");
	removeFee("7083-010","FINAL");
	removeFee("7087-010","FINAL");
	removeFee("7086-010","FINAL");
	}

if (appMatch("EnvManagement/EMP Permit/General Utility Permit/NA") && getAppSpecific("General Utility Permit") == "CHECKED" && feeExists("7070-010","INVOICED") == false) {
	addFee("7070-010","ENVIRONMENTAL","FINAL",1,"N");
	}

if (appMatch("EnvManagement/*/*/*") && getAppSpecific("Landscape Amendment") > 0 && feeExists("7055-010","INVOICED") == false) {
	addFee("7055-010","ENVIRONMENTAL","FINAL",getAppSpecific("Landscape Amendment"),"N");
	}

if (appMatch("EnvManagement/EMP Permit/Mobile Home EMP/NA") && getAppSpecific("Single Family/Mobile Home Amend") > 0 && feeExists("8015-010","INVOICED") == false) {
	addFee("8015-010","ENVIRONMENTAL","FINAL",getAppSpecific("Single Family/Mobile Home Amend"),"N");
	}

if (appMatch("EnvManagement/EMP Permit/Short Form A Non-Residential/NA") && getAppSpecific("Short Form A Non Residential") == "CHECKED" && feeExists("7014-010","INVOICED") == false) {
	addFee("7014-010","ENVIRONMENTAL","FINAL",372,"N");
	}

if (appMatch("EnvManagement/EMP Permit/Short Form B High/NA") && getAppSpecific("Short Form B High") == "CHECKED" && getAppSpecific("Total Disturbed") > 0 && getAppSpecific("Total Disturbed") <=5000 && feeExists("7012-010","INVOICED") == false) {
	addFee("7012-010","ENVIRONMENTAL","FINAL",1344,"N");
	}

if (appMatch("EnvManagement/EMP Permit/Short Form B High/NA")  && getAppSpecific("Short Form B High") == "CHECKED" && getAppSpecific("Total Disturbed") > 5000 && feeExists("7012-010","INVOICED") == false) {
	addFee("7012-010","ENVIRONMENTAL","FINAL",((getAppSpecific("Total Disturbed")-5000)*.01) + 1344,"N");
	}

if (appMatch("EnvManagement/EMP Permit/Short Form B Low/NA") && getAppSpecific("Short Form B Low") == "CHECKED" && getAppSpecific("Total Disturbed") > 0 && getAppSpecific("Total Disturbed") <=5000 && feeExists("7010-010","INVOICED") == false) {
	addFee("7010-010","ENVIRONMENTAL","FINAL",720,"N");
	}

if (appMatch("EnvManagement/EMP Permit/Short Form B Low/NA")  && getAppSpecific("Short Form B Low") == "CHECKED" && getAppSpecific("Total Disturbed") > 5000 && feeExists("7010-010","INVOICED") == false) {
	addFee("7010-010","ENVIRONMENTAL","FINAL",((getAppSpecific("Total Disturbed")-5000)*.02) + 720,"N");
	}

if (appMatch("EnvManagement/*/*/*") && getAppSpecific("# of Trees Removed") >=1 && getAppSpecific("# of Trees Removed") <=100 && getAppSpecific("Tree Removal") == "CHECKED" && feeExists("7060-010","INVOICED") == false) {
	addFee("7060-010","ENVIRONMENTAL","FINAL",114,"N");
	}

if (appMatch("EnvManagement/*/*/*") && getAppSpecific("# of Trees Removed") >100 && getAppSpecific("Tree Removal") == "CHECKED" && feeExists("7060-010","INVOICED") == false) {
	addFee("7060-010","ENVIRONMENTAL","FINAL",((getAppSpecific("# of Trees Removed")-100)*1.97) + 114,"N");
	}

if (appMatch("EnvManagement/*/*/*") && getAppSpecific("Landscaping") == "CHECKED" && getAppSpecific("Added Imperv Area") > 0 && getAppSpecific("Added Imperv Area") <=5000 && feeExists("7050-010","INVOICED") == false) {
	addFee("7050-010","ENVIRONMENTAL","FINAL",780,"N");
	}

if (appMatch("EnvManagement/*/*/*")  && getAppSpecific("Landscaping") == "CHECKED" && getAppSpecific("Added Imperv Area") > 5000 && getAppSpecific("Added Imperv Area") <= 50000 && feeExists("7050-010","INVOICED") == false) {
	addFee("7050-010","ENVIRONMENTAL","FINAL",(getAppSpecific("Added Imperv Area")*.01) + 730,"N");
	}

if (appMatch("EnvManagement/*/*/*")  && getAppSpecific("Landscaping") == "CHECKED" && getAppSpecific("Added Imperv Area") > 50000 && feeExists("7050-010","INVOICED") == false) {
	addFee("7050-010","ENVIRONMENTAL","FINAL",(getAppSpecific("Added Imperv Area")*.02) + 230,"N");
	}

if (appMatch("EnvManagement/EMP Permit/Stormwater Standard Form/NA") && getAppSpecific("Standard Form") == "CHECKED" && getAppSpecific("Res Subdiv One Dwelling Unit Per Lot") == "CHECKED" && getAppSpecific("Total Imperv Area") > 0 && getAppSpecific("Total Imperv Area") <=5000 && feeExists("7020-010","INVOICED") == false) {
	addFee("7020-010","ENVIRONMENTAL","FINAL",2388,"N");
	}

if (appMatch("EnvManagement/EMP Permit/Stormwater Standard Form/NA")  && getAppSpecific("Standard Form") == "CHECKED" && getAppSpecific("Res Subdiv One Dwelling Unit Per Lot") == "CHECKED" && getAppSpecific("Total Imperv Area") > 5000 && getAppSpecific("Total Imperv Area") <= 678938 && feeExists("7020-010","INVOICED") == false) {
	addFee("7020-010","ENVIRONMENTAL","FINAL",(getAppSpecific("Total Imperv Area")*.13) + 1738,"N");
	}

if (appMatch("EnvManagement/EMP Permit/Stormwater Standard Form/NA") && getAppSpecific("Standard Form") == "CHECKED" && getAppSpecific("Res Subdiv One Dwelling Unit Per Lot") == "CHECKED" && getAppSpecific("Total Imperv Area") > 0 && getAppSpecific("Total Imperv Area") > 678938 && feeExists("7020-010","INVOICED") == false) {
	addFee("7020-010","ENVIRONMENTAL","FINAL",90000,"N");
	}

if (appMatch("EnvManagement/EMP Permit/Stormwater Standard Form/NA") && getAppSpecific("Standard Form") == "CHECKED" && getAppSpecific("Res Subdiv One Dwelling Unit Per Lot") != "CHECKED" && getAppSpecific("Added Imperv Area") > 0 && getAppSpecific("Added Imperv Area") <=5000 && feeExists("7020-010","INVOICED") == false) {
	addFee("7020-010","ENVIRONMENTAL","FINAL",2388,"N");
	}

if (appMatch("EnvManagement/EMP Permit/Stormwater Standard Form/NA") && getAppSpecific("Standard Form") == "CHECKED" && getAppSpecific("Res Subdiv One Dwelling Unit Per Lot") != "CHECKED" && getAppSpecific("Added Imperv Area") > 5000 && getAppSpecific("Added Imperv Area") < 100000 && feeExists("7020-010","INVOICED") == false) {
	addFee("7020-010","ENVIRONMENTAL","FINAL",(getAppSpecific("Added Imperv Area")*.13) + 1738,"N");
	}

if (appMatch("EnvManagement/EMP Permit/Stormwater Standard Form/NA") && getAppSpecific("Standard Form") == "CHECKED" && getAppSpecific("Res Subdiv One Dwelling Unit Per Lot") != "CHECKED" && getAppSpecific("Added Imperv Area") >= 100000 && feeExists("7020-010","INVOICED") == false) {
	addFee("7020-010","ENVIRONMENTAL","FINAL",((getAppSpecific("Added Imperv Area")-99999)*.24) + 14737.87,"N");
	}

if (appMatch("EnvManagement/*/*/*")  && getAppSpecific("Board of County Commissioners Variance Request") == "CHECKED" && feeExists("8011-010","INVOICED") == false) {
	addFee("8011-010","ENVIRONMENTAL","FINAL",1,"N");
	}

if (appMatch("EnvManagement/Vegetative Management Plan/NA/NA")  && getAppSpecific("Charge Vegetative Management Fee") == "CHECKED" && feeExists("7066-010","INVOICED") == false) {
	addFee("7066-010","ENVIRONMENTAL","FINAL",1,"N");
	}

if (appMatch("EnvManagement/Review/Natural Features Inventory/NA") && getAppSpecific("Natural Features Inventory") == "CHECKED" && getAppSpecific("Parcel Acreage") <= 5 && feeExists("7080-010","INVOICED") == false) {
	addFee("7080-010","ENVIRONMENTAL","FINAL",1584,"N");
	}

if (appMatch("EnvManagement/Review/Natural Features Inventory/NA") && getAppSpecific("Natural Features Inventory") == "CHECKED" && getAppSpecific("Parcel Acreage") > 5 && feeExists("7080-010","INVOICED") == false) {
	addFee("7080-010","ENVIRONMENTAL","FINAL",((getAppSpecific("Parcel Acreage") -5) *28) + 1584,"N");
	}

if (appMatch("EnvManagement/Review/Natural Features Inventory/NA") && getAppSpecific("Natural Features Inventory in Flood Plain") == "CHECKED" && getAppSpecific("Parcel Acreage") <= 5 && feeExists("7081-010","INVOICED") == false) {
	addFee("7081-010","ENVIRONMENTAL","FINAL",2064,"N");
	}

if (appMatch("EnvManagement/Review/Natural Features Inventory/NA") && getAppSpecific("Natural Features Inventory in Flood Plain") == "CHECKED" && getAppSpecific("Parcel Acreage") > 5 && feeExists("7081-010","INVOICED") == false) {
	addFee("7081-010","ENVIRONMENTAL","FINAL",((getAppSpecific("Parcel Acreage") -5) *29) + 2064,"N");
	}

if (appMatch("EnvManagement/Review/Natural Features Inventory/NA") && getAppSpecific("Natural Features Inventory No Impact") == "CHECKED" && feeExists("7084-010","INVOICED") == false) {
	addFee("7084-010","ENVIRONMENTAL","FINAL",1,"N");
	}

if (appMatch("EnvManagement/Review/Natural Features Inventory/NA") && getAppSpecific("Use of Policy 2.1.9 LP or Judicial Exception") == "CHECKED" && feeExists("7087-010","INVOICED") == false) {
	addFee("7087-010","ENVIRONMENTAL","FINAL",1,"N");
	}

if (appMatch("EnvManagement/Review/Environmental Impact Analysis/NA") && getAppSpecific("Environmental Impact Analysis") == "CHECKED" && getAppSpecific("Parcel Acreage") <= 5 && feeExists("7082-010","INVOICED") == false) {
	addFee("7082-010","ENVIRONMENTAL","FINAL",1356,"N");
	}

if (appMatch("EnvManagement/Review/Environmental Impact Analysis/NA") && getAppSpecific("Environmental Impact Analysis") == "CHECKED" && getAppSpecific("Parcel Acreage") > 5 && feeExists("7082-010","INVOICED") == false) {
	addFee("7082-010","ENVIRONMENTAL","FINAL",((getAppSpecific("Parcel Acreage") -5) *24) + 1356,"N");
	}

if (appMatch("EnvManagement/Review/Environmental Impact Analysis/NA") && getAppSpecific("Environmental Impact Analysis in Flood Plain") == "CHECKED" && getAppSpecific("Parcel Acreage") <= 5 && feeExists("7083-010","INVOICED") == false) {
	addFee("7083-010","ENVIRONMENTAL","FINAL",1890,"N");
	}

if (appMatch("EnvManagement/Review/Environmental Impact Analysis/NA") && getAppSpecific("Environmental Impact Analysis in Flood Plain") == "CHECKED" && getAppSpecific("Parcel Acreage") > 5 && feeExists("7083-010","INVOICED") == false) {
	addFee("7083-010","ENVIRONMENTAL","FINAL",((getAppSpecific("Parcel Acreage") -5) *30) + 1890,"N");
	}

if (appMatch("EnvManagement/Review/Environmental Impact Analysis/NA") && getAppSpecific("Environmental Impact Analysis in Flood Plain and Stormwater Discharge") == "CHECKED" && getAppSpecific("Parcel Acreage") <= 5 && feeExists("7086-010","INVOICED") == false) {
	addFee("7086-010","ENVIRONMENTAL","FINAL",1890,"N");
	}

if (appMatch("EnvManagement/Review/Environmental Impact Analysis/NA") && getAppSpecific("Environmental Impact Analysis in Flood Plain and Stormwater Discharge") == "CHECKED" && getAppSpecific("Parcel Acreage") > 5 && feeExists("7086-010","INVOICED") == false) {
	addFee("7086-010","ENVIRONMENTAL","FINAL",((getAppSpecific("Parcel Acreage") -5) *36) + 1890,"N");
	}

if (appMatch("EnvManagement/Driveway Permit/Type1/NA") && feeExists("7008-010","INVOICED") == false) {
	addFee("7008-010","ENVIRONMENTAL","FINAL",185,"N");
	}

if (appMatch("EnvManagement/Driveway Permit/Type2/*") && feeExists("7008-010","INVOICED") == false) {
	addFee("7008-010","ENVIRONMENTAL","FINAL",500,"N");
	}

if (appMatch("EnvManagement/Driveway Permit/Type3/*") && feeExists("7008-010","INVOICED") == false) {
	addFee("7008-010","ENVIRONMENTAL","FINAL",1500,"N");
	}

if (appMatch("EnvManagement/Driveway Permit/Type4/*") && feeExists("7008-010","INVOICED") == false) {
	addFee("7008-010","ENVIRONMENTAL","FINAL",1500,"N");
	}

if (appMatch("EnvManagement/Stormwater Operating Permit/NA/NA") && getAppSpecific("Operating Permit Fee") == "CHECKED" && feeExists("7016-010","INVOICED") == false) {
	addFee("7016-010","ENVIRONMENTAL","FINAL",1,"N");
	}

if (appMatch("EnvManagement/Stormwater Operating Permit/NA/NA") && getAppSpecific("Less than 5000 sq ft of impervious and no structures or filters") == "CHECKED" && getAppSpecific("1st Application Renewal Date") >= "01/01/1990" && feeExists("7017-010","INVOICED") == false && getAppSpecific("1st Renewal Fee") == 0) {
	addFee("7017-010","ENVIRONMENTAL","FINAL",120,"N");
	editAppSpecific("1st Renewal Fee",120);
	}

if (appMatch("EnvManagement/Stormwater Operating Permit/NA/NA") && getAppSpecific("Less than 5000 sq ft of impervious and no structures or filters") == "UNCHECKED" && getAppSpecific("1st Application Renewal Date") >= "01/01/1990" && feeExists("7017-010","INVOICED") == false && getAppSpecific("1st Renewal Fee") == 0) {
	addFee("7017-010","ENVIRONMENTAL","FINAL",300,"N");
	editAppSpecific("1st Renewal Fee",300);
	}

if (appMatch("EnvManagement/*/*/*") && getAppSpecific("After the Fact Fee Multiplier") == 1 && feeExists("7018-010","INVOICED") == false) {
	addFee("7018-010","ENVIRONMENTAL","FINAL",1,"N");
	}

if (appMatch("EnvManagement/*/*/*") && getAppSpecific("After the Fact Fee Multiplier") == 2 && feeExists("70180-015","INVOICED") == false) {
	addFee("7018-015","ENVIRONMENTAL","FINAL",1,"N");
	}

if (appMatch("EnvManagement/*/*/*") && getAppSpecific("After the Fact Fee Multiplier") == 3 && feeExists("7018-020","INVOICED") == false) {
	addFee("7018-020","ENVIRONMENTAL","FINAL",1,"N");
	}

if (appMatch("EnvManagement/*/*/*") && getAppSpecific("After the Fact Fee Multiplier") == 4 && feeExists("7018-025","INVOICED") == false) {
	addFee("7018-025","ENVIRONMENTAL","FINAL",1,"N");
	}

if (appMatch("EnvManagement/*/*/*") && getAppSpecific("After the Fact Fee Multiplier") == 5 && feeExists("7018-030","INVOICED") == false) {
	addFee("7018-030","ENVIRONMENTAL","FINAL",1,"N");
	}
`^
EMSE;Fees-Misc^`
`^
EMSE;Fees-PublicWorks^`
surchgCntr = 0*1;
if (AInfo['Road Pavement Disturbance'] > 0 && feeExists("8700-010","INVOICED") == false) {
	removeFee("8700-010","FINAL");
	addFee("8700-010","PUBLICWORKS","FINAL",getAppSpecific("Road Pavement Disturbance"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Unpaved Right of Way'] > 0  && feeExists("8700-030","INVOICED") == false) {
	removeFee("8700-030","FINAL");
	addFee("8700-030","PUBLICWORKS","FINAL", getAppSpecific("Unpaved Right of Way"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Power Pole Installation']  > 0  && feeExists("8700-020","INVOICED") == false) {
	removeFee("8700-020","FINAL");
	addFee("8700-020","PUBLICWORKS","FINAL",getAppSpecific("Power Pole Installation"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Aerial Line Installation (per Permit / per Job Site)'] > 0 && feeExists("8700-040","INVOICED") == false) {
	removeFee("8700-040","FINAL");
	addFee("8700-040","PUBLICWORKS","FINAL",getAppSpecific("Aerial Line Installation (per Permit / per Job Site)"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['All Other Disturbances'] > 0 && feeExists("8700-050","INVOICED") == false) {
	removeFee("8700-050","FINAL");
	addFee("8700-050","PUBLICWORKS","FINAL",getAppSpecific("All Other Disturbances"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Facilities Construction'] > 0 && feeExists("8700-070","INVOICED") == false) {
	removeFee("8700-070","FINAL");
	addFee("8700-070","PUBLICWORKS","FINAL",getAppSpecific("Facilities Construction"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Right of Way License'] > 0  && feeExists("8700-080","INVOICED") == false) {
	removeFee("8700-080","FINAL");
	addFee("8700-080","PUBLICWORKS","FINAL",getAppSpecific("Right of Way License"),"N");
	surchgCntr = surchgCntr +1;
	}

if (AInfo['Unpermitted Activity (10 times Permit Fee)'] > 0  && feeExists("8700-060","INVOICED") == false) {
	removeFee("8700-060","FINAL");
	addFee("8700-060","PUBLICWORKS","FINAL",getAppSpecific("Unpermitted Activity (10 times Permit Fee)"),"N");
	surchgCntr = surchgCntr +1;
	}
`^
EMSE;GetLPDates^`
fileLP = capLicArr2[eachLP];
if (fileLP !=null) {
	stateLicNbr=fileLP["licenseNbr"];
	primStatus=fileLP["printFlag"];
	licType=fileLP["licenseType"];
	}

if (fileLP !=null) {
	fileExp = getRefLicenseProf(stateLicNbr).getLicenseModel().getBirthDate();
	}

if (fileLP !=null) {
	bdYear = String(fileExp).substring(0,4);
	bdMonth = String(fileExp).substring(5,7);
	bdDay = String(fileExp).substring(8,10);
	}

if (fileLP !=null) {
	fileExpDate = bdMonth + "/" + bdDay + "/" + bdYear;
	}

if (fileLP !=null) {
	fileCompare = new Date(dateAdd(fileExpDate,1));
	thisDate = new Date();
	}

if (fileCompare < thisDate) {
	fileMaintIssue = fileMaintIssue + 1;
	}

if (fileLP !=null) {
	var wcDate = getRefLicenseProf(stateLicNbr).getLicenseModel().getWcExpDate();
	}

if (fileLP !=null) {
	bdYear2 = String(wcDate).substring(0,4);
	bdMonth2 = String(wcDate).substring(5,7);
	bdDay2 = String(wcDate).substring(8,10);
	}

if (fileLP !=null) {
	wcDate1 = bdMonth2 + "/" + bdDay2 + "/" + bdYear2;
	}

if (fileLP !=null) {
	wcCompare = new Date(dateAdd(wcDate1,1));
	}

if (wcCompare < thisDate) {
	workCompIssue = workCompIssue + 1;
	}
`^
EMSE;GetLPInfo^`
LPInfo = capLicArr[eachLP];
if (LPInfo !=null) {
	stateLicNbr=LPInfo["licenseNbr"];
	primStatus=LPInfo["printFlag"];
	}

if (licType=LPInfo["licenseType"];) {
	}

comment("<Font Color = Red><Bold> State Lic # = "+ stateLicNbr + "</Font></Bold>");
showMessage = true;
comment("<Font Color = Red><Bold> THIS MESSAGE SHOULD SHOW IN ACA</Font></Bold>");
cancel = true;
`^
EMSE;GlobalFlags^`
LICENSESTATE = "FL";
if (matches(currentUserID,"ADMIN","TRUEPOINT")) {
	showDebug = 1;
	showMessage= true;
	}
`^
EMSE;InvoiceTheFee^`
thisFeeCode = feeItemArray[FI].getFeeCod();
thisFeeStatus = feeItemArray[FI].getFeeitemStatus();
comment("Fee Code = "+thisFeeCode);
comment("Fee Status = "+thisFeeStatus);
if (thisFeeStatus == "NEW") {
	invoiceFee(thisFeeCode,"FINAL");
	}
`^
EMSE;LP_VERIFY^`
var issueCount = 0;
fileMaintIssue = 0;
workCompIssue = 0;
if (capHasExpiredLicProf("EXPIRE")) {
	issueCount = issueCount + 1;
	}

if (capHasExpiredLicProf("INSURANCE")) {
	issueCount = issueCount + 1;
	}

if (capHasExpiredLicProf("BUSINESS")) {
	issueCount = issueCount + 1;
	}

capLicArr2 = aa.licenseScript.getLicenseProf(capId).getOutput();
if (capLicArr2 && capLicArr2.length > 0) {
	for (eachLP in capLicArr2) branch("EMSE:GetLPDates");
	}

issueCount = issueCount + fileMaintIssue + workCompIssue;
if (issueCount > 0) {
	showMessage = true;
	comment("<Font Color = Red><Strong>ONE OF THE ATTACHED CONTRACTORS HAS A LICENSE OR INSURANCE ISSUE - PLEASE RESOLVE BEFORE CONTINUING</Font></Strong>");
	}
`^
EMSE;LicProfLookup^`
logDebug("Using LICENSESTATE = " + LICENSESTATE + " from EMSE:GlobalFlags");
//Issue State;
LICENSETYPE = "";
//License Type to be populated;
licCapId = null;
isNewLic = false;
licIDString = null;
licObj = null;
licCap = null;
branch("EMSE:LicProfLookup:getLicenses");
//Get License CAP;
if (licCapId !=null) {
	branch("EMSE:LicProfLookup:getLicenseType");
	stateLicense = getAppSpecific("State License Number",licCapId);
	}

licObj = licenseProfObject(stateLicense ,LICENSETYPE);
//Get LicArray;
if (!licObj.valid && lookup("LICENSED PROFESSIONAL TYPE",LICENSETYPE) != null) {
	branch("EMSE:LicProfLookup:CreateLP");
	licObj = licenseProfObject(stateLicense ,LICENSETYPE );
	}

if (licObj.valid) {
	branch("EMSE:LicProfLookup:UpdateLP");
	} else {
	logDebug("LP Not found to update");
	}
`^
EMSE;LicProfLookup;CreateLP^`
var vNewLic = aa.licenseScript.createLicenseScriptModel();
vNewLic.setAgencyCode(aa.getServiceProviderCode());
vNewLic.setAuditDate(sysDate);
vNewLic.setAuditID(currentUserID);
vNewLic.setAuditStatus("A");
vNewLic.setLicenseType(LICENSETYPE);
vNewLic.setLicState(LICENSESTATE);
vNewLic.setStateLicense(stateLicense);
aa.licenseScript.createRefLicenseProf(vNewLic);
var tmpLicObj = licenseProfObject(stateLicense,LICENSETYPE);
if (tmpLicObj.valid) {
	isNewLic = true;
	}

if (tmpLicObj.valid &&licIDString) {
	associatedRefContactWithRefLicProf(licCapId,licObj.refLicModel.getLicSeqNbr(), aa.getServiceProviderCode(),currentUserID);
	}

var mycap = aa.cap.getCap(capId).getOutput();
if (tmpLicObj.valid && mycap.getCapModel().getCreatedByACA() == 'Y') {
	associatedLicensedProfessionalWithPublicUser(licObj.refLicModel.getLicSeqNbr(), mycap.getCapModel().getCreatedBy().toString());
	}
`^
EMSE;LicProfLookup;UpdateLP^`
branch("EMSE:LicProfLookup:UpdateLP:BaseFields");
branch("EMSE:LicProfLookup:UpdateLP:ApplicationStatus");
if (licObj.updateRecord()) {
	logDebug("LP Updated Successfully");
	} else {
	logDebug("LP Update Failed");
	}
`^
EMSE;LicProfLookup;UpdateLP;ApplicationStatus^`
licObj.refLicModel.setBusinessName2(licCapStatus);
logDebug("Lic Cap Status: " + licCapStatus);
`^
EMSE;LicProfLookup;UpdateLP;BaseFields^`
licObj.refLicModel.setState(LICENSESTATE);
licObj.refLicModel.setLicenseBoard(LICENSETYPE);
licObj.refLicModel.setLicenseIssueDate(licCap.getFileDate());
var expObj = null;
var expDt = null;
var expObjRes = aa.expiration.getLicensesByCapID(licCapId);
if(expObjRes.getSuccess()) var expObj = expObjRes.getOutput();
if (expObj != null) {
	expDt = aa.date.parseDate(expObj.getExpDateString());
	}

if (expDt != null) {
	licObj.refLicModel.setBusinessLicExpDate(expDt);
	//Expiration Date;
	}

if (licCapTypeArr[1] == "Business") {
	licObj.refLicModel.setLicenseBoard(getAppSpecific("Business Type",licCapId));
	} else {
	licObj.refLicModel.setLicenseBoard(LICENSETYPE);
	}

if (licObj.updateFromRecordContactByType(licCapId,"",true,true);) {
	logDebug("LP Updated from Primary Contact");
	} else {
	logDebug("LP Failed to Update from Primary Contact trying License Holder");
	if(licObj.updateFromRecordContactByType(licCapId,"License Holder",true,true)) logDebug("Updated from License Holder");
	else logDebug("Couldn't Update Contact Info");
	}

if (getAppSpecific("Doing Business As (DBA) Name",licCapId)) {
	licObj.refLicModel.setBusinessName(getAppSpecific("Doing Business As (DBA) Name",licCapId) );
	}

if (getAppSpecific("State License Expiration Date",licCapId)) {
	var expDate = getAppSpecific("State License Expiration Date",licCapId);
	licObj.refLicModel.setLicenseExpirationDate(aa.date.parseDate(expDate));
	}

licObj.refLicModel.setBusinessLicense(licCap.getCapModel().getAltID());
logDebug("BaseFields setBusinessLicense =" +  licCap.getCapModel().getAltID());
`^
EMSE;LicProfLookup;getLicenseType^`
if (licCapId !=null) {
	licIDString = licCapId.getCustomID();
	}

if (licCapId !=null) {
	licCap = aa.cap.getCap(licCapId).getOutput();
	licCapType = licCap.getCapType().toString();
	licCapTypeArr = licCapType.split("/");
	licCapStatus = licCap.getCapStatus();
	}

if (licCapId !=null) {
	if(licCapTypeArr[1] == "Contractor") LICENSETYPE = getAppSpecific("License Type",licCapId)+"";
	}
`^
EMSE;LicProfLookup;getLicenses^`
var searchCap = capId;
var tmpId = capId;
var prjArr = null;
if (appMatch("*/*/*/License")) {
	var childArr = getChildren("*/*/*/Application");
	if(childArr != null) searchCap = childArr[0];
	}

capId = tmpId;
var vRelationType = "R";
if(appMatch("*/*/*/Renewal")) vRelationType="Renewal";
var prjArrRes = aa.cap.getProjectByChildCapID(searchCap,vRelationType,null);
if(prjArrRes.getSuccess()) prjArr = prjArrRes.getOutput();
if (prjArr != null) {
	for(prj in prjArr) if(appMatch("*/*/*/License",prjArr[prj].getProjectID())) licCapId = prjArr[prj].getProjectID();
	}

if (licCapId == null && appMatch("*/*/*/License")) {
	licCapId = capId;
	//In the event license has no application;
	}

if (licCapId == null && appMatch("*/*/*/Renewal")) {
	licCapId = capId;
	//In the event license has no application;
	}

if (licCapId != null) {
	licCapId = aa.cap.getCapID(licCapId.getID1(),licCapId.getID2(),licCapId.getID3()).getOutput();
	}
`^
EMSE;ServiceRequestCloseCase^`
if (capStatus == "Complete-Fixed") {
	updateAppStatus("Closed-Fixed");
	}

if (capStatus == "Complete-Duplicate") {
	updateAppStatus("Closed-Duplicate");
	}

if (capStatus == "Complete-Referred") {
	updateAppStatus("Closed-Referred");
	}

if (capStatus == "Complete-No Violation") {
	updateAppStatus("Closed-No Violation");
	}
`^
EMSE;ServiceRequestDuplicateCheck^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = 1;
	showMessage= true;
	}

iRec = null;
recordArray = new Array();
recordArray = capIdsGetByAddr();
aa.print("Length: " + recordArray.length);
if (recordArray.length > 0) {
	for(iRec in recordArray) branch("EMSE:ServiceRequestDuplicateCheckLoop");
	}
`^
EMSE;ServiceRequestDuplicateCheckLoop^`
vApp = null;
vApp = recordArray[iRec];
vCap = aa.cap.getCap(vApp).getOutput();
vAppTypeString = vCap.getCapType().toString();
vFileDateObj = vCap.getFileDate();
bAppTypeMatch = false;
bASIMatch = false;
if (appMatch(vAppTypeString) && (vApp.equals(capId) == false)) {
	bAppTypeMatch = true;
	}

if (bAppTypeMatch) {
	sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(),sysDate.getDayOfMonth(),sysDate.getYear(),"MM/DD/YYYY");
	}

if (bAppTypeMatch) {
	vFileDate = "" + vFileDateObj.getMonth() + "/" + vFileDateObj.getDayOfMonth() + "/" + vFileDateObj.getYear();
	}

if (bAppTypeMatch && dateDiff(vFileDate, sysDateMMDDYYYY) < 3) {
	updateAppStatus("Potential Duplicate","This is a potential duplicate of Record ID: " + vApp.getCustomID());
	createCapComment("This is a potential duplicate of Record ID: " + vApp.getCustomID());
	}
`^
EMSE;SetContactRelationshipToContactType^`
if (matches(currentUserID,"ADMIN")) {
	showDebug = false;
	showMessage= false;
	}

iCont = null;
contactArray = new Array();
contactArray = getContactArray();
if (contactArray.length > 0) {
	for (iCont in contactArray) branch("EMSE:SetContactRelationshipToContactTypeLoop");
	}
`^
EMSE;SetContactRelationshipToContactTypeLoop^`
showDebug = 1;
tContact = contactArray[iCont];
aa.print("ContactName: " + tContact["firstName"] + " " + tContact["lastName"] + " " + tContact["contactType"]);
contactSetRelation(tContact["contactSeqNumber"], tContact["contactType"]);
`^
EMSE;TESTDRIVE_ASA^`
if (appMatch("Permits/Residential/Electrical/NA")) {
	closeTask("Application Submittal","Accepted - Plan Review Req","Updated for Test Drive","");
	}

if (appMatch("Permits/Residential/Electrical/NA")) {
	closeTask("Plan Review","Approved","Updated for Test Drive","");
	}
`^
EMSE;TESTDRIVE_IRSA^`
if (appMatch("Permits/Residential/Electrical/NA")  && inspType == "Electrical Final" && inspResult == "Passed") {
	closeTask("Meter Release","Meter Released","Updated by Inspection Result","Note");
	}

if (appMatch("Licenses/Business/Restaurant/Application")  && inspType == "Business License Inspection" && inspResult == "Passed") {
	closeTask("License Issuance","Issued","Updated by Inspection Result","Note");
	}
`^
EMSE;TESTDRIVE_ISA^`
showDebug = true;
showMessage= true;
if (appMatch("Enforcement/Incident/Abatement/Graffiti")  && inspType == "Initial Investigation") {
	scheduleInspectDate("Initial Investigation",dateAdd(null,1,true),"TESTDRIVE");
	}
`^
EMSE;TESTDRIVE_WTUA^`
if (appMatch("Permits/Residential/Electrical/NA")  && wfTask.equals("Permit Issuance") && wfStatus.equals("Issued")) {
	scheduleInspection("Electrical Final",0,"TESTDRIVE");
	}

if (appMatch("Licenses/Business/Retail/Application")  && wfTask.equals("Licensing Review") && wfStatus.equals("Approved for Issuance")) {
	scheduleInspection("Business License Inspection",0,"TESTDRIVE");
	}
`^
EMSE;Utility_Releases^`
showMessage = true;
var today = new Date();
today = Date(aa.date.currentDate);
var aName;
var aPh;
var lpaName;
var lpaPhone;
var ownerInfo;
var aName;
var sp5 = " 
 
 
 
 
";
var par = aa.parcel.getParcelandAttribute(capId,null);
if (par.getSuccess()) {
	parcels = par.getOutput().toArray();
	for (x in parcels) pid = parcels[x].getParcelNumber();
	logDebug(pid);
	}

capAltId = capId.getCustomID();
addr = getCapAddress(capId);
lpa = getLicenseProfessional(capId);
for (x in lpa) if (lpa[x].getLicenseType().substring(0,10) == "Contractor" && lpa[x].getPrintFlag() == "Y") lpaName = lpa[x].getBusinessName();
lpa = getLicenseProfessional(capId);
for (x in lpa) if (lpa[x].getLicenseType().substring(0,10) == "Contractor" && lpa[x].getPrintFlag() == "Y") lpaPhone = lpa[x].getPhone1();
ownerMod = aa.owner.getOwnerByCapId(capId);
if (ownerMod.getSuccess()) ownerObj = ownerMod.getOutput();
for (x in ownerObj) ownerInfo = ownerObj[x].getOwnerFullName();
logDebug(ownerInfo);
var params = aa.util.newHashtable();
if(aName==null) aName="";
if(aPh==null) aPh="";
if(lpaName==null) lpaName="";
if(lpaPhone==null) lpaPhone="";
if(ownerInfo==null) ownerInfo="";
if (//-----------------Begin release emails-----------------) {
	}

if ((matches(inspType.substr(0,3),"400") && matches(appTypeArray[1],"Commercial","Residential","Quick Turn")) || (inspType.substr(0,3) == "400" && matches(appTypeArray[1],"VelocityHall"))) {
	emailSubject = capAltId+" City of Tallahassee Sewer Connection Notice";
	}

if ((matches(inspType.substr(0,3),"400") && matches(appTypeArray[1],"Commercial","Residential","Quick Turn")) || (inspType.substr(0,3) == "400" && matches(appTypeArray[1],"VelocityHall"))) {
	emailBody = "<b>CITY OF TALLAHASSEE SEWER CONNECTION NOTICE<br><br>DATE:  </B>"+today;
	}

if (matches(inspType.substr(0,3),"905") && matches(appTypeArray[1],"Commercial","Residential","Quick Turn") &&AInfo['Sewer System Type'] == "Sewer" && checkInspectionResult("400: Building Sewer","Approved") == false) {
	emailSubject = "City of Tallahassee Sewer Connection Notice";
	} else {
	emailSubject = capAltId+" City of Tallahassee Sewer Connection Notice";
	}

if (matches(inspType.substr(0,3),"905") && matches(appTypeArray[1],"Commercial","Residential","Quick Turn") &&AInfo['Sewer System Type'] == "Sewer") {
	emailBody = "<b>CITY OF TALLAHASSEE SEWER CONNECTION NOTICE<br><br>DATE:  </B>"+today;
	}

if (inspType.substr(0,3) == "502") {
	emailSubject = capAltId+" City of Tallahassee Gas Release";
	}

if (inspType.substr(0,3) == "502") {
	emailBody = "<b>LEON COUNTY GAS METER RELEASE<br><br>DATE:  </B>"+today;
	}

if (inspType.substr(0,3) == "503") {
	emailSubject = capAltId+" City of Tallahassee Gas Release";
	}

if (inspType.substr(0,3) == "503") {
	emailBody = "<b>LEON COUNTY GAS METER RELEASE<br><br>DATE:  </B>"+today;
	}

if (matches(inspType.substr(0,3),"507","508","509","510","511","512","513","514")) {
	emailSubject = capAltId+" Talquin Electrical Release";
	}

if (matches(inspType.substr(0,3),"507","508","509","510","511","512","513","514")) {
	emailBody = "<b>TALQUIN ELECTRICAL RELEASE<br><br>DATE:  </B>"+today;
	}

if (matches(inspType.substr(0,3),"515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533")) {
	emailSubject = capAltId+" City of Tallahassee Electrical Release";
	}

if (matches(inspType.substr(0,3),"515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533")) {
	emailBody = "<b>CITY ELECTRICAL RELEASE<br><br>DATE:  </B>"+today;
	}

if (inspType.substr(0,3) == "534") {
	emailSubject = capAltId+" City of Tallahassee Electric Photovoltaic System Release";
	}

if (inspType.substr(0,3) == "534") {
	emailBody = "<b>CITY PHOTOVOLTAIC RELEASE<br><br>DATE:  </B>"+today;
	}

if (inspType.substr(0,3) == "535") {
	emailSubject = capAltId+" Talquin Electric Photovoltaic System Release";
	}

if (inspType.substr(0,3) == "535") {
	emailBody = "<b>TALQUIN PHOTOVOLTAIC RELEASE<br><br>DATE:  </B>"+today;
	}

emailBody = emailBody+"<br><br>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
emailBody = emailBody+"<br><b>PERMIT NUMBER</b>"+sp5+capAltId+sp5+"<b>PID</b> "+pid;
emailBody = emailBody+"<br><b>INSPECTOR  </b>"+sp5+sp5+sp5+currentUserID+";
"+inspResultDate;
emailBody = emailBody+"<br><b>ADDRESS </b>"+sp5+sp5+sp5+sp5+addr;
emailBody = emailBody+"<br><b>DATA 
 
 
"+sp5+sp5+sp5+sp5+sp5+inspType+"</b>";
emailBody = emailBody+"<br><b>CONTRACTOR </b>"+sp5+sp5+lpaName+";
"+lpaPhone;
emailBody = emailBody+"<br><b>OWNER</b>"+sp5+sp5+sp5+sp5+sp5+ownerInfo;
emailBody = emailBody+"<br>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
if (//-----------------Begin sending emails-----------------) {
	}

if (matches(inspType.substr(0,3),"502","503","507","508","509","510","511","512","513","514","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","527","533","534","535")) {
	email("garrisong@leoncountyfl.gov","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534")) {
	email("sarah.crosby@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534")) {
	email("james.jackson@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534")) {
	email("rhonda.reaves-smith@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534")) {
	email("william.hawkins@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534")) {
	email("deborah.mccullers@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534")) {
	email("kimberly.meeks@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534")) {
	email("heather.beary@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534")) {
	email("tom.gillman@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534")) {
	email("bob.seaton@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534")) {
	email("jeremy.nelson@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534")) {
	email("garret.young@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534")) {
	email("kristie.tadlock@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"507","508","509","510","511","512","513","514","535")) {
	email("releases@talquinelectric.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"502","503","507","508","509","510","511","512","513","514","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","527","533","534","535")) {
	email("mumfordc@leoncountyfl.gov","autosender@leoncountyfl.gov",emailSubject,emailBody);
	email("walkerp@leoncountyfl.gov","autosender@leoncountyfl.gov",emailSubject,emailBody);
	email("morganjo@leoncountyfl.gov","autosender@leoncountyfl.gov",emailSubject,emailBody);
	email("perdued@leoncountyfl.gov","autosender@leoncountyfl.gov",emailSubject,emailBody);
	email("estesje@leoncountyfl.gov","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if ((matches(inspType.substr(0,3),"400") && matches(appTypeArray[1],"Commercial","Residential","Quick Turn")) || (inspType.substr(0,3) == "400" && matches(appTypeArray[1],"VelocityHall"))) {
	email("kimberly.meeks@talgov.com;
	Daniel.Mann@talgov.com;
	Latosha.Hayes@talgov.com;
	garrisong@leoncountyfl.gov","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

if (matches(inspType.substr(0,3),"905") && matches(appTypeArray[1],"Commercial","Residential","Quick Turn") &&AInfo['Sewer System Type'] == "Sewer" && checkInspectionResult("400: Building Sewer","Approved") == false) {
	email("kimberly.meeks@talgov.com;
	Daniel.Mann@talgov.com;
	Latosha.Hayes@talgov.com","autosender@leoncountyfl.gov",emailSubject,emailBody);
	}

showMessage = false;
`^
FeeAssessAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("FAA:" + appTypeArray[0] + "/*/*/*");
branch("FAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("FAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("FAA:" + appTypeString);
`^
FeeEstimateAfter4ACA^`
showDebug = 1;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("FEA:" + appTypeArray[0] + "/*/*/*");
branch("FEA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("FEA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("FEA:" + appTypeString);
branch("ApplicationSubmitAfter");
`^
INSPECTOR_DISCIPLINES^`
if (Building) {
	}

if (Electrical) {
	}

if (Enviornmental) {
	}

if (Fire) {
	}

if (Gas) {
	}

if (HealthDept) {
	}

if (Code Enforcement) {
	}

if (Mechanical) {
	}

if (Plumbing) {
	}

if (Public Works) {
	}
`^
IRSA;Building!~!~!~^`
showMessage = true;
if (!checkInspectionResult(inspType,"Pending") && inspResult != "Approved") {
	createPendingInspection("L-INSP_ALL", inspType);
	}

if (appMatch("Building/VelocityHall/Solar Photovoltaic/*") && !checkInspectionResult(inspType,"Pending") && inspResult != "Approved") {
	createPendingInspection("L-WebSolarPV", inspType);
	}

if (appMatch("Building/VelocityHall/Solar Thermal Hot Water/*") && !checkInspectionResult(inspType,"Pending") && inspResult != "Approved") {
	createPendingInspection("L-WebSolarSP", inspType);
	}

if (appMatch("Building/VelocityHall/Solar Swimming Pool/*") && !checkInspectionResult(inspType,"Pending") && inspResult != "Approved") {
	createPendingInspection("L-WebSolarTH", inspType);
	}

if (appMatch("Building/VelocityHall/Electical/*") && !checkInspectionResult(inspType,"Pending") && inspResult != "Approved") {
	createPendingInspection("L-Web_Elec", inspType);
	}

if (appMatch("Building/VelocityHall/Mechanical/*") && !checkInspectionResult(inspType,"Pending") && inspResult != "Approved") {
	createPendingInspection("L-Web_Mech", inspType);
	}

if (appMatch("Building/VelocityHall/Plumbing/*") && !checkInspectionResult(inspType,"Pending") && inspResult != "Approved") {
	createPendingInspection("L-Web_Plumb", inspType);
	}

if (appMatch("Building/VelocityHall/Pool Reliner/*") && !checkInspectionResult(inspType,"Pending") && inspResult != "Approved") {
	createPendingInspection("L-Web_Pool", inspType);
	}

if (appMatch("Building/VelocityHall/Reroof/*") && !checkInspectionResult(inspType,"Pending") && inspResult != "Approved") {
	createPendingInspection("L-Web_Roof", inspType);
	}

if (appMatch("Building/VelocityHall/Vinyl Siding/*") && !checkInspectionResult(inspType,"Pending") && inspResult != "Approved") {
	createPendingInspection("L-Web_Vinyl", inspType);
	}

if (appMatch("Building/VelocityHall/Door-Windows/*") && !checkInspectionResult(inspType,"Pending") && inspResult != "Approved") {
	createPendingInspection("L-WebDoorWin", inspType);
	}

if (inspResult == "Approved" && matches(inspType.substr(0,3),"400","502","503","507","508","509","510","511","512","513","514","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","527","533","534","535")) {
	branch("EMSE:Utility_Releases");
	}

if (inspResult == "Approved" && matches(inspType.substr(0,3),"905") && matches(appTypeArray[1],"Commercial","Residential","Quick Turn") &&AInfo['Sewer System Type'] == "Sewer" && checkInspectionResult("400: Building Sewer","Approved") == false) {
	branch("EMSE:Utility_Releases");
	}

showMessage = false;
if (inspResult == "Charge" && matches(inspType.substr(0,3),"595")) {
	addFee("5044-010","BUILDING","FINAL",1,"Y");
	addFee("5015-000","BUILDING","FINAL",3.60,"Y");
	addFee("5043-015","BUILDING","FINAL",.4,"Y");
	updateAppStatus("Fees Due", "Reinspection Fee Added");
	}

if (inspResult == "Charge" && matches(inspType.substr(0,3),"596")) {
	var aftHrsFee;
	aftHrsFee = 82.24;
	}

if (inspResult == "Charge" && matches(inspType.substr(0,3),"596") && inspTotalTime == null  || inspTotalTime <= 1.99) {
	inspTotalTime = 2;
	}

if (inspResult == "Charge" && matches(inspType.substr(0,3),"596")) {
	addFee("5027-001","BUILDING","FINAL",inspTotalTime,"Y");
	addFee("5015-000","BUILDING","FINAL",(aftHrsFee*inspTotalTime)*.027 ,"Y");
	addFee("5043-015","BUILDING","FINAL",(aftHrsFee*inspTotalTime)*.003,"Y");
	updateAppStatus("Fees Due", "After Hours Inspection Fees Added");
	}
`^
IRSA;Enforcement!~!~!~^`
`^
IRSA;Enforcement!Case!~!~^`
if (inspResult == "Invalid") {
	branchTask("Open","Invalid","Updated by Inspection Result Script","");
	closeTask("Closed","Closed","Updated by Inspection Result Script","");
	}
`^
IRSA;Licenses!Business!~!~^`
showDebug = false;
showMessage = true;
if (inspType == "License Inspection" && inspResult == "Passed") {
	closeTask("Inspection","Inspection Passed","Updated by Inspection Result","Note");
	}

if (inspType == "License Inspection" && inspResult == "Failed") {
	closeTask("Inspection","Inspection Failed","Updated by Inspection Result","Note");
	}
`^
IRSA;Permits!~!~!~^`
showDebug = false;
showMessage = true;
if (inspType == "Building Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Electrical Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Plumbing Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Mechanical Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Sign Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Roof Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Fence Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Grading Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Solar Final" && inspResult == "Passed") {
	closeTask("Inspection","Final Inspection Complete","Updated by Inspection Result","Note");
	}

if (inspType == "Building Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Electrical Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Plumbing Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Mechanical Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Sign Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Roof Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Fence Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Grading Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}

if (inspType == "Solar Final" && inspResult == "Passed") {
	updateTask("Permit Status","Finaled","Updated by Inspection Result","Note");
	}
`^
IRSA;ServiceRequest!Streets and Sidewalks!Pothole!~^`
showDebug = false;
showMessage = false;
if (inspType == "SR Investigation" && inspResult == "Create Work Order") {
	closeTask("SR Investigation","Create Work Order","Updated by Inspection Result","Note");
	newAppL1 = "AMS";
	newAppL2 = "Street";
	newAppL3 = "Segment";
	newAppL4 = "Repair";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}

if (inspType == "SR Investigation" && inspResult == "No Work Order") {
	closeTask("SR Investigation","No Work Order","Updated by Inspection Result","Note");
	}
`^
IRSA;ServiceRequest!Streets and Sidewalks!Snow Removal!~^`
showDebug = false;
showMessage = false;
if (inspType == "SR Investigation" && inspResult == "Create Work Order") {
	closeTask("SR Investigation","Create Work Order","Updated by Inspection Result","Note");
	newAppL1 = "AMS";
	newAppL2 = "Street";
	newAppL3 = "Segment";
	newAppL4 = "Snow Removal";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}

if (inspType == "SR Investigation" && inspResult == "No Work Order") {
	closeTask("SR Investigation","No Work Order","Updated by Inspection Result","Note");
	}
`^
IRSA;ServiceRequest!Streets and Sidewalks!Street Flooding!~^`
showDebug = false;
showMessage = false;
if (inspType == "SR Investigation" && inspResult == "Create Work Order") {
	closeTask("SR Investigation","Create Work Order","Updated by Inspection Result","Note");
	newAppL1 = "AMS";
	newAppL2 = "Storm";
	newAppL3 = "Drain";
	newAppL4 = "Cleaning";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}

if (inspType == "SR Investigation" && inspResult == "No Work Order") {
	closeTask("SR Investigation","No Work Order","Updated by Inspection Result","Note");
	}
`^
IRSA;ServiceRequest!Streets and Sidewalks!Street Light!~^`
showDebug = false;
showMessage = false;
if (inspType == "SR Investigation" && inspResult == "Create Work Order") {
	closeTask("SR Investigation","Create Work Order","Updated by Inspection Result","Note");
	newAppL1 = "AMS";
	newAppL2 = "Street";
	newAppL3 = "Light";
	newAppL4 = "Repair";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}

if (inspType == "SR Investigation" && inspResult == "No Work Order") {
	closeTask("SR Investigation","No Work Order","Updated by Inspection Result","Note");
	}
`^
IRSA;ServiceRequest!Water and Sewage!Leaking Fire Hydrant!~^`
showDebug = false;
showMessage = false;
if (inspType == "SR Investigation" && inspResult == "Create Work Order") {
	closeTask("SR Investigation","Create Work Order","Updated by Inspection Result","Note");
	newAppL1 = "AMS";
	newAppL2 = "Water";
	newAppL3 = "Hydrant";
	newAppL4 = "Repair";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}

if (inspType == "SR Investigation" && inspResult == "No Work Order") {
	closeTask("SR Investigation","No Work Order","Updated by Inspection Result","Note");
	}
`^
ISA;Building!~!~!~^`
showMessage = true;
showDebug = 1;
var inspArea;
var InspAreaBldg;
var bldArea;
var envArea;
var pwArea;
pNum = getPrimaryParcelNum();
pArr = new Array();
if (pNum) {
	pArr = new Array();
	loadParcelAttributesFromValidated(pNum, pArr);
	}

if (pNum && pArr["ParcelAttribute.VIR_LC_AREA"] != null) {
	inspArea = pArr["ParcelAttribute.VIR_LC_AREA"];
	}

if (pNum && pArr["ParcelAttribute.VIR_LC_AREA"] != null) {
	AInfo['ParcelAttribute.VIR_LC_AREA'] = pArr["ParcelAttribute.VIR_LC_AREA"];
	}

inspAsgn = null;
conRes = null;
InspAreaConcat = null;
inspDisp1 = inspType.substr(0,1);
inspDisp3 = inspType.substr(0,3);
bldArea = inspArea.substr(0,1);
envArea = inspArea.substr(1,1);
pwArea = inspArea.substr(2,1);
inspDist = lookup("InspDistrict_Lookup",inspDisp1);
if (inspDisp3 == "309" ||inspDisp3 == "398" ||inspDisp3 == "502" || inspDisp3 == "503" || inspDisp3 == "902") {
	inspDist = "G";
	}

if (inspDisp3 == "900" || inspDisp3 == "906" || inspDisp3 == "916" || inspDisp3 == "917") {
	inspDist = "B";
	}

if (inspDisp3 == "901" || inspDisp3 == "904" || inspDisp3 == "921") {
	inspDist = "E";
	}

if (inspDisp3 == "905") {
	inspDist = "P";
	}

if (inspDisp3 == "903") {
	inspDist = "M";
	}

if (inspDisp3 == "800" || inspDisp3 == "909") {
	inspDist = "DW";
	}

if (inspDisp3 == "908" || inspDisp3 == "910" || inspDisp3 == "911" || inspDisp3 == "912" || inspDisp3 == "913" || inspDisp3 == "914" || inspDisp3 == "915") {
	inspDist = "F";
	}

if (appTypeArray[1] == "Commercial") {
	comRes = "C";
	} else {
	comRes = "R";
	}

if (inspArea != null) {
	inspAreaConcat = comRes+bldArea+inspDist;
	logDebug(inspAreaConcat);
	}

if (pNum && pArr["ParcelAttribute.VIR_LC_AREA"] != null) {
	inspAsgn = lookup("InspArea_LookupBld",inspAreaConcat);
	}

if (inspAsgn != null) {
	assignInspection(inspId,inspAsgn);
	}

if (pNum && pArr["ParcelAttribute.VIR_LC_AREA"] == null) {
	inspAsgn =  "ESTESJE";
	}

showMessage = false;
`^
ISA;Permits!~!~!~^`
latestScheduledDate=getLatestScheduledDate();
expirationdate= aa.util.dateDiff(latestScheduledDate, "DAY", 180);
newdate=aa.util.formatDate(expirationdate, "MM/dd/YYYY");
useAppSpecificGroupName=true;
editAppSpecific("PERMIT DATES.Permit Expiration Date", newdate);
`^
InspectionResultModifyAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("IRMA:" + appTypeArray[0] + "/*/*/*");
branch("IRMA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("IRMA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("IRMA:" + appTypeString);
`^
InspectionResultModifyBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("IRMB:" + appTypeArray[0] + "/*/*/*");
branch("IRMB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("IRMB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("IRMB:" + appTypeString);
`^
InspectionResultSubmitAfter^`
showDebug = false;
showMessage= true;
branch("EMSE:GlobalFlags");
branch("IRSA:" + appTypeArray[0] + "/*/*/*");
branch("IRSA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("IRSA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("IRSA:" + appTypeString);
if (matches(currentUserID,"TESTDRIVE")) {
	branch("EMSE:TESTDRIVE_IRSA");
	}
`^
InspectionResultSubmitBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("IRSB:" + appTypeArray[0] + "/*/*/*");
branch("IRSB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("IRSB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("IRSB:" + appTypeString);
`^
InspectionScheduleAfter^`
showDebug = true;
showMessage= true;
branch("EMSE:GlobalFlags");
branch("ISA:" + appTypeArray[0] + "/*/*/*");
branch("ISA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ISA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ISA:" + appTypeString);
`^
InspectionScheduleBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("ISB:" + appTypeArray[0] + "/*/*/*");
branch("ISB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("ISB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("ISB:" + appTypeString);
`^
InvoiceFeeAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("IFA:" + appTypeArray[0] + "/*/*/*");
branch("IFA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("IFA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("IFA:" + appTypeString);
`^
LIC Calculate Dog License Fees^`
if (matches(String(AInfo['Service Dog']),"Yes")) {
	addFee("LIC_095","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==1 && matches(String(AInfo['Spayed/Neutered']),"Yes") && matches(String(AInfo['Senior Citizen']),"No","null")) {
	addFee("LIC_010","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==2 && matches(String(AInfo['Spayed/Neutered']),"Yes") && matches(String(AInfo['Senior Citizen']),"No","null")) {
	addFee("LIC_015","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==3 && matches(String(AInfo['Spayed/Neutered']),"Yes") && matches(String(AInfo['Senior Citizen']),"No","null")) {
	addFee("LIC_020","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==1 && matches(String(AInfo['Spayed/Neutered']),"No", "null") && matches(String(AInfo['Senior Citizen']),"No","null")) {
	addFee("LIC_025","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==2 && matches(String(AInfo['Spayed/Neutered']),"No", "null") && matches(String(AInfo['Senior Citizen']),"No","null")) {
	addFee("LIC_030","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==3 && matches(String(AInfo['Spayed/Neutered']),"No", "null") && matches(String(AInfo['Senior Citizen']),"No","null")) {
	addFee("LIC_035","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==1 && matches(String(AInfo['Spayed/Neutered']),"Yes") && matches(String(AInfo['Senior Citizen']),"Yes")) {
	addFee("LIC_040","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==2 && matches(String(AInfo['Spayed/Neutered']),"Yes") && matches(String(AInfo['Senior Citizen']),"Yes")) {
	addFee("LIC_045","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==3 && matches(String(AInfo['Spayed/Neutered']),"Yes") && matches(String(AInfo['Senior Citizen']),"Yes")) {
	addFee("LIC_050","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==1 && matches(String(AInfo['Spayed/Neutered']),"No", "null") && matches(String(AInfo['Senior Citizen']),"Yes")) {
	addFee("LIC_055","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==2 && matches(String(AInfo['Spayed/Neutered']),"No", "null") && matches(String(AInfo['Senior Citizen']),"Yes")) {
	addFee("LIC_060","LIC_PET_GENERAL","FINAL",1,"N");
	}

if (matches(String(AInfo['Service Dog']),"No","null") && String(AInfo['License Duration'])==3 && matches(String(AInfo['Spayed/Neutered']),"No", "null") && matches(String(AInfo['Senior Citizen']),"Yes")) {
	addFee("LIC_065","LIC_PET_GENERAL","FINAL",1,"N");
	}
`^
LIC Establish Links to Reference Contacts^`
iArr = new Array();
// attributes to ignore;
contactTypeArray = new Array("Applicant","Business Owner","Corporate Officer","Director","Manager","Officer","Partner","President","Respondent","Shareholder");
if (!feeEstimate) {
	createRefContactsFromCapContactsAndLink(capId,contactTypeArray,iArr,false,false,comparePeopleGeneric);
	}
`^
LIC Issue Animal License^`
var licenseDuration= AInfo['License Duration'];
var vaccExpirationDate= AInfo['Vaccination Expiration Date'];
vaccinationExpirationDate=aa.util.parseDate(vaccExpirationDate);
newLic = null;
newLicId = null;
newLicIdString = null;
newLicenseType = "Animal";
monthsToInitialExpire = licenseDuration*12;
newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
// create the license record;
if (newLicId) {
	newLicIdString = newLicId.getCustomID();
	updateAppStatus("Active","Originally Issued",newLicId);
	editAppName(AInfo['Pet Name'],newLicId);
	var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
	var ignoreArr = new Array();
	if(ignore != null) ignoreArr = ignore.split("|");
	copyAppSpecific(newLicId,ignoreArr);
	}

tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
tmpNewDateTodateAdd=dateAdd(tmpNewDate,0);
dateAdds=aa.util.parseDate(tmpNewDateTodateAdd+"");
var temp = vaccinationExpirationDate.after(dateAdds)?dateAdds:vaccinationExpirationDate;
newTemp=aa.util.formatDate(temp, "MM/dd/YYYY");
if (newLicId) {
	thisLic = new licenseObject(newLicIdString,newLicId);
	thisLic.setExpiration(newTemp);
	thisLic.setStatus("Active");
	}

if (newLicId) {
	changeCapContactTypes("Pet Owner","License Holder", newLicId);
	}

if (newLicId) {
	copyOwner(capId, newLicId);
	}

if (newLicId) {
	copyASITables(capId,newLicId);
	}
`^
LIC Issue Business License^`
newLic = null;
newLicId = null;
newLicIdString = null;
newLicenseType = "Business";
monthsToInitialExpire = 12;
newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
// create the license record;
if (newLicId) {
	newLicIdString = newLicId.getCustomID();
	updateAppStatus("Active","Originally Issued",newLicId);
	editAppName(AInfo['Doing Business As (DBA) Name'],newLicId);
	var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
	var ignoreArr = new Array();
	if(ignore != null) ignoreArr = ignore.split("|");
	copyAppSpecific(newLicId,ignoreArr);
	}

tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
if (newLicId) {
	thisLic = new licenseObject(newLicIdString,newLicId);
	thisLic.setExpiration(dateAdd(tmpNewDate,0));
	thisLic.setStatus("Active");
	}

if (newLicId) {
	changeCapContactTypes("Applicant","License Holder", newLicId);
	}

if (newLicId) {
	copyOwner(capId, newLicId);
	}

if (newLicId) {
	copyASITables(capId,newLicId);
	}
`^
LIC Issue Event License^`
newLic = null;
newLicId = null;
newLicIdString = null;
newLicenseType = "Event";
monthsToInitialExpire = 12;
newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
// create the license record;
if (newLicId) {
	newLicIdString = newLicId.getCustomID();
	updateAppStatus("Active","Originally Issued",newLicId);
	editAppName(AInfo['Event Title'],newLicId);
	var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
	var ignoreArr = new Array();
	if(ignore != null) ignoreArr = ignore.split("|");
	copyAppSpecific(newLicId,ignoreArr);
	}

tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
if (newLicId) {
	thisLic = new licenseObject(newLicIdString,newLicId);
	thisLic.setExpiration(dateAdd(tmpNewDate,0));
	thisLic.setStatus("Active");
	}

if (newLicId) {
	changeCapContactTypes("Applicant","License Holder", newLicId);
	}

if (newLicId) {
	copyOwner(capId, newLicId);
	}

if (newLicId) {
	copyASITables(capId,newLicId);
	}
`^
LIC Renewal Animal License^`
var licenseDuration= AInfo['License Duration'];
var vaccExpirationDate= AInfo['Vaccination Expiration Date'];
vaccinationExpirationDate=aa.util.parseDate(vaccExpirationDate);
monthsToInitialExpire = licenseDuration*12-12;
var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
var ignoreArr = new Array();
if(ignore != null) ignoreArr = ignore.split("|");
copyAppSpecific(licCapId,ignoreArr);
expResult = aa.expiration.getLicensesByCapID(licCapId).getOutput().getExpDate();
expDate  = expResult.getMonth() + "/" + expResult.getDayOfMonth() + "/" + expResult.getYear();
tmpNewDate = dateAddMonths(expDate, monthsToInitialExpire);
tmpNewDateTodateAdd=dateAdd(tmpNewDate,0);
dateAdds=aa.util.parseDate(tmpNewDateTodateAdd+"");
var temp = vaccinationExpirationDate.after(dateAdds)?dateAdds:vaccinationExpirationDate;
newTemp=aa.util.formatDate(temp, "MM/dd/YYYY");
if (licCapId) {
	thisLic = new licenseObject(licIDString,licCapId);
	thisLic.setExpiration(newTemp);
	thisLic.setStatus("Active");
	}

if (licCapId) {
	changeCapContactTypes("Applicant","License Holder", licCapId);
	}

if (licCapId) {
	copyOwner(capId, licCapId);
	}

if (licCapId) {
	copyASITables(capId,licCapId);
	}
`^
LIC_EXPIRE_CONFIG^`
if (License) {
	}

if (Licenses) {
	}

if (300) {
	}

if (N) {
	}

if (N) {
	}

if (EXPIRED LICENSE) {
	}

if (0) {
	}

if (Expired) {
	}

if (Expired) {
	}

if (About to Expire) {
	}

if (License Holder) {
	}

if (LIC_EXPIRE) {
	}

if (3) {
	}
`^
LIC_RENEWAL_CONFIG^`
if (License) {
	}

if (Licenses) {
	}

if (300) {
	}

if (N) {
	}

if (N) {
	}

if (LICENSE ABOUT TO EXPIRE) {
	}

if (0) {
	}

if (About to Expire) {
	}

if (Active) {
	}

if (License Holder) {
	}

if (LIC_RENEWAL) {
	}

if (3) {
	}
`^
LLSA;Building!~!~!~^`
showDebug = 1;
showMessage= true;
branch("EMSE:GlobalFlags");
if (matches(appTypeArray[1],"Commercial","Residential","Quick Turn")) {
	for (i in licenseList) updateRefLPExpirationDates(licenseList[i].getStateLicense());
	}

sendLPExpiredNotification(capId);
`^
LicProfLookupSubmitAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("LLSA:" + appTypeArray[0] + "/*/*/*");
branch("LLSA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("LLSA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("LLSA:" + appTypeString);
`^
LicProfLookupSubmitBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("LPLSB:" + appTypeArray[0] + "/*/*/*");
branch("LPLSB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("LPLSB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("LPLSB:" + appTypeString);
`^
LicProfUpdateAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("LPUA:" + appTypeArray[0] + "/*/*/*");
branch("LPUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("LPUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("LPUA:" + appTypeString);
`^
LicProfUpdateBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("LPUB:" + appTypeArray[0] + "/*/*/*");
branch("LPUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("LPUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("LPUB:" + appTypeString);
`^
PRA;Building!~!~!~^`
if (matches(appTypeArray[1],"Residential","Commercial") && appTypeArray[2] != "Quick Turn" && isTaskActive("Payment") == "True" && balanceDue == 0 && PaymentTotalPaidAmount >= .01) {
	closeTask("Payment","Payment Processed","Updated by Script","");
	}

if (matches(appTypeArray[2],"Quick Turn") && isTaskActive("Payment") == "True" && balanceDue == 0 && PaymentTotalPaidAmount >= .01) {
	closeTask("Payment","Payment Processed","Updated by Script","");
	email("garrisong@leoncountyfl.gov;
	"+AInfo['Assigned To']+"@leoncountyfl.gov","noreply@leoncountyfl.gov","Quick Turn Permit "+capIDString+" Permit Issuance Task is Ready for action by you","The following permit, "+capIDString+" is ready for your review");
	activateTask("Permit Issuance");
	}

if (matches(appTypeArray[1],"VelocityHall") && isTaskActive("Inspections") == "True" && balanceDue == 0 && PaymentTotalPaidAmount >= .01 && capStatus == "Fees Due") {
	updateAppStatus("Issued", "Additional Fees Paid");
	}

if (matches(appTypeArray[1],"Residential") && isTaskActive("Inspections") == "True" && balanceDue == 0 && PaymentTotalPaidAmount >= .01 && capStatus == "Fees Due" && AInfo['Redact Record'] ==  "Yes") {
	updateAppStatus("Issued Redacted", "Additional Fees Paid");
	}

if (matches(appTypeArray[1],"Residential","Commercial") && isTaskActive("Inspections") == "True" && balanceDue == 0 && PaymentTotalPaidAmount >= .01 && capStatus == "Fees Due" && (AInfo['Redact Record'] == "No" || AInfo['Redact Record'] == null)) {
	updateAppStatus("Issued", "Additional Fees Paid");
	}
`^
PRA;Licenses!~!~!Renewal^`
if (balanceDue <= 0 && isTaskActive("Renewal Intake")) {
	closeTask("Renewal Intake","Fees Paid","updated via script",null);
	}
`^
PRA;Licenses!Animal!~!Renewal^`
aa.runScriptInNewTransaction("PaymentReceiveAfter4Renew");
branch("EMSE:LicProfLookup");
var licenseDuration= AInfo['License Duration'];
var vaccExpirationDate= AInfo['Vaccination Expiration Date'];
vaccinationExpirationDate=aa.util.parseDate(vaccExpirationDate);
monthsToInitialExpire = licenseDuration*12-12;
var ignore = lookup("EMSE:ASI Copy Exceptions","License/*/*/*");
var ignoreArr = new Array();
if(ignore != null) ignoreArr = ignore.split("|");
copyAppSpecific(licCapId,ignoreArr);
expResult = aa.expiration.getLicensesByCapID(licCapId).getOutput().getB1Expiration().getExpDate();
tmpNewDate = dateAddMonths(expResult, monthsToInitialExpire);
tmpNewDateTodateAdd=dateAdd(tmpNewDate,0);
dateAdds=aa.util.parseDate(tmpNewDateTodateAdd+"");
var temp = vaccinationExpirationDate.after(dateAdds)?dateAdds:vaccinationExpirationDate;
newTemp=aa.util.formatDate(temp, "MM/dd/YYYY");
if (licCapId !=null) {
	licIDString = licCapId.getCustomID();
	}

if (licCapId) {
	thisLic = new licenseObject(licIDString,licCapId);
	thisLic.setExpiration(newTemp);
	thisLic.setStatus("Active");
	}

if (licCapId) {
	changeCapContactTypes("Applicant","License Holder", licCapId);
	}

if (licCapId) {
	copyOwner(capId, licCapId);
	}

if (licCapId) {
	copyASITables(capId,licCapId);
	}
`^
PRA;Licenses!Business!~!Renewal^`
aa.runScriptInNewTransaction("PaymentReceiveAfter4Renew");
`^
PRA;Licenses!Contractor!~!Renewal^`
aa.runScriptInNewTransaction("PaymentReceiveAfter4Renew");
branch("EMSE:LicProfLookup");
`^
ParcelAddAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("PAA:" + appTypeArray[0] + "/*/*/*");
branch("PAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("PAA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("PAA:" + appTypeString);
`^
ParcelUpdateAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("PUA:" + appTypeArray[0] + "/*/*/*");
branch("PUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("PUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("PUA:" + appTypeString);
`^
PaymentReceiveAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("PRA:" + appTypeArray[0] + "/*/*/*");
branch("PRA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("PRA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
if (aa.env.getValue("isBizFireEMSE") != "YES" || currentUserID.startsWith("PUBLICUSER")) {
	branch("PRA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
	}

branch("PRA:" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
branch("PRA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/" + appTypeArray[3]);
branch("PRA:" + appTypeString);
`^
PaymentReceiveBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("PRB:" + appTypeArray[0] + "/*/*/*");
branch("PRB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("PRB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("PRB:" + appTypeString);
`^
RenewalInfoUpdateAfter^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("RIUA:" + appTypeArray[0] + "/*/*/*");
branch("RIUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("RIUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("RIUA:" + appTypeString);
`^
SR Create Child AMS Cases^`
newAppId = createChild(newAppL1,newAppL2,newAppL3,newAppL4,newAppDesc);
updateAppStatus("Open","Updated by Script",newAppId);
aa.cap.copyCapWorkDesInfo(capId, newAppId);
`^
SR Create Child Cases^`
newAppId = createChild(newAppL1,newAppL2,newAppL3,newAppL4,newAppDesc);
if (newAppId) {
	copyAppSpecific(newAppId);
	updateAppStatus("Investigation Pending","Updated by Script",newAppId);
	holdCapId = capId;
	capId = newAppId;
	closeTask("Case Intake","Assigned","","");
	updateTask("Incident Status","Assigned","","");
	scheduleInspectDate("Initial Investigation",dateAdd(null,1,true));
	capId = holdCapId;
	aa.cap.copyCapWorkDesInfo(capId, newAppId);
	editPriority(AInfo['Priority'],newAppId);
	copyOwner(capId, newAppId);
	}
`^
WTUA;Building!~!~!~^`
if (wfTask == "Quality Check" && wfStatus == "Ready to Issue") {
	branch("EMSE:Fees-Building");
	}

if (wfTask == "Application Submittal" && wfStatus == "Accepted") {
	branch("EMSE:Fees-Building");
	}

if (wfTask == "Quality Check" && wfStatus == "Invoice Fees") {
	branch("EMSE:AutoInvoiceBuildingFees");
	}

showMessage = true;
if (wfTask == "Quality Check" && wfStatus == "Ready to Issue") {
	branch("EMSE:Add-Inspections-Building");
	}

if (wfTask == "Application Submittal" && wfStatus == "Accepted" && AInfo['ParcelAttribute.VIR_LC_AREA']  != null) {
	var inspArea;
	var envArea;
	var wfsr;
	var wfstr1;
	var wfstr2;
	var username;
	inspArea = AInfo['ParcelAttribute.VIR_LC_AREA'];
	envArea = inspArea.substr(1,1);
	username = lookup("InspArea_LookupEnv",envArea);
	wfstr = "Environmental Inspection Review";
	assignTask(wfstr,username);
	}

if (wfTask == "Application Submittal" && wfStatus == "Accepted" && AInfo['ParcelAttribute.VIR_LC_AREA']  != null) {
	wfstr = "Applicant/Env-Insp";
	assignTask(wfstr,username);
	wfstr = "Driveway Review";
	}

if (wfTask == "Application Submittal" && wfStatus == "Accepted" && AInfo['Driveway Permit Required'] == "Yes" && AInfo['ParcelAttribute.VIR_DW_ACCESS'] == "COUNTY") {
	assignTask(wfstr,username);
	}

if (wfTask == "Application Submittal" && wfStatus == "Accepted" && AInfo['Driveway Permit Required'] == "No") {
	closeTask("Driveway Review","NA","Driveway Review Not Required - Updated by Script","");
	deactivateTask("Contractor License Review");
	deactivateTask("Driveway Review");
	}

if (wfTask == "Application Submittal" && wfStatus == "Accepted") {
	sendLPExpiredNotification(capId);
	}

if (wfTask == "Application Submittal" && wfStatus == "Accepted" && AInfo['Sewer System Type'] == "Sewer") {
	username = currentUserID;
	wfstr = ("Septic Sewer");
	assignTask(wfstr,username);
	}

if (AInfo['Sewer System Type'] == "N/A") {
	var wfstr;
	wfstr = ("Septic Sewer");
	deactivateTask(wfstr);
	}

if (wfTask == "Completeness Check" && wfStatus == "Routed for Review") {
	username = currentUserID;
	wfstr = ("Quality Check");
	assignTask(wfstr,username);
	}

if (wfTask == "Environmental Inspection Review" && (wfStatus == "Env Insp Resubmittal Requested" || wfStatus == "Resite Required")) {
	username = currentUserID;
	wfstr = ("Applicant/Env-Insp");
	assignTask(wfstr,username);
	setTask("Environmental Inspection Review","Y","N");
	}

if (wfTask == "Zoning Setback Review" && wfStatus == "Additional Information Required") {
	username = currentUserID;
	wfstr = ("Applicant/Zoning Setback Review");
	assignTask(wfstr,username);
	}

if (wfTask == "Completeness Check" && wfStatus == "Additional Information Required") {
	username = currentUserID;
	wfstr = ("Applicant/Completeness Check");
	assignTask(wfstr,username);
	setTask("Completeness Check","Y","N");
	}

if (wfTask == "Building Plans Review" && (wfStatus == "Building Resubmittal Requested" || wfStatus == "Resite Required")) {
	username = currentUserID;
	wfstr = ("Applicant/Building");
	assignTask(wfstr,username);
	setTask("Building Plans Review","Y","N");
	}

if (wfTask == "Environmental Inspection Review" && wfStatus == "Env Supv Apv Requested") {
	assignTask("Environmental Inspection Review","BASSR");
	}

if (wfTask == "Driveway Review" && wfStatus == "Env Supv Apv Requested") {
	assignTask("Driveway Review","BASSR");
	}

if (appTypeArray[1] == "Residential" && matches(appTypeArray[2],"New","Addition") && isTaskStatus("Application Submittal","Accepted") == true && feeExists("7015-012","NEW") == true) {
	invoiceFee("7015-012","FINAL");
	}

if (appTypeArray[1] == "Residential" && matches(appTypeArray[2],"New","Addition") && isTaskStatus("Application Submittal","Accepted") == true && feeExists("5041-015","NEW") == true) {
	invoiceFee("5041-015","FINAL");
	}

if (appTypeArray[1] == "Residential" && matches(appTypeArray[2],"New","Addition") && isTaskStatus("Application Submittal","Accepted") == true && feeExists("8096-010","NEW") == true) {
	invoiceFee("8096-010","FINAL");
	}

if (wfTask == "Building Plans Review" && wfStatus == "Approved") {
	sendLPExpiredNotification(capId);
	}

if (wfTask == "Contractor License Review" && wfStatus == "Approved" && getAppSpecific("Flood Indemnity Required") == "CHECKED" && (getAppSpecific("Flood Declarations Covenent Received") == "No" || getAppSpecific("Flood Declarations Covenent Received") == null) && getAppSpecific("Flood Declarations Covenent Received Date") == null) {
	closeTask("Flood Indemnity Check","Flood Indemnity Required","Auto Check of Flood Indemnity- Updated by Script","");
	activateTask("Flood Indemnity");
	deactivateTask("Quality Check");
	}

if (wfTask == "Contractor License Review" && wfStatus == "Approved" && (getAppSpecific("Flood Indemnity Required") == "UNCHECKED" || getAppSpecific("Flood Indemnity Required") == null)) {
	closeTask("Flood Indemnity Check","Flood Indemnity Not Required","Auto Check of Flood Indemnity- Updated by Script","");
	}

if (wfTask == "Contractor License Review" && wfStatus == "Approved" && getAppSpecific("Flood Indemnity Required") == "CHECKED" && getAppSpecific("Flood Declarations Covenent Received") == "Yes" && getAppSpecific("Flood Declarations Covenent Received Date") >= "01/01/1999") {
	closeTask("Flood Indemnity Check","Flood Indemnity Completed","Auto Check of Flood Indemnity- Updated by Script","");
	closeTask("Flood Indemnity","Flood Indemnity Completed","Auto Check of Flood Indemnity- Updated by Script","");
	activateTask("Quality Check");
	}

if (wfTask == "Zoning Setback Review" && matches(wfStatus,"Additional Information Required","Zoning Setback Resite Required")) {
	setTask("Zoning Setback Review","Y","N");
	}

if (wfTask == "Completeness Check" && wfStatus == "Additional Information Required") {
	setTask("Completeness Check","Y","N");
	}

if (wfTask == "Environmental Inspection Review" && wfStatus == "Env Insp Resubmittal Requested") {
	setTask("Environmental Inspection Review","Y","N");
	}

if (wfTask == "Environmental Inspection Review" && wfStatus == "Env Insp Resite Required") {
	setTask("Environmental Inspection Review","Y","N");
	}

if (wfTask == "Completeness Check" && wfStatus == "Routed for Review") {
	deactivateTask("Applicant/Completeness Check");
	}

if (isTaskStatus("Addressing Review","Approved") == "True" && wfTask == "Applicant/Completeness Check" && wfStatus == "Completeness Check Additional Information Received") {
	deactivateTask("Addressing Review");
	}

if (wfTask == "Completeness Check" && wfStatus == "Routed for Review" && AInfo['Driveway Permit Required'] == "No") {
	deactivateTask("Driveway Review");
	}

if (wfTask == "Completeness Check" && wfStatus == "Routed for Review" && AInfo['Sewer Tap Receipt Received'] == "CHECKED") {
	closeTask("Septic Sewer","Sewer Tap Receipt Received","Updated by Script","");
	}

if (isTaskActive("Driveway Review") == "True" && AInfo['Driveway Permit Required'] == "No") {
	deactivateTask("Driveway Review");
	}

if (wfTask == "Contractor License Review" && wfStatus == "License Update Requested") {
	setTask("Contractor License Review","Y","N");
	}

if (wfTask == "Applicant/Contractor License" && matches(wfStatus,"in progress","License Update Received")) {
	username = currentUserID;
	assignTask("Applicant/Contractor License","username);
	}

if (isTaskStatus("Zoning Setback Review","Resite Routed for Review") == "True") {
	updateTask("Environmental Inspection Review","Resite Received");
	updateTask("Building Plans Review","Resite Received");
	}

if (isTaskStatus("Zoning Setback Review","Resite Routed for Review") == "True" && AInfo['Driveway Permit Required'] == "Yes") {
	updateTask("Driveway Review","Resite Received");
	}

if (isTaskStatus("Zoning Setback Review","Resite Routed for Review") == "True" && AInfo['Sewer System Type'] == "Septic") {
	updateTask("Septic Sewer","Resite Received");
	}

if (!appMatch("Building/*/Demolition/*") && appTypeArray[2] != "Quick Turn" && wfTask == "Contractor License Review" && wfStatus == "Approved") {
	email("AllenJud@leoncountyfl.gov;
	GarrisonG@leoncountyfl.gov;
	GunterL@leoncountyfl.gov","noreply@leoncountyfl.gov","Quality Check Ready for Review "+capIDString+".","The following permit, "+capIDString+" is ready for your review");
	}

if (matches(appTypeArray[1],"Residential","Commercial") && appTypeArray[2] != "Quick Turn" && wfTask == "Quality Check" && wfStatus == "Ready to Issue") {
	capContactResult = aa.people.getCapContactByCapID(capId);
	conArray= capContactResult.getOutput();
	for (y in conArray) branch("EMSE:EmailRptApplicant");
	}

if (matches(appTypeArray[2],"Quick Turn")) {
	var qtIntake;
	var qtBld;
	var qtBldE;
	var qtAddr;
	var qtLic;
	var qtQc;
	var qtFiscal;
	qtIntake = "boggsk@leoncountyfl.gov,dunklinc@leoncountyfl.gov,jakese@leoncountyfl.gov,mooresh@leoncountyfl.gov,oneals@leoncountyfl.gov";
	qtBld = "allenjud@leoncountyfl.gov,greenjo@leoncountyfl.gov,gunterl@leoncountyfl.gov,swainm@leoncountyfl.gov";
	qtBldE = "gunterl@leoncountyfl.gov,allenjud@leoncountyfl.gov";
	qtLic = "allend@leoncountyfl.gov,lowej@leoncountyfl.gov,johnsone@leoncountyfl.gov";
	qtAddr = "scottl@leoncountyfl.gov,harpth@leoncountyfl.gov";
	qtFiscal = "mooresh@leoncountyfl.gov,boggsk@leoncountyfl.gov";
	qtQc = "dunklinc@leoncountyfl.gov,boggsk@leoncountyfl.gov";
	}

if (matches(appTypeArray[2],"Quick Turn") && wfTask == "Application Submittal" && wfStatus == "Accepted") {
	username = currentUserID;
	assignID = currentUserID;
	wfstr = ("Permit Issuance");
	assignTask(wfstr,username);
	assignCap(assignID);
	editAppSpecific("Assigned To",assignID);
	}

if (matches(appTypeArray[2],"Quick Turn") && wfTask == "Application Submittal" && wfStatus == "Accepted" && isTaskActive("Addressing Review")) {
	email(qtAddr,"noreply@leoncountyfl.gov","Quick Turn Permit "+capIDString+" Addressing Review is Ready for action by you","The following permit, "+capIDString+" is ready for your review");
	}

if (matches(appTypeArray[2],"Quick Turn") && appTypeArray[3] != "Electrical"  && wfTask == "Application Submittal" && wfStatus == "Accepted" && isTaskActive("Building Plans Review")) {
	email(qtBld,"noreply@leoncountyfl.gov","Quick Turn Permit "+capIDString+" Building Plans Review is Ready for action by you","The following permit, "+capIDString+" is ready for your review");
	}

if (matches(appTypeArray[2],"Quick Turn") && matches(appTypeArray[3],"Electrical") && wfTask == "Application Submittal" && wfStatus == "Accepted" && isTaskActive("Building Plans Review")) {
	email(qtBldE,"noreply@leoncountyfl.gov","Quick Turn Permit "+capIDString+" Building Plans Review is Ready for action by you","The following permit, "+capIDString+" is ready for your review");
	}

if (matches(appTypeArray[2],"Quick Turn") && wfTask == "Application Submittal" && wfStatus == "Accepted" && isTaskActive("Contractor License Review")) {
	email(qtLic ,"noreply@leoncountyfl.gov","Quick Turn Permit "+capIDString+" Contractor License Review is Ready for action by you","The following permit, "+capIDString+" is ready for your review");
	}

if (matches(appTypeArray[2],"Quick Turn") && taskStatus("Addressing Review") == "Approved" && taskStatus("Building Plans Review") == "Approved" && taskStatus("Contractor License Review") == "Approved" && isTaskActive("Quality Check") && taskStatus("Quality Check") != "Note") {
	email(qtQc ,"noreply@leoncountyfl.gov","Quick Turn Permit "+capIDString+" Quality Check Review is Ready for action by you","The following permit, "+capIDString+" is ready for your review");
	branch("EMSE:AutoInvoiceBuildingFees");
	}

if (matches(appTypeArray[2],"Quick Turn") && wfTask == "Quality Check" && wfStatus == "Ready to Issue") {
	branch("EMSE:AutoInvoiceBuildingFees");
	}

if (matches(appTypeArray[2],"Quick Turn") && wfTask == "Quality Check" && wfStatus == "Ready to Issue" && isTaskActive("Payment")) {
	email(qtFiscal,"noreply@leoncountyfl.gov","Quick Turn Permit "+capIDString+" Fiscal Processing is Ready for action by you","The following permit, "+capIDString+" is ready for your review");
	}

if (matches(appTypeArray[2],"Quick Turn") && wfTask == "Quality Check" && wfStatus == "Ready to Issue") {
	capContactResult =aa.people.getCapContactByCapID(capId);
	conArray= capContactResult.getOutput();
	for (y in conArray) branch("EMSE:EmailRptApplicant");
	}

if (matches(appTypeArray[2],"Quick Turn") && wfTask == "Payment" && matches(wfStatus,"Payment Processed","No Fees Due") && isTaskActive("Permit Issuance")) {
	email(AInfo['Assigned To']+"@leoncountyfl.gov","noreply@leoncountyfl.gov","Quick Turn Permit "+capIDString+" Permit Issuance Task is Ready for action by you","The following permit, "+capIDString+" is ready for your review");
	}

if (matches(appTypeArray[1],"Residential","Commercial") && !matches(appTypeArray[2],"Quick Turn") && isTaskActive("Contractor License Review") == "True" && (isTaskActive("Fire Plans Review") == "True" || isTaskActive("Driveway Review") == "True" || isTaskActive("Septic Sewer") == "True" || isTaskActive("Building Plans Review") == "True" || isTaskActive("Environmental Inspection Review") == "True")) {
	setTask("Contractor License Review","N","N");
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall")  && AInfo['Gas Issuance'] == "CHECKED") {
	capAltId = capId.getCustomID();
	addr = getCapAddress(capId);
	var par = aa.parcel.getParcelandAttribute(capId,null);
	var lpa;
	var lpaPhone;
	var lpaName;
	var lpg;
	var lpgName;
	var lpgPhone;
	var lpp;
	var lppName;
	var lppPhone;
	var gasEmailCon;
	var LPInfo;
	var gasEmailSal;
	var today = new Date();
	today = Date(aa.date.currentDate);
	var aName;
	var aPh;
	var ownerInfo;
	var gasEmailConA;
	var gasEmailConG;
	var gasEmailConP;
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall")  && AInfo['Gas Issuance'] == "CHECKED" && par.getSuccess()) {
	parcels = par.getOutput().toArray();
	for (x in parcels) pid = parcels[x].getParcelNumber();
	logDebug(pid);
	lpa = getLicenseProfessional(capId);
	for (x in lpa) if (lpa[x].getLicenseType().substring(0,10) == "Contractor" && lpa[x].getPrintFlag() == "Y") lpaName = lpa[x].getBusinessName();
	lpa = getLicenseProfessional(capId);
	for (x in lpa) if (lpa[x].getLicenseType().substring(0,10) == "Contractor" && lpa[x].getPrintFlag() == "Y") lpaPhone = lpa[x].getPhone1();
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall") && AInfo['Gas Issuance'] == "CHECKED") {
	lpg = getLicenseProfessional(capId);
	for (x in lpg) if (lpg[x].getLicenseType().substring(0,16) == "Contractor - Gas") lpgName = lpg[x].getBusinessName();
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall") && AInfo['Gas Issuance'] == "CHECKED") {
	lpg = getLicenseProfessional(capId);
	for (x in lpg) if (lpg[x].getLicenseType().substring(0,16) == "Contractor - Gas") lpgPhone = lpg[x].getPhone1();
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall") && AInfo['Gas Issuance'] == "CHECKED") {
	lpp = getLicenseProfessional(capId);
	for (x in lpp) if (lpp[x].getLicenseType().substring(0,16) == "Contractor - Plu") lppName = lpp[x].getBusinessName();
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall") && AInfo['Gas Issuance'] == "CHECKED") {
	lpp = getLicenseProfessional(capId);
	for (x in lpp) if (lpp[x].getLicenseType().substring(0,16) == "Contractor - Plu") lppPhone = lpp[x].getPhone1();
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall") && AInfo['Gas Issuance'] == "CHECKED") {
	gasEmailConA = "Contractors listed on Permit and Phone Number<br>Primary Contractor "+lpaName+" Phone Number "+lpaPhone+"<br>";
	} else {
	"";
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall") && AInfo['Gas Issuance'] == "CHECKED") {
	gasEmailConG = "Gas Contractor "+lpgName+" Phone Number "+lpgPhone+"<br>";
	} else {
	"";
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall") && AInfo['Gas Issuance'] == "CHECKED") {
	gasEmailConP = "Plumbing Contractor "+lppName+" Phone Number "+lppPhone+"<br><br>";
	} else {
	"";
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall") && AInfo['Gas Issuance'] == "CHECKED") {
	var gasEmailText ="City of Tallahassee Gas Utilities,<br><br>This is to notify you that a "+AInfo['Improvement Type']+" " +AInfo['Class Type']+" building permit " +capIDString+" has been issued.  Gas service has been noted on this permit.  In addition to the base Gas Permit fees there may be other gas related items see listed below. <br><br>Gas Piping (Num of Outlets): "+AInfo['Gas Piping (Num of Outlets)']+"<br>Conversion Burner: "+AInfo['Conversion Burner']+"<br>Floor Furnace: "+AInfo['Floor Furnace']+"<br>Incinerator: "+AInfo['Incinerator']+"<br>Boiler: "+AInfo['Boiler']+"<br>Heating/AC Unit: "+AInfo['Heating/AC Unit']+"<br>Vented Wall Furnace: "+AInfo['Vented Wall Furnace']+"<br>Gas Water Heater: "+AInfo['Gas Water Heater']+"";
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall") && AInfo['Gas Issuance'] == "CHECKED") {
	var gasEmailSubject = "GAS UTILITY NOTIFICATION: Permit: "+capIDString+" Located at "+addr+" on Parcel ID: "+pid+" has been Issued";
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall") && AInfo['Gas Issuance'] == "CHECKED") {
	var gasEmailSal = "Please call Leon County Building Plans Review at (850) 606-1300 if you have any questions.<br><br>Thank You.";
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall") && AInfo['Gas Issuance'] == "CHECKED") {
	var gasEmailTo = "garrisong@leoncountyfl.gov,GasUtilityNotification@talgov.com";
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(appTypeArray[1],"Residential","Commercial","VelocityHall") && AInfo['Gas Issuance'] == "CHECKED" && wfTask == "Permit Issuance" && wfStatus == "Issued") {
	email(gasEmailTo,"autosender@leoncountyfl.gov",gasEmailSubject,gasEmailText+"<br><br>"+gasEmailConA+gasEmailConG+gasEmailConP+"<br>"+gasEmailSal);
	}

showMessage = false;
`^
WTUA;CodeCompliance!Abandoned Property Registry!~!~^`
showMessage = true;
showDebug = 1;
branch("EMSE: APO Load Attributes");
`^
WTUA;CodeCompliance!Compliance Certificate!~!~^`
var today = new Date();
today = Date(aa.date.currentDate);
username = currentUserID;
if (wfTask == "Request Submittal" && wfStatus == "Fees Due Notice") {
	editAppSpecific("Send Fees Due","CHECKED");
	editAppSpecific("Send Fees Due Date",today);
	branch("EMSE:CCLEmailRpt");
	}

if (wfTask == "CCL Review" && wfStatus == "Send No Information Found Letter Email") {
	editAppSpecific("Send No Information Found EM","CHECKED");
	editAppSpecific("Send No Information Found EM Date",today);
	branch("EMSE:CCLEmailRpt");
	closeTask("Complete","Closed","Updated by Script","");
	editAppSpecific("Complete","CHECKED");
	editAppSpecific("Complete Date",today);
	updateAppStatus("Complete");
	}

if (wfTask == "CCL Review" && wfStatus == "Send Parcel in City Email") {
	editAppSpecific("Send Parcel in City Limits EM","CHECKED");
	editAppSpecific("Send Parcel in City Limits EM Date",today);
	branch("EMSE:CCLEmailRpt");
	closeTask("Complete","Closed","Updated by Script","");
	editAppSpecific("Complete","CHECKED");
	editAppSpecific("Complete Date",today);
	updateAppStatus("Complete");
	}

if ((wfTask == "CCL Review" && wfStatus == "Send Parcel/Address Do Not Match Email" || wfTask == "Request Submittal" && wfStatus == "Parcel and Address Don't Match Notice")) {
	editAppSpecific("Send Address/Parcel Do Not Match","CHECKED");
	editAppSpecific("Send Address/Parcel Do Not Match Date",today);
	branch("EMSE:CCLEmailRpt");
	}

if (wfTask == "CCL Review" && wfStatus == "Send Results Letter Email") {
	editAppSpecific("Send Results Letter/EM","CHECKED");
	editAppSpecific("Send Results Letter/EM Date",today);
	branch("EMSE:CCLEmailRpt");
	closeTask("Complete","Closed","Updated by Script","");
	editAppSpecific("Complete","CHECKED");
	editAppSpecific("Complete Date",today);
	updateAppStatus("Complete");
	}
`^
WTUA;DevelopmentSvc!Permited Use Verification!~!~^`
if (wfTask == "Planner" && wfStatus == "Approved") {
	editAppSpecific("Released Date", sysDateMMDDYYYY);
	}
`^
WTUA;Enforcement!Incident!~!~^`
disableTokens = true;
holdCapId = capId;
parentArray = getParents("*/*/*/*");
if (wfTask == "Initial Investigation" && wfStatus == "No Violation") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","No Violation Found","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Follow-Up Investigation" && wfStatus == "Violation Corrected") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Follow-Up Investigation" && wfStatus == "Violation Abated") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Issue Citation" && wfStatus == "Violation Corrected") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Issue Citation" && wfStatus == "Violation Abated") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Route to Legal" && wfStatus == "Decision Made") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Legal Decision","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Route to Legal" && wfStatus == "Violation Abated") {
	closeTask("Case Closed","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Incident Status" && wfStatus == "No Violation") {
	closeTask("Incident Status","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","No Violation Found","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Incident Status" && wfStatus == "Violation Corrected") {
	closeTask("Incident Status","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Incident Status" && wfStatus == "Violation Abated") {
	closeTask("Incident Status","Closed","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Corrected","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Incident Status" && wfStatus == "Duplicate") {
	closeTask("Incident Status","Duplicate","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Duplicate","","");
	capId = holdCapId;
	'];
	}

if (wfTask == "Incident Status" && wfStatus == "Referred") {
	closeTask("Incident Status","Referred","","");
	if (parentArray && parentArray.length > 0) for (thisParent in parentArray) if (parentArray[thisParent]) AInfo['capId = parentArray[thisParent];
	closeTask("Investigation","Referred","","");
	capId = holdCapId;
	'];
	}

disableTokens = false;
`^
WTUA;Licenses!Animal!~!Application^`
if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Establish Links to Reference Contacts");
	}

if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Issue Animal License");
	}
`^
WTUA;Licenses!Animal!~!Renewal^`
if (wfTask == "Renewal Status" && wfStatus == "Approved") {
	aa.runScriptInNewTransaction("WorkflowTaskUpdateAfter4Renew");
	}
`^
WTUA;Licenses!Business!~!Application^`
if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Establish Links to Reference Contacts");
	}

if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Issue Business License");
	}
`^
WTUA;Licenses!Contractor!~!Application^`
if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Establish Links to Reference Contacts");
	}

if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Issue Business License");
	}

if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("EMSE:LicProfLookup");
	}
`^
WTUA;Licenses!Event!~!Application^`
if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Establish Links to Reference Contacts");
	}

if (wfTask == "License Issuance" && wfStatus == "Issued") {
	branch("LIC Issue Event License");
	}
`^
WTUA;Permits!~!~!~^`
if (wfTask == "Plans Coordination" && wfStatus == "Ready to Issue") {
	editAppSpecific("Plan Review Expiration Date",dateAdd(null,180));
	}

if (wfTask == "Plan Review" && wfStatus == "Approved") {
	editAppSpecific("Plan Review Expiration Date",dateAdd(null,180));
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued") {
	editAppSpecific("Permit Issued Date", sysDateMMDDYYYY);
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued") {
	editAppSpecific("Permit Expiration Date", dateAdd(null,180));
	}

if (wfTask == "Permit Status" && wfStatus == "Ready to Issue") {
	editAppSpecific("Plan Review Expiration Date",dateAdd(null,180));
	}

if (wfTask == "Permit Status" && wfStatus == "Permit Issued") {
	editAppSpecific("Permit Issued Date", sysDateMMDDYYYY);
	}

if (wfTask == "Permit Status" && wfStatus == "Permit Issued") {
	editAppSpecific("Permit Expiration Date", dateAdd(null,180));
	}

if (wfTask == "Permit Issuance" && wfStatus == "Issued") {
	licEditExpInfo(null,AInfo['Permit Expiration Date']);
	}

if (wfTask == "Permit Status" && wfStatus == "Permit Issued") {
	licEditExpInfo(null,AInfo['Permit Expiration Date']);
	}
`^
WTUA;ServiceRequest!~!~!~^`
if (wfTask == "SR Intake" && wfStatus == "Duplicate") {
	closeTask("Final Notification","Notification Sent"), branch("EMSE:ServiceRequestCloseCase");
	}

if (wfTask == "SR Intake" && wfStatus == "Referred") {
	closeTask("Final Notification","Notification Sent"), branch("EMSE:ServiceRequestCloseCase");
	}

if (wfTask == "Final Notification" && wfStatus == "Send Email") {
	branch("EMSE:ServiceRequestCloseCase");
	}

if (wfTask == "Final Notification" && wfStatus == "No Notification Sent") {
	branch("EMSE:ServiceRequestCloseCase");
	}
`^
WTUA;ServiceRequest!Animals!Animal Nuisance!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Abatement";
	newAppL4 = "Animal Nuisance";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Fence Dispute!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Zoning";
	newAppL4 = "Fence Dispute";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Grading Violation!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Building";
	newAppL4 = "Grading";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Home Occupation!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Zoning";
	newAppL4 = "Home Occupation";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Illegal Occupancy!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Building";
	newAppL4 = "Illegal Occupancy";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Junk on Property!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Health and Safety";
	newAppL4 = "Junk";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Sub-Standard Property!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Building";
	newAppL4 = "Sub-Standard Property";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Vacant Building!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Health and Safety";
	newAppL4 = "Vacant Building";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Buildings and Property!Working Without Permit!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Building";
	newAppL4 = "Working Without Permit";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Garbage!Trash Removal!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Health and Safety";
	newAppL4 = "Garbage Service";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Graffiti!Graffiti!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Abatement";
	newAppL4 = "Graffiti";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Noise!Excessive Noise!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Abatement";
	newAppL4 = "Noise Nuisance";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Signage!Illegal Sign!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Zoning";
	newAppL4 = "Illegal Sign";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Streets and Sidewalks!Pothole!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	scheduleInspectDate("SR Investigation",dateAdd(null,1,true));
	}

if (wfTask == "SR Investigation" && wfStatus == "Create Work Order") {
	newAppL1 = "AMS";
	newAppL2 = "Street";
	newAppL3 = "Segment";
	newAppL4 = "Repair";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}
`^
WTUA;ServiceRequest!Streets and Sidewalks!Snow Removal!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	scheduleInspectDate("SR Investigation",dateAdd(null,1,true));
	}

if (wfTask == "SR Investigation" && wfStatus == "Create Work Order") {
	newAppL1 = "AMS";
	newAppL2 = "Street";
	newAppL3 = "Segment";
	newAppL4 = "Snow Removal";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}
`^
WTUA;ServiceRequest!Streets and Sidewalks!Street Flooding!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	scheduleInspectDate("SR Investigation",dateAdd(null,1,true));
	}

if (wfTask == "SR Investigation" && wfStatus == "Create Work Order") {
	newAppL1 = "AMS";
	newAppL2 = "Storm";
	newAppL3 = "Drain";
	newAppL4 = "Cleaning";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}
`^
WTUA;ServiceRequest!Streets and Sidewalks!Street Light!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	scheduleInspectDate("SR Investigation",dateAdd(null,1,true));
	}

if (wfTask == "SR Investigation" && wfStatus == "Create Work Order") {
	newAppL1 = "AMS";
	newAppL2 = "Street";
	newAppL3 = "Light";
	newAppL4 = "Repair";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}
`^
WTUA;ServiceRequest!Trees and Weeds!Tall Grass and Weeds!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Abatement";
	newAppL4 = "Tall Grass-Weeds";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Trees and Weeds!Tree Maintenance!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Abatement";
	newAppL4 = "Tree Maintenance";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Vehicles!Abandoned Vehicle!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	newAppL1 = "Enforcement";
	newAppL2 = "Incident";
	newAppL3 = "Abatement";
	newAppL4 = "Abandoned Vehicle";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child Cases");
	}
`^
WTUA;ServiceRequest!Water and Sewage!Leaking Fire Hydrant!~^`
if (wfTask == "SR Intake" && wfStatus == "Assigned") {
	scheduleInspectDate("SR Investigation",dateAdd(null,1,true));
	}

if (wfTask == "SR Investigation" && wfStatus == "Create Work Order") {
	newAppL1 = "AMS";
	newAppL2 = "Water";
	newAppL3 = "Hydrant";
	newAppL4 = "Repair";
	newAppDesc = "Created by " + capId.getCustomID();
	branch("SR Create Child AMS Cases");
	}
`^
WTUB;Building!~!~!~^`
if (matches(appTypeArray[1],"Residential","Commercial") && wfTask == "Inspections" && wfStatus == "Final Inspection Complete" && matches(capStatus,"Issued","Issued Redacted","Certificate of Occupancy","Certificate of Completion","Certificate of Occupancy Redac","Certificate of Completion Reda","Finaled") && (AInfo['Environmental Management Do Not COFO'] == "CHECKED" || AInfo['Building Plans Review Do Not COFO'] == "CHECKED" || AInfo['Code Compliance-License Do Not COFO'] == "CHECKED" || AInfo['Development Services Do Not COFO'] == "CHECKED")) {
	cancel = true;
	endBranch();
	}

if (matches(appTypeArray[1],"Residential","Commercial") && wfTask == "Permit Issuance" && wfStatus == "Issued" && matches(capStatus, "Approved Notified","Issued","Issued Redacted") && (AInfo['Environmental Management Do Not Issue'] == "CHECKED" || AInfo['Building Plans Review Do Not Issue'] == "CHECKED" || AInfo['Code Compliance-License Do Not Issue'] == "CHECKED" || AInfo['Development Services Do Not Issue'] == "CHECKED")) {
	cancel = true;
	endBranch();
	}
`^
WTUB;CodeCompliance!Compliance Certificate!~!~^`
showDebug = 1;
if (wfTask == "CCL Review" && matches(wfStatus,"Send Results Letter Email","Send No Information Found Letter Email","Send Parcel in City Email","Send Parcel/Address Do Not Match Email") && balanceDue > 0) {
	showMessage = true;
	comment("<Font Color = Red><Strong>Cannot send Compliance Certificate with a balance greater than zero.</Font></Strong>");
	cancel = true;
	}
`^
WTUB;Licenses!~!~!~^`
if (wfTask == "License Issuance" && wfStatus == "Issued" && balanceDue > 0) {
	showMessage = true;
	cancel = true;
	comment("Cannot issue this license with a balance greater than zero");
	}
`^
WTUB;Permits!~!~!~^`
if (wfTask == "Permit Issuance" && wfStatus == "Issued" && balanceDue > 0) {
	showMessage = true;
	cancel = true;
	comment("Cannot issue this permit with a balance greater than zero");
	}

if (wfTask == "Permit Status" && wfStatus == "Permit Issued" && balanceDue > 0) {
	showMessage = true;
	cancel = true;
	comment("Cannot issue this permit with a balance greater than zero");
	}
`^
WorkflowTaskUpdateAfter^`
showDebug = false;
showMessage= true;
branch("EMSE:GlobalFlags");
branch("WTUA:" + appTypeArray[0] + "/*/*/*");
branch("WTUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("WTUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("WTUA:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
branch("WTUA:" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
branch("WTUA:" + appTypeString);
if (matches(currentUserID,"TESTDRIVE")) {
	branch("EMSE:TESTDRIVE_WTUA");
	}
`^
WorkflowTaskUpdateBefore^`
showDebug = false;
showMessage= false;
branch("EMSE:GlobalFlags");
branch("WTUB:" + appTypeArray[0] + "/*/*/*");
branch("WTUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
branch("WTUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
branch("WTUB:" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
branch("WTUB:" + appTypeString);
`^
