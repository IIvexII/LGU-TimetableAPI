const { Router } = require('express');
const { Session, Params } = require('../middlewares');
const { Timetable } = require('../models');

const router = Router();

router.get('/', Session.validate, Params.validate, async (req, res) => {
  const { session, semester, program, section } = req.data;

  const timetable = new Timetable(session, semester, program, section);
  res.send(await timetable.getAll());
});

module.exports = router;
