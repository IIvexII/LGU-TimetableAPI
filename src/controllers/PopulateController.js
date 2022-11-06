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
}
module.exports = { PopulateController };
