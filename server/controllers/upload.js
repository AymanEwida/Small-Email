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
        throw new BadRequestError('No file uploaded.');
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

async function uploadImages (req, res) {
    if (!req.files) {
        throw new BadRequestError('No image uploaded.');
    }

    const images = req.files.images;

    let urls = []

    for (const image of images) {
        if (!image.mimetype.startsWith('image')) {
            throw new BadRequestError('Please upload an image.');
        } else {
            const result = await cloudinary.uploader.upload(
                image.tempFilePath,
                {
                    use_filename: true,
                    folder: 'Small-Email',
                    resource_type: 'image'
                }
            );

            urls.push({url: result.secure_url});
        }
    }

    res.status(StatusCodes.OK).json({ imgs: urls });
}

async function uploadFiles (req, res) {
    if (!req.files) {
        throw new BadRequestError('No image uploaded.');
    }

    const files = req.files.uploadedfiles;

    let uploadedFiles = []

    for (const file in files) {
        const result = await cloudinary.uploader.upload(
            file.tempFilePath,
            {
              use_filename: true,
              folder: 'Small-Email',
              resource_type: 'raw'
            }
        );

        uploadedFiles.push({filename: file.name, filePath: result.secure_url});
    }

    res.status(StatusCodes.OK).json({ files: uploadedFiles });
}

module.exports = {
    uploadImage,
    uploadVideo,
    uploadFile,
    uploadImages,
    uploadFiles
}
