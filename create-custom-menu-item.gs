function onOpen() {
  SpreadsheetApp
  .getUi()
  .createMenu('Custom menu')
  .addItem('Custom item', 'customMenuItem') // customMenuItem matches function name
  .addToUi();
}

function customMenuItem() {
  SpreadsheetApp
  .getUi()
  .alert('You clicked the custom menu item!');
}
