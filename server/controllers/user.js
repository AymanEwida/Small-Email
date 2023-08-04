const User = require('../models/User');
const Email = require('../models/Email');
const Group = require('../models/Group');
const bcrybt = require('bcryptjs');
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require('../errors');

async function searchUserByEmail (req, res) {
    const {
        query: { email }
    } = req;

    const searchedEmail = email.split('+').join(' ');

    const users = await User.find({}).select('email username userImg role');

    function findUser () {
        let foundUsers = [];

        for (let i = 0; i < users.length; i++) {
            const userEmail = users[i].email;

            if (userEmail.toLocaleLowerCase().includes(searchedEmail.toLocaleLowerCase()) && searchedEmail.length > 0) {
                foundUsers.push(users[i]);
            }
        }

        return foundUsers;
    }

    res.status(StatusCodes.OK).json({ users: findUser() });
}

async function searchForUserAndGroupByEmail (req, res) {
    const {
        query: { email }
    } = req;

    const searchedEmail = email.split('+').join(' ');

    const users = await User.find({}).select('email username userImg role');
    const groups = await Group.find({}).select('groupEmail groupName groupImg role');

    function findUserAndGroup () {
        let foundUsersAndGroups = [];

        for (let i = 0; i < users.length; i++) {
            const userEmail = users[i].email;

            if (userEmail.toLocaleLowerCase().includes(searchedEmail.toLocaleLowerCase()) && searchedEmail.length > 0) {
                foundUsersAndGroups.push(users[i]);
            }
        }

        for (let j = 0; j < groups.length; j++) {
            const groupEmail = groups[j].groupEmail;

            if (groupEmail.toLocaleLowerCase().includes(searchedEmail.toLocaleLowerCase())) {
                foundUsersAndGroups.push(groups[j]);
            }
        }

        return foundUsersAndGroups;
    }

    res.status(StatusCodes.OK).json({ usersAndGroups: findUserAndGroup() });

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

async function getUserSavedDrafts (req, res) {
    const {
        user: { userID }
    } = req;

    const user = await User.findById(userID);

    res.status(StatusCodes.OK).json({ nHits: user.savedDrafts.length, savedDrafts: user.savedDrafts });
}

async function addDraftToUserSavedDrafts (req, res) {
    const {
        user: { userID }
    } = req;

    const user = await User.findById(userID);

    if (req.body.to || req.body.to.length > 0) {

        function removeDuplicatsFromRecipientArray () {
            let newRecipientArray = [];
            let flag = false;

            for (let i = 0; i < req.body.to.length; i++) {
                for (let j = 0; j < req.body.to.length-1-i; j++) {
                    if (req.body.to[i] === req.body.to[j+i+1]) {
                        flag = true
                    }
                }

                if (!flag) {
                    newRecipientArray.push(req.body.to[i]);
                }
                flag = false;
            }

            return newRecipientArray;
        }

        const recipients = removeDuplicatsFromRecipientArray();

        async function checkGroupEmail () {
            let newToArray = [];

            for (let i = 0; i < recipients.length; i++) {
                if (recipients[i].slice(recipients[i].indexOf('@')) === '@sgroup.com') {
                    const group = await Group.findOne({ groupEmail: recipients[i] });
                    
                    if (group) {
                        for (let j = 0; j < group.participates.length; j++) {
                            if (group.participates[j].participateID.toString() === req.user.userID) {
                                newToArray.push(recipients[i]);
                            }
                        }   
                    }

                } else {
                    newToArray.push(recipients[i])
                }
            }

            return newToArray;
        }

        const newRecipientsA = await checkGroupEmail();

        const users = await Promise.all(
            newRecipientsA.map((recipientEmail) => {
                if (recipientEmail.slice(recipientEmail.indexOf('@')) === '@smail.com') {
                    return User.findOne({ email: recipientEmail });
                } else if (recipientEmail.slice(recipientEmail.indexOf('@')) === '@sgroup.com') {
                    return Group.findOne({ groupEmail: recipientEmail });
                }
            })
        );

        function removeNullFromUsersArray () {
            return users.filter((user) => user !== null);
        }

        const validUsers = removeNullFromUsersArray();

        if (validUsers.length === 0) {
            throw new BadRequestError('We did not found any of the recipients you provided');
        }

        function getToArray () {
            let toArray = [];

            validUsers.map((user) => {
                if (user.role === 'user') {
                    return toArray.push({recipientID: user._id, role: user.role, username: user.username});
                } else if (user.role === 'group') {
                    return toArray.push({recipientID: user._id, role: user.role, groupName: user.groupName});
                }
            });
            
            return toArray;
        }

        await user.updateOne({ $push: { savedDrafts: {...req.body, to: getToArray()} } });
    } else {
        await user.updateOne({ $push: { savedDrafts: { ...req.body } } });
    }

    res.status(StatusCodes.OK).json("Draft have been added.");
}

async function removeDraftFromUserSavedDrafts (req, res) {
    const {
        user: { userID },
        params: { id: draftID }
    } = req;

    const user = await User.findById(userID);
    await user.updateOne({ $pull: { savedDrafts: {_id: draftID} } });
    
    res.status(StatusCodes.OK).json({ status: "succes", draft: null });
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
    searchForUserAndGroupByEmail,
    updateUsername,
    changePassword,
    getUserSavedDrafts,
    addDraftToUserSavedDrafts,
    removeDraftFromUserSavedDrafts,
    sendTwoFactorAuthentication,
    enableTwoFactorAuthentication,
    deleteUser
}
