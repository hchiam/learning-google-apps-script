// TODO:
// 1) install a trigger at https://script.google.com to run both onFormSubmit_sheet "From spreadsheet" and "On edit" (or "On form submit" if the sheet was associated with a form).
//     - make onFormSubmit_sheet call emailAtMostOnceADay
// 2) install a trigger at https://script.google.com to run timeBasedChecks with a "Time-driven" trigger on a "Day timer".
// 3) set the counter cell sheet and address, and also the target email:
const counterCellAddress = "A1"; // <-- edit this!
const lastDateCellAddress = "C1"; // <-- edit this!
const counterCellSheetName = "Counter Sheet"; // <-- edit this!
const targetEmailAddress = "...@gmail.com"; // <-- edit this! (make sure it's an email you're allowed to send to)
const daysForIdleTooLong = 14;

//// This function might not work with your permissions, so you might have to install a trigger instead anyways:
//function onEdit(event) {
//  if (!alreadySentEmailToday()) email();
//}

function emailAtMostOnceADay(data) {
  if (!alreadySentEmailToday()) {
    email(data);
    setLastDateCellValue(new Date());
  }
}

function email(data) {
  const emailTo = targetEmailAddress;
  const emailSubject = "test email";
  const emailBody = `Hi! 

This is an automated message: 

Someone edited the form or Google sheet today! 

${data && data.comment ? "Here's the original comment: \n" + comment : ""}

See the Google sheet here: ...
`;
  GmailApp.sendEmail(emailTo, emailSubject, emailBody);
}

function alreadySentEmailToday() {
  const todaysDateString = getTodaysDate();
  const lastDateString = getLastDateCellValue();
  return todaysDateString === lastDateString;
}

function alreadyIncrementedCountToday() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    counterCellSheetName
  );
  const counterCell = sheet.getRange(counterCellAddress);
  counterCell.setValue(counterCell.getValue() + 1);
  return counterCell.getValue() > 1;
}

function getTodaysDate() {
  return Utilities.formatDate(new Date(), "GMT-4", "dd/MM/yyyy");
}

function getLastDateCellValue() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    counterCellSheetName
  );
  const lastDateCell = sheet.getRange(lastDateCellAddress);
  const cellValue = lastDateCell.getValue();
  if (isValidDate(cellValue)) {
    return Utilities.formatDate(cellValue, "GMT-4", "dd/MM/yyyy");
  }
  return "";
}

function isValidDate(value) {
  const isDateObject =
    Object.prototype.toString.call(value) === "[object Date]";
  if (!isDateObject) return false;
  const canGetTime = !isNaN(value.getTime());
  return canGetTime;
}

function setLastDateCellValue(date) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    counterCellSheetName
  );
  const lastDateCell = sheet.getRange(lastDateCellAddress);
  lastDateCell.setValue(date);
}

// add a trigger to run this once a day:
function timeBasedChecks() {
  resetEmailCount();
  emailAfterIdleTooLong();
}

function resetEmailCount() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    counterCellSheetName
  );
  const counterCell = sheet.getRange(counterCellAddress);
  counterCell.setValue(0);
}

function emailAfterIdleTooLong() {
  if (beenIdleTooLong()) {
    emailIdleTooLong();
  }
}

function beenIdleTooLong() {
  // compare date of month (assumes you're using a "Time-driven" trigger on a "Day timer")
  const dateOfMonthXDaysAgo = new Date(
    new Date().getTime() - daysForIdleTooLong * 24 * 60 * 60 * 1000
  ).getDate();
  const difference = getLastDateCellDate().getDate() - dateOfMonthXDaysAgo;
  const hitThresholdOrReminderInterval = difference % daysForIdleTooLong === 0; // instead of <= (which would be emailing every day)
  return hitThresholdOrReminderInterval;
}

function getLastDateCellDate() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    counterCellSheetName
  );
  const lastDateCell = sheet.getRange(lastDateCellAddress);
  return lastDateCell.getValue();
}

function emailIdleTooLong() {
  const emailTo = targetEmailAddress;
  const emailSubject = `Idle for ${daysForIdleTooLong} days: `;
  const emailBody = `This is an automated message. 

It's been at least ${daysForIdleTooLong} days since someone submitted to the form. 
`;
  GmailApp.sendEmail(emailTo, emailSubject, emailBody);
}
