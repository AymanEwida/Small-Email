const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema(
    {
        to: {
            type: [String],
            required: [true, "Please provide a email to send to"],
        },

        sender: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        emailSubject: {
            type: String,
            required: false,
            default: '',
            maxlength: 50,
        },

        emailContent: {
            type: String,
            default: '',
            require: true, 
        },

        files: {
            type: [{filename: String, filePath: String}],
            default: [],
            required: false,
        },
        
        imgs: {
            type: [{url: String}],
            default: [],
            required: false,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Email", EmailSchema);
