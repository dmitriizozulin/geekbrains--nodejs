const express = require('express');

const router = express.Router();

router.use('/', (req, res) => {
  res.render('index', { isAuthed: req.session.username });
});

module.exports = router;
