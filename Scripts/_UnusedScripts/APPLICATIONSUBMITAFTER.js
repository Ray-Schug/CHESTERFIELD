aa.print("ApplicationSubmitAfter debug");
aa.print("Submit Application Begin:");

aa.print("--------------Cap ID--------------");
aa.print(aa.env.getValue("PermitId1") + "-" + aa.env.getValue("PermitId2") + "-" + aa.env.getValue("PermitId3"));
aa.print("--------------Cap ID--------------");

var applicantContactAddressModelList = aa.env.getValue("ApplicantContactAddressModelList");

aa.print("--------------Applicant Contact Address Model List--------------");
printContactAddressModelList(applicantContactAddressModelList)
aa.print("--------------Applicant Contact Address Model List--------------");

var contactList = aa.env.getValue("ContactList");

if (contactList != "" && contactList != null)
{
	aa.people.editContactByCapContacts(contactList); // Edit contact by cap contact, will be synchronized daily and reference contact data.
	aa.people.newContactByCapContacts(contactList); // New contact by cap contact, will be synchronized daily and reference contact data.

	for (var j = 0; j < contactList.size(); j++)
	{
		var capContactModel = contactList.get(j);
		var contactModel = capContactModel.getPeople();
		var compactAddress = contactModel.getCompactAddress();
		var attributes = contactModel.getAttributes();
		
		aa.print("--------------Contact Field " + (j + 1) + " --------------");
		aa.print("RefContactNumber = " + capContactModel.getRefContactNumber());
		aa.print("LastName = " + contactModel.getLastName());
		aa.print("FirstName = " + contactModel.getFirstName());
		aa.print("ContactType = " + contactModel.getContactType());
		aa.print("Phone1 = " + contactModel.getPhone1());
		aa.print("Email = " + contactModel.getEmail());
		aa.print("Phone2 = " + contactModel.getPhone2());
		aa.print("AddressLine1 = " + compactAddress.getAddressLine1());
		aa.print("AddressLine2 = " + compactAddress.getAddressLine2());
		aa.print("AddressLine3 = " + compactAddress.getAddressLine3());
		aa.print("City = " + compactAddress.getCity());
		aa.print("State = " + compactAddress.getState());
		aa.print("Zip = " + compactAddress.getZip());
		aa.print("Comment = " + contactModel.getComment());
		aa.print("BusinessName = " + contactModel.getBusinessName());
		aa.print("MiddleName = " + contactModel.getMiddleName());
		aa.print("Fax = " + contactModel.getFax());
		aa.print("Relation = " + contactModel.getRelation());
		aa.print("FullName = " + contactModel.getFullName());
		aa.print("CountryCode = " + compactAddress.getCountryCode());
		aa.print("ContactSeqNumber = " + contactModel.getContactSeqNumber());
		aa.print("AuditStatus = " + contactModel.getAuditStatus());
		aa.print("PreferredChannel = " + contactModel.getPreferredChannel());
		aa.print("Phone3 = " + contactModel.getPhone3());
		aa.print("Salutation = " + contactModel.getSalutation());
		aa.print("Gender = " + contactModel.getGender());
		aa.print("PostOfficeBox = " + contactModel.getPostOfficeBox());
		aa.print("BirthDate = " + contactModel.getBirthDate());
		aa.print("SocialSecurityNumber = " + contactModel.getMaskedSsn());
		aa.print("Fein = " + contactModel.getFein());
		aa.print("TradeName = " + contactModel.getTradeName());
		aa.print("Title = " + contactModel.getTitle());
		aa.print("Namesuffix = " + contactModel.getNamesuffix());
		
		aa.print("--------------Contact Attribute--------------");
		
		if (attributes != "" && attributes != null)
		{
			var attribute;
		
			for (var i = 0; i < attributes.size(); i++)
			{
				attribute = attributes.get(i);
				aa.print(attribute.getAttributeName() + " = " + attribute.getAttributeValue());
			}
		}
		
		printContactAddressModelList(contactModel.getContactAddressList())
		
		aa.print("--------------Contact Field " + (j + 1) + " --------------");
	}
}

function printContactAddressModelList(contactAddressModelList)
{
	if (contactAddressModelList != "" && contactAddressModelList != null)
	{
		for (var i = 0; i < contactAddressModelList.size(); i++)
		{
			var contactAddressModel = contactAddressModelList.get(i);
			
			if (contactAddressModel != "" && contactAddressModel != null)
			{
				aa.print("--------------Submit Contact Address " + (i + 1) + " Field--------------");
				var contactAddressPKModel = contactAddressModel.getContactAddressPK();
				var auditModel = contactAddressModel.getAuditModel();
				
				if (contactAddressPKModel != "" && contactAddressPKModel != null)
				{
					aa.print("ServiceProviderCode = " + contactAddressPKModel.getServiceProviderCode());
					aa.print("AddressID = " + contactAddressPKModel.getAddressID());
				}
				
				aa.print("EntityType = " + contactAddressModel.getEntityType());
				aa.print("EntityID = " + contactAddressModel.getEntityID());
				aa.print("AddressType = " + contactAddressModel.getAddressType());
				aa.print("EffectiveDate = " + contactAddressModel.getEffectiveDate());
				aa.print("ExpirationDate = " + contactAddressModel.getExpirationDate());
				aa.print("Recipient = " + contactAddressModel.getRecipient());
				aa.print("FullAddress = " + contactAddressModel.getFullAddress());
				aa.print("AddressLine1 = " + contactAddressModel.getAddressLine1());
				aa.print("AddressLine2 = " + contactAddressModel.getAddressLine2());
				aa.print("AddressLine3 = " + contactAddressModel.getAddressLine3());
				aa.print("HouseNumberStart = " + contactAddressModel.getHouseNumberStart());
				aa.print("HouseNumberEnd = " + contactAddressModel.getHouseNumberEnd());
				aa.print("StreetDirection = " + contactAddressModel.getStreetDirection());
				aa.print("StreetPrefix = " + contactAddressModel.getStreetPrefix());
				aa.print("StreetName = " + contactAddressModel.getStreetName());
				aa.print("StreetSuffix = " + contactAddressModel.getStreetSuffix());
				aa.print("UnitType = " + contactAddressModel.getUnitType());
				aa.print("UnitStart = " + contactAddressModel.getUnitStart());
				aa.print("UnitEnd = " + contactAddressModel.getUnitEnd());
				aa.print("StreetSuffixDirection = " + contactAddressModel.getStreetSuffixDirection());
				aa.print("CountryCode = " + contactAddressModel.getCountryCode());
				aa.print("City = " + contactAddressModel.getCity());
				aa.print("State = " + contactAddressModel.getState());
				aa.print("Zip = " + contactAddressModel.getZip());
				aa.print("Phone = " + contactAddressModel.getPhone());
				aa.print("PhoneCountryCode = " + contactAddressModel.getPhoneCountryCode());
				aa.print("Fax = " + contactAddressModel.getFax());
				aa.print("FaxCountryCode = " + contactAddressModel.getFaxCountryCode());
				
				if (auditModel != "" && auditModel != null)
				{
					aa.print("AuditID = " + auditModel.getAuditID());
					aa.print("AuditStatus = " + auditModel.getAuditStatus());
					aa.print("AuditDate = " + auditModel.getAuditDate());
				}
			}
			
			aa.print("--------------Submit Contact Address " + (i + 1) + " Field--------------");
		}
	}
}

aa.print("Submit Contact End:");
aa.env.setValue("ScriptReturnCode","0");
aa.env.setValue("ScriptReturnMessage", "Submit Contact successful");


//added extra

function testParameter()
{
var br = "<BR>";
var debug = "";

x = aa.env.getParamValues()

keys = x.keys();

while ( keys.hasMoreElements() )
   {
   key = keys.nextElement();
   val1 = x.get(key);
   
   aa.print(key + " = " + val1);
   } 
}