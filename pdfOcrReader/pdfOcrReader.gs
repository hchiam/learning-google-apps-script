// modern ES6 syntax is available (as of Feb 2020): https://developers.google.com/apps-script/guides/v8-runtime

function onOpen() {
  addMenuItemToUi();
}

function addMenuItemToUi() {
  app()
  .getUi()
  .createMenu('PDF OCR Reader')
  .addItem('Read PDF', 'askUserForUrl') // 2nd parameter 'askUserForUrl' matches askUserForUrl()
  .addItem('Loop Over 12 PDF URLs (A1-A12)', 'loopOver12InputCells')
  .addToUi();
}

function askUserForUrl() {
  inputBox(title='PDF OCR Reader',
           prompt='Enter the PDF URL:',
           callbackAcceptingInput=doWhatYouWantWithPdfText);
}

function doWhatYouWantWithPdfText(pdfUrl) {
  const pdfText = extractTextFromPdfUrl(pdfUrl);
  
  // further processing of 1 PDF text:
  processOnePdfText(pdfText, startOutputCellRange='F1');
}

function extractTextFromPdfUrl(pdfUrl) {
  const blob = getPdfBlobDirectlyOrFromGoogleDocUrl(pdfUrl);
  const resource = getResourceFromBlob(blob);
  const processedDoc = createAndGetOcrProcessedDoc(resource, blob, 'en');
  const pdfText = processedDoc.getBody().getText();
  return pdfText;
}

function getPdfBlobDirectlyOrFromGoogleDocUrl(pdfUrl) {
  let blob = null;
  
  if (pdfUrl.endsWith('.pdf')) {
    blob = UrlFetchApp.fetch(pdfUrl).getBlob();
    return blob;
  }
  
  const googleDocIdRegex = /^https:\/\/drive.google.com\/.+?id=([^\/]+)\/?.*$/i;
  const googleDocId = googleDocIdRegex.exec(pdfUrl)[1];
  if (googleDocId) {
    blob = DriveApp.getFileById(googleDocId).getBlob();
  }
  
  return blob;
}

function getResourceFromBlob(blob) {
  const resource = {
    title: blob.getName(),
    mimeType: blob.getContentType(),
  };
  return resource;
}

function createAndGetOcrProcessedDoc(resource, blob, languageCode='en') {
  try {
    const file = Drive.Files.insert(resource, blob, {ocr: true, ocrLanguage: languageCode});
    const procesedDoc = DocumentApp.openById(file.id);
    return procesedDoc;
  } catch(e) {
    console.error(e);
    alert('Whoops! You likely need enable the Advanced Drive API Service: \n\n Resources > Advanced Google Services > Drive API: "ON"');
  }
}

function loopOver12InputCells() {
  const inputColumn = 'A';
  const outputColumn = 'F';
  let outputRow = 1;
  const numberOfOutputRowsPerInput = getNumberOfOutputRowsPerInput();
  for (let inputRow = 1; inputRow < 13; inputRow++) {
    const pdfUrl = getPdfUrl(inputColumn + inputRow);
    if (!pdfUrl) continue;
    const pdfText = extractTextFromPdfUrl(pdfUrl);
    const outputStartCellRange = outputColumn + outputRow;
    const precedingDividerText = '-------' + inputRow + '-------';
    processOnePdfText(pdfText, outputStartCellRange, precedingDividerText);
    outputRow += numberOfOutputRowsPerInput;
  }
}

function getPdfUrl(singleCellRange) {
  const pdfUrl = readCell(singleCellRange);
  return pdfUrl;
}
