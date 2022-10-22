const { JSDOM } = require('jsdom');
const { Sync } = require('../modules/Sync');
const { paths } = require('../Enums');

class Session {
  static async validate(sessionId) {
    const sync = new Sync(sessionId);

    const res = await sync.fetch(paths.STT, {});
    const { document } = new JSDOM(res.data).window;

    if (document.querySelector('form legend')?.textContent) {
      return false;
    }
    return true;
  }
}

module.exports = { Session };
