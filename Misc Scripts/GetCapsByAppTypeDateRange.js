capModel = aa.cap.getCapModel().getOutput();

//toDate = aa.date.getCurrentDate();

Expiratedfrom = "12/21/2010";
fromDate = new java.util.Date(Expiratedfrom);

Expiratedto = "12/23/2012";
toDate = new java.util.Date(Expiratedto);

var getResult = aa.cap.getCapsByAppTypeDateRange(capModel, fromDate, toDate);

if (getResult.getSuccess()) {
	aa.print("Success");
	aa.print(getResult.getOutput());
} else {
	aa.print("Fail");
}