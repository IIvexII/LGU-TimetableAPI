const { Semester, Degree, Section } = require('../scrapper');

class Params {
  static _error = {
    error: 'Please Provide all the parameters with correct information.',
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
    const session = req.query.session;
    const semester = await new Semester(session).getById(req.query.semester);
    const degree = await new Degree(session, semester.name).getByName(
      req.query.degree,
    );

    const section = await new Section(
      session,
      semester.name,
      degree.id,
    ).getByName(req.query.section);

    const data = {
      session,
      semester: semester.name,
      program: degree.id,
      section: section.id,
    };
    req.data = data;

    if (!data.session || !data.semester || !data.program || !data.section) {
      return res.status(400).send(Params._error);
    } else {
      next();
    }
  }
}

module.exports = { Params };
