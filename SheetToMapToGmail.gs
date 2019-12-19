// reference: https://codelabs.developers.google.com/codelabs/apps-script-intro/

/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)
function sendMap() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var address = sheet.getRange('A1').getValue();
  var map = Maps.newStaticMap().addMarker(address);
  var emailTo = 'your-email-here@some-test-email.com';
  var emailSubject = 'Map test (created with Google Apps Script)';
  var emailBody =  'A png file should be attached to this email. It should show this address: ' + address;
  GmailApp.sendEmail(emailTo, emailSubject, emailBody, {attachments:[map]});
}
