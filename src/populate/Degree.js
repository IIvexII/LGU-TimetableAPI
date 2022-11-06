require('dotenv').config();
const { Degree: DegreeModel } = require('../models/Degree');
const { Semester: SemesterModel } = require('../models/Semester');

const { Degree: DegreeScrapper } = require('../scrapper');

class Degree {
  static async populate(session) {
    // Drop the collection
    DegreeModel.collection.drop();

    // get all semesters from database
    await SemesterModel.find({}).then(async (semesters) => {
      // loop through all semesters
      for (let semester of semesters) {
        const degreesScrapper = new DegreeScrapper(session, semester.name);

        // Get the degrees for every semester
        const degrees = await degreesScrapper.getAll();
        for (let degreeId of Object.keys(degrees)) {
          DegreeModel.create({
            semester: semester,
            degreeId: degreeId,
            degreeName: degrees[degreeId],
          }).then((msg) => {
            console.log(msg);
          });
        }
      }
    });
  }
}

module.exports = { Degree };
