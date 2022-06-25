const Question = require('../model/Question')
const Survey = require('../model/Survey')


module.exports = {
    // this fucntion will add new question to the db
    insert: async (req, res, next) => {
        try {
            const question = await Question.create(req.body);
            const surveyId = req.body.survey

            const survey = await Survey.findByIdAndUpdate(surveyId, {
                $push: {
                    questions: question._id
                }
            })
            res.status(201).json(question);
        } catch (error) {
            res.status(500).json(error);
        }

    },

}