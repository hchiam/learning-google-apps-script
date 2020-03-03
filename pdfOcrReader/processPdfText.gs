function processOnePdfText(pdfText, startOutputCellRange, precedingDividerText='-------') {
  // further processing example:
  const column = startOutputCellRange[0];
  let row = startOutputCellRange.slice(1);
  writeToCell(column + row, precedingDividerText);
  row++;
  writeToCell(column + row, getTitle(pdfText));
  row++;
  writeToCell(column + row, getKeys(pdfText));
  row++;
  writeToCell(column + row, getMv(pdfText));
  row++;
  // make sure to update getNumberOfOutputRowsPerInput
}

function getNumberOfOutputRowsPerInput() {
  // make sure matches number of rows in processOnePdfText(pdfText, startCellRange)
  return 4;
}
