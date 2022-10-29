const express = require('express');
const { Session, Params } = require('./src/middlewares');

const LGURouter = require('./src/routes/LGURouter');
const GCRouter = require('./src/routes/GCRouter');

const app = express();
// Applying Middlewares to all routes
app.use(Session.validate, Params.validate);

app.use(GCRouter);
app.use(LGURouter);

module.exports = app;
