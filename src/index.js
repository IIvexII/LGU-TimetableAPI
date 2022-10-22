const Timetable = require('./modules/Timetable');
const { Validator } = require('./modules/Validateor');

const sessionId = 'jjedrbhv59rmhc871qs1i7gv97';

const data = {
  semester: '5th Semester Fall-2022 / Fall-2020',
  program: '1',
  section: '10',
};

const timeTable = new Timetable(sessionId, data);

// timeTable.get().then((res) => {
//   console.log(res);
// });
const validator = new Validator(sessionId);
validator.validate(data).then((isExist) => {
  console.log(isExist);
});
