const { JSDOM } = require('jsdom');

const { paths } = require('../Enums');
const { Sync } = require('../utils');

const { Scrapper } = require('./Scrapper');

class RoomSchedule extends Scrapper {
  constructor(session, dayId) {
    super();
    this.sync = new Sync(session);

    this.dayId = dayId;

    this.data = this._parse();
  }
  /*
   * @params none
   * @return Object<{
   *    dayName: dayId
   *  }>
   */
  async _parse() {
    // const schedules = {};
    const res = await this._fetch();
    const { document } = new JSDOM(res).window;
    const scheduleRows = document.querySelectorAll(
      '.table-time tbody tr:not(.table-time tbody tr:first-child)',
    );

    scheduleRows.forEach((row) => {
      const roomName = row.querySelector('th').textContent.trim();
    });
  }
  /*
   * @params none
   * @return html-page<HTMLElement>
   */
  async _fetch() {
    const res = await this.sync.fetch(paths.ARS, {
      day: this.dayId,
    });
    return res.data;
  }
}

const rs = new RoomSchedule(
  'jjedrbhv59rmhc871qs1i7gv97',
  'c4ca4238a0b923820dcc509a6f75849b',
);
rs._parse().then((data) => console.log(data));

module.exports = { RoomSchedule };
