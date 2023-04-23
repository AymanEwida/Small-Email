const express = require('express');
const router = express.Router();

const {
    searchUserByEmail,
    updateUsername,
    changePassword,
    sendTwoFactorAuthentication,
    enableTwoFactorAuthentication
} = require('../controllers/user');

router.route('/search').get(searchUserByEmail);
router.route('/change/username').patch(updateUsername);
router.route('/change/password').patch(changePassword);
router.route('/send/2FA').get(sendTwoFactorAuthentication);
router.route('/change/is-two-factor-auth').patch(enableTwoFactorAuthentication);


module.exports = router;
