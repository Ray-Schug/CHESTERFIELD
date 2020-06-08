aa.print("GetTimeAccountingByWorkflowOrInspection.txt start:");

var id1 = "11CAP";
var id2 = "00000";
var id3 = "000LT";
var cap = aa.cap.getCapID(id1, id2, id3).getOutput();
//get time accounting by cap id and workflow process id and step number
var stepNum = 12;
var processId = 8067;
var entityId = stepNum + ":" + processId;
//It's a fixed value
var entityType = "WORKFLOW";
var timeAccountings = aa.timeAccounting.getTimeLogModelByEntity(cap, entityId, entityType, null, null).getOutput();

if (timeAccountings != null && timeAccountings.size() > 0) {
	aa.print("get by cap id and workflow process id and step number start:");
	for (var i = 0; i < timeAccountings.size(); i++) {
		var timeLogModel = timeAccountings.get(i);
		var timeLogSeq = timeLogModel.getTimeLogSeq();
		aa.print("*****timeLogSeq:" + timeLogSeq);
		var timeTypeSeq = timeLogModel.getTimeTypeSeq();
		aa.print("*****timeTypeSeq:" + timeTypeSeq);
		var timeGroupSeq = timeLogModel.getTimeGroupSeq();
		aa.print("*****timeGroupSeq:" + timeGroupSeq);

		timeTypeModel = timeLogModel.getTimeTypeModel();
		aa.print("*****ResTimeTypeName:" + timeTypeModel.getResTimeTypeName());
		aa.print("*****BillableFlag:" + timeTypeModel.getBillableFlag());
		aa.print("-----------------------------------------------");
	}
	aa.print("get by cap id and workflow process id and step number end");
}

//get time accounting  by cap id and insepction sequence number
// insepction sequence number
var inpsectionSeq = 73290;
//It's a fixed value
var entityType = "INSPECTION";
var timeAccountingsForInsp = aa.timeAccounting.getTimeLogModelByEntity(cap, inpsectionSeq, entityType, null, null).getOutput();

if (timeAccountingsForInsp != null && timeAccountingsForInsp.size() > 0) {
	aa.print("get by cap id and inspection sequence number start:");
	for (var i = 0; i < timeAccountingsForInsp.size(); i++) {
		var timeLogModel = timeAccountingsForInsp.get(i);
		var timeLogSeq = timeLogModel.getTimeLogSeq();
		aa.print("*****timeLogSeq:" + timeLogSeq);
		var timeTypeSeq = timeLogModel.getTimeTypeSeq();
		aa.print("*****timeTypeSeq:" + timeTypeSeq);
		var timeGroupSeq = timeLogModel.getTimeGroupSeq();
		aa.print("*****timeGroupSeq:" + timeGroupSeq);
		aa.print("-----------------------------------------------");
	}
	aa.print("get by cap id and inspection sequence number end");
}

//get time accounting  by cap id and time type sequence and(or) time group sequence
var timeTypeSeq = 2;
var timeGroupSeq = 42;

var timeAccountingList = aa.timeAccounting.getTimeLogModelByEntity(cap, null, null, timeTypeSeq, timeGroupSeq).getOutput();

if (timeAccountingList != null && timeAccountingList.size() > 0) {
	aa.print("get by cap id and time type sequence and(or) time group sequence start:");
	for (var i = 0; i < timeAccountingList.size(); i++) {
		var timeLogModel = timeAccountingList.get(i);
		var timeLogSeq = timeLogModel.getTimeLogSeq();
		aa.print("*****timeLogSeq:" + timeLogSeq);
		var timeTypeSeq = timeLogModel.getTimeTypeSeq();
		aa.print("*****timeTypeSeq:" + timeTypeSeq);
		var timeGroupSeq = timeLogModel.getTimeGroupSeq();
		aa.print("*****timeGroupSeq:" + timeGroupSeq);
		aa.print("-----------------------------------------------");
	}
	aa.print("get by cap id and time type sequence and(or) time group sequence end");
}

//get time type sequence by time accounting type name
var timeTypeName = "tType1";
var timeTypeModel = aa.timeAccounting.getTimeTypeByTimeTypeName(timeTypeName).getOutput();
if (timeTypeModel != null) {
	var timeTypeSeq = timeTypeModel.getTimeTypeSeq();
	aa.print("*****timeTypeSeq:" + timeTypeSeq);
	var billableFlag = timeTypeModel.getBillableFlag();
	aa.print("*****billableFlag:" + billableFlag);
	aa.print("-----------------------------------------------");

}

//get time group sequence by time accounting group name
var timeGroupName = "performtest1";
var timeGroupModel = aa.timeAccounting.getTimeGroupByTimeGroupName(timeGroupName).getOutput();
if (timeGroupModel != null) {
	var timeGroupSeq = timeGroupModel.getTimeGroupSeq();
	aa.print("*****timeGroupSeq:" + timeGroupSeq);
	var timeGroupName = timeGroupModel.getTimeGroupName();
	aa.print("*****timeGroupName:" + timeGroupName);
	var timeGroupDesc = timeGroupModel.getTimeGroupDesc();
	aa.print("*****timeGroupDesc:" + timeGroupDesc);
	aa.print("-----------------------------------------------");

}

aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "WorkflowTaskUpdateBefore successful");

aa.print("GetTimeAccountingByWorkflowOrInspection.txt end:");