const cloudinary = require('cloudinary').v2;
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

async function uploadImage (req, res) {
    if (!req.files) {
        throw new BadRequestError('No image uploaded.');
    }

    const image = req.files.image;
    if (!image.mimetype.startsWith('image')) {
        throw new BadRequestError('Please upload an image.');
    }

    const result = await cloudinary.uploader.upload(
        image.tempFilePath,
        {
            use_filename: true,
            folder: 'Small-Email',
            resource_type: 'image'
        }
    );

    res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
}

async function uploadVideo (req, res) {
    if (!req.files) {
        throw new BadRequestError('No video uploaded.');
    }

    const video = req.files.video;
    if (!video.mimetype.startsWith('video')) {
        throw new BadRequestError('Please upload an video.');
    }

    const result = await cloudinary.uploader.upload(
        video.tempFilePath,
        {
          use_filename: true,
          folder: 'Small-Email',
          resource_type: 'video'
        }
    );

    res.status(StatusCodes.OK).json({ video: { src: result.secure_url } });
}

async function uploadFile (req, res) {
    if (!req.files) {
        throw new BadRequestError('No image uploaded.');
    }

    const file = req.files.file;

    const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
          use_filename: true,
          folder: 'Small-Email',
          resource_type: 'raw'
        }
    );

    res.status(StatusCodes.OK).json({ file: { src: result.secure_url, filename: file.name } });
}

module.exports = {
    uploadImage,
    uploadVideo,
    uploadFile
}
