const { Router } = require('express');
const { PopulateController } = require('../controllers');
const { Session, Params } = require('../middlewares');

const router = Router();
router.use(Session.validate);

router.get('/populate', PopulateController.populate);
router.get('/populateSemesters', PopulateController.populateSemesters);
router.get('/populateDegrees', PopulateController.populateDegrees);
router.get('/populateSections', PopulateController.populateSections);
router.get('/populateTimetables', PopulateController.populateTimetables);
router.get(
  '/populateOneTimetable',
  Params.validate,
  PopulateController.populateOneTimetable,
);

module.exports = router;
