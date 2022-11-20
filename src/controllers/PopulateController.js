const {
  Degree,
  Semester,
  Section,
  Timetable,
  RoomDay,
  RoomSchedule,
  FreeRooms,
} = require('../populate');

class PopulateController {
  static async populate(req, res) {
    const { session } = req.data;

    await Semester.populate(session);
    await Degree.populate(session);
    await Section.populate(session);
    await Timetable.populate(session);
    await RoomDay.populate(session);
    await RoomSchedule.populate(session);
    await FreeRooms.populate(session);

    res.send('Successfully Populated!');
  }
  static async populateSemesters(req, res) {
    const { session } = req.data;

    await Semester.populate(session);

    res.send('Successfully Populated Semesters!');
  }
  static async populateDegrees(req, res) {
    const { session } = req.data;

    await Degree.populate(session);

    res.send('Successfully Populated Degrees!');
  }
  static async populateSections(req, res) {
    const { session } = req.data;

    await Section.populate(session);

    res.send('Successfully Populated Sections!');
  }
  static async populateOneTimetable(req, res) {
    const { session, semester, program, section } = req.data;

    const populate = await Timetable.populateOne(
      session,
      semester,
      program,
      section,
    );

    res.send(populate);
  }
  static async populateTimetables(req, res) {
    const { session } = req.data;

    await Timetable.populate(session);

    res.send('Successfully Populated Timetables!');
  }
  static async populateRoomDays(req, res) {
    const { session } = req.data;

    await RoomDay.populate(session);

    res.send('Successfully Populated Room Days!');
  }
  static async populateRoomTimetables(req, res) {
    const { session } = req.data;

    const msg1 = await RoomSchedule.populate(session);
    const msg2 = await FreeRooms.populate(session);

    res.send({ msg1, msg2 });
  }
}
module.exports = { PopulateController };
