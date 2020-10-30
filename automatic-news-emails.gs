// TODO:
// 1) install a trigger at https://script.google.com to run sendNews with a "Time-driven" trigger on a "Day timer".
// 2) set target email below:
const emailAdress = "...@gmail.com";

function sendNews() {
  triggerRefresh();
  Utilities.sleep(5000); // otherwise cells might not have finished recalculating
  email(emailAdress, "Automatic News Updates", getNewsText(), getNewsTextAsHtml());
}

function getNewsText() {
  const topStory = getCellValue('A3') + '\n\n' + getCellValue('A4');
  const kwStory = getCellValue('A6') + '\n\n' + getCellValue('A7');
  const techStory = getCellValue('A9') + '\n\n' + getCellValue('A10');
  return topStory + '\n\n' + kwStory + '\n\n' + techStory;
}

function getNewsTextAsHtml() {
  const topStory = `<b>${getCellValue('A3')}</b> <br/><br/>${getCellValue('A4')}`;
  const kwStory = `<b>${getCellValue('A6')}</b> <br/><br/>${getCellValue('A7')}`;
  const techStory = `<b>${getCellValue('A9')}</b> <br/><br/>${getCellValue('A10')}`;
  return topStory + '<br/><br/>' + kwStory + '<br/><br/>' + techStory;
}

function triggerRefresh() {
  const sheetName = "News";
  setCellValue("G3", "", sheetName);
  setCellValue("G6", "", sheetName);
  setCellValue("G9", "", sheetName);
  
  forceRefresh();
  
  setCellValue("G3", "https://www.cbc.ca/cmlink/rss-topstories", sheetName);
  setCellValue("G6", "https://www.cbc.ca/cmlink/rss-canada-kitchenerwaterloo", sheetName);
  setCellValue("G9", "https://www.cbc.ca/cmlink/rss-technology", sheetName);
}

function forceRefresh() {
  SpreadsheetApp.flush();
}

function email(emailTo, emailSubject, emailBody, htmlEmailBody) {
  if (htmlEmailBody) {
    GmailApp.sendEmail(emailTo, emailSubject, emailBody, { htmlBody: htmlEmailBody });
  } else {
    GmailApp.sendEmail(emailTo, emailSubject, emailBody);
  }
}

function alert(message) {
  SpreadsheetApp.getUi().alert(message);
}

function setCellValue(cellAddress, value, sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetName ? spreadsheet.getSheetByName(sheetName) : spreadsheet.getActiveSheet();
  const counterCell = sheet.getRange(cellAddress);
  counterCell.setValue(value);
}

function getCellValue(cellAddress, sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetName ? spreadsheet.getSheetByName(sheetName) : spreadsheet.getActiveSheet();
  const counterCell = sheet.getRange(cellAddress);
  return counterCell.getValue();
}
