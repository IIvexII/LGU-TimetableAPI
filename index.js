const express = require('express');
const cors = require('cors');

const { PopulateRouter, TimetableRouter, GCRouter } = require('./src/routes');

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: false,
    methods: ['GET'],
  }),
);

app.use(GCRouter);
app.use(TimetableRouter);
app.use(PopulateRouter);

module.exports = app;
