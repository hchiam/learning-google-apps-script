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
  DocumentApp.getUi().alert('Hi there!');
}
