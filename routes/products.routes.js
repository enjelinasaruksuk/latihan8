const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const { authBearer } = require('../middlewares/auth.middleware');

// Routes untuk products (GET tidak perlu auth)
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

// Routes yang memerlukan auth
router.post('/', authBearer, productsController.createProduct);
router.put('/:id', authBearer, productsController.updateProduct);
router.delete('/:id', authBearer, productsController.deleteProduct);

module.exports = router;