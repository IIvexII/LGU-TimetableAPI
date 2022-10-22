const { JSDOM } = require('jsdom');
const { Sync } = require('../modules/Sync');
const { paths } = require('../Enums');

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

    if (!sessionId) {
      return res.status(401).json(Session._error);
    }
    const sync = new Sync(sessionId);

    const response = await sync.fetch(paths.STT, {});
    const { document } = new JSDOM(response.data).window;

    if (document.querySelector('form legend')?.textContent) {
      return res.status(401).json(Session._error);
    }
    next();
  }
}

module.exports = { Session };
