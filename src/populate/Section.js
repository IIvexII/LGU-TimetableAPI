require('dotenv').config();
const { Degree: DegreeModel } = require('../models/Degree');
const { Section: SectionModel } = require('../models/Section');

const { Section: SectionScrapper } = require('../scrapper');

class Section {
  static populate() {
    // Drop the collection
    SectionModel.collection.drop();

    // get all degrees from database
    DegreeModel.find({}).then(async (degrees) => {
      // loop through all degrees
      for (let degree of degrees) {
        const sectionScrapper = new SectionScrapper(
          process.env.SESSION,
          degree.semester.name,
          degree.degreeId,
        );

        // Get the degrees for every degree
        const sections = await sectionScrapper.getAll();

        for (let sectionId of Object.keys(sections)) {
          SectionModel.create({
            degree: degree,
            sectionId: sectionId,
            sectionTag: sections[sectionId],
          }).then((msg) => {
            console.log(msg);
          });
        }
      }
    });
  }
}

module.exports = { Section };
