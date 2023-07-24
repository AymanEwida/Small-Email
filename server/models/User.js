require('dotenv').config();
const mongoose = require('mongoose');
const bcrybt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SavedDraft = new mongoose.Schema(
    {
        to: {
            type: [{recipientID: mongoose.Types.ObjectId, role: String, username: String, groupName: String }],
            required: false,
        },

        draftSubject: {
            type: String,
            required: false,
            default: '',
            maxlength: 50,
        },

        draftContent: {
            type: String,
            default: '',
            require: false, 
        },

        draftFiles: {
            type: [{filename: String, filePath: String}],
            default: [],
            required: false,
        },
        
        draftImgs: {
            type: [{url: String}],
            default: [],
            required: false,
        }
    },

    {
        timestamps: true
    }
);

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username"],
            minlength: 4,
            maxlength: 10,
            unique: true,
        },
        
        email: {
            type: String,
            required: [true, "Please provide an email"],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide valid email"
            ],
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: 8,
            maxlength: 16,
            trim: true,
        },

        phoneNumber: {
            type: String,
            required: [true, "Please provide a phone number"],
        },
        
        userImg: {
            type: String,
            required: false,
            default: '',
        },

        isTwoFactorAuth: {
            type: Boolean,
            required: false,
            default: false,
        },

        savedDrafts: {
            type: [SavedDraft],
            required: false,
            default: [],
        },
        
        role: {
            type: String,
            required: false,
            default: 'user'
        }
    },

    {
        timestamps: true
    }
);

UserSchema.pre('save', async function() {
    const salt = await bcrybt.genSalt(10);
    this.password = await bcrybt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function() {
    return jwt.sign({ userID: this._id, username: this.username, email: this.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
}

UserSchema.methods.comparePassword = async function(canditatePassword) {
    const isMatch = await bcrybt.compare(canditatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model("User", UserSchema);
