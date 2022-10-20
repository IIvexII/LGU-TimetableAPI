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
      for (let singleClass of classElms) {
        const subject =
          singleClass?.querySelector('span:nth-child(1)')?.textContent;
        const roomNo =
          singleClass?.querySelector('span:nth-child(3)')?.textContent;
        const teacher =
          singleClass?.querySelector('span:nth-child(5)')?.textContent;

        if (subject && roomNo && teacher) {
          classes.push({
            subject,
            roomNo,
            teacher,
          });
        }
      }
      if (classes.length > 0) {
        parsedTimetable[day] = classes;
      }
    }
    return parsedTimetable;
  }
}

module.exports = Timetable;
