const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
    {
        groupID: {
            type: mongoose.Types.ObjectId,
            ref: 'Group',
            required: [true, "Please provide the group that the message belong"]
        },
        
        messageSender: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },

        messageContent: {
            type: String,
            required: [true, "Please provide content to the message"]
        },

        messageAttachments: {
            type: [{filename: String, filePath: String}],
            required: false,
            default: []
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
