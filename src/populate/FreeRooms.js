const { RoomDay: RoomDayModel } = require('../models');
const { FreeRoom: FreeRoomModel } = require('../models');

const { RoomSchedule: RoomScheduleScrapper } = require('../scrapper');

class FreeRooms {
  static async populate(session) {
    try {
      // Drop the collection
      FreeRoomModel.collection.drop();

      const days = await RoomDayModel.find({});

      for (let day of days) {
        // Scrap the schedules
        const roomSchedules = new RoomScheduleScrapper(session, day._id);
        const schedules = await roomSchedules.getAll();

        for (let roomName in schedules) {
          const lectures = schedules[roomName];

          for (let i = 0; i < lectures.length; i++) {
            const uniStartTime = '08:00';
            const uniEndTime = '16:00';

            const currLecture = lectures[i];
            const nextLecture = lectures[i + 1];

            const cStartTime = currLecture?.startTime;
            const cEndTime = currLecture?.endTime;
            const nStartTime = nextLecture?.startTime;
            const nEndTime = nextLecture?.endTime;

            if (currLecture.free) {
              FreeRoomModel.create({
                day: day.day,
                room: roomName,
                startTime: uniStartTime,
                endTime: uniEndTime,
              });
              continue;
            }
            // when the 2 lectures have gap in it
            if (nextLecture && cEndTime !== nStartTime) {
              FreeRoomModel.create({
                day: day.day,
                room: roomName,
                startTime: cEndTime,
                endTime: nStartTime,
              });
            }
            // when last lecture don't end at the university end time.
            // which means last lecture ends time < 4:00 PM
            if (
              nextLecture &&
              i + 2 === lectures.length &&
              nEndTime !== uniEndTime
            ) {
              FreeRoomModel.create({
                day: day.day,
                room: roomName,
                startTime: nEndTime,
                endTime: uniEndTime,
              });
            }
            // When there is no first lecture
            if (nextLecture && i - 1 === -1 && cStartTime !== uniStartTime) {
              FreeRoomModel.create({
                day: day.day,
                room: roomName,
                startTime: uniStartTime,
                endTime: cStartTime,
              });
            }

            // // when this is the only lecutre
            if (!nextLecture && lectures.length === 1) {
              // check if first lecture is free
              if (cStartTime !== uniStartTime) {
                FreeRoomModel.create({
                  day: day.day,
                  room: roomName,
                  startTime: uniStartTime,
                  endTime: cStartTime,
                });
              }

              // check if last lecture is free
              if (cEndTime !== uniEndTime) {
                FreeRoomModel.create({
                  day: day.day,
                  room: roomName,
                  startTime: cEndTime,
                  endTime: uniEndTime,
                });
              }
            }
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
