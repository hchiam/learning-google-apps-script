/** you can use this in a google sheet cell formula: =getCurrentSheetName() */
function getCurrentSheetName() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
}
