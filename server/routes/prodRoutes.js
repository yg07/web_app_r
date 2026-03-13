const express = require('express');
const router = express.Router();
const prodController = require('../controllers/prodController');

router.get('/prod', prodController.getAll);
router.post('/prod', prodController.create);
router.put('/prod', prodController.update);
router.delete('/prod', prodController.delete);

module.exports = router;
