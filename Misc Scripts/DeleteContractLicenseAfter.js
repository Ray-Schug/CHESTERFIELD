//Description:
//This sample script is used to delete disciplines which are associated with this public user AA after delete a license. 
//Event Name: DeleteContractLicenseAfter
//-----------------------------------------------------------------------------------------------------------

aa.print("-------------------START--------");
var publicUserSeqNum = aa.env.getValue("publicUserSeqNum");
var serviceProviderCode = aa.env.getValue("serviceProviderCode");
var userDisciplineModel = aa.publicUser.getUserDisciplineModel().getOutput();
var existContractLicenseList = aa.contractorLicense.getContrLicListByUserSeqNBR(publicUserSeqNum, serviceProviderCode).getOutput();
var userName = "PUBLICUSER" + publicUserSeqNum;
var licenseTypes = aa.util.newArrayList();

for (var i = 0; i < existContractLicenseList.size(); i++) {
	if (!licenseTypes.contains(existContractLicenseList.get(i).getLicenseType())) {
		licenseTypes.add(existContractLicenseList.get(i).getLicenseType());
	}
}

userDisciplineModel.setServProvCode(serviceProviderCode);
userDisciplineModel.setUserId(userName);
userDisciplineModel.setRecFulNam("PUBLICUSER");
//Get discipline by license type from standard choice.
var publicUserAAAccountDisciplines = aa.publicUser.getPublicUserAAAccountDisciplines(userDisciplineModel).getOutput();
var disciplineList = aa.util.newArrayList();
for (var i = 0; i < licenseTypes.size(); i++) {
	var bizDomain = aa.bizDomain.getBizDomainByValue("DISCIPLINE_OF_LICENSE_TYPE", licenseTypes.get(i)).getOutput();
	var disciplines = bizDomain.getDescription().split(",");
	for (var j = 0; j < disciplines.length; j++) {
		if (!disciplineList.contains(disciplines[j])) {
			disciplineList.add(disciplines[j]);
		}
	}
}

//Delete discipline which are associated with current public user AA.
for (var i = 0; i < publicUserAAAccountDisciplines.size(); i++) {
	if (!disciplineList.contains(publicUserAAAccountDisciplines.get(i))) {
		userDisciplineModel.setDiscipline(publicUserAAAccountDisciplines.get(i))
		aa.publicUser.deletePublicUserAAAccountDiscipline(userDisciplineModel);
	}
}

aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "Delete public user discipline successful.");