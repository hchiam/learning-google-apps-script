/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

// reference: https://codelabs.developers.google.com/codelabs/nlp-from-google-docs

// NOTE: I haven't tested this one. You're prolly better off trying out the other examples. :)

function getSentiment(text) {
  var apiKey = "your key here";
  var apiEndpoint =
    "https://language.googleapis.com/v1/documents:analyzeSentiment?key=" +
    apiKey;
  var nlOptions = getCallOptions(text);
  var data = getCallResponse(apiEndpoint, nlOptions);
  var sentiment = 0.0;
  var hasSentimentScore =
    data && data.documentSentiment && data.documentSentiment.score;
  if (hasSentimentScore) {
    sentiment = data.documentSentiment.score;
  }

  return sentiment;
}

function getCallOptions(text) {
  var docDetails = {
    language: "en-us",
    type: "PLAIN_TEXT",
    content: text,
  };

  var nlData = {
    document: docDetails,
    encodingType: "UTF8",
  };

  var nlOptions = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(nlData),
  };

  return nlOptions;
}

function getCallResponse(apiEndpoint, nlOptions) {
  var response = UrlFetchApp.fetch(apiEndpoint, nlOptions);
  var data = JSON.parse(response);
  return data;
}
