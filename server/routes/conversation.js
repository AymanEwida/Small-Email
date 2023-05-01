const express = require('express');
const router = express.Router();

const {
    getConversationOfGroup,
    sendMessageToConversation,
    deleteMessageFromConversation
} = require('../controllers/conversation');

router.route('/:id').get(getConversationOfGroup);
router.route('/send-message/:id').post(sendMessageToConversation);
router.route('/delete-message/:id').delete(deleteMessageFromConversation);

module.exports = router;
