const express = require('express');
const router = express.Router();

const {
    uploadImage,
    uploadVideo,
    uploadFile,
    uploadImages,
    uploadFiles
} = require('../controllers/upload');

router.route('/image').post(uploadImage);
router.route('/images').post(uploadImages);
router.route('/video').post(uploadVideo);
router.route('/file').post(uploadFile);
router.route('/files').post(uploadImages);

module.exports = router;
