const { RoomDay: RoomDayModel } = require('../models');
const { RoomSchedule: RoomScheduleModel } = require('../models');

const { RoomSchedule: RoomScheduleScrapper } = require('../scrapper');

class RoomSchedule {
  static async populate(session) {
    try {
      // Drop the collection
      RoomScheduleModel.collection.drop();

      const days = await RoomDayModel.find({});

      for (let day of days) {
        // Scrap the schedules
        const roomSchedules = new RoomScheduleScrapper(session, day._id);
        const schedules = await roomSchedules.getAll();

        for (let roomName in schedules) {
          const lectures = schedules[roomName];

          for (let lecture of lectures) {
            const schedule = {
              room: roomName,
              subject: lecture.subject,
              teacher: lecture.teacher,
              day: day.day,
              startTime: lecture.startTime,
              endTime: lecture.endTime,
            };

            RoomScheduleModel.create(schedule);
          }
        }
      }
    } catch (err) {
      return 'There is an error while populating room schedules';
    }

    return 'Room schedules Populated Successfully!';
  }
}

module.exports = { RoomSchedule };
