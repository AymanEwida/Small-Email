const Email = require('../models/Email');
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require('../errors');

async function getAllEmailsOfUser (req, res) {
    const {
        user: { email }
    } = req;

    const emails = await Email.find({}).sort('-createdAt');

    function findEmailsForAUser () {
        let emailsOfUser = [];

        for (let i = 0; i < emails.length; i++) {
            for (let j = 0; j < emails[i].to.length; j++) {
                const recipientEmail = emails[i].to[j];

                if (recipientEmail === email) {
                    const {to, ...others} = emails[i]._doc;
                    emailsOfUser.push(others);
                }
            }
        }

        return emailsOfUser;
    }

    const allEmailsOfUser = findEmailsForAUser();

    res.status(StatusCodes.OK).json({ nHits: allEmailsOfUser.length, emails: allEmailsOfUser });
}

async function sendEmail (req, res) {
    if (!req.body.to || req.body.to.length === 0) {
        throw new BadRequestError('You need to provide the emails you want to send to');
    }

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

    req.body.sender = req.user.userID;
    const email = await Email.create({ ...req.body, to: removeDuplicatsFromRecipientArray() });
    res.status(StatusCodes.CREATED).json({ email });
}

async function deleteEmail (req, res) {
    const {
        user: { userID },
        params: { id: emailID }
    } = req;
    
    const email = await Email.findOneAndRemove({ _id: emailID, sender: userID });

    if (!email) {
        throw new NotFoundError(`No email with id ${emailID}`);
    }

    res.status(StatusCodes.OK).json({ status: "success", email: null });
}

async function updateEmail (req, res) {
    const { 
        user: { userID }, 
        params: { id: emailID },  
    } = req;

    if (req.body === {}) {
        throw new BadRequestError('Provide some Thing to change the email with it');
    }

    const email = await Email.findOneAndUpdate(
        {
            _id: emailID,
            sender: userID
        },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!email) {
        throw new NotFoundError(`No order with id ${emailID}`);
    }

    res.status(StatusCodes.OK).json({ email });
}

async function getSingleEmail (req, res) {
    const { 
        params: { id: emailID },  
    } = req;

    const email = await Email.findOne({ _id: emailID });

    if (!email) {
        throw new NotFoundError(`No order with id ${emailID}`);
    }

    res.status(StatusCodes.OK).json({ email });
}

module.exports = {
    getAllEmailsOfUser,
    sendEmail,
    deleteEmail,
    updateEmail,
    getSingleEmail
}
