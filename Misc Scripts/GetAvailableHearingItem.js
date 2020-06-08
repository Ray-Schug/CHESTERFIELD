var hearingBody = null;
var duration = 0;
var calendarName = null;
var dateFrom = aa.date.parseDate('04/01/2012');
var dateTo = aa.date.parseDate('05/01/2013');
var dayOfWeek = null; // 0~6
var location = null;
var result = aa.calendar.getAvailableHearingItem(hearingBody, duration,
  calendarName, dateFrom, dateTo, dayOfWeek, location)
if (result.getSuccess()) {

  var hearingItems = result.getOutput();
  aa.print("Items length:" + hearingItems.length);
  for (var i = 0; i < hearingItems.length; i++) {
    var hearingItem = hearingItems[i];
    aa.print(hearingItem.startDate);
    aa.print(hearingItem.eventType);
    aa.print(hearingItem.dispEventName);
    aa.print(hearingItem.startTime);
    aa.print(hearingItem.endTime);
    aa.print(hearingItem.dispHearingBody);
    aa.print(hearingItem.eventLocation);
    aa.print(hearingItem.maxUnits);
    aa.print(hearingItem.eventNoticeDate);
    aa.print(hearingItem.isVote);
    aa.print(hearingItem.eventStatus);
    aa.print(hearingItem.comment);
    aa.print(hearingItem.emailNotification);
  }
} else {
  aa.print("failure");
}

aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "AFter successful");