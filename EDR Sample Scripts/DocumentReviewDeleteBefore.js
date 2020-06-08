aa.print("DocumentReviewDeleteBefore Start");
var entityAssociationModels = aa.env.getValue("DocumentReviewModels");
if(entityAssociationModels != null)
{
	aa.print("DocumentEntityAssociationModels Length is:"+entityAssociationModels.size());
	var it = entityAssociationModels.iterator();
	while(it.hasNext())
	{
		var model = it.next();
		aa.print("ID			=:" + model.getResID());
		aa.print("Document ID		=:" + model.getDocumentID());
		aa.print("Entity Type		=:" + model.getEntityType());
		aa.print("Entity ID		=:" + model.getEntityID());
		aa.print("User ID		=:" + model.getEntityID1());
		aa.print("Process ID		=:" + model.getEntityID2());
		aa.print("Step Number		=:" + model.getEntityID3());
		aa.print("Assign Pages		=:" + model.getTaskReviewPages());
		aa.print("Assign Comments	=:" + model.getTaskReviewComments());
	 }	 
}
else
{
	  aa.print("ERROR: Cannot find the parameter 'DocumentReviewModels'.");
}

aa.env.setValue("ScriptReturnCode","0");
aa.env.setValue("ScriptReturnMessage", "DocumentReviewDeleteBefore  End");
