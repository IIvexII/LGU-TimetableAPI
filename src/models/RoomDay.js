const { mongoose } = require('../database/connection');

const roomDaySchema = mongoose.Schema({
  _id: String,
  day: String,
});

const RoomDay = mongoose.model('RoomDay', roomDaySchema);

module.exports = { RoomDay, roomDaySchema };
