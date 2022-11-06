const { mongoose } = require('../database/connection');
const { degreeSchema } = require('./Degree');

const sectionSchema = mongoose.Schema({
  degree: degreeSchema,
  sectionId: String,
  sectionTag: String,
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = { Section, sectionSchema };
