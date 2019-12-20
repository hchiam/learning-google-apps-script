/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

function doTheThing() {
  addToListUnderHeading('heading text', 'list item text');
}

function addToListUnderHeading(headingText, listItemText) {
  var headingIndex = findHeadingIndex(headingText);
  if (headingIndex >= 0) {
    addToListUnderHeadingIndex(headingIndex, listItemText);
  }
}

function findHeadingIndex(headingText) {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  for (var i=0; i<body.getNumChildren(); i++) {
    var child = body.getChild(i);
    var foundText = (child.asText().getText() == headingText);
    if (foundText) {
      return i;
      break;
    }
  }
  DocumentApp.getUi().alert("ERROR: Couldn't find heading.");
  return -1;
}

function addToListUnderHeadingIndex(headingIndex, listItemText) {
  // assumes list starts immediately after the heading's text
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  for (var i=headingIndex+1; i<body.getNumChildren(); i++) {
    var child = body.getChild(i);
    var isListItem = (child.getType() == DocumentApp.ElementType.LIST_ITEM);
    if (!isListItem) {
      // should create new list or add to the end of the list
      body.insertListItem(i, listItemText);
      return;
    }
  }
  DocumentApp.getUi().alert("ERROR: Couldn't find list.");
}
