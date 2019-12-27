function popupInputBox() {
  // NOT recommended:
  //var name = Browser.inputBox('Enter your name', Browser.Buttons.OK_CANCEL);

  // recommended way:
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(
    "Title: What's your name?",
    'Prompt: Please enter your name here:',
      ui.ButtonSet.OK_CANCEL);
  var button = result.getSelectedButton();
  var responseText = result.getResponseText();
  var buttonType = (button == ui.Button.OK) ? 'OK' : 'Cancel';
  var alertText = 'You hit ' + buttonType;
  if (responseText) alertText += ' and entered this: ' + responseText;
  ui.alert(alertText);
}
