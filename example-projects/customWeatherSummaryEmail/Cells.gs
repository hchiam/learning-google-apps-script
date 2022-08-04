/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

function setCellValue(cellAddress, value, sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetName
    ? spreadsheet.getSheetByName(sheetName)
    : spreadsheet.getActiveSheet();
  const counterCell = sheet.getRange(cellAddress);
  counterCell.setValue(value);
}

function getCellValue(cellAddress, sheetName, joinChar = "\n") {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetName
    ? spreadsheet.getSheetByName(sheetName)
    : spreadsheet.getActiveSheet();
  const counterCell = sheet.getRange(cellAddress);
  return counterCell
    .getValues()
    .filter((x) => String(x).trim())
    .join(joinChar);
}
