const Email = require('../models/Email');
const User = require('../models/User');
const Group = require('../models/Group');
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require('../errors');

async function getAllEmailsOfUser (req, res) {
    const {
        user: { userID }
    } = req;

    const emails = await Email.find({}).sort('-createdAt');

    async function findEmailsForAUser () {
        let emailsOfUser = [];

        for (let i = 0; i < emails.length; i++) {
            for (let j = 0; j < emails[i].to.length; j++) {
                const recipientID = emails[i].to[j].recipientID;

                if (recipientID.toString() === userID) {
                    const userSender = await User.findById(emails[i].sender).select('username');
                    const {to, ...others} = emails[i]._doc;
                    others.sender = userSender;
                    emailsOfUser.push(others);
                }
            }
        }

        return emailsOfUser;
    }

    const allEmailsOfUser = await findEmailsForAUser();

    res.status(StatusCodes.OK).json({ nHits: allEmailsOfUser.length, emails: allEmailsOfUser });
}

async function getAllEmailThatSentByUser (req, res) {
    const {
        user: { userID }
    } = req;

    const emails = await Email.find({ sender: userID });

    async function findRecipients () {
        let sentEmails = [];

        for (let i = 0; i < emails.length; i++) {
            const recipientArray = emails[i].to;

            const recipientUsers = await Promise.all(
                recipientArray.map((recipient) => {
                    if (recipient.role === 'user') {
                        return User.findById(recipient.recipientID).select('username');
                    }else if (recipient.role === 'group') {
                        return Group.findById(recipient.recipientID).select('groupName');
                    }
                })
            );

            sentEmails.push({ ...emails[i]._doc, to: recipientUsers });
        }

        return sentEmails;
    }

    const sentEmails = await findRecipients();

    res.status(StatusCodes.OK).json({ nHits: sentEmails.length, sentEmails });
}

async function sendEmail (req, res) {
    if (!req.body.to || req.body.to.length === 0) {
        throw new BadRequestError('You need to provide the recipients you want to send to');
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
        throw new BadRequestError('When did not found any of the recipients you provided');
    }

    function getToArray () {
        let toArray = [];

        validUsers.map((user) => {
            return toArray.push({recipientID: user._id, role: user.role});
        });
        
        return toArray;
    }


    req.body.sender = req.user.userID;
    const email = await Email.create({ ...req.body, to: getToArray() });
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

    if (req.body.length === 0) {
        throw new BadRequestError('Provide a thing to change the email with it');
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
        throw new BadRequestError('When did not found any of the recipients you provided');
    }

    function getToArray () {
        let toArray = [];

        validUsers.map((user) => {
            return toArray.push({recipientID: user._id, role: user.role});
        });
        
        return toArray;
    }

    req.body.to = getToArray();

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
        throw new NotFoundError(`No email with id ${emailID}`);
    }

    res.status(StatusCodes.OK).json({ email });
}

async function getSingleEmail (req, res) {
    const { 
        params: { id: emailID },  
    } = req;

    const email = await Email.findOne({ _id: emailID });

    if (!email) {
        throw new NotFoundError(`No email with id ${emailID}`);
    }

    const userSender = await User.findById(email.sender).select('username email userImg');
    email.sender = userSender

    function getRecipients () {
        return Promise.all(email.to.map((recipient) => {
            if (recipient.role === "user") {
                return User.findById(recipient.recipientID).select("email");
            } else if (recipient.role === "group") {
                return Group.findById(recipient.recipientID).select("groupEmail");
            }
        }));
    }

    async function setToArray () {
        const recipients = await getRecipients();

        let newToArray = []

        for (let i = 0; i < email.to.length; i++) {
            const recipient = email.to[i];
            newToArray.push({...recipient._doc, user: {email: recipients[i].email || recipients[i].groupEmail}});
        }

        return newToArray;
    }

    const toArray = await setToArray();
    email.to = toArray;

    res.status(StatusCodes.OK).json({ email });
}

module.exports = {
    getAllEmailsOfUser,
    getAllEmailThatSentByUser,
    sendEmail,
    deleteEmail,
    updateEmail,
    getSingleEmail
}
