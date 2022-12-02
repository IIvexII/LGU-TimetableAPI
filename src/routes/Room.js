const { Router } = require('express');

const { RoomController } = require('../controllers');

const router = Router();

router.get('/days', RoomController.getDays);
router.get('/rooms', RoomController.getRooms);
router.get('/freeRooms', RoomController.getFreeRooms);

module.exports = router;
