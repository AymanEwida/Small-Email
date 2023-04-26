const authRouter = require('./auth');
const emailRouter = require('./email');
const userRouter = require('./user');
const groupRouter = require('./group');

module.exports = {
    authRouter,
    emailRouter,
    userRouter,
    groupRouter
}
