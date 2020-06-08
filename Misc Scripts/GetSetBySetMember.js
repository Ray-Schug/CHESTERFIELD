//getSetBySetMember(): Print out the SetID for SetMember Status.

var search = aa.set.getSetDetailsScriptModel().getOutput();
search.setSetMemberStatus("SetMemberStatus");

var searchResult = aa.set.getSetBySetMember(search);
if (searchResult.getSuccess()) {
	var sr = searchResult.getOutput();
	for (var i = 0; i < sr.size(); i++) {
		aa.print(sr.get(i).getSetID());
	}
}