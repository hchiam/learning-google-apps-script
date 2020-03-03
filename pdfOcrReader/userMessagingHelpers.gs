function inputBox(title, prompt, callbackAcceptingInput) {
  const ui = app().getUi();
  const result = ui.prompt(title, prompt, ui.ButtonSet.OK_CANCEL);
  const buttonHit = result.getSelectedButton();
  const responseText = result.getResponseText();
  if (buttonHit == ui.Button.OK) {
    callbackAcceptingInput(responseText);
  }
}

function alert(message) {
  app().getUi().alert(message);
}
