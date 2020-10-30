/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

function onOpen() {
  // SpreadsheetApp accesses the Google Sheet
  SpreadsheetApp.getUi().alert('This is the popup text.\n\nThis is text on a new line.');
}
