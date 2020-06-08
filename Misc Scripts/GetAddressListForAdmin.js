var parcel = "";
var ownerName = "";
var streetStart = "";
var streetEnd = "";
var streetDirection = "";
var streetName = "";
var streetSuffix = "";
var unitStart = "";
var unitEnd = "";
var city = "";
var state = "";
var zipCode = "";
var county = "";
var country = "";

// Below are the new fields.
var houseNumberAlphaStart = "";
var houseNumberAlphaEnd = "";
var levelPrefix = "";
var levelNumberStart = "";
var levelNumberEnd = "";


var refAddressValidateModelResult = aa.address.getAddressListForAdmin(parcel, ownerName, streetStart, streetEnd, streetDirection, streetName,
	streetSuffix, unitStart, unitEnd, city, state, zipCode, county, country, houseNumberAlphaStart, houseNumberAlphaEnd,
	levelPrefix, levelNumberStart, levelNumberEnd);

if (refAddressValidateModelResult.getSuccess()) {
	var refAddressValidateModelList = refAddressValidateModelResult.getOutput();
	if (refAddressValidateModelList != null) {
		for (var i = 0; i < refAddressValidateModelList.length; i++) {
			var refAddressValidateModel = refAddressValidateModelList[i];
			aa.print("-------------------------------------------------------");
			aa.print("Street # (start): " + refAddressValidateModel.getRefAddressModel().getHouseNumberStart());
			aa.print("House # Alpha (start): " + refAddressValidateModel.getRefAddressModel().getHouseNumberAlphaStart());
			aa.print("House # Alpha (end): " + refAddressValidateModel.getRefAddressModel().getHouseNumberAlphaEnd());
			aa.print("Level Prefix: " + refAddressValidateModel.getRefAddressModel().getLevelPrefix());
			aa.print("Level # (start): " + refAddressValidateModel.getRefAddressModel().getLevelNumberStart());
			aa.print("Level # (end): " + refAddressValidateModel.getRefAddressModel().getLevelNumberEnd());
			aa.print("");
		}
	} else {
		aa.print("There is no parcel info.");
	}
} else {
	aa.print("Failed to get the address!");
}