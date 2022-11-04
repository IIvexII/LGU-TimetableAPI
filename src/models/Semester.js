const { mongoose } = require('../database/connection');

const semesterSchema = mongoose.Schema({
  key: String,
  value: String,
});

const Semester = mongoose.model('Semester', semesterSchema);

module.exports = { Semester };
