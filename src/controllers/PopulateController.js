const { Degree, Semester, Section, Timetable } = require('../populate');

class PopulateController {
  static async populate(req, res) {
    const { session } = req.data;

    await Semester.populate(session);
    await Degree.populate(session);
    await Section.populate(session);
    await Timetable.populate(session);

    res.send('Successfully Populated!');
  }
  static async populateTimetable(req, res) {
    const { session, semester, program, section } = req.data;

    const populate = await Timetable.populateOne(
      session,
      semester,
      program,
      section,
    );

    res.send(populate);
  }
}
module.exports = { PopulateController };
