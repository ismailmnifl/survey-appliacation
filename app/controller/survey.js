const Survey = require('../model/Survey')
const Question = require('../model/Question')
const Score = require('../model/Score')

module.exports = {
    //this function will insert a new survey to the db 
    insert: async (req, res, next) => {
        try {
            const survey = await Survey.create(req.body);
            res.status(201).json(survey);
        } catch (error) {
            res.status(500).json(error);

        }
    },
    //this function will get an existing survey from the db

    getSurvey: async (req, res, next) => {
        try {
            const { surveyId } = req.params;
            const userId = req.user.payload.id;
            const selecedSurvey = await Survey.findById(surveyId).populate('questions');
            const userScore = await Score.create({ survey: surveyId, user: userId });
            res.status(200).json({ selectedSurvey: selecedSurvey, userScore: userScore })

        } catch (error) {
            res.status(500).json(error);
        }
    },
    //this function will answer of a specifi quetion and update the user score in the database

    anwserSurvey: async (req, res, next) => {
        try {
            //reseaved data from the client
            const querstionId = req.body.questionId;
            const scoreId = req.body.scoreId;
            const answer = req.body.questionAnswer;

            const question = await Question.findById(querstionId);
            const isCorrect = question.answers.find(q => q.text === answer).isCorrect
            const newScore = await Score.findOneAndUpdate({ _id: scoreId }, { $inc: { 'score': isCorrect ? 3 : -1 } }, { new: true })
            res.status(200).json({ question: question, score: newScore });
        } catch (error) {
            res.status(500).json(error);
        }

    },
}