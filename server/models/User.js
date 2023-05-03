require('dotenv').config();
const mongoose = require('mongoose');
const bcrybt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        },

        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: 8,
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
