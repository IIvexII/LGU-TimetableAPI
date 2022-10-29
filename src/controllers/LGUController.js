const { Timetable } = require('../models');

class LGUController {
  static async get(req, res) {
    const { session, semester, program, section } = req.data;

    const timetable = new Timetable(session, semester, program, section);
    res.send(await timetable.getAll());
  }
  static async getByDay(req, res) {}
}

module.exports = { LGUController };
