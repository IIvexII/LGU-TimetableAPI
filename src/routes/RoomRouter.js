const { Router } = require('express');

const { RoomController } = require('../controllers');

const router = Router();

router.get('/days', RoomController.getDays);
router.get('/rooms', RoomController.getRooms);
router.get('/allFreeRooms', RoomController.getFreeRooms);
router.get('/freeRooms', RoomController.getSpecificFreeRooms);

module.exports = router;
