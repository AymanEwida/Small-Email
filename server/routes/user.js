const express = require('express');
const router = express.Router();

const {
    searchUserByEmail,
    searchForUserAndGroupByEmail,
    updateUsername,
    changePassword,
    changeEmail,
    getUserSavedDrafts,
    addDraftToUserSavedDrafts,
    removeDraftFromUserSavedDrafts,
    sendTwoFactorAuthentication,
    enableTwoFactorAuthentication,
    deleteUser
} = require('../controllers/user');

router.route('/search').get(searchUserByEmail);
router.route('/search-for-users-and-groups').get(searchForUserAndGroupByEmail);
router.route('/change/username').patch(updateUsername);
router.route('/change/password').patch(changePassword);
router.route('/change/email').patch(changeEmail);
router.route('/saved-drafts').get(getUserSavedDrafts);
router.route('/saved-drafts/add').patch(addDraftToUserSavedDrafts);
router.route('/saved-drafts/remove/:id').patch(removeDraftFromUserSavedDrafts);
router.route('/send/2FA').get(sendTwoFactorAuthentication);
router.route('/change/is-two-factor-auth').patch(enableTwoFactorAuthentication);
router.route('/delete').delete(deleteUser);

module.exports = router;
