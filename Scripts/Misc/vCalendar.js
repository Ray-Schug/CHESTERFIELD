var t = "BEGIN:VCALENDAR\n";
t = t + "PRODID:-//Microsoft Corporation//Outlook MIMEDIR//EN:\n";
t = t + "VERSION:1.0\n";
t = t + "BEGIN:VEVENT\n";
t = t + "DTSTART:20120514T210000Z\n";
t = t + "DTEND:20120514T230000Z\n";
t = t + "LOCATION:In The Field\n";
t = t + "CATEGORIES:Accela Inspection\n";
t = t + "DESCRIPTION;ENCODING=QUOTED-PRINTABLE:Blah Blah Blah\n";
t = t + "meeting=0D=0A\n";
t = t + "SUMMARY:Accela\n";
t = t + "PRIORITY:3\n";
t = t + "END:VEVENT\n";
t = t + "END:VCALENDAR\n";
var fName = "C:/temp/test.vcs";
wf = aa.util.writeToFile(t ,fName);
var pFromEmail = "donotreply@accela.com";
var pToEmail= "ddejesus@razavi.com";
var pSubject = "TEST";
var pText =  "Test Message"
aa.sendEmail(pFromEmail, pToEmail, "", pSubject, pText, fName);
aa.util.deleteFile(fName);
aa.print("File " + fName + " sent.");