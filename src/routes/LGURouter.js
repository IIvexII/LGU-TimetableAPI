const { Router } = require('express');
const { LGUController } = require('../controllers');

const router = Router();

router.get('/', LGUController.get);

module.exports = router;
