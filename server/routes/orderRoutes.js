const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/order', orderController.getAll);
router.post('/order', orderController.create);
router.put('/order', orderController.update);
router.delete('/order', orderController.delete);

module.exports = router;
