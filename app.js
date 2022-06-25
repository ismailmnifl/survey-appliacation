
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/surveyProject',()=> {
    console.log("connected to mongo db database");
});
//initialiazing the express app
const app = express();
//parsing all the respose data receaved from the client
app.use(bodyParser.json());

//getting the routes for each entity in this susteme
const survey = require('./routes/survey');
const question = require('./routes/question');
const user = require('./routes/users');
//assign each endpoint its own routes

app.use('/user', user)
app.use('/question', question)
app.use('/survey', survey)

//defining a port that the app will run on
const port = app.get('port') || 8000;
//mounting the app on the port
app.listen(port,()=> {
    console.log("the server is listening on port "+ port);
})