const express = require('express');
// Middlewares
const { Session, Params } = require('./middlewares');

const { Timetable } = require('./models');

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
  const { session, semester, program, section } = req.data;

  const timetable = new Timetable(session, semester, program, section);
  res.send(await timetable.getAll());
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
