require('dotenv').config();
const mongoose = require('mongoose');

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected!');
  })
  .catch((err) => {
    console.log('There is an error while connecting to database.');
  });

module.exports = { mongoose };
