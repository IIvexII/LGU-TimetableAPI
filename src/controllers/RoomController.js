const { RoomDay, Room, FreeRoom } = require('../models');
const { fixTime } = require('../utils');

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
    const building = req.query?.building;
    const day = req && req.query?.day;
    const time = fixTime(req.query?.time);

    const filteredSlots =
      day || time
        ? await RoomController._findFreeRooms(day, time, building)
        : await RoomController._findAllFreeRooms();

    res.send(filteredSlots);
  }
  static async _findFreeRooms(day, time, building) {
    // if day is not defined then find free rooms for all 7 days
    const AllfreeSlots = await FreeRoom.find(day ? { day } : {}, {
      _id: false,
      __v: false,
    });

    const filteredSlots = AllfreeSlots.filter((slot) => {
      // time filter
      const tFilter = time && time >= slot.startTime && time < slot.endTime;
      // building filter
      const bFilter = building && new RegExp(building, 'ig').test(slot.room);

      // filter the free slots with time or building
      if (time && building) {
        return tFilter && bFilter;
      } else if (time) {
        return tFilter;
      } else if (building) {
        return bFilter;
      }

      // if the time is not given then don't
      // apply filter and return all the available
      // time slots
      return slot;
    });

    return filteredSlots;
  }
  static async _findAllFreeRooms() {
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

    return freeRooms;
  }
}

module.exports = { RoomController };
