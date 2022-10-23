const { JSDOM } = require('jsdom');

const { paths } = require('../Enums');
const { Sync } = require('../modules/Sync');

class Degree {
  constructor(session, semester) {
    this.semester = semester;
    this.sync = new Sync(session);
    this.degrees = this._parse();
  }
  /*
   * @params id<String>
   * @return degree id
   */
  async getById(id) {
    const degrees = await this.degrees;
    return Object.keys(degrees).find((key) => degrees[key] == id);
  }
  /*
   * @params name<String>
   * @return degree id
   */
  async getIdByName(name) {
    const degrees = await this.degrees;
    return degrees[name];
  }
  /*
   * @params none
   * @return all semesters available
   */
  async getAll() {
    return await this.degrees;
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
      degrees[degreeOpt.textContent.trim()] = id;
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
