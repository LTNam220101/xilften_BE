// const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');

/* GET users listing. */
router.post('/', UserController.create);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.find);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.deleteUser);
router.post('/list_movies', UserController.getListMovies);
router.post('/add_to_favorites', UserController.addToFavorite)

module.exports = router;
