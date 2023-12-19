/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

/*
TO USE THIS:

1) Create a Google Sheet, and change the name of one of the sheets to "News" (without quotation marks).

2) Add this script (see README.md for steps on how to do this).

2) Install a trigger (associated with this Sheet/Script project) at https://script.google.com to run sendNews with a "Time-driven" trigger on a "Day timer".

3) In sheet "News", put these formulas into cells G3, G4, G6, G7, G9, G10: (used by triggerRefresh)
=IMPORTXML("https://www.cbc.ca/cmlink/rss-topstories","//item[1]/title")
=IMPORTXML("https://www.cbc.ca/cmlink/rss-topstories","//item[1]/description")
=IMPORTXML("https://www.cbc.ca/cmlink/rss-canada-kitchenerwaterloo","//item[1]/title")
=IMPORTXML("https://www.cbc.ca/cmlink/rss-canada-kitchenerwaterloo","//item[1]/description")
=IMPORTXML("https://www.cbc.ca/cmlink/rss-technology","//item[1]/title")
=IMPORTXML("https://www.cbc.ca/cmlink/rss-technology","//item[1]/description")

4) In sheet "News", put these formulas into cells A3, A4, A6, A7, A9, A10: (used by getNewsText and getNewsTextAsHtml)
=IMPORTXML(G3,"//item[1]/title")
=IMPORTXML(G4,"//item[1]/description")
=IMPORTXML(G6,"//item[1]/title")
=IMPORTXML(G7,"//item[1]/description")
=IMPORTXML(G9,"//item[1]/title")
=IMPORTXML(G10,"//item[1]/description")

5) set the target email below:
*/
const emailAddress = "...@gmail.com"; // (make sure it's an email you're allowed to send to)
const linkToMyGoogleSheet = 'Link to my Google Sheet: https://docs.google.com/spreadsheets/d/.../';

function sendNews() {
  triggerRefresh();
  Utilities.sleep(5000); // otherwise cells might not have finished recalculating
  email(emailAddress, "Automatic News Updates", getNewsText(), getNewsTextAsHtml());
}

function getNewsText() {
  const topStory = getCellValue("A3") + "\n\n" + getCellValue("A4");
  const cityStory = getCellValue("A6") + "\n\n" + getCellValue("A7");
  const techStory = getCellValue("A9") + "\n\n" + getCellValue("A10");
  const chromiumStory = getCellValue("A11") + "\n\n" + getCellValue("A12");
  return topStory + 
    "\n\n" + cityStory + 
    "\n\n" + techStory + 
    "\n\n" + chromiumStory + 
    "\n\n\n\n" + linkToMyGoogleSheet;
}

function getNewsTextAsHtml() {
  const topStory = `<b>${getCellValue("A3")}</b> <br/><br/>${getCellValue("A4")}`;
  const cityStory = `<b>${getCellValue("A6")}</b> <br/><br/>${getCellValue("A7")}`;
  const techStory = `<b>${getCellValue("A9")}</b> <br/><br/>${getCellValue("A10")}`;
  const chromiumStory = `<b>${getCellValue("A11")}</b> <br/><br/>${getCellValue("A12")}`;
  return topStory + 
    "<br/><br/>" + cityStory + 
    "<br/><br/>" + techStory + 
    "<br/><br/>" + chromiumStory + 
    "<br/><br/><br/><br/>" + linkToMyGoogleSheet;
}

function triggerRefresh() {
  const sheetName = "News";
  setCellValue("G3", "", sheetName);
  setCellValue("G6", "", sheetName);
  setCellValue("G9", "", sheetName);
  setCellValue("G13", "", sheetName);
  setCellValue("G14", "", sheetName);
  
  forceRefresh();
  
  setCellValue("G3", "https://www.cbc.ca/cmlink/rss-topstories", sheetName);
  setCellValue("G6", "https://www.cbc.ca/cmlink/rss-canada-calgary", sheetName);
  setCellValue("G9", "https://www.cbc.ca/cmlink/rss-technology", sheetName);
  setCellValue("G13", "https://blog.chromium.org/", sheetName);
  setCellValue("G14", "https://blog.chromium.org/", sheetName);
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
