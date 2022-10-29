const { LGUController } = require('./LGUController');
const { GoogleCalendar } = require('../lib/GoogleCalendar');
const { createDate } = require('../utils');

class GCController {
  static async storeTimetable(req, res) {
    const timetable = await LGUController.getTimetable(req.data);

    const googleCalendar = new GoogleCalendar();

    const days = Object.keys(timetable);

    for (let day of days) {
      timetable[day].forEach((lecture) => {
        const { hours: sHours, minutes: sMinutes } = lecture.startTime;
        const { hours: eHours, minutes: eMinutes } = lecture.endTime;

        googleCalendar.insertOne({
          roomNo: lecture.roomNo?.trim(),
          subject: lecture.subject?.trim(),
          teacherName: lecture.teacher?.trim(),
          startTime: createDate(day, sHours, sMinutes, 0),
          endTime: createDate(day, eHours, eMinutes, 0),
        });
      });
    }
    // res.send('Done');
  }
}

module.exports = { GCController };
