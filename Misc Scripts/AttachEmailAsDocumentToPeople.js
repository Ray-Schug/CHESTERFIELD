var documentList = aa.env.getValue("DocumentModelList");
var templateName = "DOCUMENTUPLOAD";
var from = "Auto_Sender@achievo.com";
var to = "shell.wang@achievo.com";
var cc = "cindy.qin@achievo.com";
var dateFormatStr = "MM/dd/yyyy hh:mm";
var servProvCode = "SACCO";
var entityID = "684521";
var entityID1 = "61046";
var entityType = "LICENSEPROFESSIONAL";
var entityType1 = "REFCONTACT";

if ("AA".equals(aa.env.getValue("From")) && isCorrectFile()) {
        sendMail();
} else {
        aa.print("Do not send mail for this file(s).");
}

function attachEmailToPeople() {
        var currentTime = aa.date.getCurrentDate();
        var year = currentTime.getYear()
        var month = currentTime.getMonth();
        var day = currentTime.getDayOfMonth();
        var hour = currentTime.getHourOfDay();
        var minute = currentTime.getMinute();
        var second = currentTime.getSecond();
        var params = aa.util.newHashtable();
        params.put("$$servProvCode$$", servProvCode);
        params.put("$$uploadTime$$", month + "/" + day + "/" + year + "  " + hour + ":" + minute + ":" + second);
        if (documentList.size() > 0) {
                var documentModel = documentList.get(0);
                params.put("$$documentName$$", "Document Name: " + documentModel.getFileName());
                params.put("$$source$$", "EDMS Source: " + documentModel.getSource());
                params.put("$$description$$", "Description: " + documentModel.getDocDescription());
        }
        aa.document.attachEmailToEntity(from, to, cc, templateName, params, null, entityID1, entityType1);
}

function sendMail() {
        var fileNames = [];
        var result = aa.document.sendEmailByTemplateName(from, to, cc, templateName, getParams(), fileNames);
        if (result.getSuccess()) {
                attachEmailToPeople();
                aa.print("Send mail success.");
        } else {
                aa.print("Send mail failure.");
        }
}

function isCorrectFile() {
        var validateResult = true;
        if (documentList == null) {
                validateResult = false;
        } else {
                for (var i = 0; i < documentList.size(); i++) {
                        if (!entityType.equals(documentList.get(i).getEntityType())) {
                                validateResult = false;
                                break;
                        }
                }
        }
        return validateResult
}

function getProviderModel(providerNbr) {
        var result = aa.licenseScript.getProviderBySeq(providerNbr);
        if (result.getSuccess()) {
                return result.getOutput();
        }
        return null;
}

function getParams() {
        var params = aa.util.newHashtable();
        if (documentList != null) {
                addParameter(params, "$$DocumentName$$", documentList.get(0).getDocName());
                addParameter(params, "$$EntityID$$", documentList.get(0).getEntityID());
                addParameter(params, "$$EntityType$$", documentList.get(0).getEntityType());
                addParameter(params, "$$UploadDate$$", formatDate(documentList.get(0).getFileUpLoadDate(), dateFormatStr));
        }
        return params;
}

function formatDate(date, dateFormat) {
        var dateStr = "";
        if (date != null) {
                dateStr = aa.util.formatDate(date, dateFormat);
        }
        return dateStr;
}

function addParameter(pamaremeters, key, value) {
        if (key != null) {
                if (value == null) {
                        value = "";
                }

                pamaremeters.put(key, value);
        }
}

function getCapIDScriptModel() {
        return aa.cap.createCapIDScriptModel("", "", "");
}

aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "DocumentUploadAfter EMSE Done successful !");