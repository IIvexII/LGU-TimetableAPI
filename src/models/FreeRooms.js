const { mongoose } = require('../database/connection');

const freeRoomsSchema = mongoose.Schema({
  day: String,
  room: String,
  startTime: String,
  endTime: String,
});

const FreeRoom = mongoose.model('FreeRoom', freeRoomsSchema);

module.exports = { FreeRoom, freeRoomsSchema };
