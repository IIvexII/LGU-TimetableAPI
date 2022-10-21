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
    const response = await request(
      this.sessionId,
      this.baseUrl,
      PATHS.semesterTimetable,
      this.data,
    );

    return response;
  }
  /* ----------------------------------------
   * This methond parse the the HTML page to
   * to look for timetable and return that
   * in object form.
   * ----------------------------------------
   *
   * @params: no params required
   * @return: response<promise> {
   *  day: Array<[
   *    'startTime-endTime': {
   *       subject?: String,
   *       roomNo?: String,
   *       teacher?: String,
   *       error?: String
   *     }
   *  ]>
   * }
   */
  async get() {
    // making a copy of class property 'rawTimetable'
    const rawTimetable = await this.rawTimetable;

    // Convert the raw timetable into dom like object
    const { document } = new JSDOM(rawTimetable.data).window;

    const parsedTimetable = await this._parseTable(document);

    if (Object.keys(parsedTimetable).length > 0) {
      return parsedTimetable;
    } else {
      return {
        error: 'Table not found',
      };
    }
  }

  /*------------------------------------------------------
   * (private) This function is reponsible for parsing the dom
   * and returning an object containg the whole table
   * infomation.
   *------------------------------------------------------
   * @params: document<Document (dom.window.document)>
   * @return: response<promise> {
   *  day: Array<{
   *    startTime: Number,
   *    endTime: Number,
   *    subject?: String,
   *    roomNo?: String,
   *    teacher?: String,
   *    error?: String
   *  }>
   * }
   */
  async _parseTable(document) {
    const parsedTimetable = [];

    // all table rows ignoring the first row
    const tableRows = document.querySelectorAll(
      '#table-time tbody tr:not(tr:nth-child(1))',
    );

    for (let row of tableRows) {
      const day = row.querySelector('th').textContent;
      const classElms = row.querySelectorAll('td');
      const classes = [];

      let previousTime = { hours: 8, minutes: 0 },
        startTime,
        endTime;

      for (let singleClass of classElms) {
        // Extracting data from element
        const subject =
          singleClass?.querySelector('span:nth-child(1)')?.textContent;
        const roomNo =
          singleClass?.querySelector('span:nth-child(3)')?.textContent;
        const teacher =
          singleClass?.querySelector('span:nth-child(5)')?.textContent;
        const colSpan = singleClass?.getAttribute('colspan');

        startTime = previousTime;
        endTime = this._calculateTime(colSpan, startTime);
        previousTime = endTime;

        if (subject && roomNo && teacher) {
          classes.push({
            startTime,
            endTime,
            subject,
            roomNo,
            teacher,
          });
        }
      }
      if (classes.length > 0) {
        parsedTimetable[day] = classes;
      } else {
        parsedTimetable[day] = [{ info: "Yippi! It's holiday <3" }];
      }
    }
    return parsedTimetable;
  }

  /* ------------------------------------
   * This method calculates time using
   * the number of sessions and previus
   * time.
   * Note: each will be equal to 30 and
   * previousTime has default value of
   * 8:00.
   * ------------------------------------
   *
   * @params: no. of sessions(Number), previous time(Object)
   * @return: Object<{
   *    hours: Number,
   *    minutes: Number
   *  }>
   */
  _calculateTime(sessions, previousTime = { hours: 8, minutes: 0 }) {
    const totalMinutes =
      30 * sessions + previousTime.hours * 60 + previousTime.minutes;

    let hours = Math.trunc(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    const time = {
      hours,
      minutes,
    };

    return time;
  }
}

module.exports = Timetable;
