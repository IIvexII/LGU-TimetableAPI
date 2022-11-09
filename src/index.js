const express = require('express');
const cors = require('cors');

const { PopulateRouter, TimetableRouter, GCRouter } = require('./routes');

const app = express();

app.use(cors({})); // allow all
app.use(GCRouter);
app.use(TimetableRouter);
app.use(PopulateRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
