const express = require('express');
const router = express.Router();

const {
    getAllGroupsOfAUser,
    createAGroup
} = require('../controllers/group');

router.route('/').get(getAllGroupsOfAUser);
router.route('/create').post(createAGroup);

module.exports = router;
