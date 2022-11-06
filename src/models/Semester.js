const { mongoose } = require('../database/connection');

const semesterSchema = mongoose.Schema({
  _id: String,
  name: String,
});

const Semester = mongoose.model('Semester', semesterSchema);

module.exports = { Semester, semesterSchema };
