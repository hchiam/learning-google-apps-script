/** @OnlyCurrentDoc */

function replaceSelectedText() {
  const selection = DocumentApp.getActiveDocument().getSelection();
  if (selection) {
    selection.getRangeElements().forEach(e => {
      const start = e.getStartOffset();
      const end = e.getEndOffsetInclusive();
      const prompt = e.getElement().asText();
      const text = prompt.getText().substring(start, end+1);
      const generatedText = getReplacementText(text);
      prompt.deleteText(start, end);
      prompt.insertText(start, generatedText);
    });
  }
}

function getReplacementText(text) {
  const dictionary = {
    e: 'EXAMPLE',
  };
  return text.replace(/./g, c => dictionary[c] ?? c);
}
