const { JSDOM } = require('jsdom');

const paths = require('../Enums/paths');
const { Sync } = require('./Sync');

class Validator {
  constructor(sessionId) {
    this.sync = new Sync(sessionId);
  }
  /* --------------------------------------------
   * This method is used to see if a semester
   * exist on the offical website.
   *
   * Working: This works by send a request with
   * semester as param and get the programs this
   * semester offers. If it has more then one
   * program options available, semester is valid
   * and invalid otherwise.
   * ---------------------------------------------
   *
   * @params: semester<String>
   * @return: isExist<Boolean>
   *
   */
  async _isSemester(semester) {
    const res = await this.sync.fetch(paths.SEM, { semester });
    const { document } = new JSDOM(res.data).window;

    return document.querySelectorAll('option').length > 1;
  }

  /* --------------------------------------------
   * This method is used to see if a program
   * exist on the offical website.
   *
   * Working: Same as _isSemester() method but
   * searchs for specific program via programId
   * and then if it found 1 then return true and
   * false otherwise.
   * ---------------------------------------------
   *
   * @params: semester<String>, programId <Number>
   * @return: isExist<Boolean>
   */
  async _isProgram(semester, programId) {
    const res = await this.sync.fetch(paths.SEM, {
      semester,
      program: programId,
    });

    const { document } = new JSDOM(res.data).window;
    const programs = document.querySelectorAll(`option[value='${programId}']`);

    return programs.length === 1;
  }
}

module.exports = { Validator };
