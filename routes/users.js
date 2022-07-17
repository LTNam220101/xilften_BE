// const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');

/* GET users listing. */
router.post('/', UserController.create);
router.get('/', UserController.find);
router.put('/', UserController.update);
router.delete('/', UserController.deleteUser);
router.post('/list_movie', UserController.getListMovies);

module.exports = router;
