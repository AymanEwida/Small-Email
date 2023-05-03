require('dotenv').config();
require('express-async-errors');

// security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean'); 

const express = require('express');
const app = express();

// morgan
const morgan = require('morgan');

// connectDB
const connectDB = require('./db/connect');

// auth middleware
const authenticatedUser = require('./middleware/authentication');

// routers
const {
    authRouter,
    emailRouter,
    userRouter,
    groupRouter,
    conversationRouter
} = require('./routes');

// error handler
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddlewarem = require('./middleware/not-found');

//middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(morgan('common'));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/email', authenticatedUser, emailRouter);
app.use('/api/v1/user', authenticatedUser, userRouter);
app.use('/api/v1/group', authenticatedUser, groupRouter);
app.use('/api/v1/conversation', authenticatedUser, conversationRouter);

// errors middlerware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddlewarem);

// port
const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
