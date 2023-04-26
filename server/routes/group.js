const express = require('express');
const router = express.Router();

const {
    getAllGroupsOfAUser,
    createAGroup,
    getAllEmailsoFAGroup,
    getSingleGroup,
    updateGroup,
    deleteGroup
} = require('../controllers/group');

router.route('/').get(getAllGroupsOfAUser);
router.route('/create').post(createAGroup);
router.route('/emails/:id').get(getAllEmailsoFAGroup);
router.route('/:id').get(getSingleGroup).patch(updateGroup).delete(deleteGroup);

module.exports = router;
