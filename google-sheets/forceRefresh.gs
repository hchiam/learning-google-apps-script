/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

// useful if you want to clear and then reset cell values to trigger recalculation (apply all pending spreadsheet changes)

function forceRefresh() {
  SpreadsheetApp.flush();
}
