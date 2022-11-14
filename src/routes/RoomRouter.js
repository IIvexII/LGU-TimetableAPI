const { Router } = require('express');

const { RoomController } = require('../controllers');

const router = Router();

router.get('/days', RoomController.getDays);

module.exports = router;
