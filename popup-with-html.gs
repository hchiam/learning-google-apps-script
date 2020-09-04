function popupWithHtml() {
  const ui = SpreadsheetApp.getUi();
  const str = "Some message in bold.";
  const html = `
    <p id="test" style="background: red; height: 5000px;">hi there</p>
    <b>${str}</b>
    <br/>
    <input type="button" value="ok" onClick="google.script.run.withSuccessHandler(() => google.script.host.close()).clickOk()">
    <input type="button" value="cancel" onClick="google.script.run.withSuccessHandler(() => google.script.host.close()).clickCancel()">
    <script>alert('hi!');</script>
  `;
  ui.showModalDialog(HtmlService.createHtmlOutput(html), "sample");
}

function clickOk() {
  alert("clickOk");
}

function clickCancel() {
  alert("clickCancel");
}
