const { JSDOM } = require('jsdom');

const { paths } = require('../Enums');
const { Sync } = require('../utils');

const { Scrapper } = require('./Scrapper');

class Section extends Scrapper {
  constructor(session, semester, degree) {
    super();
    this.sync = new Sync(session);
    this.semester = semester;
    this.degree = degree;

    this.data = this._parse();
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
      sections[id] = sectionOpt.textContent.trim().split(' ')[1];
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
