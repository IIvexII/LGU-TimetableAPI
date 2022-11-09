const { Semester, Degree, Section, Timetable } = require('../models');

class TimetableController {
  /* -----------------------------------
   *  getSemesters() fetch semesters
   *  from database
   * -----------------------------------
   * @params req, res
   * @response {
   *  semester_number: semester_full_name
   * }
   */
  static async getSemesters(req, res) {
    const semesters = await Semester.find({});
    const newSemesters = {};

    for (let semester of semesters) {
      newSemesters[semester._id] = semester.name;
    }

    res.send(newSemesters);
  }
  /* -----------------------------------
   *  getDegrees() fetch degrees
   *  from database
   * -----------------------------------
   * @params req, res
   * @response {
   *  degree_id: degree_name
   * }
   */
  static async getDegrees(req, res) {
    const semester = req.query.semester;

    const degrees = await Degree.find({
      'semester._id': semester,
    });
    const newDegrees = {};

    for (let degree of degrees) {
      newDegrees[degree.degreeId] = degree.degreeName;
    }

    res.send(newDegrees);
  }
  /* -----------------------------------
   *  getSections() fetch sections
   *  from database
   * -----------------------------------
   * @params req, res
   * @response {
   *  section_id: section_tag
   * }
   */
  static async getSections(req, res) {
    const semester = req.query.semester;
    const degree = req.query.degree;

    const sections = await Section.find({
      'degree.degreeName': degree,
      'degree.semester._id': semester,
    });
    const newSections = {};

    for (let section of sections) {
      newSections[section.sectionId] = section.sectionTag;
    }

    res.send(newSections);
  }
  /* -----------------------------------
   *  getTimetable() fetch timetable
   *  from database
   * -----------------------------------
   * @params req, res
   * @response {
   *  section_id: section_tag
   * }
   */
  static async getTimetable(req, res) {
    const semester = req.query.semester;
    const degree = req.query.degree;
    const section = req.query.section;

    const timetable = await Timetable.findOne({ semester, degree, section });

    res.send(timetable?.timetable);
  }
  static async getMetadata(req, res) {
    const sections = await Section.find({});
    const metadata = {};
    let data = {};

    for (let section of sections) {
      const semesterName = section.degree.semester.name;
      const degreeName = section.degree.degreeName;
      const sectionTag = section.sectionTag;

      let sectionArr = [];
      if (data[degreeName]?.length > 0) {
        sectionArr = data[degreeName];
        sectionArr.push(sectionTag);
      } else {
        sectionArr = [sectionTag];
      }

      data = {
        [degreeName]: sectionArr,
      };

      metadata[semesterName] = { ...metadata[semesterName], ...data };
    }
    res.send(metadata);
  }
}

module.exports = { TimetableController };
