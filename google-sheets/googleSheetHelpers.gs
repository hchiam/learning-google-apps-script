// see set-get-cell-value.gs for more generic helpers

function writeToCell(range, value) {
  // range can be 'A1'
  SpreadsheetApp.getActiveSpreadsheet().getRange(range).setValue(value);
}

function readCell(range) {
  // range can be 'A1'
  return SpreadsheetApp.getActiveSpreadsheet().getRange(range).getValue();
}
