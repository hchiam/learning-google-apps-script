const defaultEmptyData = {
  date: "",
  name: "",
  mousetraps: "",
  waterFlowerPots: "",
  dehumidifierWater: "",
};

function appendRows(
  numberOfRows = 1,
  numberOfColumns = 5,
  data = defaultEmptyData
) {
  // const doc = getDoc({ url: "https://docs.google.com/document/d/.../edit" }); // need that /edit part or it might not work
  const doc = getDoc();
  const body = doc.getBody();
  const firstTableElement = body.findElement(DocumentApp.ElementType.TABLE);
  const element = firstTableElement.getElement();
  const table = element.asTable(); // Logger.log('num rows: ' + table.getNumRows());

  for (let r = 0; r < numberOfRows; r++) {
    const row = table.appendTableRow();
    for (let c = 0; c < numberOfColumns; c++) {
      let cellText = "";
      switch (c) {
        case 0:
          cellText = data.date;
          break;
        case 1:
          cellText = data.name;
          break;
        case 2:
          cellText = data.mousetraps;
          break;
        case 3:
          cellText = data.waterFlowerPots;
          break;
        case 4:
          cellText = data.dehumidifierWater;
          break;
      }
      const cell = row.appendTableCell(cellText);
      cell.setAttributes({
        [DocumentApp.Attribute.BACKGROUND_COLOR]: "#f3f3f3",
      });
    }
  }
}

function getDoc({ id = "", url = "" } = {}) {
  if (!id && !url) return DocumentApp.getActiveDocument();
  if (id) return DocumentApp.openById(id);
  if (url) return DocumentApp.openByUrl(url);
}
