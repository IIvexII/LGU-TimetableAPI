const request = require('./Request');

// This object Contain the paths of timetable.edu.pk
const PATHS = {
  semesterTimetable: 'Semesters/semester_info/SEMESTER_TIMETABLE.php',
};

/*
 * This class is responsible for fetching
 * data from timetable.lgu.edu.pk
 */
class Timetable {
  /*
   * constructor of Timetable
   *
   * @params: sessionId and data(to send)
   */
  constructor(sessionId, data) {
    this.baseUrl = 'https://timetable.lgu.edu.pk';

    this.sessionId = sessionId;
    this.data = data;
    this.fetch();
  }
  /*
   * @params: no params required
   * @return: response<promise>
   */
  fetch() {
    return request(
      this.sessionId,
      this.baseUrl,
      PATHS.semesterTimetable,
      this.data,
    );
  }
}

module.exports = Timetable;
