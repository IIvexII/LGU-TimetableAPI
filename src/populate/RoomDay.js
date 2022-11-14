const { RoomDay: RoomDayModel } = require('../models');
const { RoomDay: RoomDayScrapper } = require('../scrapper');

class RoomDay {
  static async populate(session) {
    try {
      // // Drop the collection
      RoomDayModel.collection.drop();

      // Scrap the days
      const roomDays = new RoomDayScrapper(process.env.SESSION);
      const days = await roomDays.getAll();

      for (let day in days) {
        RoomDayModel.create({ day: day, _id: days[day] });
      }
    } catch (err) {
      return 'There is an error while populating room days';
    }

    return 'Days Populated Successfully!';
  }
}

module.exports = { RoomDay };
