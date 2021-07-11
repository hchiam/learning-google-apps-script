function alert(message) {
  app().getUi().alert(message);
}

function inputBox(title, prompt, callbackAcceptingInput) {
  const ui = app().getUi();
  const result = ui.prompt(title, prompt, ui.ButtonSet.OK_CANCEL);
  const buttonHit = result.getSelectedButton();
  const responseText = result.getResponseText();
  if (buttonHit == ui.Button.OK) {
    callbackAcceptingInput(responseText);
  }
}

function app() {
  // SpreadsheetApp accesses the current Google Sheet.
  // If you use this code in another Google Doc type, you change this return line to another app type:
  return DocumentApp || SpreadsheetApp || SlidesApp || FormApp;
}
