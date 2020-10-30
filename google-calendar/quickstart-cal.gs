/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

function list10UpcomingEventsInCurrentUserCalendar() {
  listUpcomingEvents(10);
}

function listUpcomingEvents(number) {
  var calendarId = 'primary';
  var optionalArgs = {
    timeMin: (new Date()).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: number,
    orderBy: 'startTime'
  };
  var response = Calendar.Events.list(calendarId, optionalArgs);
  var events = response.items;
  var thereAreEvents = events.length > 0;
  if (thereAreEvents) {
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var when = event.start.dateTime;
      if (!when) {
        when = event.start.date;
      }
      Logger.log('%s (%s)', event.summary, when);
    }
  } else {
    Logger.log('No upcoming events found.');
  }
}
