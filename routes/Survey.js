const express = require('express')
const router = express.Router();

const surveyController = require('../app/controller/survey');
const auth = require('../middleware/auth')



router.route('/')
    .post(surveyController.insert)


router.route('/:surveyId')
    .get(auth.isLoggedIn,surveyController.getSurvey)

router.route('/answer')
    .post(auth.isLoggedIn,surveyController.anwserSurvey)






module.exports = router;
