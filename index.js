const express = require('express');
// Middlewares
const { Session, Params } = require('./src/middlewares');

const { Timetable } = require('./src/models');

const app = express();

app.get('/', Session.validate, Params.validate, async (req, res) => {
  const { session, semester, program, section } = req.data;

  const timetable = new Timetable(session, semester, program, section);
  res.send(await timetable.getAll());
});

module.exports = app;
