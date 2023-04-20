require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// morgan
const morgan = require('morgan');

// connectDB
const connectDB = require('./db/connect');

// auth middleware
const authenticatedUser = require('./middleware/authentication');

// router
const authRouetr = require('./routes/auth');

// error handler
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddlewarem = require('./middleware/not-found');

//middleware
app.use(express.json());
app.use(morgan('common'));

// routes
app.use('/api/v1/auth', authRouetr);

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
