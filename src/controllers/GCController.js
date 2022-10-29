const { GoogleCalendar } = require('../lib/GoogleCalendar');
const { Timetable } = require('../models');
const { createDate } = require('../utils');

class GCController {
  static async syncTimetable(req, res) {
    const { session, semester, program, section } = req.data;

    const timetable = new Timetable(session, semester, program, section);
    const data = await timetable.getAll();

    const googleCalendar = new GoogleCalendar();

    const keys = Object.keys(data);

    keys.forEach((key) => {
      data[key].forEach((lecture) => {
        const { hours: sHours, minutes: sMinutes } = lecture.startTime;
        const { hours: eHours, minutes: eMinutes } = lecture.endTime;

        googleCalendar.insertOne({
          roomNo: lecture.roomNo?.trim(),
          subject: lecture.subject?.trim(),
          teacherName: lecture.teacher?.trim(),
          startTime: createDate(key, sHours, sMinutes, 0),
          endTime: createDate(key, eHours, eMinutes, 0),
        });
      });
    });
    res.send('Done');
  }
}

module.exports = { GCController };
