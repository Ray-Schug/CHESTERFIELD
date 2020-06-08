var capID = getCapID();
var from = "demo11@szgroup.com";
var to = "jovy.wang@achievo.com";
var cc = "tony.li@achievo.com";

var capIDString = getCapIDString();
var dateFormat = "yyyy-MM-dd";
var timeFormat = "hh:mm:ss a";
var strCapID = getCapIDString();
var formSubgroup = "OFFICIAL USE";
var tableSubgroup = "ADDRESS";
var formFieldName = "License Type";
var tableFieldName = "Island";
var educationModel = getOutput(aa.education.getEducationList(capID), "")[0];


var templateTableValue = getTemplateValueByTable(educationModel.getTemplate(), tableSubgroup, tableFieldName);
var templateFormValue = getTemplateValueByForm(educationModel.getTemplate(), formSubgroup, formFieldName);
var fileNames = [];
var emailTemplateName = "LCEMAIL TEST";


aa.document.sendEmailAndSaveAsDocument(from, to, cc, emailTemplateName, getParams(), capID, fileNames);

if (educationModel.getProviderName() == "New Provider") {
	educationModel.setProviderName("For Alan2");
	educationModel.setProviderNo("For Alan2");
} else {
	educationModel.setProviderName("New Provider");
	educationModel.setProviderNo("New Provider");
}


aa.education.updateEducationModel(educationModel);

function getParams() {
	var params = aa.util.newHashtable();

	if (educationModel == null) {
		return params;
	}

	addParameter(params, "$$educationName$$", educationModel.getEducationName());
	addParameter(params, "$$degree$$", educationModel.getDegree());
	addParameter(params, "$$providerName$$", educationModel.getProviderName());
	addParameter(params, "$$templateTableSize$$", templateTableValue.length);
	addParameter(params, "$$templateFormValue$$", templateFormValue);



	return params;
}

function getCapID() {
	var id1 = aa.env.getValue("PermitId1");
	var id2 = aa.env.getValue("PermitId2");
	var id3 = aa.env.getValue("PermitId3");
	return aa.cap.createCapIDScriptModel(id1, id2, id3);
}

function getCapIDString() {
	if (capID != null) {
		return capID.getCapID().toString();
	} else {
		return "";
	}
}


function getTemplateValueByForm(templateModel, groupName, fieldName) {

	var asiForms = templateModel.getTemplateForms();
	if (asiForms == null || asiForms.size() == 0) {
		return null;
	}
	var subGroups = asiForms.get(0).getSubgroups();
	for (var groupsIndex = 0; groupsIndex < subGroups.size(); groupsIndex++) {
		var subGroup = subGroups.get(groupsIndex);
		if (groupName == subGroup.getSubgroupName()) {
			var asiFields = subGroup.getFields();
			for (var fieldIndex = 0; fieldIndex < asiFields.size(); fieldIndex++) {
				var field = asiFields.get(fieldIndex);
				if (field.getFieldName() == fieldName) {
					return field.getDefaultValue();
				}
			}
		}
	}
}


function getTemplateValueByTable(templateModel, groupName, fieldName) {

	var asiTables = templateModel.getTemplateTables();
	if (asiTables == null || asiTables.size() == 0) {
		return null;
	}
	var valueArray = new Array();
	for (var asiTableIndex = 0; asiTableIndex < asiTables.size(); asiTableIndex++) {
		var subGroups = asiTables.get(asiTableIndex).getSubgroups();
		for (var groupsIndex = 0; groupsIndex < subGroups.size(); groupsIndex++) {
			var subGroup = subGroups.get(groupsIndex);

			if (groupName == subGroup.getSubgroupName()) {
				var asiRows = subGroup.getRows();
				if (asiRows != null) {
					for (var rowsIndex = 0; rowsIndex < asiRows.size(); rowsIndex++) {
						var row = asiRows.get(rowsIndex);
						var asiValues = row.getValues();

						for (var asiValuesIndex = 0; asiValuesIndex < asiValues.size(); asiValuesIndex++) {
							var asiValue = asiValues.get(asiValuesIndex);
							if (asiValue.getFieldName() == fieldName) {
								valueArray.push(asiValue.getValue());
							}
						}

					}
				}
			}
		}
	}
	return valueArray;
}

function getOutput(result, object) {
	if (result.getSuccess()) {
		return result.getOutput();
	} else {
		logError("ERROR: Failed to get " + object + ": " + result.getErrorMessage());
		return null;
	}
}

function getCapPrimaryContactEmail(capIDModel) {
	var capContactResult = aa.cap.getCapPrimaryContact(capIDModel);
	if (capContactResult.getSuccess()) {
		var capContact = capContactResult.getOutput();
		if (capContact != null && capContact.getPeople() != null && capContact.getPeople().getEmail()) {
			return capContact.getPeople().getEmail();
		}
	}
	return "";
}

function addParameter(pamaremeters, key, value) {
	if (key != null) {
		if (value == null) {
			value = "";
		}

		pamaremeters.put(key, value);
	}
}


var modelForCreate = getOutput(aa.education.getEducationScriptModel());

modelForCreate.setServiceProviderCode("ADDEV");
modelForCreate.setEducationName("Jeffggg");
modelForCreate.setDegree("Doctor");
modelForCreate.setB1PerId1(aa.env.getValue("PermitId1"));
modelForCreate.setB1PerId2(aa.env.getValue("PermitId2"));
modelForCreate.setB1PerId3(aa.env.getValue("PermitId3"));
aa.education.createEducationModel(modelForCreate);


aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "EMSE succeeded!");