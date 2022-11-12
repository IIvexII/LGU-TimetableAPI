const { mongoose } = require('mongoose');
const { API } = require('../models/API');

class APIController {
  static async generate(req, res) {
    // generate new api
    const newAPI = new mongoose.Types.ObjectId().toHexString();

    // store api in database
    await API.create({ key: newAPI });

    // send api in response
    res.send(newAPI);
  }
  static async verify(key) {
    return !!(await API.findOne({ key }));
  }
}

module.exports = { APIController };
