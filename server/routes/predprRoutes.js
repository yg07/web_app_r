const express = require('express');
const router = express.Router();
const predprController = require('../controllers/predprController');

router.get('/predpr', predprController.getAll);
router.post('/predpr', predprController.create);
router.put('/predpr', predprController.update);
router.delete('/predpr', predprController.delete);

module.exports = router;
