const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const surveySchema = new Schema({
    title: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
},
    { timestamps: true });
const Survey = mongoose.model('Survey', surveySchema)
module.exports = Survey;
