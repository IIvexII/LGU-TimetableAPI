require('dotenv').config();
const { google } = require('googleapis');
const { days } = require('../Enums');

class GoogleCalendar {
  constructor() {
    this._config();
    this.missedEvents = [];
  }
  /* --------------------------------
   * insertOne() - insert the event
   * in google calendar
   * --------------------------------
   * @params Object<{
   *  roomNo: String,
   *  subject: String,
   *  teacherName: String,
   *  startTime: DateTime,
   *  endTime: DateTime,
   * }>
   * @return undefined
   */
  async insertOne(event) {
    this.calendar.events.insert(
      {
        auth: this._oAuth2Client,
        calendarId: process.env.CALENDAR_ID,
        resource: this._createEvent(event),
      },
      (err, ev) => {
        if (this.missedEvents.length > 0) {
          for (let missedEvent of this.missedEvents) {
            this.insertOne(missedEvent);
            this.missedEvents.shift();
          }
        }
        if (err) {
          if (!this._searchEventInArr(ev, this.missedEvents)) {
            this.missedEvents.push(event);
          }

          return;
        }
      },
    );
  }
  /* ------------------------------------
   * (private) _createEvent() - it creates
   * an event object and returns it.
   * -------------------------------------
   * @params Object<{
   *  roomNo: String,
   *  subject: String,
   *  teacherName: String,
   *  startTime: DateTime,
   *  endTime: DateTime,
   * }>
   * @return eventObject
   */
  _createEvent(event) {
    return {
      summary: `${event.roomNo} - ${event.subject}`,
      location: `Lahore Garrison University`,
      description: event.teacherName,
      start: {
        dateTime: event.startTime,
        timeZone: 'Asia/Karachi',
      },
      end: {
        dateTime: event.endTime,
        timeZone: 'Asia/Karachi',
      },
      recurrence: ['RRULE:FREQ=WEEKLY'],
      reminders: {
        useDefault: false,
        overrides: [{ method: 'popup', minutes: 10 }],
      },
      colorId: 2, // green color
    };
  }
  /* ------------------------------------
   * (private) _config() - it configure
   * google calendar api
   * -------------------------------------
   * @params none
   * @return none
   */
  _config() {
    // Initial Setup for google calendar API
    this._OAuth2 = google.auth.OAuth2;
    this._oAuth2Client = new this._OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
    );
    this._oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    // Calendar
    this.calendar = google.calendar({
      version: 'v3',
      auth: this._oAuth2Client,
    });
  }
  _searchEventInArr(event, eventArr) {
    return !!eventArr.find((ev) => this._compareEvents(ev, event));
  }
  _compareEvents(event1, event2) {
    return JSON.stringify(event1) === JSON.stringify(event2);
  }
}

module.exports = { GoogleCalendar };
