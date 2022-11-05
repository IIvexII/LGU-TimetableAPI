const { Semester: SemesterModel } = require('../models/Semester');
const { Semester: SemesterScrapper } = require('../scrapper');

class Semester {
  static pupulate() {
    const semester = new SemesterScrapper('jjedrbhv59rmhc871qs1i7gv97');

    // Scrap all semesters from website.
    semester.getAll().then(async (data) => {
      for (let key of Object.keys(data)) {
        // Find the semester if it already exists
        const semester = await SemesterModel.findOne({ key });

        // Update the semester if it is found
        if (semester) {
          semester.value = data[key];
          // Increment in Version.
          semester.__v++;
          semester.save();
        } else {
          // Create new record of semester if it doesn't exist
          SemesterModel.create({
            key: key,
            value: data[key],
          });
        }
      }
    });
  }
}
