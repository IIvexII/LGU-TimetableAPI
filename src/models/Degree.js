const { mongoose } = require('../database/connection');
const { semesterSchema } = require('./Semester');

const degreeSchema = mongoose.Schema({
  semester: semesterSchema,
  degreeId: String,
  degreeName: String,
});

const Degree = mongoose.model('Degree', degreeSchema);

module.exports = { Degree };
