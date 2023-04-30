const express = require('express');
const router = express.Router();

const {
    getAllGroupsOfAUser,
    createAGroup,
    getAllEmailsoFAGroup,
    getSingleGroup,
    updateGroup,
    deleteGroup,
    addNewParticipates,
    removeParticipatesFromGroup,
    makeParticipateAnAdmin,
    removeAdminFromAUser
} = require('../controllers/group');

router.route('/').get(getAllGroupsOfAUser);
router.route('/create').post(createAGroup);
router.route('/emails/:id').get(getAllEmailsoFAGroup);
router.route('/:id').get(getSingleGroup).patch(updateGroup).delete(deleteGroup);
router.route('/add/:id').patch(addNewParticipates);
router.route('/remove/:id').patch(removeParticipatesFromGroup);
router.route('/make-admin/:id').patch(makeParticipateAnAdmin);
router.route('/remove-admin/:id').patch(removeAdminFromAUser);

module.exports = router;
