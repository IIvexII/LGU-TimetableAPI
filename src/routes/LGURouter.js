const { Router } = require('express');
const { LGUController } = require('../controllers');
const { Session, Params } = require('../middlewares');

const router = Router();

router.get('/', Session.validate, Params.validate, LGUController.get);

module.exports = router;
