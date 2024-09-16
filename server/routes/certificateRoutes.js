// const express = require('express');
// const router = express.Router();
// const certificateController = require('../controllers/certificateController');

// // Define route for uploading certificates
// router.post('/upload', certificateController.upload, certificateController.uploadCertificate);

// module.exports = router;


const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

// Route to handle certificate upload
router.post('/upload', certificateController.uploadCertificate);

module.exports = router;
