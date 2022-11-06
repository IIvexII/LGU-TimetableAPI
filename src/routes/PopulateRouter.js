const { Router } = require('express');
const { PopulateController } = require('../controllers');
const { Session } = require('../middlewares');

const router = Router();

router.get('/populate', Session.validate, PopulateController.populate);

module.exports = router;
