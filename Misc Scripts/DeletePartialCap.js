var id1 = '14EST';
var id2 = '00000';
var id3 = '02472';

var capIDModel = aa.cap.getCapIDModel(id1, id2, id3).getOutput();

var result = aa.cap.deletePartialCAP(capIDModel);

if (result.getSuccess()) {
	aa.print(" Delete Success");

	aa.print("---------------------------------------------------------");
} else {
	aa.print(result.getErrorMessage());
}