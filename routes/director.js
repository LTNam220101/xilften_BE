// const express = require('express');
const router = express.Router();
const DirectorController = require('../controllers/Director');

/* GET Directors listing. */
router.post('/', DirectorController.create);
router.get('/', DirectorController.find);
router.put('/', DirectorController.update);
router.delete('/', DirectorController.deleteDirector);

module.exports = router;
