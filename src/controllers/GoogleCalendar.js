require('dotenv').config();
const { google } = require('googleapis');
const { createDate } = require('../utils/helpers');

class GoogleCalendar {
  constructor() {
    this._config();
    // Event
    this.events = [];
  }
  /* --------------------------------
   * pushEvent() - pushes the event
   * in event's array.
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
  // pushEvent(event) {
  //   this.event.summary = `${event.roomNo} - ${event.subject}`;
  //   this.event.location = `Lahore Garrison University`;
  //   this.event.description = event.teacherName;
  //   this.event.start.dateTime = event.startTime;
  //   this.event.end.dateTime = event.endTime;

  //   this.events.push(this.event);
  // }
  insertOne(event) {
    this.calendar.events.insert(
      {
        auth: this._oAuth2Client,
        calendarId: process.env.CALENDAR_ID,
        resource: this._createEvent(event),
      },
      (err, event) => {
        if (err) {
          console.log(
            'There was an error contacting the Calendar service: ' + err,
          );
          return;
        }
        console.log('Event created:', event);
      },
    );
  }
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
      colorId: 2,
    };
  }
  // clearAllEvents() {
  //   this.calendar.calendars.clear({
  //     calendarId: process.env.CALENDAR_ID,
  //   });
  // }
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
}

module.exports = { GoogleCalendar };

// const gc = new GoogleCalendar();

// gc.insertOne({
//   teacherName: 'Zafeer',
//   roomNo: '14NB',
//   subject: 'Web Development',
//   startTime: createDate('Wednesday', 7, 30, 0),
//   endTime: createDate('Wednesday', 12, 30, 0),
// });
