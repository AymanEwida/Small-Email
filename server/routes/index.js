const authRouter = require('./auth');
const emailRouter = require('./email');
const userRouter = require('./user');
const groupRouter = require('./group');
const conversationRouter = require('./conversation');

module.exports = {
    authRouter,
    emailRouter,
    userRouter,
    groupRouter,
    conversationRouter
}
