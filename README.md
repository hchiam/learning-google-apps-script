# Learning Google Apps Script

Just one of the things I'm learning. https://github.com/hchiam/learning

Did you know you can write code to modify things like Google Docs or Google Sheets?

To associate a script to your doc, go to: Tools -> Script editor -> (paste in code like [this](https://github.com/hchiam/learning-google-apps-script/blob/master/can-be-used-in-any/popup-minimal-code.gs) and edit it)

You can see all your .gs files listed here: https://script.google.com

## About the examples:

Each .gs file is its own example. Here's a minimal example: [popup in Google Sheets doc](https://github.com/hchiam/learning-google-apps-script/blob/master/can-be-used-in-any/popup-minimal-code.gs).

The folder [`pdfOcrReader`](https://github.com/hchiam/learning-google-apps-script/tree/master/example-projects/pdfOcrReader) contains a more involved example with multiple .gs files used to do Optical Character Recognition (OCR).

Depending on which Google Doc you attach the script to, you might need to switch between one of these in the code: `DocumentApp`, `SpreadsheetApp`, `SlidesApp`, etc. (or use a helper function like [`appHelper.gs`](https://github.com/hchiam/learning-google-apps-script/blob/master/example-projects/pdfOcrReader/appHelper.gs)).

The following is a special comment. It limits access to only the current doc that the script is associated with (instead of all of a user's docs):

```js
/** @OnlyCurrentDoc */
```

Learn more from [a video](https://youtu.be/MOggwSls7xQ) or [the docs](https://developers.google.com/gsuite/add-ons/editors/docs/quickstart/translate) or [GitHub examples](https://github.com/gsuitedevs/apps-script-samples) or [Codelabs](https://codelabs.developers.google.com/codelabs/apps-script-intro/).

## How to add a trigger upon form submit:

<https://stackoverflow.com/questions/17992718/how-to-get-onformsubmit-to-trigger-automatically/17992883#17992883>

Add the code and the "On form submit" trigger in the _sheet_ that gets populated by the form, _not_ the form itself.

```js
// use the Google Apps Script UI to create a trigger and link it to this function:
function onFormSubmit_sheet(e) {
  log(JSON.stringify(e));

  const data = {
    date: e.namedValues.Date[0],
    name: e.namedValues["Name/initial"][0],
    mousetraps:
      e.namedValues["Checked:"][0].indexOf("Mousetraps") !== -1 ? "x" : "",
    waterFlowerPots:
      e.namedValues["Checked:"][0].indexOf("Water flower pots") !== -1
        ? "x"
        : "",
    dehumidifierWater:
      e.namedValues["Checked:"][0].indexOf("Dehumidifier water") !== -1
        ? "x"
        : "",
  };

  log(data);

  // appendRowsInAGoogleDoc(1, 5, data);
}

function log(...text) {
  Logger.log(...text);
}
```

Another example: [email-onSubmitForm-onEditSheet.gs](https://github.com/hchiam/learning-google-apps-script/blob/master/example-projects/email-onSubmitForm-onEditSheet.gs)

## Learn about API calls and add-ons

<https://www.youtube.com/watch?v=xDovB0pu4OU>

<https://developers.googleblog.com/2017/10/gmail-add-ons-framework-now-available.html>

Example G-Suite Google Slides Add-on: <https://github.com/hchiam/slides-titler>

Starters for add-ons / web apps / chat bots are available in the Getting Started page when you log into Google Apps Script: <https://script.google.com/home/start>

## Random Fun Facts

- You can view a Google Doc in read-only mode despite you having edit permissions. You can manually click on the "Editing mode" button and choose "Viewing". Or you can edit the share link: replace the ending after the doc id (like `/` or `/edit`) with `/preview` instead, like this:

  ```text
  https://docs.google.com/document/d/<your_document_id>/preview
  ```

- `char(10)` or `CHAR(10)` = `\n` new line character, so you can output multiline string in a formular
