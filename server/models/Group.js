const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema(
    {
        groupEmail: {
            type: String,
            required: [true, "Please provide an email"],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide valid email"
            ],
            unique: true
        },

        groupName: {
            type: String,
            required: [true, "Please provide a name"],
            unique: true
        },

        groupImg: {
            type: String,
            required: false,
            default: ''
        },

        groupDesc: {
            type: String,
            required: false,
            default: ''
        },

        participates: {
            type: [{participateID: mongoose.Types.ObjectId, isAdmin: Boolean}],
            ref: 'User',
            required: true
        },

        groupCreator: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },

        role: {
            type: String,
            required: false,
            default: 'group'
        }
    },
    
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Group", GroupSchema);