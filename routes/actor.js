// const express = require('express');
const router = express.Router();
const ActorController = require('../controllers/Actor');

/* GET Actors listing. */
router.post('/', ActorController.create);
router.get('/', ActorController.find);
router.put('/', ActorController.update);
router.delete('/', ActorController.deleteActor);

module.exports = router;
