const express = require('express');
const router = express.Router();
const specController = require('../controllers/specController');

router.get('/spec', specController.getAll);
router.post('/spec', specController.create);
router.put('/spec', specController.update);
router.delete('/spec', specController.delete);
router.post('/spec/by-order', specController.getSpecByOrderID);

module.exports = router;