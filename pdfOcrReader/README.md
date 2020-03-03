# PDF OCR Reader Example

1) Copy all the `.gs` files into your Google Apps Script project.
2) Edit the `app()` function if you're not running it from a Google Sheet.
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
