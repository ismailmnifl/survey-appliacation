const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: { type: String, required: true },
    answers: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],
    survey: {
        type: Schema.Types.ObjectId,
        ref: 'Survey'
    },
},
    { timestamps: true });
const Question = mongoose.model('Question', questionSchema)
module.exports = Question;
