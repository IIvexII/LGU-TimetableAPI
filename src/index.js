const express = require('express');

const LGURouter = require('./routes/LGU');

const app = express();

app.use(LGURouter);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
