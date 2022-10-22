const { JSDOM } = require('jsdom');

const paths = require('../Enums/paths');
const { Sync } = require('../modules/Sync');

class Params {
  static _error = {
    error: 'Please Provide all the parameters.',
    parameter: {
      session: 'required',
      semester: 'required',
      program: 'required',
      section: 'required',
    },
  };

  /* --------------------------------------------
   * Validate the data that is supposed to be sent
   * to the webite
   * ---------------------------------------------
   *
   * @params: req, res, next
   * @return: Response || undefined
   *
   */
  static async validate(req, res, next) {
    // prepare parameters
    const data = {
      session: req.query.session,
      semester: req.query.semester,
      program: req.query.program,
      section: req.query.section,
    };
    req.data = data;

    if (!data.session || !data.semester || !data.program || !data.section) {
      return res.status(400).send(Params._error);
    }
    const sync = new Sync(data.session);
    // This response contains programs which will
    // be used to check semesters and programs
    const semesterResponse = await sync.fetch(paths.SEM, {
      semester: data.semester,
    });

    // This response contains the all sections
    // with the information provided
    const sectionResponse = await sync.fetch(paths.SEM, {
      semester: data.semester,
      program: data.program,
    });

    const isSem = await Params._isSemester(semesterResponse.data);
    const isProg = await Params._isProgram(semesterResponse.data, data.program);
    const isSec = await Params._isSection(sectionResponse.data, data.section);

    const isValid = isSem && isProg && isSec;

    if (isValid) {
      next();
    } else {
      return res.status(400).send(Params._error);
    }
  }
  /* --------------------------------------------
   * This method is used to see if a semester
   * exist on the offical website.
   * ---------------------------------------------
   *
   * @params: semesterOpts<HTMLElements>
   * @return: isExist<Boolean>
   *
   */
  static async _isSemester(semesterOpts) {
    const { document } = new JSDOM(semesterOpts).window;

    const isExist = document.querySelectorAll('option').length > 1;
    return isExist;
  }

  /* --------------------------------------------
   * This method is used to see if a program
   * exist on the offical website.
   * ---------------------------------------------
   *
   * @params: programOpts<HTMLElements>, programId <Number>
   * @return: isExist<Boolean>
   *
   */
  static async _isProgram(programOpts, programId) {
    const { document } = new JSDOM(programOpts).window;
    const programs = document.querySelectorAll(`option[value='${programId}']`);

    const isExist = programs.length === 1;
    return isExist;
  }
  /* --------------------------------------------
   * This method is used to see if a section
   * exist on the offical website.
   * ---------------------------------------------
   *
   * @params: sectionOpts<HTMLElements>, sectionId <Number>
   *
   * @return: isExist<Boolean>
   *
   */
  static async _isSection(sectionOpts, sectionId) {
    const { document } = new JSDOM(sectionOpts).window;
    const sections = document.querySelectorAll(`option[value='${sectionId}']`);

    const isExist = sections.length === 1;
    return isExist;
  }
}

module.exports = { Params };
