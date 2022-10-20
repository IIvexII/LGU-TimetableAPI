const Timetable = require('./Timetable');

const sessionId = 'jjedrbhv59rmhc871qs1i7gv97';
const data = {
  semester: '5th Semester Fall-2022 / Fall-2020',
  program: '1',
  section: '1',
};

const timeTable = new Timetable(sessionId, data);

// console.log(timeTable._calculateTime(4, { hours: 8, minutes: 30 }));
timeTable.get().then((res) => {
  console.log(res.Monday);
});
