const { Semester: SemesterModel } = require('../models/Semester');
const { Semester: SemesterScrapper } = require('../scrapper');

class Semester {
  static async populate(session) {
    const semester = new SemesterScrapper(session);

    // Scrap all semesters from website.
    await semester.getAll().then(async (data) => {
      for (let key of Object.keys(data)) {
        // Find the semester if it already exists
        const semester = await SemesterModel.findOne({ _id: key });

        // Update the semester if it is found
        if (semester) {
          semester.value = data[key];
          // Increment in Version.
          semester.__v++;
          semester.save();
        } else {
          // Create new record of semester if it doesn't exist
          SemesterModel.create({
            _id: key,
            name: data[key],
          });
        }
      }
    });
    console.log('Done populating Semester collection!');
  }
}

module.exports = { Semester };
