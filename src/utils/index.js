const { Sync } = require('./Sync');
const helpers = require('./helpers');

module.exports = {
  calculateTime: helpers.calculateTime,
  createDate: helpers.createDate,
  fixTime: helpers.fixTime,
  arrayToObject: helpers.arrayToObject,
  Sync,
};
