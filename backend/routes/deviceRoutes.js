const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.post('/', deviceController.createDevice);
router.get('/allDevice',deviceController.getAllDevice);

module.exports = router;
