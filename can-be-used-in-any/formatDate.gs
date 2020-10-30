const defaultDateToday = Utilities.formatDate(new Date(), 'America/New_York', 'dd/MM/yyyy');
function formatDate(dateString = defaultDateToday) {
  // const date = new Date('31/08/2020');
  const year = dateString.substring(6, 10);
  const month = dateString.substring(3, 5);
  const day = dateString.substring(0, 2);
  // alert(year + ' ' + month + ' ' + day);
  const date = new Date(year, month - 1, day);
  const formattedDate = Utilities.formatDate(date, 'America/New_York', 'MMM EEE dd');
  // alert(dateString + ' -> ' + formattedDate);
  return formattedDate;
}
