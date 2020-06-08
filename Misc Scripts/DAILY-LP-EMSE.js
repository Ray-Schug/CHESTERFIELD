/***********************************************************************
 * Accela Automation
 * File: 
 * Accela, Inc.
 * Copyright (C): 2011
 * 
 * Description: This is EMSE script  for update Daily. LP.
 *	It will update all People Info Tables of whose [column name] is  infoTableColumnName && [Table Row No] is rowIndex under the CAP
 *  
 *  Precondition:
 *  1. an existing People Info Table 
 *		Example in this sample script:
 *		- infoTableSubGroupCode : Info Table Sub Group Code
 *		- infoTableColumnName   : Column name in Info Table
 *		- rowIndex		: which row need to change value in Info Table
 *		- newRowValue		: What's the value after changed.
 *
 *		 
 *		
 * Notes:
 *
 **********************************************************************/

aa.print("============LP debug start============");

var infoTableSubGroupCode = 'REBECCA';
var infoTableColumnName = 'rebecca';
var rowIndex = 1;
var newRowValue = '222';


var capIDModel = getCapId();



//1. Get InfoTableGroupCodeModel
var licenseProfessionalArray = getLicensedProfessionalsByCapID(capIDModel);

if (licenseProfessionalArray != null) {
	aa.print("licenseProfessionalArray size():" + licenseProfessionalArray.length);
	for (i in licenseProfessionalArray) {
		var licenseProfessionalObj = licenseProfessionalArray[i];

		//var servProvCode = licenseProfessionalObj.getAgencyCode();
		//var licSeqNbr = licenseProfessionalObj.getLicSeqNbr();
		//var licType= licenseProfessionalObj.getLicenseType();
		//aa.print("No."+i +":" + servProvCode+ licSeqNbr + licType);

		//1. Get People Info Tables
		var infoTableGroupCodeObj = getDailyPeopleInfoTables(licenseProfessionalObj);
		//aa.print(infoTableGroupCodeObj);

		//2. Get InfoTableSubGroupCode
		var infoTableSubGroupCodes = getInfoTableSubGroups(infoTableGroupCodeObj);

		//3. Get InfoTableColumnModels
		var infoTableColumnModels = getInfoTableColumnsBySubGroup(infoTableSubGroupCodes, infoTableSubGroupCode);

		//4. Get all Info Table' values by its column name
		var infoTableValueModels = getColumnValuesByName(infoTableColumnModels, infoTableColumnName);


		//5. Reset Into Table column values
		resetColumnValueByRowIndex(infoTableValueModels, rowIndex);

		//6. Execute update action
		updateInfoTable(licenseProfessionalObj)
	}
} else {
	aa.print("Empty licenseProfessionalArray.");
}


function getCapId() {
	var s_id1 = "11CAP";
	var s_id2 = "00000";
	var s_id3 = "00684";

	var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);
	if (s_capResult.getSuccess()) {
		return s_capResult.getOutput();
	} else {
		aa.print("**ERROR: Failed to get capId: " + s_capResult.getErrorMessage());
		return null;
	}
}

function getLicensedProfessionalsByCapID(capIDModel) {
	var licenseProfessionalArray = null;
	var s_result = aa.licenseScript.getLicenseProf(capIDModel);
	if (s_result) {
		licenseProfessionalArray = s_result.getOutput();
	} else {
		aa.print("Not any LicensedProfessionals");
	}

	return licenseProfessionalArray;
}

function getInfoTableSubGroups(infoTableGroupCodeObj) {
	var infoTableSubGroups = null;
	if (infoTableGroupCodeObj != null) {
		infoTableSubGroups = infoTableGroupCodeObj.getSubgroups();
	} else {
		aa.print("Not any infoTableSubGroups");
	}

	return infoTableSubGroups;
}

function getDailyPeopleInfoTables(licenseProfessionalObj) {
	var infoTableGroupCodeObj = null;
	if (licenseProfessionalObj) {
		infoTableGroupCodeObj = licenseProfessionalObj.getInfoTableGroupCodeModel();
	} else {
		aa.print("Not any People Info Table");
	}

	return infoTableGroupCodeObj;
}

function getInfoTableColumnsBySubGroup(infoTableSubGroupCodes, infoTableSubGroupCode) {
	var infoTableColumnModels = null;
	if (infoTableSubGroupCodes != null) {
		var infoTableSubGroupCodeArray = infoTableSubGroupCodes.toArray();
		for (i in infoTableSubGroupCodeArray) {
			if (infoTableSubGroupCode.equals(infoTableSubGroupCodeArray[i].getName())) {
				infoTableColumnModels = infoTableSubGroupCodeArray[i].getColumnDefines()
				break;
			}
		}
	}

	return infoTableColumnModels;
}

function getColumnValuesByName(infoTableColumnModels, infoTableColumnName) {
	var infoTableValueModels = null;
	if (infoTableColumnModels != null) {
		var infoTableColumnArray = infoTableColumnModels.toArray();
		aa.print("infoTableColumnArray Length is:" + infoTableColumnArray.length);


		for (i in infoTableColumnArray) {
			if (infoTableColumnName.equals(infoTableColumnArray[i].getName())) {
				infoTableValueModels = infoTableColumnArray[i].getTableValues();
				break;
			}
		}
	}

	return infoTableValueModels;
}

function resetColumnValueByRowIndex(infoTableValueModels, rowIndex) {
	if (infoTableValueModels != null) {
		var infoTableValueArray = infoTableValueModels.toArray();
		//For output all values
		for (i in infoTableValueArray) {
			aa.print("rowNumber is:" + infoTableValueArray[i].getRowNumber() + " columnNumber is" + infoTableValueArray[i].getColumnNumber() + " Value is:" + infoTableValueArray[i].getValue());
		}

		//Reset value by row No.
		for (j in infoTableValueArray) {
			if (rowIndex == infoTableValueArray[j].getRowNumber()) {
				infoTableValueArray[j].setValue(newRowValue);
			}
		}
	}
}

function updateInfoTable(licenseProfessionalObj) {
	if (licenseProfessionalObj != null && licenseProfessionalObj.getInfoTableGroupCodeModel() != null) {
		aa.licenseProfessional.editLicensedProfessional(licenseProfessionalObj);
	} else {
		aa.print("Not update any records.");

	}
}

aa.print("============LP debug end============");