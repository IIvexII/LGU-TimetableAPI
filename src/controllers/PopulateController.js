const { Degree, Semester, Section } = require('../populate');

class PopulateController {
  static async populate(req, res) {
    const { session } = req.data;

    await Semester.populate(session);
    await Degree.populate(session);
    await Section.populate(session);

    res.send('Successfully Populated!');
  }
}
module.exports = { PopulateController };
