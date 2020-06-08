 function getContactObjsByCap(itemCap) // optional typeToLoad, optional return only one instead of Array?
{
	var typesToLoad = false;
	if (arguments.length == 2) typesToLoad = arguments[1];
	var capContactArray = null;
	var cArray = new Array();

	var capContactArray = cap.getContactsGroup().toArray() ;
	
	if (capContactArray) {
		for (var yy in capContactArray)	{
			if (!typesToLoad || exists(capContactArray[yy].getPeople().contactType, typesToLoad)) {
				cArray.push(new contactObj(capContactArray[yy]));
			}
		}
	}
	
	logDebug("getContactObj returned " + cArray.length + " contactObj(s)");
	return cArray;
			
}

