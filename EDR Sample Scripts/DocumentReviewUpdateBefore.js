aa.print("DocumentReviewUpdateBefore Start");
var model = aa.env.getValue("DocumentReviewModel");
if(model != null)
{
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
else
{
	  aa.print("ERROR: Cannot find the parameter 'DocumentReviewModel'.");
}

aa.env.setValue("ScriptReturnCode","0");
aa.env.setValue("ScriptReturnMessage", "DocumentReviewUpdateBefore End");
