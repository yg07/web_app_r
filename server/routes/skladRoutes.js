const express = require('express');
const router = express.Router();
const skladController = require('../controllers/skladController');

router.get('/sklad', skladController.getAll);
router.post('/sklad', skladController.create);
router.put('/sklad', skladController.update);
router.delete('/sklad', skladController.delete);

module.exports = router;
