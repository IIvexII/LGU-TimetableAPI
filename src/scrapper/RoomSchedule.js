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
    const schedules = {};
    const res = await this._fetch();
    const { document } = new JSDOM(res).window;
    const scheduleRows = document.querySelectorAll(
      '.table-time tbody tr:not(.table-time tbody tr:first-child)',
    );

    scheduleRows.forEach((row) => {
      const roomName = row.querySelector('th').textContent.trim();
      const lectures = row.querySelectorAll('td');

      lectures.forEach((lecture) => {
        // storing text content of itself
        const lectureContent = lecture.textContent.trim();

        // If the table cell has X which
        // means no lecture at that time
        if (lectureContent !== 'X') {
          // time range is in 00:00 - 00:00
          // so this will split it into two part
          const timeRange = lecture
            .querySelectorAll('.style3')[1]
            ?.textContent.split('-');

          // if time range exist then store the schedule
          const startTime = timeRange && timeRange[0].trim();
          const endTime = timeRange && timeRange[1].trim();

          let lectureInfo = {};

          if (startTime && endTime) {
            // when there is a lecture
            lectureInfo = {
              startTime: startTime,
              endTime: endTime,
            };
          } else {
            // When all time slots are free
            lectureInfo = {
              startTime: '08:00',
              endTime: '16:00',
            };
          }

          // push into array if exist or create otherwise
          if (schedules[roomName]?.length > 0) {
            schedules[roomName].push(lectureInfo);
          } else {
            schedules[roomName] = [lectureInfo];
          }
        }
      });
    });

    return schedules;
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

module.exports = { RoomSchedule };
