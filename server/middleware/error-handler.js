const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    const customErorr = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Somthing went wrong please try again later',
    }

    if (err.name === 'ValidationError') {
        const failedFiled = Object.values(err.errors).map(filed => filed.properties)[0];

        if (failedFiled.type === 'minlength') {
            customErorr.msg = `${failedFiled.path} filed must be minimum ${failedFiled.minlength} characters, got ${failedFiled.value}`;
        }

        if (failedFiled.type === 'maxlength') {
            customErorr.msg = `${failedFiled.path} filed must be maximum ${failedFiled.maxlength} characters, got ${failedFiled.value}`
        }

        if (failedFiled.type === 'min') {
            customErorr.msg = `${failedFiled.path} filed must be minimum ${failedFiled.min}, got ${failedFiled.value}`
        }

        if (failedFiled.type === 'max') {
            customErorr.msg = `${failedFiled.path} filed must be maximum ${failedFiled.max}, got ${failedFiled.value}`
        }

        if (failedFiled.type === 'required') {
            customErorr.msg = failedFiled.message;
        }

        if (failedFiled.type === 'regexp') {
            customErorr.msg = failedFiled.message;
        }
        customErorr.statusCode = StatusCodes.BAD_REQUEST;
    }

    if (err.name === 'CastError') {
        customErorr.msg = `There is no order with id ${err.value}`;
        customErorr.statusCode = StatusCodes.NOT_FOUND;
    }

    if (err.code && err.code === 11000){
        customErorr.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} filed, please choose another value`
        customErorr.statusCode = StatusCodes.BAD_REQUEST;
    }
    
    return res.status(customErorr.statusCode).json({ msg: customErorr.msg });
}

module.exports = errorHandlerMiddleware;