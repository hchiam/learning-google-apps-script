/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

function clearThisGoogleDocText() {
  DocumentApp.getUi().alert('Clearing text.');
  var doc = DocumentApp.getActiveDocument();
  doc.setText('');
}
