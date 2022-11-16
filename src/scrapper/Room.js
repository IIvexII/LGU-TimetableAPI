const { JSDOM } = require('jsdom');

const { paths } = require('../Enums');
const { Sync } = require('../utils');

const { Scrapper } = require('./Scrapper');

class Room extends Scrapper {
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
    const rooms = {};
    const res = await this._fetch();
    const { document } = new JSDOM(res).window;

    const roomsOpts = document.querySelectorAll('#day_all option');

    roomsOpts.forEach((roomOpt) => {
      rooms[roomOpt.textContent.trim()] = roomOpt.getAttribute('value');
    });
    return rooms;
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

module.exports = { Room };
