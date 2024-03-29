// const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/Rating');

/* GET Ratings listing. */
router.post('/', RatingController.create);
router.post('/get_rating', RatingController.find);
// router.put('/', RatingController.update);
// router.delete('/', RatingController.deleteRating);

module.exports = router;
