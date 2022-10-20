const { JSDOM } = require('jsdom');
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

    this.rawTimetable = (async () => await this.fetch())();
  }
  /*
   * @params: no params required
   * @return: response<promise>
   */
  async fetch() {
    console.log('fetching...');

    const response = await request(
      this.sessionId,
      this.baseUrl,
      PATHS.semesterTimetable,
      this.data,
    );

    return response;
  }
  /*
   * @params: no params required
   * @return: response<promise> {
   *  day: Array<[
   *    'startTime-endTime': {
   *       subject: String,
   *       roomNo: String,
   *       teacher: String
   *     }
   *  ]>
   * }
   */
  async get() {
    const rawTimetable = await this.rawTimetable;
    const parsedTimetable = {};

    // Convert the raw timetable into dom like object
    const { document } = new JSDOM(rawTimetable.data).window;

    // all table rows ignoring the first row
    const tableRows = document.querySelectorAll(
      '#table-time tbody tr:not(tr:nth-child(1))',
    );

    for (let row of tableRows) {
      const day = row.querySelector('th').textContent;
      const classElms = row.querySelectorAll('td');
      console.log(day);

      const classes = [];
      for (let singleClass of classElms) {
        classes.push({
          subject: singleClass?.querySelector('span:nth-child(1)')?.textContent,
          roomNo: singleClass?.querySelector('span:nth-child(3)')?.textContent,
          tracher: singleClass?.querySelector('span:nth-child(5)')?.textContent,
        });
      }
      parsedTimetable[day] = classes;
    }

    return parsedTimetable;
  }
}

module.exports = Timetable;
