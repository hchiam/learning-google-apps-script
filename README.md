# Learning Google Apps Script
Just one of the things I'm learning. https://github.com/hchiam/learning

Did you know you can write code to modify things like Google Docs or Google Sheets?

To associate a script to your doc, go to: Tools -> Script editor -> (paste in code like [this](https://github.com/hchiam/learning-google-apps-script/blob/master/popup-minimal-code.gs) and edit it)

You can see all your .gs files listed here: https://script.google.com

## About the examples:

Each .gs file is its own example. Here's a minimal example: [popup in Google Sheets doc](https://github.com/hchiam/learning-google-apps-script/blob/master/popup-minimal-code.gs).

The folder [`pdfOcrReader`](https://github.com/hchiam/learning-google-apps-script/tree/master/pdfOcrReader) contains a more involved example with multiple .gs files used to do Optical Character Recognition.

Depending on which Google Doc you attach the script to, you might need to switch between one of these in the code: `DocumentApp`, `SpreadsheetApp`, `SlidesApp`, etc. (or use a helper function like [`appHelper.gs`](https://github.com/hchiam/learning-google-apps-script/blob/master/pdfOcrReader/appHelper.gs)).

Learn more from [a video](https://youtu.be/MOggwSls7xQ) or [the docs](https://developers.google.com/gsuite/add-ons/editors/docs/quickstart/translate) or [GitHub examples](https://github.com/gsuitedevs/apps-script-samples) or [Codelabs](https://codelabs.developers.google.com/codelabs/apps-script-intro/).
