const express = require('express');
const Timetable = require('./modules/Timetable');
// Middlewares
const { Session } = require('./middlewares');
const { Params } = require('./middlewares/Params');

const app = express();

/* ------------------------------------
 * Route: '/'
 *
 * Middlewares:
 *  1. Session.validate
 *  2. Params.validate
 *
 * Query:
 *  1. session  2. semester,
 *  3. program  4. section
 * ------------------------------------
 */
app.get('/', Session.validate, Params.validate, async (req, res) => {
  const timeTable = new Timetable(req.data);
  res.send({ ...(await timeTable.get()) });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
