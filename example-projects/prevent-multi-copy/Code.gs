// Need to have validation range that rejects input with custom formula =countif(G$1:G$8,G1)=1
// Need protected range that only I can edit.
// Need to only allow edits for logged-in users that I've specifically listed.

const previousValuesRange = "H1:H7";
const currentValuesRange = "F1:F7";

function onEdit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const cell = sheet.getActiveCell();
  const origValue = e.oldValue;
  const allUnique = sheet.getRange(8, 7).getValue() === true;
  if (!allUnique) {
    cell.setValue(origValue);
    resetToPreviousValues();
    alert(`You're already assigned to something else!!`);
  } else {
    updatePreviousValues();
  }
}

function resetToPreviousValues() {
  const previousValues = getCellValue(previousValuesRange, "Sheet1");
  setCellValue(currentValuesRange, previousValues, "Sheet1");
}

function updatePreviousValues() {
  const currentValues = getCellValue(currentValuesRange, "Sheet1");
  setCellValue(previousValuesRange, currentValues, "Sheet1");
}

function onSelectionChange(e) {
  preventMultipleSelection(e);
}

function preventMultipleSelection(e) {
  const rowStart = e.range.rowStart;
  const rowEnd = e.range.rowEnd;
  const columnStart = e.range.columnStart;
  const columnEnd = e.range.columnEnd;
  const selectedMultipleRows = rowEnd > rowStart;
  const selectedMultipleColumns = columnEnd > columnStart;
  const selectedMultipleCells = selectedMultipleRows || selectedMultipleColumns;
  if (selectedMultipleCells) {
    var range = SpreadsheetApp.getActiveSheet().getCurrentCell();
    SpreadsheetApp.getActiveSheet().setActiveSelection(range);
  }
}
