const express = require('express')
const router = express.Router();

const questionController = require('../app/controller/question')



router.route('/')
    .post(questionController.insert);


module.exports = router;
