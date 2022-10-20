const axios = require('axios');

// This object Contain the paths of timetable.edu.pk
const PATHS = {
  semesterTimetable: 'Semesters/semester_info/SEMESTER_TIMETABLE.php',
};

/*
 * This class is responsible for fetching
 * data from timetable.lgu.edu.pk
 */
class Timetable {
  /*
   * @params: sessionId and data(to send)
   *
   */
  constructor(sessionId, data) {
    this.baseUrl = 'https://timetable.lgu.edu.pk';

    this.sessionId = sessionId;
    this.data = data;
  }
  fetch() {
    return axios.post(`${this.baseUrl}/${PATHS.semesterTimetable}`, this.data, {
      headers: {
        Cookie: `PHPSESSID=${this.sessionId}`,
        // Remove the https:// from the baseurl
        Host: this.baseUrl.slice(8),
        'Content-Length': '65',
        'Cache-Control': 'max-age=0',
        'Sec-Ch-Ua': '"Not;A=Brand";v="99", "Chromium";v="106"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': 'Linux',
        'Upgrade-Insecure-Requests': '1',
        Origin: this.baseUrl,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.62 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Dest': 'document',
        Referer: `${this.baseUrl}/${PATHS.semesterTimetable}`,
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9',
        Connection: 'close',
      },
    });
  }
}

module.exports = { Timetable };
