const {
  Section: SectionModel,
  Timetable: TimetableModel,
} = require('../models');

const { Timetable: TimetableScrapper } = require('../scrapper');
const { verifyParams } = require('../utils/helpers');

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
        semester.name,
        degree.degreeName,
        section.sectionName,
      );
      const timetable = await timetableScrapper.getAll();
      TimetableModel.create({
        semester: semester._id,
        degree: degree.degreeName,
        section: section.sectionTag,

        timetable: timetable,
      });
    }
    console.log('Done populating Timetable collection!');
  }

  static async populateOne(session, semesterId, degreeName, sectionName) {
    const metadata = await verifyParams(semesterId, degreeName, sectionName);

    if (metadata) {
      const timetableScrapper = new TimetableScrapper(
        session,
        semesterId,
        degreeName,
        sectionName,
      );
      // scrap the timetable
      const timetable = await timetableScrapper.getAll();

      // check if the table already exist
      const foundTimetable = await TimetableModel.findOne({
        semester: metadata.semester.semesterId,
        degree: metadata.degree.degreeName,
        section: metadata.section.sectionName,
      });

      // update the timetable if it exist
      if (foundTimetable) {
        foundTimetable.timetable = timetable;
        foundTimetable.save();

        return 'Successfully updated the timetable';
      } else {
        // create timetable if it does not exist
        TimetableModel.create({
          semester: metadata.semester.semesterId,
          degree: metadata.degree.degreeName,
          section: metadata.section.sectionName,
          timetable: timetable,
        });
        return 'Successfully created the timetable';
      }
    } else {
      return 'Failed to find the document';
    }
  }
}

module.exports = { Timetable };
