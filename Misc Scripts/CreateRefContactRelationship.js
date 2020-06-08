var targetNbrArray = new Array();
targetNbrArray[0] = 780;
targetNbrArray[1] = 781;
targetNbrArray[2] = 782;

var arrayList = aa.util.newArrayList();
var xRefContactEntityModel;

for (var i = 0; i < targetNbrArray.length; i++) {
	xRefContactEntityModel = aa.people.getXRefContactEntityModel().getOutput();
	xRefContactEntityModel.setContactSeqNumber(777);
	xRefContactEntityModel.setEntityID1(targetNbrArray[i]);
	xRefContactEntityModel.setEntityID3("employee");
	xRefContactEntityModel.setEntityID4("employer");
	xRefContactEntityModel.setStartDate(new Date("2012/02/03"));
	xRefContactEntityModel.setEndDate(new Date("2012/12/03"));
	arrayList.add(xRefContactEntityModel);
}

var result = aa.people.createRefContactRelationship(arrayList);
if (result.getSuccess()) {
	aa.print("Create reference contact relationship successfully");
	aa.print(result.getOutput());
} else {
	aa.print("Create reference contact relationship failed");
	aa.print(result.getErrorMessage());
}