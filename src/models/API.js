const { mongoose } = require('../database/connection');

const APISchema = mongoose.Schema({
  key: { type: String, unique: true },
});

const API = mongoose.model('API', APISchema);

module.exports = { API, APISchema };
