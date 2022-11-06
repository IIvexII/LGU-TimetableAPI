require('dotenv').config();
const {
  Section: SectionModel,
  Timetable: TimetableModel,
} = require('../models');

const { Timetable: TimetableScrapper } = require('../scrapper');

class Timetable {
  static async populate(session) {
    // Drop the collection
    TimetableModel.collection.drop();

    const sections = await SectionModel.find({});
    for (let section of sections) {
      const semester = section.degree.semester;
      const degree = section.degree;
      const timetableScrapper = new TimetableScrapper(
        session,
        semester._id,
        degree.degreeId,
        section.sectionId,
      );
      const timetable = await timetableScrapper.getAll();
      TimetableModel.create({
        semester: semester.name,
        degree: degree.degreeName,
        timetable: timetable,
      });
    }
    console.log('Done populating Timetable collection!');
  }
}

module.exports = { Timetable };
