const User = require('../models/User');
const Email = require('../models/Email');
const bcrybt = require('bcryptjs');
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require('../errors');

async function searchUserByEmail (req, res) {
    const {
        query: { email }
    } = req;

    const searchedEmail = email.split('+').join(' ');

    const users = await User.find({}).select('email');

    function findUser () {
        let foundUsers = [];

        for (let i = 0; i < users.length; i++) {
            const userEmail = users[i].email;

            if (userEmail.toLocaleLowerCase().includes(searchedEmail.toLocaleLowerCase())) {
                foundUsers.push(users[i]);
            }
        }

        return foundUsers;
    }

    res.status(StatusCodes.OK).json({ users: findUser() });
}

async function updateUsername (req, res) {
    const {
        user: { userID },
        body: { password, newUsername }
    } = req;

    if (!newUsername) {
        throw new BadRequestError('Please a newUsername');
    }

    const user = await User.findById(userID);

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    await user.updateOne({ $set: { username: newUsername } });

    res.status(StatusCodes.OK).json({ msg: 'Username has been update.' });
}

async function changePassword (req, res) {
    const {
        user: { userID },
        body: { oldPassword, newPassword }
    } = req;

    if (!newPassword) {
        throw new BadRequestError('Please provide a new password');
    }

    if (newPassword === oldPassword) {
        throw new BadRequestError('Please choose anthor password from your current one');
    }

    const checkSQLInjection = () => {
        for (let i = 0; i < newPassword.length; i++) {
            if (newPassword[i] === "'") {
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

        for (let i = 0; i < newPassword.length; i++) {
            const letter = newPassword[i]

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

    const user = await User.findById(userID);

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const salt = await bcrybt.genSalt(10);
    const hashedNewPassword = await bcrybt.hash(newPassword, salt);

    await user.updateOne({ $set: { password: hashedNewPassword } });

    res.status(StatusCodes.OK).json({ msg: 'Password has been changed.' });
}

async function sendTwoFactorAuthentication (req, res) {
    // TODO: twilio package
    res.status(StatusCodes.OK).json({ msg: 'TODO twilio package' });
}

async function enableTwoFactorAuthentication (req, res) {
    const {
        user: { userID }
    } = req;

    const user = await User.findById(userID);
    await user.updateOne({ $set: { isTwoFactorAuth: true } })

    res.status(StatusCodes.OK).json({ msg: '2FA has been enabled.' });
}

async function deleteUser (req, res) {
    const {
        user: { userID }
    } = req;

    await User.findOneAndRemove({ _id: userID });
    await Email.deleteMany({ sender: userID });

    res.status(StatusCodes.OK).json({ status: "success", user: null, emails: null })
}


module.exports = {
    searchUserByEmail,
    updateUsername,
    changePassword,
    sendTwoFactorAuthentication,
    enableTwoFactorAuthentication,
    deleteUser
}
