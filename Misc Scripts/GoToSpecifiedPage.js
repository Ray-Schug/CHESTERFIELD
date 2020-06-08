var capModel = aa.env.getValue("CapModel");
var fromReviewPage = aa.env.getValue("fromReviewPage");
var conditionKey = "Application Type";

var componentNames = new Array("Contact 1", "ASI Table", "Parcel", "Licensed Professional", "Detail Information",
	"Owner", "Address", "Contact List", "Contact 2", "Contact 3", "Valuation Calculator",
	"Licensed Professional List", "Continuing Education", "ASI", "Assets", "Additional Information",
	"Education", "Applicant", "Examination", "Attachment");

var componentAliasNames = new Array("Contact1", "AppSpecTable", "Parcel", "License", "DetailInfo",
	"Owner", "WorkLocation", "MultiContacts", "Contact2", "Contact3", "ValuationCalculator",
	"MultiLicenses", "ContinuingEducation", "AppSpec", "Assets", "Description",
	"Education", "Applicant", "Examination", "Attachment");


if (capModel != null) {
	var asiGroups = capModel.getAppSpecificInfoGroups();
	var conditionValue = getFieldValue(conditionKey, asiGroups);
	if (fromReviewPage == "Y" && conditionValue != null && "ClearLP" == conditionValue) {
		clearPageSectionData("1", "1");
		aa.env.setValue("ReturnData", "{'PageFlow': {'StepNumber': '2', 'PageNumber':'2'}}");
	}
}


function clearPageSectionData(stepIndex, pageIndex) {
	var capID = capModel.getCapID();

	var pageComponents = getPageComponents(capID, stepIndex, pageIndex);

	if (pageComponents != null && pageComponents.length > 0) {
		for (var i = 0; i < pageComponents.length; i++) {
			clearDataByComponentName(pageComponents[i].getComponentSeqNbr(), pageComponents[i].getComponentName());
		}

		aa.acaPageFlow.hideCapPage4ACA(capID, stepIndex, pageIndex);
	}
}

function clearDataByComponentName(componentSeqNbr, componentName) {
	var componentAliasName = getComponentAliasName(componentName);
	if (componentAliasName != null) {
		var dailyComponentName = componentAliasName + "_" + componentSeqNbr;
		if (componentAliasName.indexOf("MultiLicenses") == 0 || componentAliasName.indexOf("License") == 0) {
			clearLPData(dailyComponentName);
		} else if (componentAliasName.indexOf("MultiContacts") == 0 || componentAliasName.indexOf("Contact1") == 0 || componentAliasName.indexOf("Contact2") == 0 || componentAliasName.indexOf("Contact3") == 0 || componentAliasName.indexOf("Applicant") == 0) {
			clearContactData(dailyComponentName);
		}
	}
}

function clearParcelData(dailyComponentName) {
	var parcel = capModel.getParcelModel();
	if (parcel.getComponentName() != null && parcel.getComponentName().indexOf(dailyComponentName) == 0) {
		capModel.setParcelModel(null);
	}
}

function clearContactData(dailyComponentName) {
	var contactList = capModel.getContactsGroup();
	if (contactList != null && contactList.size() > 0) {
		for (var i = contactList.size(); i > 0; i--) {
			var contactModel = contactList.get(i - 1);
			if (contactModel.getComponentName() != null && contactModel.getComponentName().indexOf(dailyComponentName) == 0) {
				contactList.remove(contactModel);
			}
		}
	}
}

function clearLPData(dailyComponentName) {
	var lpList = capModel.getLicenseProfessionalList();
	if (lpList != null && lpList.size() > 0) {
		for (var i = lpList.size(); i > 0; i--) {
			var lpModel = lpList.get(i - 1);
			if (lpModel.getComponentName() != null && lpModel.getComponentName().indexOf(dailyComponentName) == 0) {
				lpList.remove(lpModel);
			}
		}
	}

	var licenseProfessionalModel = capModel.getLicenseProfessionalModel();
	if (licenseProfessionalModel != null) {
		if (licenseProfessionalModel.getComponentName() != null && licenseProfessionalModel.getComponentName().indexOf(dailyComponentName) == 0) {
			capModel.setLicenseProfessionalModel(null);
		}
	}
}

function getComponentAliasName(componentName) {
	if (componentNames == null) {
		return null;
	} else {
		for (var i = 0; i < componentNames.length; i++) {
			if (componentNames[i] == componentName) {
				return componentAliasNames[i];
			}
		}
		return null;
	}
}

function getPageComponents(capID, stepIndex, pageIndex) {
	var componentResult = aa.acaPageFlow.getPageComponents(capID, stepIndex, pageIndex);

	if (componentResult.getSuccess()) {
		return componentResult.getOutput();
	}

	return null;
}

function getFieldValue(fieldName, asiGroups) {
	if (asiGroups == null) {
		return null;
	}

	var iteGroups = asiGroups.iterator();
	while (iteGroups.hasNext()) {
		var group = iteGroups.next();
		var fields = group.getFields();
		if (fields != null) {
			var iteFields = fields.iterator();
			while (iteFields.hasNext()) {
				var field = iteFields.next();
				if (fieldName == field.getCheckboxDesc()) {
					return field.getChecklistComment();
				}
			}
		}
	}
	return null;
}