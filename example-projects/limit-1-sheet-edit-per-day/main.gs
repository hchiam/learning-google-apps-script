/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

const mainSheetName = "Sheet1";
const counterCellSheetName = "Script-protected sheet";

function onOpen() {
  alert("Note: Please only type 1 edit a day.");
}

function onEdit(e) {
  weaklyRestoreCellValueOnEdit(e, {}, counterCellSheetName);
  const lastDateCellAddress = "C1";
  const canEdit = !alreadyEditedToday(lastDateCellAddress);
  if (canEdit) {
    setLastDateCellValue(lastDateCellAddress, new Date());
  }
  // edit sheet after weaklyRestoreCellValueOnEdit, not before
  trackUserEditedToday(e);
}

function trackUserEditedToday(e) {
  const userEmail = getUserEmail();
  setCellValue("B1", userEmail, counterCellSheetName);

  /*
  in counter cell sheet:
  
  Seen User Before: =COUNTIF(E:E,B1)>0    =IFNA(MATCH(B1,E:E),-1)
  Last Edit Date: =IFNA(LOOKUP(B1,E:E,F:F),FALSE())
  Already Edited Today: =AND(AND(B3, NOT(EQ(B4,"#N/A"))),C5<=0)    =DAYS(VALUE(C1),VALUE(INDIRECT(C8)))
  Can Edit Today: =NOT(B5)
  Row Free To Edit: =COUNTA(E:E)+1    =ADDRESS(B7,5)    =ADDRESS(B7,6)
  Existing Cells: =ADDRESS(C3,5)    =ADDRESS(C3,6)
  */
  const canEditToday = getCellValue("B6", counterCellSheetName);
  if (!canEditToday) {
    weaklyRestoreCellValueOnEdit(e, {}, mainSheetName);
    alert(`Sorry! Your added edit will be undone. 
          You already made an edit in the last 24 hours. 
          
          Please wait a day before making your next edit :)`);
    return;
  }

  const seenUserBefore = getCellValue("B3", counterCellSheetName); // =COUNTIF(E:E,B1)>0    =IFNA(MATCH(B1,E:E),-1)
  let userCell = "E1";
  let dateCell = "F1";
  if (seenUserBefore) {
    const existingUserCell = getCellValue("B8", counterCellSheetName);
    const existingDateCell = getCellValue("C8", counterCellSheetName);
    userCell = existingUserCell;
    dateCell = existingDateCell;
  } else {
    const freeUserCell = getCellValue("C7", counterCellSheetName);
    const freeDateCell = getCellValue("D7", counterCellSheetName);
    userCell = freeUserCell;
    dateCell = freeDateCell;
  }

  // update records of who and when made edits:
  setCellValue(userCell, userEmail, counterCellSheetName);
  setCellValue(dateCell, new Date(), counterCellSheetName);
}

function getUserEmail() {
  return (
    Session.getActiveUser().getEmail() ||
    PropertiesService.getUserProperties().getProperty("userEmail") ||
    Session.getEffectiveUser().getEmail()
  );
}

function alreadyEditedToday(lastDateCellAddress) {
  const todaysDateString = getTodaysDate();
  const lastDateString = getLastDateCellValue(lastDateCellAddress);
  return todaysDateString === lastDateString;
}

function getTodaysDate() {
  return Utilities.formatDate(new Date(), "GMT-5", "dd/MM/yyyy");
}

function getLastDateCellValue(lastDateCellAddress) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    counterCellSheetName
  );
  const lastDateCell = sheet.getRange(lastDateCellAddress);
  const cellValue = lastDateCell.getValue();
  if (isValidDate(cellValue)) {
    return Utilities.formatDate(cellValue, "GMT-5", "dd/MM/yyyy");
  }
  return "";
}

function isValidDate(value) {
  const isDateObject =
    Object.prototype.toString.call(value) === "[object Date]";
  if (!isDateObject) return false;
  const canGetTime = !isNaN(value.getTime());
  return canGetTime;
}

function setLastDateCellValue(lastDateCellAddress, date) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    counterCellSheetName
  );
  const lastDateCell = sheet.getRange(lastDateCellAddress);
  lastDateCell.setValue(date);
}
