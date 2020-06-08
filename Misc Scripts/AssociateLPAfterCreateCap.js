/* 
 *  This sample is use for showing how to assign a LP to CAP after create CAP successfully.
 *
 *  Script Name: AssignLPAfterCreateCap
 *  Event Name: ApplicationSubmitAfter
 */
var id1 = aa.env.getValue("PermitId1");
var id2 = aa.env.getValue("PermitId2");
var id3 = aa.env.getValue("PermitId3");

// License Type
var lpType = "Boilermaker";
// Public user type, "SELF_CERTIFIED_INSPECTOR" and "CONTRACT_INSPECTOR" means the public user can be a inspector.
var userType1 = "SELF_CERTIFIED_INSPECTOR";
var userType2 = "CONTRACT_INSPECTOR";

// If userType1 cannot find suitable LP, use userType2 instead
if (assginLPtoCap(id1, id2, id3, lpType, userType1) == 0) {
   assginLPtoCap(id1, id2, id3, lpType, userType2)
}

aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "Corresponding LP is added into Record successfully.");

// Assgin LP to a CAP according the lpType and userType
function assginLPtoCap(id1, id2, id3, lpType, userType) {
   var assginLPNbr = 0;
   var result = aa.cap.getCapIDModel(id1, id2, id3);
   if (result.getSuccess()) {
      var capIDModel = result.getOutput();
      // Get LP according lpType and it associated public user type.
      var result = aa.licenseProfessional.getLicenseByUserTypeAndLicenseType(lpType, userType);
      var lpList = null;
      if (result.getSuccess()) {
         lpList = result.getOutput();
         if (lpList != null && lpList.size() > 0) {
            // Get all address associate with current CAP
            var addressArray = aa.address.getAddressByCapId(capIDModel).getOutput();
            for (var i = 0; i < addressArray.length; i++) {
               var address = addressArray[i];
               // Get all district that associate with address.
               var addrDistrictArray = aa.address.getAssignedAddressDistrictForDaily(id1, id2, id3, address.getAddressId()).getOutput();
               if (addrDistrictArray != null) {
                  for (var j = 0; j < addrDistrictArray.length; j++) {
                     var addrDistrict = addrDistrictArray[j];
                     for (var k = 0; k < lpList.size(); k++) {
                        var lpScriptModel = lpList.get(k);
                        var lp = lpScriptModel.getLicenseProfessionalModel();
                        lp.setCapID(capIDModel);
                        // Check whether this LP is assigned to current CAP, if Yes, don't assign again.
                        var dpLPScript = aa.licenseProfessional.getLicensedProfessionalsByPK(lpScriptModel).getOutput();
                        if (dpLPScript != null && dpLPScript.getLicenseProfessionalModel() != null) {
                           aa.print("LP " + lpScriptModel.getLicenseProfessionalModel().getLicenseNbr() + " with Record " + capIDModel.toString() + " have been assigned.");
                           continue;
                        }
                        // Get public user that associate with this LP
                        var puserList = aa.publicUser.getPublicUserListByLicenseSeqNBR(aa.util.parseLong(lp.getLicSeqNbr())).getOutput();
                        for (var m = 0; m < puserList.size(); m++) {
                           var puser = puserList.get(m);
                           var userDistrictModel = aa.publicUser.getUserDistrictModel().getOutput();
                           userDistrictModel.setUserName("PUBLICUSER" + puser.getUserSeqNum());
                           // Get all district that associate with this public user.
                           var districtList = aa.publicUser.getPublicUserDistrict(userDistrictModel).getOutput();

                           // Check all public user's district, if exist district that equals with current CAP, assign this public user's LP to this CAP.
                           for (var n = 0; n < districtList.size(); n++) {
                              var district = districtList.get(n);
                              if (district.getDistrict().equals(addrDistrict.getDistrict())) {
                                 // assign the LP to current CAP.
                                 result = aa.licenseProfessional.createLicensedProfessional(lpScriptModel);
                                 if (result.getSuccess()) {
                                    assginLPNbr++;
                                    aa.print("Assgin LP " + lpScriptModel.getLicenseProfessionalModel().getLicenseNbr() + " to Record " + capIDModel.toString() + " successfully.");
                                 } else {
                                    aa.print("Assgin LP " + lpScriptModel.getLicenseProfessionalModel().getLicenseNbr() + " to Record " + capIDModel.toString() + " failed.");
                                 }
                                 break;
                              }
                           }
                        }
                     }
                  }
               }

            }
         }
         return assginLPNbr;
      }
   } else {
      aa.print("ERROR: Failed to get capId: " + result.getErrorMessage());
      return assginLPNbr;
   }
}