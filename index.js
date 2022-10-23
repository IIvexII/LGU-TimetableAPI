const express = require('express');
const Timetable = require('./src/modules/Timetable');
// Middlewares
const { Session } = require('./src/middlewares');
const { Params } = require('./src/middlewares/Params');

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

module.exports = app;
