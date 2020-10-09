require("dotenv").config()
const mongoose = require("mongoose")
const Complaint = require('../models/complaint.model')


const PORT = process.env.PORT || 3030
const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.json)
app.listen(PORT, () => {
  console.log("Listening....");
});

//db connection

let mongo_uri = `mongodb+srv://greg:${process.env.MONGO_PASSWORD}@cluster0.adgjc.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(mongo_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection

connection.once('open', () => {
  //connected {db operations inside this method only}
  console.log("Connected to MongoDB!")
  let issue = new Complaint({
    postLink: 'www.fexamine.com',
    dept: 'goacpwd',
    pictureLink: 'www.gec.ac.in',
    sentiment: 'neutral',
    date: '2020-10-09',
    time: '24515312414'
  });

  issue.save((err, issue) => {
    if (err) return console.error(err);

    console.log(issue);
  });

}).catch((error) => { // handling a rejected promise
  console.log("Mongo not connected")
  console.error(error)
})

