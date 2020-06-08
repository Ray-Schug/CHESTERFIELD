var parcel = "";
var addressStart = "";
var addressEnd = "";
var direction = "";
var streetName = "";
var suffix = "";
var unitStart = "";
var unitEnd = "";
var city = "";
var ownerName = "";

// Below are the new fields.
var houseNumberAlphaStart = "";
var houseNumberAlphaEnd = "";
var levelPrefix = "";
var levelNumberStart = "";
var levelNumberEnd = "";


var parcelInfoModelResult = aa.parcel.getParceListForAdmin(parcel, addressStart, addressEnd, direction,
	streetName, suffix, unitStart, unitEnd, city, ownerName,
	houseNumberAlphaStart, houseNumberAlphaEnd, levelPrefix, levelNumberStart, levelNumberEnd);

if (parcelInfoModelResult.getSuccess()) {
	var parcelInfoModelList = parcelInfoModelResult.getOutput();
	if (parcelInfoModelList != null) {
		for (var i = 0; i < parcelInfoModelList.length; i++) {
			var parcelInfoModel = parcelInfoModelList[i];
			aa.print("-------------------------------------------------------");
			aa.print("Parcel #: " + parcelInfoModel.getParcelModel().getParcelNumber());
			aa.print("Street # (start): " + parcelInfoModel.getRAddressModel().getHouseNumberStart());
			aa.print("House # Alpha (start): " + parcelInfoModel.getRAddressModel().getHouseNumberAlphaStart());
			aa.print("House # Alpha (end): " + parcelInfoModel.getRAddressModel().getHouseNumberAlphaEnd());
			aa.print("Level Prefix: " + parcelInfoModel.getRAddressModel().getLevelPrefix());
			aa.print("Level # (start): " + parcelInfoModel.getRAddressModel().getLevelNumberStart());
			aa.print("Level # (end): " + parcelInfoModel.getRAddressModel().getLevelNumberEnd());
			aa.print("");
		}
	} else {
		aa.print("There is no parcel info.");
	}
} else {
	aa.print("Failed to get the parcel info.");
}