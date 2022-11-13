const { JSDOM } = require('jsdom');

const { paths } = require('../Enums');
const { Sync } = require('../utils');

const { Scrapper } = require('./Scrapper');

class RoomDays extends Scrapper {
  constructor(session) {
    super();
    this.sync = new Sync(session);

    this.data = this._parse();
  }
  /*
   * @params none
   * @return Object<{
   *    dayName: dayId
   *  }>
   */
  async _parse() {
    const days = {};
    const res = await this._fetch();
    const { document } = new JSDOM(res).window;

    const dayOpts = document.querySelectorAll('#day_all1 option');

    dayOpts.forEach((dayOpt) => {
      days[dayOpt.textContent.trim()] = dayOpt.getAttribute('value');
    });
    return days;
  }
  /*
   * @params none
   * @return html-page<HTMLElement>
   */
  async _fetch() {
    const res = await this.sync.fetch(paths.RS, {});
    return res.data;
  }
}

module.exports = { RoomDays };
