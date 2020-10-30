function getFirstMatch(text, regex, fallbackRegex) {
  let matches = [...text.matchAll(regex)];
  if (matches.length === 0 && fallbackRegex) {
    matches = [...text.matchAll(fallbackRegex)];
  }
  if (matches.length === 0) return '';
  return matches[0][1];
}

function getTitle(text) {
  return getFirstMatch(text, /(Lesson.+?\n.+(\n.+)*?)(Aim| 1\)|Background)/g);
}

function getKeys(text) {
  return getFirstMatch(text, /( 1\).+?\(.+?\))/g);
}
