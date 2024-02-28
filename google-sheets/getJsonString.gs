/** you can use this in a google sheet cell formula: =getJsonString("...") */
function getJsonString(url) {
  const response = UrlFetchApp.fetch(url);
  const json = response.getContentText();
  return json;
}
