/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

function email(emailTo, emailSubject, emailBody, htmlEmailBody='', bcc='') {
  if (htmlEmailBody) {
    GmailApp.sendEmail(emailTo, emailSubject, emailBody, {
      htmlBody: htmlEmailBody,
      bcc, bcc,
    });
  } else {
    GmailApp.sendEmail(emailTo, emailSubject, emailBody, bcc ?? {bcc:bcc});
  }
}

function getUserEmail() {
  return (
    Session.getActiveUser().getEmail() ||
    PropertiesService.getUserProperties().getProperty("userEmail") ||
    Session.getEffectiveUser().getEmail()
  );
}
