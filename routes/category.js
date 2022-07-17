// const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/Category');

/* GET Categorys listing. */
router.post('/', CategoryController.create);
// router.get('/', CategoryController.find);
router.put('/', CategoryController.update);
router.delete('/', CategoryController.deleteCategory);
router.get('/get_all', CategoryController.getAll);

module.exports = router;
