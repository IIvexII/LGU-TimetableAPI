const { Router } = require('express');
const { LGUTimetable } = require('../controllers/LGUTimetable');
const { Timetable } = require('../models');

const router = Router();

router.get('/', LGUTimetable.get);

module.exports = router;
