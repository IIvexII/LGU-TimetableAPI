const { Router } = require('express');
const { GCController } = require('../controllers');

const router = Router();

router.get('/gc-integration', GCController.storeTimetable);

module.exports = router;
