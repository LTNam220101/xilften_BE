// const express = require('express');
const router = express.Router();
const ShelfController = require('../controllers/Shelf');

/* GET Shelfs listing. */
router.post('/', ShelfController.create);
router.post('/get_list', ShelfController.findByUser);
// router.put('/', ShelfController.update);
router.delete('/', ShelfController.deleteFromShelf);

module.exports = router;
// 627f7e4b6d69f39afbbba4ce
// 627f906080c69cc1bdfbce1b