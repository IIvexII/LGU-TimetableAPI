const { JSDOM } = require('jsdom');

const { paths } = require('../Enums');
const { Sync } = require('../modules/Sync');

class Semester {
  constructor(session) {
    this.sync = new Sync(session);
    this.semesters = this._parse();
  }
  /*
   * @params id<String>
   * @return semester
   */
  async getById(id) {
    const semesters = await this.semesters;
    const name = semesters[id]; // semester full name
    return { ...(name ? { [id]: name } : {}) };
  }
  /*
   * @params id<String>
   * @return semester
   */
  async getByName(name) {
    const semesters = await this.semesters;
    const id = Object.keys(semesters).find((key) => semesters[key] == name);

    return { ...(id ? { [id]: name } : {}) };
  }
  /*
   * @params none
   * @return all semesters available
   */
  async getAll() {
    return this.semesters;
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
