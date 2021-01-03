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
    row >= protectedRange.top &&
    row <= protectedRange.bottom &&
    col >= protectedRange.left &&
    col <= protectedRange.right;
  if (inProtectedRange) {
    activeCell.setValue(eFromOnEdit.oldValue);
  }
}
