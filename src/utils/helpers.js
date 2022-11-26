const { days } = require('../Enums');
const { Section: SectionModel } = require('../models');
/* ------------------------------------
 * This method calculates time
 * using the number of sessions and
 * previus time.
 *
 * Note: each will be equal to 30 and
 * previousTime has default value of
 * 8:00.
 * ------------------------------------
 *
 * @params: no. of sessions(Number), previous time(Object)
 * @return: Object<{
 *    hours: Number,
 *    minutes: Number
 *  }>
 */
function calculateTime(sessions, previousTime = { hours: 8, minutes: 0 }) {
  // store time in minutes including previous hours and minutes.
  const totalMinutes =
    30 * sessions + previousTime.hours * 60 + previousTime.minutes;

  let hours = Math.trunc(totalMinutes / 60);
  let minutes = totalMinutes % 60;

  const time = {
    hours,
    minutes,
  };

  return time;
}

function createDate(day, hours, minites) {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + 1 + days[day]);
  date.setHours(hours, minites, 0);
  return new Date(date.toLocaleString('en-us', { timeZone: 'Asia/Karachi' }));
}

async function verifyParams(semesterName, degreeId, sectionId) {
  // find the required data via section
  const section = await SectionModel.findOne({
    'degree.semester.name': semesterName,
    'degree.degreeId': degreeId,
    sectionId: sectionId,
  });

  if (section) {
    const {
      degree: {
        degreeName,
        semester: { _id: semesterId },
      },
      sectionTag: sectionName,
    } = section;

    return {
      semester: { semesterId, semesterName },
      degree: { degreeId, degreeName },
      section: { sectionId, sectionName },
    };
  }
}

module.exports = { calculateTime, createDate, verifyParams };
