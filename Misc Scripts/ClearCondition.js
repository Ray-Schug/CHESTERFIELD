/*---- User intial parameters ----*/
var documentGroup = "Document Group Name";
var requiredType = aa.util.newArrayList();
requiredType.add("Type 1");
requiredType.add("Type 2");

var cond_type = "Required Documents";
var cond_name = "Required Documents to Pass Plan Review";
/*---- User intial parameters end ----*/

/*---- Inital environment parameters ----*/
var capIDModel = aa.env.getValue("CapID");
var isCapDocument = true;
if (capIDModel == null || capIDModel == "") {
	isCapDocument = false;
}

var capIDString = capIDModel.toString();
var servProvCode = aa.env.getValue("ServiceProviderCode");
var documentModelList = aa.env.getValue("DocumentModelList");
var from = aa.env.getValue("from");
/*---- Inital environment parameters end ----*/

function main() {
	var documentList = aa.document.getDocumentListByEntity(capIDString, "CAP").getOutput();

	if ("AMO" == from) {
		documentList.addAll(documentModelList);
	}


	var count = 0;
	if (documentList != null && documentList.size() > 0) {
		for (var i = 0; i < documentList.size(); i++) {
			var documentModel = documentList.get(i);

			if (documentGroup == documentModel.getDocGroup()) {
				var docCategory = documentModel.getDocCategory();
				if (docCategory != null && docCategory != "") {
					for (var j = 0; j < requiredType.size(); j++) {
						if (docCategory.equalsIgnoreCase(requiredType.get(j))) {
							requiredType.set(j, "");
							count = count + 1;
							break;
						}
					}
				}
			}
		}
	}

	if (requiredType.size() == count) {
		clearCapCondition();
	}

}

function clearCapCondition() {
	var stdcondition = aa.capCondition.getStandardConditions(cond_type, cond_name).getOutput();
	var capConditon = aa.capCondition.getCapConditionByStdConditionNum(capIDModel, stdcondition[0].getConditionNbr().toString()).getOutput();

	capConditon[0].setConditionStatus("Removed");
	capConditon[0].setConditionStatusType("Not Applied");
	capConditon[0].setImpactCode("");

	var result = aa.capCondition.editCapCondition(capConditon[0]);
}

aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "successful");
if (isCapDocument) {
	main();
}