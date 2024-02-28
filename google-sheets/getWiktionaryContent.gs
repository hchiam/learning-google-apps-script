/** you can use this in a google sheet cell formula: =getWiktionaryContent("...") */
function getWiktionaryContent(word) {
  const url = `https://en.wiktionary.org/w/api.php?action=parse&page=${word}&section=1&prop=wikitext&format=json`;
  const json = JSON.parse(getJsonString(url));
  return json?.parse?.wikitext['*'];
}
