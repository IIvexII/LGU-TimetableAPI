const { JSDOM } = require('jsdom');

const { paths } = require('../Enums');
const { Sync } = require('../modules/Sync');
const { Model } = require('./Model');

class Degree extends Model {
  constructor(session, semester) {
    super();
    this.sync = new Sync(session);
    this.semester = semester;

    this.data = this._parse();
  }
  /*
   * @params none
   * @return Object<{
   *    id: semester-full-name
   *  }>
   */
  async _parse() {
    const degrees = {};
    const res = await this._fetch();
    const { document } = new JSDOM(res).window;

    const degreeOpts = document.querySelectorAll(
      'option[value]:not(option[value=""])',
    );

    for (let degreeOpt of degreeOpts) {
      const id = degreeOpt.getAttribute('value');
      degrees[id] = degreeOpt.textContent.trim();
    }

    return degrees;
  }
  /*
   * @params none
   * @return html-page<HTMLElement>
   */
  async _fetch() {
    const res = await this.sync.fetch(paths.SEM, { semester: this.semester });
    return res.data;
  }
}

module.exports = { Degree };
