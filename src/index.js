const { JSDOM } = require('jsdom');
const { Timetable } = require('./Timetable');

const sessionId = 'jjedrbhv59rmhc871qs1i7gv97';
const data = {
  semester: '5th Semester Fall-2022 / Fall-2020',
  program: '1',
  section: '1',
};

const timeTable = new Timetable(sessionId, data);

timeTable.fetch().then((result) => {
  const { document } = new JSDOM(result.data).window;

  const table = document.querySelector('#table-time tbody tr:nth-child(2)');

  console.log(table.querySelectorAll('td')[1].innerHTML);
});
