/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

function app() {
  // SpreadsheetApp accesses the current Google Sheet.
  // If you use this code in another Google Doc type, you change this return line to another app type:
  return SpreadsheetApp || DocumentApp || SlidesApp || FormApp;
}

function alert(message) {
  app().getUi().alert(message);
}

function setCellValue(cellAddress, value, sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetName
    ? spreadsheet.getSheetByName(sheetName)
    : spreadsheet.getActiveSheet();
  const counterCell = sheet.getRange(cellAddress);
  counterCell.setValue(value);
}

function getCellValue(cellAddress, sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetName
    ? spreadsheet.getSheetByName(sheetName)
    : spreadsheet.getActiveSheet();
  const counterCell = sheet.getRange(cellAddress);
  return counterCell.getValue();
}

/*
  Example usage of weaklyRestoreCellValueOnEdit:
  function onEdit(e) {
    weaklyRestoreCellValueOnEdit(e, {
      left: 1, // A1
      top: 1,
      right: 2, // B1
      bottom: 1,
    });
  }
*/
function weaklyRestoreCellValueOnEdit(
  eFromOnEdit,
  protectedRange = {
    left: 1, // A1
    top: 1,
    right: 2, // B1
    bottom: 1,
  },
  sheetName
) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetName
    ? spreadsheet.getSheetByName(sheetName)
    : spreadsheet.getActiveSheet();
  const activeCell = sheet.getActiveCell();
  const row = activeCell.getRow();
  const col = activeCell.getColumn();
  const inProtectedRange =
    (!protectedRange.top || row >= protectedRange.top) &&
    (!protectedRange.bottom || row <= protectedRange.bottom) &&
    (!protectedRange.left || col >= protectedRange.left) &&
    (!protectedRange.right || col <= protectedRange.right);
  const onProtectedSheet =
    !sheetName || sheetName === spreadsheet.getActiveSheet().getSheetName();
  if (inProtectedRange && onProtectedSheet) {
    activeCell.setValue(eFromOnEdit.oldValue);
  }
}
