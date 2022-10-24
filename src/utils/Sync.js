const axios = require('axios');
const { paths } = require('../Enums');
class Sync {
  constructor(sessionId) {
    this.sessionId = sessionId;
  }
  /*
   * @params: path of page,
   *          params to send
   * @return: response<promise>
   */
  async fetch(path, params) {
    const response = await this._request(path, params);

    return response;
  }
  /* -------------------------------------
   * This function is responsible for
   * sending requests and returning
   * response to the user.
   *
   * Specifically for timetable.lgu.pk
   * -------------------------------------
   *
   * @params: sessionId,
   *          path of the page,
   *          params for payload
   * @return: respons5th Semester Fall-2022 / Fall-2020e<Promise>
   *
   */
  async _request(path, params) {
    const url = `${paths.BASE_URL}/${path}`;

    // configuration is specific for the timetable.edu.pk
    const config = {
      headers: {
        Cookie: `PHPSESSID=${this.sessionId}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return await axios.post(url, params, config);
  }
}

module.exports = { Sync };
