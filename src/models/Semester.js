const { JSDOM } = require('jsdom');

const { paths } = require('../Enums');
const { Sync } = require('../modules/Sync');

class Semester {
  constructor(session) {
    this.sync = new Sync(session);
    this.semesters = this._parse();
  }
  async getById(id) {
    const semesters = await this.semesters;
    return semesters[id];
  }
  async getAll() {
    return this.semesters;
  }
  // This method parse the page and output an object
  async _parse() {
    const semesters = {};
    const res = await this._fetch();
    const { document } = new JSDOM(res).window;

    const semesterOpts = document.querySelectorAll('#semester option[value]');

    for (let semesterOpt of semesterOpts) {
      const id = semesterOpt.textContent.trim().split(' ')[0].toLowerCase();

      semesters[id] = semesterOpt.textContent.trim();
    }

    return semesters;
  }

  async _fetch() {
    const res = await this.sync.fetch(paths.SP, {});
    return res.data;
  }
}

module.exports = { Semester };
