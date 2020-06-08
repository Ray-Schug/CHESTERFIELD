var serviceList = aa.env.getValue("MultiService");

//County Agency Code List
var countyList = ["PETALUMA"];
//City Agency Code List
var cityList = ["TIGARD", "WASHINGTON"];


//1. Get County Service List and City Service List
var countyServiceList = serviceList.clone();
var cityServiceList = serviceList.clone();
countyServiceList.clear();

for (var i = 0; i < serviceList.size(); i++) {
	var service = serviceList.get(i);
	var cityAgencyCode = service.getServPorvCode();

	for (var j = 0; j < countyList.length; j++) {
		var countyAgencyCode = countyList[j];

		if (countyAgencyCode.equalsIgnoreCase(cityAgencyCode)) {
			countyServiceList.add(service);
			cityServiceList.remove(service);
		}
	}
}

//2. Return Service List include city service list and part of county service list
var returnServiceList = cityServiceList.clone();

for (var i = 0; i < cityServiceList.size(); i++) {

	var cityService = cityServiceList.get(i)
	var cityServiceName = cityService.getServiceName() + ""

	for (var j = 0; j < countyServiceList.size(); j++) {
		var countyservice = countyServiceList.get(j);
		var countyServiceName = countyservice.getServiceName() + ""

		// City service replace county service, if they have same service.
		if (cityServiceName.equalsIgnoreCase(countyServiceName)) {
			countyServiceList.remove(countyservice);
		}
	}
}

//add remained county service list
returnServiceList.addAll(countyServiceList);

aa.env.setValue("returnService", returnServiceList);