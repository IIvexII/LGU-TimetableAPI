const { RoomDay, Room, FreeRoom } = require('../models');

class RoomController {
  static async getDays(req, res) {
    const days = {};

    const data = await RoomDay.find({});

    for (let key in data) {
      days[data[key].day] = data[key]._id;
    }
    res.send(days);
  }
  static async getRooms(req, res) {
    const rooms = {};

    const data = await Room.find({});

    for (let key in data) {
      rooms[data[key].room] = data[key]._id;
    }
    res.send(rooms);
  }
  static async getFreeRooms(req, res) {
    const freeRooms = {};

    const freeSlots = await FreeRoom.find({});

    for (let freeSlot of freeSlots) {
      const freeRoom = {
        room: freeSlot.room,
        startTime: freeSlot.startTime,
        endTime: freeSlot.endTime,
      };

      if (freeRooms[freeSlot.day]?.length > 0) {
        freeRooms[freeSlot.day].push(freeRoom);
      } else {
        freeRooms[freeSlot.day] = [freeRoom];
      }
    }
    res.send(freeRooms);
  }
  static async getSpecificFreeRooms(req, res) {
    const day = req.query?.day;
    const time = req.query?.time;

    const freeSlots = await FreeRoom.find(
      { day, startTime: time },
      { _id: false, __v: false },
    );

    res.send(freeSlots);
  }
}

module.exports = { RoomController };
