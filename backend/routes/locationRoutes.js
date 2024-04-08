const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/', locationController.createLocation);

router.get('/allLocation', locationController.getAllLocations);
router.post("/delete-location", locationController.deleteLocation);

module.exports = router;
