const express = require('express');

const { PopulateRouter, TimetableRouter, GCRouter } = require('./src/routes');

const app = express();

app.use(GCRouter);
app.use(TimetableRouter);
app.use(PopulateRouter);

module.exports = app;
