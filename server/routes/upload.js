const express = require('express');
const router = express.Router();

const {
    uploadImage,
    uploadVideo,
    uploadFile
} = require('../controllers/upload');

router.route('/image').post(uploadImage);
router.route('/video').post(uploadVideo);
router.route('/file').post(uploadFile);

module.exports = router;
