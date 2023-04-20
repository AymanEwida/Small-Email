const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    const customErorr = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Somthing went wrong please try again later',
    }
    
    return res.status(customErorr.statusCode).json({ msg: customErorr.msg });
}

module.exports = errorHandlerMiddleware;