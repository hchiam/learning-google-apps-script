/**
* @OnlyCurrentDoc
* 
* The above comment restricts to read only the current doc.
*/

// on install of add-on:
function onInstall(e) { // this must be named onInstall(e)
  onOpen(e); // e.authMode is typically AuthMode.FULL
}

// on open of document:
function onOpen(e) { // this must be named onOpen(e). e.authMode could be AuthMode.LIMITED or AuthMode.NONE
  DocumentApp
  .getUi().createAddonMenu()
  .addItem('Create', 'createCustomHeader')
  .addToUi();
}

function createCustomHeader() {
  DocumentApp.getUi().alert('Creating custom header.');
  
  var style = {};
  style[DocumentApp.Attribute.BACKGROUND_COLOR] = '#000000';
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = '#FFFFFF';
  style[DocumentApp.Attribute.BOLD] = 'true';
  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
  
  var body = DocumentApp.getActiveDocument().getBody();
  var table = body.appendTable();
  var tr = table.appendTableRow();
  var td = tr.appendTableCell('Type stuff here:');
  
  td.setAttributes(style);
  td.getChild(0).setAttributes(style); // to actually center the text
}
