const express = require('express');

const controllers = require('../controllers');

const router = express.Router();

router.get('/:id', controllers.actors.getActorById);
router.get('/remove/:id', controllers.actors.removeActorById);
router.post('/add', controllers.actors.addActor);
router.get('/', controllers.actors.getAllActors);

module.exports = router;
