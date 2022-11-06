const { Semester } = require('../scrapper');

class Session {
  static _error = {
    error: 'You are unauthorized! please provide session',
  };

  /* --------------------------------------------
   * Validate the session that is used for auth-
   * enticate the request to the website.
   * ---------------------------------------------
   *
   * @params: req, res, next
   * @return: Response || undefined
   *
   */
  static async validate(req, res, next) {
    const sessionId = req.query.session;

    const semester = new Semester(sessionId);
    const semesters = Object.keys(await semester.getAll());
    if (semesters.length === 0) {
      return res.json(Session._error);
    }
    next();
  }
}

module.exports = { Session };
