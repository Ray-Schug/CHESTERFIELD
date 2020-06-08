/**
 * <pre>
 * 
 *  Accela Automation
 *  File: DocumentUploadFailAfter.js
 * 
 *  Accela, Inc.
 *  Copyright (C): 2014
 * 
 *  Description:
 *  You can use this script in batch job to reupload the failure documents.
 * 
 *  Notes:
 * 	Id: DocumentUploadFailAfter.js 72642 2009-01-01 20:01:57Z ACHIEVO\andy.chen $ 
 * 
 *  Revision History
 *  <Date>,			<Who>,			<What>
 *  Cot 31 2014 		Andy Chen		Initial.
 * </pre>
 */
var documentID = aa.env.getValue("documentID");
var documentName = aa.env.getValue("documentName");
var capID = aa.env.getValue("capID");
var customerID = aa.env.getValue("customerID");
var userEmail = aa.env.getValue("userEmail");
var firstName = aa.env.getValue("firstName");
var lastName = aa.env.getValue("lastName");
var subject = 'Document upload fail remander';
var content = 'Hi ' + userEmail + ',Record Number:' + customerID + ', Upload document(' + documentName + ') fail.';
aa.messageService.sendAnnouncement(userEmail, subject, content);
//send email
//aa.sendMail(FROM, TO, CC, SUBJECT, CONTENT);