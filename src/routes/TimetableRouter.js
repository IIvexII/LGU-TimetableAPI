const { Router } = require('express');

const { TimetableController } = require('../controllers');
const { Params } = require('../middlewares');

const router = Router();

router.get('/semesters', TimetableController.getSemesters);

module.exports = router;
