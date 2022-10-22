const { JSDOM } = require('jsdom');

const { Sync } = require('./Sync');
const { calculateTime } = require('../utils/utils');
const { paths } = require('../Enums');


/*
 * This class is responsible for fetching
 * data from timetable.lgu.edu.pk
 */
class Timetable {
  /*
   * constructor of Timetable
   *
   * @params: sessionId and params(to send)
   */
  constructor(sessionId, params) {
    this.sync = new Sync(sessionId);

    this.baseUrl = 'https://timetable.lgu.edu.pk';

    // Fetch the table from website
    this.rawTimetable = (async () => {
      return await this.sync.fetch(paths.STT, params);
    })();
  }
  /* ----------------------------------------
   * This methond parse the the HTML page to
   * look  for  timetable and  return  it as
   * object .
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

    const parsedTimetable = this._parseTable(document);

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
  _parseTable(document) {
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

        // time calculations
        startTime = previousTime;
        endTime = calculateTime(colSpan, startTime);
        previousTime = endTime;

        // push the class details in classes if all those exist.
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
      // store the class in timetable if it has any class for that day.
      if (classes.length > 0) {
        parsedTimetable[day] = classes;
      } else {
        parsedTimetable[day] = [{ info: "Yippi! It's holiday <3" }];
      }
    }
    return parsedTimetable;
  }
}

module.exports = Timetable;
