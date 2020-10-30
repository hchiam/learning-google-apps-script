function apiCall(cell) {
  const date = Utilities.getDate(cell, "GMT", "yyyy-MM-dd");
  const url =
    "https://SOME-API-URL/v1/api/historical/close.json?start=" +
    date +
    "&end=" +
    date;
  const response = UrlFetchApp.fetch(url);
  const json = JSON.parse(response.getContentText());
  // return json.api[date];
}
