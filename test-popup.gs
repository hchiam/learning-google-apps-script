/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

// on install of add-on:
function onInstall(e) { // this must be named onInstall(e)
  onOpen(e); // e.authMode is typically AuthMode.FULL
}

// on open of document:
function onOpen(e) { // this must be named onOpen(e). e.authMode could be AuthMode.LIMITED or AuthMode.NONE
  DocumentApp.getUi().alert('Hi there!');
}
