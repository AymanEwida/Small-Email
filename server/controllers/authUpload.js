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

module.exports = {
    uploadImage
}
