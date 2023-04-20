const { StatusCodes } = require('http-status-codes');

const notFoundMiddleware = (req, res) => res.status(StatusCodes.NOT_FOUND).send("Rout does not exist");

module.exports = notFoundMiddleware;