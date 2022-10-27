require('dotenv').config();
const { google } = require('googleapis');

class GoogleCalendar {
  constructor() {
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
    // Event
    this.event = this._createEvent();
    this.events = [];
  }
  setEvent(event) {
    this.event.summary = `${event.roomNo} - ${event.subject}`;
    this.event.location = `Lahore Garrison University`;
    this.event.description = event.teacherName;
    this.event.start.dateTime = event.startTime;
    this.event.end.dateTime = event.endTime;

    this.events.push(this.event);
  }
  insertEvent() {
    this.calendar.events.insert(
      {
        auth: this._oAuth2Client,
        calendarId: process.env.CALENDAR_ID,
        resource: this.event,
      },
      (err, event) => {
        if (`${err}`.includes('Rate Limit Exceeded')) {
          this.insertEvent();
        } else if (err) {
          console.log(
            'There was an error contacting the Calendar service: ' + err,
          );
          return;
        }
        console.log('Event created:', event);
      },
    );
  }
  _createEvent() {
    return {
      // summary: 'Google I/O 2015',
      // location: '800 Howard St., San Francisco, CA 94103',
      // description: "A chance to hear more about Google's developer products.",
      start: {
        timeZone: 'Asia/Karachi',
      },
      end: {
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
  clearAllEvents() {
    this.calendar.calendars.clear({
      calendarId: process.env.CALENDAR_ID,
    });
  }
}

module.exports = { GoogleCalendar };
