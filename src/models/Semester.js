const { JSDOM } = require('jsdom');

const { paths } = require('../Enums');
const { Sync } = require('../modules/Sync');

const { Model } = require('./Model');

class Semester extends Model {
  constructor(session) {
    super();
    this.sync = new Sync(session);

    this.data = this._parse();
  }
  /*
   * @params none
   * @return Object<{
   *    id: semester-full-name
   *  }>
   */
  async _parse() {
    const semesters = {};
    const res = await this._fetch();
    const { document } = new JSDOM(res).window;

    const semesterOpts = document.querySelectorAll('#semester option[value]');

    for (let semesterOpt of semesterOpts) {
      const id = semesterOpt.textContent.trim().split('')[0].toLowerCase();

      semesters[id] = semesterOpt.textContent.trim();
    }

    return semesters;
  }
  /*
   * @params none
   * @return html-page<HTMLElement>
   */
  async _fetch() {
    const res = await this.sync.fetch(paths.SP, {});
    return res.data;
  }
}

module.exports = { Semester };
