const authRouter = require('./auth');
const emailRouter = require('./email');
const userRouter = require('./user');
const groupRouter = require('./group');
const conversationRouter = require('./conversation');
const uploadRouter = require('./upload');

module.exports = {
    authRouter,
    emailRouter,
    userRouter,
    groupRouter,
    conversationRouter,
    uploadRouter
}
