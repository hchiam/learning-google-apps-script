/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

// TODO:
// 1) install a trigger at https://script.google.com to run sendEmail with a "Time-driven" trigger on a "Day timer".
// 2) set target email below:
const emailAddress = "...@gmail.com";
const tempCell = "B1";
const minCell = "D1";
const maxCell = "F1";
const referenceCell = "B2";
const needUmbrellaCell = "B3";
const locationCell = "B5";
const weatherAlertsCellRange = "A8:A";

function sendEmail() {
  const location = getCellValue(locationCell);
  getData(location);
  GmailApp.sendEmail(emailAddress, `Weather: ${location}`, null, {
    htmlBody: getEmailBodyHtml(),
  });
  // GmailApp.sendEmail(emailAddress, `Weather: ${location}`, getEmailBodyText());
}

function getEmailBodyHtml() {
  const temp = getCellValue(tempCell);
  const minTemp = getCellValue(minCell);
  const maxTemp = getCellValue(maxCell);
  const reference = getCellValue(referenceCell);
  const needUmbrella = getCellValue(needUmbrellaCell);
  const weatherAlerts =
    "<br/><br/>" + getCellValue(weatherAlertsCellRange, null, "<br/><br/>");
  const emailBodyHtml = `<p>${temp} (${minTemp}-${maxTemp}). Ref: ${reference}. ${
    needUmbrella ? "Rain expected. " : ""
  }
${weatherAlerts} </p> 
<p><i>This is an automated <a href="https://docs.google.com/spreadsheets/d/.../edit#gid=0" target="_blank">custom weather summary email</a> powered by a <a href="https://script.google.com/home/projects/.../edit" target="_blank">Google Apps Script</a>.</i></p>`;
  return emailBodyHtml;
}

function getEmailBodyText() {
  const temp = getCellValue(tempCell);
  const minTemp = getCellValue(minCell);
  const maxTemp = getCellValue(maxCell);
  const reference = getCellValue(referenceCell);
  const needUmbrella = getCellValue(needUmbrellaCell);
  const weatherAlerts =
    "<br/><br/>" + getCellValue(weatherAlertsCellRange, null, "<br/><br/>");
  const emailBodyText = `${temp} (${minTemp}-${maxTemp}). Ref: ${reference}. ${
    needUmbrella ? "Rain expected. " : ""
  }
${weatherAlerts} 

This is an automated custom weather summary email.`;
  return emailBodyText;
}

function getData(cityName) {
  const apiKey = "...";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  const data = JSON.parse(UrlFetchApp.fetch(url));
  Logger.log(data);
  const { main, name, sys, weather } = data;
  const temp = Math.round(main.feels_like || main.temp);
  const minTemp = Math.round(main.temp_min);
  const maxTemp = Math.round(main.temp_max);
  const reference = "≈ " + getReferenceText(temp);
  const needUmbrella = weather.main?.toLowerCase().includes("rain")
    ? "Yes"
    : "";
  setCellValue(tempCell, temp + "°C");
  setCellValue(minCell, minTemp);
  setCellValue(maxCell, maxTemp);
  setCellValue(referenceCell, reference);
  setCellValue(needUmbrellaCell, needUmbrella);
}

function getReferenceText(temp) {
  // https://imgs.xkcd.com/comics/converting_to_metric.png
  temp = Math.round(temp);
  if (temp >= 33) return "heat wave";
  if (temp >= 28 && temp <= 32) return "beach";
  if (temp >= 23 && temp <= 27) return "warm room.";
  if (temp >= 18 && temp <= 22) return "room";
  if (temp >= 13 && temp <= 17) return "room/jacket";
  if (temp >= 8 && temp <= 12) return "jacket";
  if (temp >= 1 && temp <= 7) return "jacket/snow";
  if (temp >= -1 && temp <= 0) return "snow";
  if (temp < -1) return "below freezing";
  // otherwise failsafe just in case:
  return "";
}
