const express = require('express');
const cors    = require ('cors');

const { PopulateRouter, TimetableRouter, GCRouter } = require('./routes');

const app = express();

app
.use (cors ({})) // allow all
.use(GCRouter)
.use(TimetableRouter)
.use(PopulateRouter)
.listen(3000, () => {
  console.log('Listening on port 3000...');
});
