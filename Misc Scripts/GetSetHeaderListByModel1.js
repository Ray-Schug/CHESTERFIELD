//Sample Script:  Wildcard search Set

var set = aa.set.getSetHeaderScriptModel().getOutput();
//set.setSetID("12-SET-00001");   
//set.setSetID("12-SET");   
set.setSetID("12-S");
//set.setSetTitle("RECORD");
var sets = aa.set.getSetHeaderListByModel(set);
if (sets.getSuccess()) {
	aa.print("Get the Set Successful");
	aa.print("Total " + sets.getOutput().size() + " record(s) found:");
	for (var i = 0; i < sets.getOutput().size(); i++) {
		aa.print(sets.getOutput().get(i).getSetID());
		//aa.print(sets.getOutput().get(i).getSetTitle());

	}

} else {
	aa.print("0 record(s) found.");
}