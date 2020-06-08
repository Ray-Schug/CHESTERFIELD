/*
 *  This sample is use for showing how to use emse to do batch result inspection by parsing csv file.
 *  It get all document uploaded by one License Professional in current date, and then parse these files.
 *
 *  Script Name:ResultInspectionEMSEScriptTest
 */

// If the license id is '1178841';
var licenseId = 1178841;
// Use licenseId as entityID and entityType is 'LICENSEPROFESSIONAL'
var entityID = licenseId;
var entityType = "LICENSEPROFESSIONAL";
// Get all document associatet with the licnesed '1178841'
var result = aa.document.getDocumentListByEntity(entityID, entityType);
var documentList = result.getOutput();
// Get all document list uploaded in current date.
var currentDateDocList = filterCurrentDateDocument(documentList);

// Result inspection by document list.
resultInspectionByDocs(currentDateDocList);

// Get current date document.
function filterCurrentDateDocument(documentList) {
	var list = aa.util.newArrayList();
	for (var i = 0; i < documentList.size(); i++) {
		var doc = documentList.get(i);
		var uploadDate = doc.getFileUpLoadDate();
		var dateStr = aa.util.formatDate(uploadDate, "yyyy-MM-dd");
		var currentDate = aa.util.now();
		var currentDateStr = aa.util.formatDate(currentDate, "yyyy-MM-dd");

		if (dateStr == currentDateStr) {
			list.add(doc);
		}
	}
	return list;
}

function resultInspectionByDocs(documentList) {
	for (var i = 0; i < documentList.size(); i++) {
		var document = documentList.get(i);
		var docName = document.getFileName();
		if (docName.lastIndexOf(".csv") == -1) {
			continue;
		}
		var docID = document.getDocumentNo();
		var result = aa.inspection.batchResultInspByCSV(docID);
		if (result.getSuccess()) {
			var batchResult = result.getOutput();
			var returnCode = batchResult.getReturnCode();
			// returnCode include 'FILE_ERR','HEADER_ERR','COLUMN_ERR','UPLOAD_LOG_FAIL','OTHER_ERR','SUCCESS'
			if (returnCode.toString().equals("SUCCESS")) {
				var logDocument = batchResult.getLogDocument();
				var logFileName = logDocument.getFileName();
				aa.print(document.getFileName() + " have been processed completely, please see the log file:" + logFileName);
			} else {
				aa.print("Fail to proccess " + document.getFileName() + ", please see the prompt: " + batchResult.getReturnMsg());
			}

		} else {
			aa.print(document.getFileName() + " processed fail");
		}
	}
}