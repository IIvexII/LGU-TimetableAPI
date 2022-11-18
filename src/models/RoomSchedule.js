const { mongoose } = require('../database/connection');

const roomScheduleSchema = mongoose.Schema({
  room: String,
  subject: String,
  teacher: String,
  startTime: String,
  endTime: String,
});

const RoomSchedule = mongoose.model('RoomSchedule', roomScheduleSchema);

module.exports = { RoomSchedule, roomScheduleSchema };
