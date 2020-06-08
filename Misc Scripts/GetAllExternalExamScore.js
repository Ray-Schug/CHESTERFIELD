var result = aa.examination.getExternalExamScores();

if (result.getSuccess()) {
    var examList = result.getOutput();
    var count = 0;
    if (examList != null && examList.size() > 0) {
        var updateResult = aa.examination.updateExamScore(examList);
        if (updateResult.getSuccess()) {
            count = updateResult.getOutput();
        }
    }
    aa.print(count + " user exam id's score have been updated.");
} else {
    aa.print("Get external examination score failed.");
}