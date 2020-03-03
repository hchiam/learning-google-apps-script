# PDF OCR Reader Example

## To try it out:

1) Create a Google Sheet, go to Tools > Script editor, and create a Google Apps Script project (it'll be associated with the Google Sheet).
2) Copy each of the `.gs` files in this folder into your Google Apps Script project. 
3) To do further processing of the PDF text, edit the internals of [`doWhatYouWantWithPdfText(pdfUrl)`](https://github.com/hchiam/learning-google-apps-script/blob/master/pdfOcrReader/pdfOcrReader.gs) or [`processPdfText(pdfText)`](https://github.com/hchiam/learning-google-apps-script/blob/master/pdfOcrReader/processPdfText.gs). For example: using regexes to search/filter, and outputting values to Google Sheet cells.

```text
MAIN "CODE FLOW":

pdfOcrReader.gs: onOpen, addMenuItemToUi, askUserForUrl, loopOver12InputCells, etc.:
  -> appHelper.gs: app
  -> userMessagingHelpers.gs: inputBox, alert
  -> googleSheetHelpers.gs: readCell
  -> processPdfText.gs: getNumberOfOutputRowsPerInput, processOnePdfText:
       -> processLessonPlan.gs: getTitle, getKeys
       -> googleSheetHelpers.gs: writeToCell
```

## Usage in other Google Doc types:

If you **_don't_** want to run the code from a Google _Sheet_, then edit the [`app()`](https://github.com/hchiam/learning-google-apps-script/blob/master/pdfOcrReader/appHelper.gs) function and probably also the calls to [`writeToCell()`/`readCell()`](https://github.com/hchiam/learning-google-apps-script/blob/master/pdfOcrReader/googleSheetHelpers.gs) that are used in [processPdfText.gs](https://github.com/hchiam/learning-google-apps-script/blob/master/pdfOcrReader/processPdfText.gs) and [pdfOcrReader.gs](https://github.com/hchiam/learning-google-apps-script/blob/master/pdfOcrReader/pdfOcrReader.gs).
