require('dotenv').config();
const { google } = require('googleapis');

class GoogleCalendarHandler {
  constructor() {
    // Initial Setup for google calendar API
    this._OAuth2 = google.auth.OAuth2;
    this._oAuth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
    );
    oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    // Calendar
    this.calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    // Event
    this.event = this._createEvent();
  }
  setEvent(event) {
    this.event.summary = event.title;
    this.event.location = `${event.roomNo} - Lahore Garrison University`;
    this.event.description = event.tracherName;
    this.event.
  }
  insertEvent() {
    this.calendar.events.insert(
      {
        auth: this._oAuth2Client,
        calendarId: 'primary',
        resource: this.event,
      },
      function (err, event) {
        if (err) {
          console.log(
            'There was an error contacting the Calendar service: ' + err,
          );
          return;
        }
        console.log('Event created:', event.data);
      },
    );
  }
  _createEvent() {
    return {
      // summary: 'Google I/O 2015',
      // location: '800 Howard St., San Francisco, CA 94103',
      // description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: new Date(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: eventEndDate,
        timeZone: 'America/Los_Angeles',
      },
      recurrence: ['RRULE:FREQ=WEEKLY'],
      reminders: {
        useDefault: false,
        overrides: [{ method: 'popup', minutes: 10 }],
      },
      colorId: 2,
    };
  }
}

module.exports = { GoogleCalendarHandler };
