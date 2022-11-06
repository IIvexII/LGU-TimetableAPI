const { Router } = require('express');
const { Session, Params } = require('../middlewares');
const { GCController } = require('../controllers');

const router = Router();

router.get(
  '/gc-integration',
  Session.validate,
  Params.validate,
  GCController.storeTimetable,
);

module.exports = router;
