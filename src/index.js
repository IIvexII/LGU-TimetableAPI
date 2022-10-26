// const express = require('express');
// const LGURouter = require('./routes/LGU');

// const app = express();

// app.use(LGURouter);

// app.listen(3000, () => {
//   console.log('Listening on port 3000...');
// });

const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const eventStartDate = new Date();
eventStartDate.setDate(eventStartDate.getDate() + 2);

const eventEndDate = new Date();
eventEndDate.setDate(eventEndDate.getDate() + 2);
eventEndDate.setMinutes(eventEndDate.getMinutes() + 120);

const event = {
  summary: 'Google I/O 2015',
  location: '800 Howard St., San Francisco, CA 94103',
  description: "A chance to hear more about Google's developer products.",
  start: {
    dateTime: eventStartDate,
    timeZone: 'America/Los_Angeles',
  },
  end: {
    dateTime: eventEndDate,
    timeZone: 'America/Los_Angeles',
  },
  recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
  attendees: [{ email: 'lpage@example.com' }, { email: 'sbrin@example.com' }],
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'email', minutes: 24 * 60 },
      { method: 'popup', minutes: 10 },
    ],
  },
};

calendar.events.insert(
  {
    auth: oAuth2Client,
    calendarId: 'primary',
    resource: event,
  },
  function (err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created:', event.data.htmlLink);
  },
);

// const event = {
//   summary: 'Class in 15NB',
//   location: 'LGU',
//   description: 'With Zafeer Hafeez',
//   start: {
//     dateTime: eventStartDate,
//     timeZone: 'Pakistan/Karachi',
//   },
//   end: {
//     dateTime: eventEndDate,
//     timeZone: 'Pakistan/Karachi',
//   },
//   colorId: 1,
// };

// calendar.freebusy.query(
//   {
//     resource: {
//       timeMin: eventStartDate,
//       timeMax: eventEndDate,
//       timeZone: 'Pakistan/Karachi',
//       items: [{ id: 'primary' }],
//     },
//   },
//   (err, res) => {
//     if (err) return console.err('Free Busy Error: ', err);

//     const eventsArr = res.data.calendar;
//     console.log(eventsArr);
// if (eventsArr.length === 0)
//   return calendar.events.insert(
//     {
//       calendarId: 'primary',
//       resource: event,
//     },
//     (err) => {
//       if (err) return console.error('Calendar Error: ', err);

//       return console.log('Event Created');
//     },
//   );
// console.log('Iam busy');
//   },
// );
