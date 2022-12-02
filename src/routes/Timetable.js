const { Router } = require('express');

const { TimetableController } = require('../controllers');

const router = Router();

router.get('/metadata', TimetableController.getMetadata);
router.get('/semesters', TimetableController.getSemesters);
router.get('/degrees', TimetableController.getDegrees);
router.get('/sections', TimetableController.getSections);
router.get('/timetable', TimetableController.getTimetable);

module.exports = router;
