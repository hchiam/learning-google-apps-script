/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

// reference: https://developers.google.com/apps-script/overview

/**
 * Creates a Google Doc and sends an email to the current user with a link to the doc.
 */
function createAndSendDocument() {
  var newDoc = DocumentApp.create(
    "Hello, world! (created by Google Apps Script)"
  );
  newDoc
    .getBody()
    .appendParagraph("This document was created by Google Apps Script.");
  var docUrl = newDoc.getUrl();
  var userEmail = Session.getActiveUser().getEmail();
  var docName = newDoc.getName();
  var emailBody = "Link to your doc: " + docUrl;
  var emailTitle = docName;
  GmailApp.sendEmail(userEmail, emailTitle, emailBody);
}
