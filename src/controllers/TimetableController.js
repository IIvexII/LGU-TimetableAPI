const { Semester } = require('../models');
const { Timetable } = require('../scrapper');

class TimetableController {
  static async get(req, res) {
    const timetable = await TimetableController.getTimetable(req.data);
    res.send(timetable);
  }
  static async getTimetable(data) {
    const { session, semester, program, section } = data;

    const timetable = new Timetable(session, semester, program, section);
    return await timetable.getAll();
  }
  /* -----------------------------------
   *  getSemesters() fetch semesters
   *  from database
   * -----------------------------------
   * @params req, res
   * @response {
   *  semester_number: semester_full_name
   * }
   */
  static async getSemesters(req, res) {
    const semesters = await Semester.find({});
    const newSemesters = {};

    for (let semester of semesters) {
      newSemesters[semester._id] = semester.name;
    }

    res.send(newSemesters);
  }
}

module.exports = { TimetableController };
