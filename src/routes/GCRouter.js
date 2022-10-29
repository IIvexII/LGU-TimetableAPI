const { Router } = require('express');
const { GCController } = require('../controllers');

const router = Router();

router.get('/gc-integration', GCController.syncTimetable);

module.exports = router;
