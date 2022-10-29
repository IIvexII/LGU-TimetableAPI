const express = require('express');
const { Session, Params } = require('./middlewares');

const LGURouter = require('./routes/LGURouter');
const GCRouter = require('./routes/GCRouter');

const app = express();
// Applying Middlewares to all routes
app.use(Session.validate, Params.validate);

app.use(GCRouter);
app.use(LGURouter);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
