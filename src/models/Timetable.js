const { mongoose } = require('../database/connection');

/* Schema is complex so not defining here.
  {
    section: sectionSchema,
    timetable: {...}
  }
*/
const timetableSchema = mongoose.Schema({}, { strict: false });

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = { Timetable, timetableSchema };
