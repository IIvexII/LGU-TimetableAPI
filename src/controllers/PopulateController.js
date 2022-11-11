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
  static async populateSemesters(req, res) {
    const { session } = req.data;

    await Semester.populate(session);

    res.send('Successfully Populated Semesters!');
  }
  static async populateDegrees(req, res) {
    const { session } = req.data;

    await Degree.populate(session);

    res.send('Successfully Populated Degrees!');
  }
  static async populateSections(req, res) {
    const { session } = req.data;

    await Section.populate(session);

    res.send('Successfully Populated Sections!');
  }
  static async populateOneTimetable(req, res) {
    const { session, semester, program, section } = req.data;

    const populate = await Timetable.populateOne(
      session,
      semester,
      program,
      section,
    );

    res.send(populate);
  }
  static async populateTimetables(req, res) {
    const { session } = req.data;

    await Timetable.populate(session);

    res.send('Successfully Populated Timetables!');
  }
}
module.exports = { PopulateController };
