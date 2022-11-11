const { Router } = require('express');
const { PopulateController } = require('../controllers');
const { Session, Params } = require('../middlewares');

const router = Router();
router.use(Session.validate);

router.get('/populate', PopulateController.populate);
router.get(
  '/populateTimetable',
  Params.validate,
  PopulateController.populateTimetable,
);

module.exports = router;
