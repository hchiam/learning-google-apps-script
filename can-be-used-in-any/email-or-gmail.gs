/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

function email(emailTo, emailSubject, emailBody, htmlEmailBody) {
  if (htmlEmailBody) {
    GmailApp.sendEmail(emailTo, emailSubject, emailBody, {
      htmlBody: htmlEmailBody,
    });
  } else {
    GmailApp.sendEmail(emailTo, emailSubject, emailBody);
  }
}

function getUserEmail() {
  return (
    Session.getActiveUser().getEmail() ||
    PropertiesService.getUserProperties().getProperty("userEmail") ||
    Session.getEffectiveUser().getEmail()
  );
}
