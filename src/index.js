const express = require('express');

const { PopulateRouter, LGURouter, GCRouter } = require('./routes');

const app = express();

app.use(GCRouter);
app.use(LGURouter);
app.use(PopulateRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
