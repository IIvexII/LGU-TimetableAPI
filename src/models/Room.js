const { mongoose } = require('../database/connection');

const roomSchema = mongoose.Schema({
  _id: String,
  room: String,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room, roomSchema };
