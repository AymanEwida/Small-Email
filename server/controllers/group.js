const Group = require('../models/Group');
const User = require('../models/User');
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require('../errors');

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

module.exports = {
    getAllGroupsOfAUser,
    createAGroup
}
