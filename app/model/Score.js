const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    survey: {
        type: Schema.Types.ObjectId,
        ref: 'Survey'
    },
    score:{type: Number, required: true ,default:0}
},
    { timestamps: true });
const Score = mongoose.model('Score', scoreSchema)
module.exports = Score;
