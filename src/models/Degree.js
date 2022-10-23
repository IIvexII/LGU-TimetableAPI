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
   * @return degree name
   */
  async getById(id) {
    const degrees = await this.degrees;
    const name = degrees[id];

    return { ...(name ? { [id]: name } : {}) };
  }
  /*
   * @params name<String>
   * @return degree id
   */
  async getByName(name) {
    const degrees = await this.degrees;
    const id = Object.keys(degrees).find((key) => degrees[key] == name);

    return { ...(id ? { [id]: name } : {}) };
  }
  /*
   * @params none
   * @return all degrees available
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
new Degree('jjedrbhv59rmhc871qs1i7gv97', '2nd Semester Fall-2022 / Spring-2022')
  .getById('')
  .then((degs) => {
    console.log(degs);
  });
module.exports = { Degree };
