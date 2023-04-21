const express = require('express');
const router = express.Router();

const {
    getAllEmailsOfUser,
    sendEmail,
    deleteEmail,
    updateEmail,
    getSingleEmail
} = require('../controllers/email');

router.route('/send-email').post(sendEmail);
router.route('/').get(getAllEmailsOfUser);
router.route('/:id').delete(deleteEmail).patch(updateEmail).get(getSingleEmail);

module.exports = router;
