const express = require('express');
const { Session, Params } = require('./middlewares');

const LGURouter = require('./routes/LGU');
const GoogleCalendarRouter = require('./routes/GoogleCalendar');

const app = express();
// Applying Middlewares to all routes
app.use(Session.validate, Params.validate);

app.use(GoogleCalendarRouter);
app.use(LGURouter);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
