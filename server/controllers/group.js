const Group = require('../models/Group');
const User = require('../models/User');
const Email = require('../models/Email');
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors');

async function getAllGroupsOfAUser (req, res) {
    const {
        user: { userID }
    } = req;

    const groups = await Group.find({});

    function findAllGroupsOfUser () {
        let userGroups = [];

        for (let i = 0; i < groups.length; i++) {
            for (let j = 0; j <groups[i].participates.length; j++) {
                const participateUserID = groups[i].participates[j].participateID.toString();

                if (participateUserID === userID) {
                    const {participates, ...others} = groups[i]._doc;
                    userGroups.push(others);
                }
            }
        }

        return userGroups;
    }

    const allGroupsOfAUser = findAllGroupsOfUser();

    res.status(StatusCodes.OK).json({ nHits: allGroupsOfAUser.length, allGroupsOfAUser });
}

async function createAGroup (req, res) {
    const { 
        user: { userID },
        body: { groupEmail, groupName, participates }
    } = req;

    if (!groupEmail || !groupName || !participates) {
        throw new BadRequestError('Please Provide email, name and participates for the group');
    }

    function removeDuplicatsFromParticipatesArray () {
        let newParticipatesArray = [];
        let flag = false;

        for (let i = 0; i < participates.length; i++) {
            for (let j = 0; j < participates.length-1-i; j++) {
                if (participates[i] === participates[j+i+1]) {
                    flag = true
                }
            }

            if (!flag) {
                newParticipatesArray.push(participates[i]);
            }
            flag = false;
        }

        return newParticipatesArray;
    }

    const participatesArray = removeDuplicatsFromParticipatesArray();

    const users = await Promise.all(
        participatesArray.map((participateEmail) => {
            return User.find({ email: participateEmail });
        })
    );

    function getValidUsers () {
        let us = [];
        
        users.map((user) => {
            if (user.length > 0) {
                if (user[0]._id.toString() !== userID) {
                    return us.push(user[0]);
                }
            }
        });

        return us;
    }

    function getParticipatesArray () {
        let participatesArray = [{participateID: userID, isAdmin: true}];

        const us = getValidUsers();

        us.map((user) => {
            return participatesArray.push({participateID: user._id, isAdmin: false});
        });

        return participatesArray;
    }

    req.body.groupCreator = req.user.userID;
    const group = await Group.create({ ...req.body, participates: getParticipatesArray() });
    res.status(StatusCodes.CREATED).json({ group });
}

async function getAllEmailsoFAGroup (req, res) {
    const {
        params: { id: groupID }
    } = req;

    const emails = await Email.find({});

    
    async function findEmailsForAGroup () {
        let emailsOfGroup = [];

        for (let i = 0; i < emails.length; i++) {
            for (let j = 0; j < emails[i].to.length; j++) {
                const recipientID = emails[i].to[j];

                if (recipientID.toString() === groupID) {
                    const userSender = await User.findById(emails[i].sender).select('username');
                    const {to, ...others} = emails[i]._doc;
                    others.sender = userSender;
                    emailsOfGroup.push(others);
                }
            }
        }

        return emailsOfGroup;
    }

    const allEmailsOfGroup = await findEmailsForAGroup();

    res.status(StatusCodes.OK).json({ nHits: allEmailsOfGroup.length, emails: allEmailsOfGroup });
}

async function getSingleGroup (req, res) {
    const {
        params: { id: groupID }
    } = req;

    const group = await Group.findById(groupID);

    if (!group) {
        throw new NotFoundError(`No group with id ${groupID}`);
    }

    res.status(StatusCodes.OK).json({ group });
}

async function isUserAdminOfTheGroup (groupID, userID) {
    const group = await Group.findById(groupID);

    if (!group) {
        throw new NotFoundError(`No group with id ${groupID}`);
    }

    for (let i = 0; i < group.participates.length; i++) {
        if (group.participates[i].participateID.toString() === userID) {
            return group.participates[i].isAdmin
        }
    }

    return false
}

async function updateGroup (req, res) {
    const {
        user: { userID },
        params: { id: groupID }
    } = req;

    if (req.body === {} || !req.body) {
        throw new BadRequestError('Provide a thing to change the group with it');
    }

    if (!(await isUserAdminOfTheGroup(groupID, userID))) {
        throw new UnauthenticatedError('Only the admins can update the group');
    }

    const group = await Group.findOneAndUpdate(
        {
            _id: groupID
        },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(StatusCodes.OK).json({ group });
}

async function deleteGroup (req, res) {
    const {
        user: { userID },
        params: { id: groupID }
    } = req;

    if (!(await isUserAdminOfTheGroup(groupID, userID))) {
        throw new UnauthenticatedError('Only the admins can update the group');
    }

    await Group.findOneAndRemove({ _id: groupID });

    res.status(StatusCodes.OK).json({ status: "success", email: null });
}

async function addNewParticipates (req, res) {
    const {
        user: { userID },
        params: { id: groupID },
        body: { newParticipates }
    } = req;

    if (!newParticipates || newParticipates.length === 0) {
        throw new BadRequestError('Please provide participates to add');
    }

    if (!(await isUserAdminOfTheGroup(groupID, userID))) {
        throw new UnauthenticatedError('Only the admins can add new participates');
    }

    const group = await Group.findById(groupID);
    
    function removeExistParticipates () {
        let newParticipatesArray = [];
        let flag = false;

        for (let i = 0; i < newParticipates.length; i++) {
            for (let j = 0; j < group.participates.length; j++) {
                const existParticipateID = group.participates[j].participateID.toString();

                if (existParticipateID === newParticipates[i].participateID) {
                    flag = true
                }
            }

            if (!flag) {
                newParticipatesArray.push(newParticipates[i]);
            }

            flag = false;
        }

        return newParticipatesArray
    }

    const existParticipates = group.participates;
    const updatedParticipates = existParticipates.concat(removeExistParticipates());

    await group.updateOne({ $set: { participates: updatedParticipates } });

    res.status(StatusCodes.OK).json({ msg: 'new participates have been added' });
}

async function removeParticipatesFromGroup (req, res) {
    const {
        user: { userID },
        params: { id: groupID },
        body: { participateID }
    } = req;

    if (!participateID || !participateID === '') {
        throw new BadRequestError('Please provide a participate to remove');
    }

    if (!(await isUserAdminOfTheGroup(groupID, userID))) {
        throw new UnauthenticatedError('Only the admins can remove a participate');
    }

    const group = await Group.findById(groupID);

    function findParticipate () {
        return group.participates.find((participate) => participate.participateID.toString() === participateID);
    }

    await group.updateOne({ $pull: { participates: findParticipate() } });

    res.status(StatusCodes.OK).json({ msg: 'participate have been removed' });
}

async function makeParticipateAnAdmin (req, res) {
    const {
        user: { userID },
        params: { id: groupID },
        body: { participateID }
    } = req;

    if (!participateID || !participateID === '') {
        throw new BadRequestError('Please provide a participate to make it an admin');
    }

    if (!(await isUserAdminOfTheGroup(groupID, userID))) {
        throw new UnauthenticatedError('Only the admins can make a participate an admin');
    }

    const group = await Group.findById(groupID);

    function makeParticipateAdmin () {
        let newParticipates = [];

        for (let i = 0; i < group.participates.length; i++) {
            const existParticipateID = group.participates[i].participateID.toString();
            
            if (existParticipateID === participateID) {
                newParticipates.push({participateID: participateID, isAdmin: true});
            } else {
                newParticipates.push(group.participates[i]);
            }
        }

        return newParticipates;
    }

    await group.updateOne({ $set: { participates: makeParticipateAdmin() } });

    res.status(StatusCodes.OK).json({ msg: 'participate is an admin now' });
}

async function removeAdminFromAUser (req, res) {
    const {
        user: { userID },
        params: { id: groupID }
    } = req;

    const group = await Group.findById(groupID);

    if (!group) {
        throw new NotFoundError(`No group with id ${groupID}`);
    }

    if (!(group.participates.find((participate) => participate.participateID.toString() === userID).isAdmin)) {
        throw new BadRequestError('You are already not an admin');
    }

    function removeUserAdmin () {
        let newParticipates = [];

        for (let i = 0; i < group.participates.length; i++) {
            const participateID = group.participates[i].participateID.toString();
            
            if (participateID === userID) {
                newParticipates.push({participateID: participateID, isAdmin: false});
            } else {
                newParticipates.push(group.participates[i]);
            }
        }

        return newParticipates;
    }

    await group.updateOne({ $set: { participates: removeUserAdmin() } });

    res.status(StatusCodes.OK).json({ msg: 'user is not an admin now' });
}

module.exports = {
    getAllGroupsOfAUser,
    createAGroup,
    getAllEmailsoFAGroup,
    getSingleGroup,
    updateGroup,
    deleteGroup,
    addNewParticipates,
    removeParticipatesFromGroup,
    makeParticipateAnAdmin,
    removeAdminFromAUser
}
