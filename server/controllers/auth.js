const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

// register
async function register (req, res) {
    const checkSQLInjection = () => {
        for (let i = 0; i < req.body.password.length; i++) {
            if (req.body.password[i] === "'") {
                return false
            }
        }

        return true;
    }

    if (!checkSQLInjection()) {
        throw new BadRequestError("Password can not contain '");
    }

    const checkPassword = () => {
        let flagArray = [false, false, false, false];

        for (let i = 0; i < req.body.password.length; i++) {
            const letter = req.body.password[i]

            if (letter >= 'A' && letter <= 'Z') {
                flagArray[0] = true;
            }

            if (letter >= 'a' && letter <= 'z') {
                flagArray[1] = true;
            }

            if (letter >= '0' && letter <= '9') {
                flagArray[2] = true;
            }

            if (letter === '@' || letter === '#' || letter === '$' || letter === '%' || letter === '&' || letter === '*' || letter === '(' || letter === ')') {
                flagArray[3] = true;
            }
        }

        return flagArray;
    }

    const checkArray = checkPassword();

    if (!checkArray[0]) {
        throw new BadRequestError('Password must contain, at least one big letter');
    }else if (!checkArray[1]) {
        throw new BadRequestError('Password must contain, at least one small letter');
    }else if (!checkArray[2]) {
        throw new BadRequestError('Password must contain, at least one number');
    }else if (!checkArray[3]) {
        throw new BadRequestError('Password must contain, at least one special letter such: @ # $ % & * ( )');
    }

    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { username: user.username, userImg: user.userImg }, token });
}

//login
async function login (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    // comapre password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { username: user.username, userImg: user.userImg }, token });
}


module.exports = {
    register,
    login
}
