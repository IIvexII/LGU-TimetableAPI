const { JSDOM } = require('jsdom');

const { paths } = require('../Enums');
const { Sync } = require('../modules/Sync');

class Section {
  constructor(session, semester, degree) {
    this.semester = semester;
    this.sync = new Sync(session);
    this.degree = degree;
    this.sections = this._parse();
  }
  /*
   * @params id<String>
   * @return section
   */
  async getById(id) {
    const sections = await this.sections;
    const name = sections[id];

    return { ...(name ? { [id]: name } : {}) };
  }
  /*
   * @params name<String>
   * @return section
   */
  async getByName(name) {
    const sections = await this.sections;
    const id = Object.keys(sections).find((key) => sections[key] == name);

    return { ...(id ? { [id]: name } : {}) };
  }
  /*
   * @params none
   * @return all sections available
   */
  async getAll() {
    return await this.sections;
  }
  /*
   * @params none
   * @return Object<{
   *    id: section-full-name
   *  }>
   */
  async _parse() {
    const sections = {};
    const res = await this._fetch();
    const { document } = new JSDOM(res).window;

    const sectionOpts = document.querySelectorAll(
      'option[value]:not(option[value=""])',
    );

    for (let sectionOpt of sectionOpts) {
      const id = sectionOpt.getAttribute('value');
      sections[id] = sectionOpt.textContent.trim();
    }

    return sections;
  }
  /*
   * @params none
   * @return html-page<HTMLElement>
   */
  async _fetch() {
    const res = await this.sync.fetch(paths.SEM, {
      semester: this.semester,
      program: this.degree,
    });
    return res.data;
  }
}

module.exports = { Section };
