const express = require('express');
const router = express.Router();
const categController = require('../controllers/categController');

router.get('/categ', categController.getAll);
router.post('/categ', categController.create);
router.put('/categ', categController.update);
router.delete('/categ', categController.delete);

module.exports = router;
