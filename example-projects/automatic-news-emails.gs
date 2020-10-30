/*
TODO:

1) Create a Google Sheet, and change the name of one of the sheets to "News" (without quotation marks).

2) Add this script (see README.md for steps on how to do this).

2) Install a trigger (associated with this Sheet/Script project) at https://script.google.com to run sendNews with a "Time-driven" trigger on a "Day timer".

3) In sheet "News", put these formulas into cells G3, G4, G6, G7, G9, G10:
=IMPORTXML("https://www.cbc.ca/cmlink/rss-topstories","//item[1]/title")
=IMPORTXML("https://www.cbc.ca/cmlink/rss-topstories","//item[1]/description")
=IMPORTXML("https://www.cbc.ca/cmlink/rss-canada-kitchenerwaterloo","//item[1]/title")
=IMPORTXML("https://www.cbc.ca/cmlink/rss-canada-kitchenerwaterloo","//item[1]/description")
=IMPORTXML("https://www.cbc.ca/cmlink/rss-technology","//item[1]/title")
=IMPORTXML("https://www.cbc.ca/cmlink/rss-technology","//item[1]/description")

4) In sheet "News", put these formulas into cells A3, A4, A6, A7, A9, A10:
=IMPORTXML(G3,"//item[1]/title")
=IMPORTXML(G4,"//item[1]/description")
=IMPORTXML(G6,"//item[1]/title")
=IMPORTXML(G7,"//item[1]/description")
=IMPORTXML(G9,"//item[1]/title")
=IMPORTXML(G10,"//item[1]/description")

5) set the target email below:
*/
const emailAdress = "...@gmail.com"; // (make sure it's an email you're allowed to send to)

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
