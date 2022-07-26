// const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/Movie');
const middleware = require('../range')

/* GET Movies listing. */
router.post('/', MovieController.create);
router.get('/:id', MovieController.getDetailMovie);
router.put('/:id', MovieController.update);
router.delete('/:id', MovieController.deleteMovie);
router.get('/', middleware, MovieController.getAllMovies);
router.post('/list_movies', middleware, MovieController.getListMovies);
router.get('/update_count/:id', middleware, MovieController.updateCount);
router.post('/rating/:id', middleware, MovieController.updateRating);
router.get('/get_by_category', MovieController.getMovieByCategory);
router.get('/get_by_actor', MovieController.getMovieByActor);
router.get('/get_by_director', MovieController.getMovieByDirector);

module.exports = router;
