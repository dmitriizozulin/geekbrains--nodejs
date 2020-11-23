const express = require('express');

const controllers = require('../controllers');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/auth/login');
});
router.get('/login', controllers.auth.getLogin);
router.post('/login', controllers.auth.postLogin);
router.get('/logout', controllers.auth.logout);
router.get('/signup', controllers.auth.getRegistration);
router.post('/signup', controllers.auth.postRegistration);

module.exports = router;
