function clearThisGoogleDocText() {
  DocumentApp.getUi().alert('Clearing text.');
  var doc = DocumentApp.getActiveDocument();
  doc.setText('');
}
