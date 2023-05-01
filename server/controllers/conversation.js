const Conversation = require('../models/Conversation');
const Group = require('../models/Group');
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors');

async function checkUser (groupID, userID) {
    const group = await Group.findById(groupID);

    if (!group) {
        throw new NotFoundError(`No group with id ${groupID}`);
    }

    for (let i = 0; i < group.participates.length; i++) {
        if (group.participates[i].participateID.toString() === userID) {
            return true
        }
    }

    return false
}

async function getConversationOfGroup (req, res) {
    const {
        user: { userID },
        params: { id: groupID }
    } = req;

    if (!(await checkUser(groupID, userID))) {
        throw new UnauthenticatedError('You are not a member of the group');
    }

    const conversations = await Conversation.find({ groupID }); 

    res.status(StatusCodes.OK).json({ conversations });
}

async function sendMessageToConversation (req, res) {
    const {
        user: { userID },
        params: { id: groupID }
    } = req;
    
    if (!(await checkUser(groupID, userID))) {
        throw new UnauthenticatedError('You are not a member of the group');
    }

    if (!req.body.messageContent || req.body.messageContent === '') {
        throw new BadRequestError('Please provide content to the message');
    }

    req.body.groupID = groupID;
    req.body.messageSender = userID;
    const conversation = await Conversation.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ conversation });
}

async function deleteMessageFromConversation (req, res) {
    const {
        user: { userID },
        params: { id: conversationID },
        query: { groupID }
    } = req;

    if (!(await checkUser(groupID, userID))) {
        throw new UnauthenticatedError('You are not a member of the group');
    }

    const conversation = await Conversation.findOneAndRemove({ _id: conversationID, groupID, messageSender: userID });

    if (!conversation) {
        throw new UnauthenticatedError('You are not the sender of the message');
    }

    res.status(StatusCodes.OK).json({ status: "success", message: null });
}

module.exports = {
    getConversationOfGroup,
    sendMessageToConversation,
    deleteMessageFromConversation
}
