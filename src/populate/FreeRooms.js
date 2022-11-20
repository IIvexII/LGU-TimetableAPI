const { RoomDay: RoomDayModel } = require('../models');
const { RoomSchedule: RoomScheduleModel } = require('../models');

const { RoomSchedule: RoomScheduleScrapper } = require('../scrapper');

class FreeRooms {
  static async populate(session) {
    try {
      // Drop the collection
      // RoomScheduleModel.collection.drop();

      const days = await RoomDayModel.find({});

      for (let day of days) {
        // Scrap the schedules
        const roomSchedules = new RoomScheduleScrapper(session, day._id);
        const schedules = await roomSchedules.getAll();

        for (let roomName in schedules) {
          const lectures = schedules[roomName];

          for (let i = 0; i < lectures.length - 1; i++) {
            const uniStartTime = '08:00';
            const uniEndTime = '16:00';

            const currLecture = lectures[i];
            const nextLecture = lectures[i + 1];

            const cStartTime = currLecture.startTime;
            const cEndTime = currLecture.endTime;
            const nStartTime = nextLecture.startTime;
            const nEndTime = nextLecture.endTime;

            // when the 2 lectures have gap in it
            if (cEndTime !== nStartTime) {
              console.log({
                day: day.day,
                room: roomName,
                startTime: cEndTime,
                endTime: nStartTime,
              });
            }
            // when last lecture don't end at the university end time.
            // which means last lecture ends time < 4:00 PM
            if (i + 2 === lectures.length && nEndTime !== uniEndTime) {
              console.log({
                day: day.day,
                room: roomName,
                startTime: nEndTime,
                endTime: uniEndTime,
              });
            }
            // When there is no first lecture
            if (i - 1 === 0 && cStartTime !== uniStartTime) {
              console.log({
                day: day.day,
                room: roomName,
                startTime: uniStartTime,
                endTime: cStartTime,
              });
            }
            // const schedule = {
            //   room: roomName,
            //   subject: lecture.subject,
            //   teacher: lecture.teacher,
            //   day: day.day,
            //   startTime: lecture.startTime,
            //   endTime: lecture.endTime,
            // };
            // Room.create(schedule);
          }
        }
      }
    } catch (err) {
      return 'There is an error while populating free room ';
    }

    return 'Free room Populated Successfully!';
  }
}
FreeRooms.populate('jjedrbhv59rmhc871qs1i7gv97');
module.exports = { FreeRooms };
