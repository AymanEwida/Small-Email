require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

async function authMiddlerware (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invaled, please login.');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userID: payload.userID, username: payload.username };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invaled, please login.');
    }
}

module.exports = authMiddlerware;
