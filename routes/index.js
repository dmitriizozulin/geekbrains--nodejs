const express = require('express');

const mainRouter = require('./main');
const authRouter = require('./auth');
const actorsRouter = require('./actors');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/actors', actorsRouter);
router.use(mainRouter);

module.exports = router;
