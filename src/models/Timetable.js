const { JSDOM } = require('jsdom');

const { Sync } = require('../modules/Sync');
const { calculateTime } = require('../utils/utils');
const { paths } = require('../Enums');
const { Model } = require('./Model');

/*
 * This class is responsible for fetching
 * data from timetable.lgu.edu.pk
 */
class Timetable extends Model {
  /*
   * constructor of Timetable
   *
   * @params: params<{
   *    session: string,
   *    semester: string,
   *    program: string,
   *    section: string
   *  }>
   */
  constructor(session, semester, degree, section) {
    super();
    this.sync = new Sync(session);

    this.semester = semester;
    this.degree = degree;
    this.section = section;

    // Fetch the table from website
    this.data = this._parse();
  }
  // Overwriting the methods and show error
  // that they are not available.
  getById(id) {
    return new Promise((resolve) => {
      return resolve({
        error: 'getById() is not available for Timetable Model.',
      });
    });
  }
  getByName(name) {
    return new Promise((resolve) => {
      return resolve({
        error: 'getByName() is not available for Timetable Model.',
      });
    });
  }
  /*------------------------------------------------------
   * (private) This function is reponsible for parsing the dom
   * and returning an object containg the whole table
   * infomation.
   *------------------------------------------------------
   * @params: none
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
  async _parse() {
    const timetable = {};
    const res = await this._fetch();
    const { document } = new JSDOM(res).window;

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
        timetable[day] = classes;
      }
    }
    return timetable;
  }
  /*
   * @params none
   * @return html-page<HTMLElement>
   */
  async _fetch() {
    const res = await this.sync.fetch(paths.STT, {
      semester: this.semester,
      program: this.degree,
      section: this.section,
    });
    return res.data;
  }
}

module.exports = { Timetable };
