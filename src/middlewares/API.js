const { APIController } = require('../controllers/APIController');

class API {
  static _error = {
    error:
      'You are unauthorized! please provide correct API key to access this route',
  };

  static async verify(req, res, next) {
    const key = req.query.api;
    const isVerified = await APIController.verify(key);

    if (isVerified) {
      return next();
    } else {
      res.send(API._error);
    }
  }
}

module.exports = { API };
