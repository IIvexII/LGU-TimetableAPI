const { JSDOM } = require('jsdom');

const paths = require('../Enums/paths');
const { Sync } = require('./Sync');

class Validator {
  constructor(sessionId) {
    this.sync = new Sync(sessionId);
  }
  /* --------------------------------------------
   * Validate the data that is supposed to be sent
   * to the webite
   * ---------------------------------------------
   *
   * @params: data<{
   *  semester: String,
   *  program: String,
   *  section: String,
   * }>
   * @return: isValid<Boolean>
   *
   */
  async validate({ semester, program, section }) {
    // This response contains programs which will
    // be used to check semesters and programs
    const semesterResponse = await this.sync.fetch(paths.SEM, { semester });

    // This response contains the all sections
    // with the information provided
    const sectionResponse = await this.sync.fetch(paths.SEM, {
      semester,
      program,
    });

    const isSem = await this._isSemester(semesterResponse.data);
    const isProg = await this._isProgram(semesterResponse.data, program);
    const isSec = await this._isSection(sectionResponse.data, section);

    const isValid = isSem && isProg && isSec;
    return isValid;
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
  async _isSemester(semesterOpts) {
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
  async _isProgram(programOpts, programId) {
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
  async _isSection(sectionOpts, sectionId) {
    const { document } = new JSDOM(sectionOpts).window;
    const sections = document.querySelectorAll(`option[value='${sectionId}']`);

    const isExist = sections.length === 1;
    return isExist;
  }
}

module.exports = { Validator };
