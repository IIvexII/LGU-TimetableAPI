const { JSDOM } = require('jsdom');

const paths = require('./paths');
const { Sync } = require('./Sync');

class Validator {
  constructor(sessionId) {
    this.sync = new Sync(sessionId);
  }
  async semester(semester) {
    let isExist = false;

    await this.sync.fetch(paths.SEM, { semester }).then((res) => {
      // Convert the raw timetable into dom like object
      const { document } = new JSDOM(res.data).window;

      isExist = document.querySelectorAll('option').length > 1;
    });

    return isExist;
  }
}

// Test
const validator = new Validator('jjedrbhv59rmhc871qs1i7gv97');

validator.semester('Extra Enrolled Semester-Fall-022').then((isExist) => {
  console.log(isExist);
});

module.exports = { Validator };
