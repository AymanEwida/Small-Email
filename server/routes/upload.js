const express = require('express');
const router = express.Router();

const {
    uploadImage,
    uploadVideo,
    uploadFile,
    uploadTest
} = require('../controllers/upload');

router.route('/image').post(uploadImage);
router.route('/video').post(uploadVideo);
router.route('/file').post(uploadFile);
router.route('/test').post(uploadTest);

module.exports = router;
