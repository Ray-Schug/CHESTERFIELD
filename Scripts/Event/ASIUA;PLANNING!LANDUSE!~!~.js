/*
Title : Total Parcel Acreage Sum
Purpose : aggregate value of ASIT column,and update ASI
Author: Yazan Barghouth
Functional Area : ASIUA
Description : Script will Sum values of column "Revised Acreage" in all rows in table CC-LU-TPA "Total Parcel Acreage"
and set the sum into ASI "CC-LU-TPA-SUM.Total application acreage" 
 */

useAppSpecificGroupName = true;
var sum = 0;

var tempAsit = loadASITable("CC-LU-TPA");
if (tempAsit) {

	for (a in tempAsit) {
		if (!isNaN(tempAsit[a]["Revised acreage"])) {
			sum += parseInt(tempAsit[a]["Revised acreage"]);
		}
	}//for all rows

	editAppSpecific("CC-LU-TPA-SUM.Total application acreage", sum);
}//asiTable