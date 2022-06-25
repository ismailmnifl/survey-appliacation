const express = require('express')
const router = express.Router();

const userController = require('../app/controller/user')



router.route('/')
    .post(userController.insert);

router.route('/login')
    .post(userController.login);

module.exports = router;
