var recordTypesArray = new Array("Planning/Subdivision/ConstructionPlan", "Planning/Subdivision/Preliminary", "Planning/Subdivision/Overall",
		"Planning/Subdivision/Conceptual Plan", "Planning/Subdivision/ExceptiontoPreliminary", "Planning/siteplan/Major", "Planning/siteplan/Minor",
		"Planning/siteplan/Schematics");

var module = appTypeArray[0];
var type = appTypeArray[1];
var subType = appTypeArray[2];
var itemAppTypeString = module + "/" + type + "/" + subType;
var meetingDuration = 60;
var meetingType = "PLANNING COMMISSION HEARING";
var meetingSubject = "Staff and Developer Meetings";

var Priority = AInfo['Special Consideration'];
//Review Consolidation
var TaskTocheckActive = "Review Consolidation";
//Staff and Developer Meeting"
var tasktobeActive = "Staff and Developer Meeting";

for (var i in recordTypesArray) {
	if (itemAppTypeString.equals(recordTypesArray[i])) {
		if (isTaskActive(TaskTocheckActive) && !isTaskActive(tasktobeActive)) {
			activateTask(tasktobeActive);
			if ((Priority == "Fast Track" || "Expedited") && type == "Commercial") {
				editTaskDueDate(tasktobeActive, getDueDate(3, 3));
				scheduleMeeting(getDueDate(3, 3));
			} else if (Priority == "Regular" && type == "Commercial") {
				editTaskDueDate(tasktobeActive, getDueDate(28, 3));
				scheduleMeeting(getDueDate(28, 3));
			} else if ((Priority == "Fast Track" || "Expedited") && type == "Subdivision") {
				editTaskDueDate(tasktobeActive, getDueDate(3, 4));
				scheduleMeeting(getDueDate(3, 4));
			} else if (Priority == "Regular" && type == "Subdivision") {
				editTaskDueDate(tasktobeActive, getDueDate(28, 4));
				scheduleMeeting(getDueDate(28, 4));
			}

		}
	}

}

/**
 * this function to calculate the due date based on the requirement
 * @param numberofDays the minimum days that pass before the meeting is scheduled
 * @param dayId day id that need to get it Ex. 0 is Sunday and 3 is Wednesday
 * Ex.getDueDate(3,3) this will return date of the next Wednesday after the 3 days from .
 * @returns Due Date
 */
function getDueDate(numberofDays, dayId) {
	var nextDate = new Date();
	nextDate.setDate(nextDate.getDate() + parseInt(numberofDays));
	nextDate.setDate(nextDate.getDate() + (dayId - 1 - nextDate.getDay() + 7) % 7 + 1);
	var dd = nextDate.getDate();
	var mm = nextDate.getMonth() + 1;
	var yy = nextDate.getFullYear();
	var day = nextDate.getDay();
	var formatedDate = mm + '/' + dd + '/' + yy;
	return formatedDate;
}

/**
 * this function to schedule the needed meeting based on the active task
 * @param meetingDate
 */

function scheduleMeeting(meetingDate) {
	var workflowTasks = aa.workflow.getTasks(capId).getOutput();
	var contactList = getContactsListByType("Applicant", capId);
	var list = aa.meeting.getMeetingCalendars().getOutput();
	var meetingIds = aa.meeting.addMeeting(list[0].getMeetingGroupId(), meetingSubject, meetingType, meetingDate).getOutput();
	var scheduleResult = aa.meeting.scheduleMeeting(capId, list[0].getMeetingGroupId(), meetingIds.get(0), meetingDuration, meetingSubject, meetingSubject);
	var MeetingModelList = aa.meeting.getMeetingsByCAP(capId, false).getOutput();
	var MeetingAttendeeList = aa.util.newArrayList();
	var CurrentMeetingModelsList = aa.util.newArrayList();
	for (var i = 0; i < MeetingModelList.size(); i++) {

		if (MeetingModelList.get(i).getMeetingID() == meetingIds.get(0)) {
			CurrentMeetingModelsList.add(MeetingModelList.get(i))
		}
	}

	var taskAuditArray = [];
	for (var i in workflowTasks) {
		var userExists = false;
		if (workflowTasks[i].getCompleteFlag() == "Y" && workflowTasks[i].getTaskDescription().indexOf("Review") != -1 && workflowTasks[i].getTaskDescription() != "Project Manager Review" && workflowTasks[i].getTaskDescription() != "First Glance Review" && workflowTasks[i].getTaskDescription() != "Review Distribution" || (workflowTasks[i].getTaskDescription() == "Environmental Engineering")) {
			for (var ind in taskAuditArray) {
				if (taskAuditArray[ind] == workflowTasks[i].getTaskItem().getAuditID()) {
					userExists = true;
					break;
				}

			}
			if (!userExists) {
				aa.print("userExists " + userExists);
				taskAuditArray.push(workflowTasks[i].getTaskItem().getAuditID());
				var userObject = aa.people.getSysUserByID(workflowTasks[i].getTaskItem().getAuditID()).getOutput();
				var seq = userObject.getGaUserID();
				var fullName = userObject.getFullName();
				var MeetingAttendeeModel = aa.meeting.createMeetingAttendeeModel(meetingIds.get(0), list[0].getMeetingGroupId(), capId, seq, fullName, userObject.getEmail()).getOutput();
				MeetingAttendeeModel.setEntityType(com.accela.aa.meeting.meeting.attendee.AttendeeEntity.User.getEntityType());
				MeetingAttendeeModel.setEntityValue(seq);
				MeetingAttendeeList.add(MeetingAttendeeModel);
			}
		}
	}

	for (var x in contactList) {
		var seq = contactList[x]["contactSeqNumber"];
		var fullName = contactList[x]["firstName"] + " " + contactList[x]["lastName"];
		var MeetingAttendeeModel = aa.meeting.createMeetingAttendeeModel(meetingIds.get(0), list[0].getMeetingGroupId(), capId, seq, fullName, contactList[x]["email"]).getOutput();
		MeetingAttendeeList.add(MeetingAttendeeModel);

	}

	if (MeetingAttendeeList.size() > 0 && CurrentMeetingModelsList.size() > 0) {

		var attendeeBuisnessObject = aa.proxyInvoker.newInstance("com.accela.aa.meeting.meeting.attendee.MeetingAttendeeBusiness").getOutput();
		attendeeBuisnessObject.createAttendees(CurrentMeetingModelsList, MeetingAttendeeList);
	}

}

/**
 * this function is to get the cap contact by type
 * @param ContactType
 * @returns contact array if exists else returns false
 */

function getContactsListByType(ContactType) {
	var contactArray = getPeople(capId);
	var contactsArray = new Array;
	if (contactArray.length > 0) {
		for (var cc = 0; cc < contactArray.length; cc++) {
			if (contactArray[cc].getPeople().contactType == ContactType) {
				var contact = [];
				contact["lastName"] = contactArray[cc].getPeople().lastName;
				contact["firstName"] = contactArray[cc].getPeople().firstName;
				contact["middleName"] = contactArray[cc].getPeople().middleName;
				contact["businessName"] = contactArray[cc].getPeople().businessName;
				contact["contactSeqNumber"] = contactArray[cc].getPeople().contactSeqNumber;
				contact["contactType"] = contactArray[cc].getPeople().contactType;
				contact["relation"] = contactArray[cc].getPeople().relation;
				contact["phone1"] = contactArray[cc].getPeople().phone1;
				contact["phone2"] = contactArray[cc].getPeople().phone2;
				contact["email"] = contactArray[cc].getPeople().email;
				contact["addressLine1"] = contactArray[cc].getPeople().getCompactAddress().getAddressLine1();
				contact["addressLine2"] = contactArray[cc].getPeople().getCompactAddress().getAddressLine2();
				contact["city"] = contactArray[cc].getPeople().getCompactAddress().getCity();
				contact["state"] = contactArray[cc].getPeople().getCompactAddress().getState();
				contact["zip"] = contactArray[cc].getPeople().getCompactAddress().getZip();
				contact["fax"] = contactArray[cc].getPeople().getFax();
				contact["country"] = contactArray[cc].getPeople().getCountryCode();
				contact["fullName"] = contactArray[cc].getPeople().getFullName();
				contact["peopleModel"] = contactArray[cc].getPeople();
				contactsArray.push(contact);
			}
		}
		return contactsArray
	}

	return false;
}

