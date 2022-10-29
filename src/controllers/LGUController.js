const { Timetable } = require('../models');

class LGUController {
  static async get(req, res) {
    const timetable = await LGUController.getTimetable(req.data);
    res.send();
  }
  static async getTimetable(data) {
    const { session, semester, program, section } = data;

    const timetable = new Timetable(session, semester, program, section);
    return await timetable.getAll();
  }
  static async getByDay(req, res) {}
}

module.exports = { LGUController };
