const { JSDOM } = require('jsdom');
const Timetable = require('./Timetable');

const sessionId = 'jjedrbhv59rmhc871qs1i7gv97';
const data = {
  semester: '5th Semester Fall-2022 / Fall-2020',
  program: '1',
  section: '1',
};

const timeTable = new Timetable(sessionId, data).fetch();

timeTable.then((result) => {
  const { document } = new JSDOM(result.data).window;

  const tdArr = document.querySelectorAll('#table-time tbody tr td');
  for (let td of tdArr) {
    const subject = td.querySelector('span.style2')?.innerHTML;
    const roomNo = td.querySelector('span.style3')?.innerHTML;
    if (subject && roomNo) {
      console.log('-----------------------------------');
      console.log(subject);
      console.log(roomNo);
      console.log('-----------------------------------');
    }
  }
});
