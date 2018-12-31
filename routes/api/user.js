const express = require('express');
const User = require('../../controller/userController');
const Validate = require('../../middleware/validateUser');

const router = express.Router();

router.post('/register', Validate.validateUser, User.register);
router.post('/login', Validate.validateUserLogin, User.login);
module.exports = router;
