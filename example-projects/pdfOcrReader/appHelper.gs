function app() {
  // SpreadsheetApp accesses the current Google Sheet.
  // If you use this code in another Google Doc type, you change this return line to another app type:
  return DocumentApp || SpreadsheetApp || SlidesApp || FormApp;
}
