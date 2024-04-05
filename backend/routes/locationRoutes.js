const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/', locationController.createLocation);
router.get('/allLocation',locationController.getAllLocation);


module.exports = router;