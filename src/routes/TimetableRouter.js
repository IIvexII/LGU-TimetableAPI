const { Router } = require('express');

const { TimetableController } = require('../controllers');

const router = Router();

router.get('/semesters', TimetableController.getSemesters);
router.get('/degrees', TimetableController.getDegrees);
router.get('/sections', TimetableController.getSections);

module.exports = router;
