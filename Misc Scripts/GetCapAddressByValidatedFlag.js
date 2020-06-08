var flag = "Y";

myResult = aa.address.getCapAddressByValidatedFlag(flag);
if (myResult.getSuccess()) {
	addressArray = myResult.getOutput();
	aa.print("Success");
	for (var i = 0; i < addressArray.length; i++) {
		aa.print("address seq[" + i + "]: " + addressArray[i].getAddressId());
		aa.print("CAP[" + i + "] : " + addressArray[i].getCapID().toString());
	}
} else {
	aa.print("Get Record address by validated flag failed: " + myResult.getErrorMessage());
}