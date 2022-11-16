const { RoomDay, Room } = require('../models');

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
}

module.exports = { RoomController };
