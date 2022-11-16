const { Room: RoomModel } = require('../models');
const { Room: RoomScrapper } = require('../scrapper');

class Room {
  static async populate(session) {
    try {
      // Drop the collection
      // RoomModel.collection.drop();

      // Scrap the days
      const roomScrapper = new RoomScrapper(session);
      const rooms = await roomScrapper.getAll();

      for (let room in rooms) {
        RoomModel.create({ room: room, _id: rooms[room] });
      }
    } catch (err) {
      return 'There is an error while populating rooms';
    }

    return 'Days Populated Successfully!';
  }
}

module.exports = { Room };
