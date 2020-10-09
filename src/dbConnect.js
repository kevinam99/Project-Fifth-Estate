const mongoose = require("mongoose");
const express = require("express");
const Complaint = require('./models/complaint.model');
require("dotenv").config();

let app = express();
app.use(express.json());

let mongo_uri = `mongodb+srv://greg:${process.env.MONGO_PASSWORD}@cluster0.adgjc.mongodb.net/test?retryWrites=true&w=majority`;



mongoose.connect(mongo_uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log(mongoose.connection.readyState);

  let issue = new Complaint({
      postLink : 'www.facebook.com',
      dept : 'goapwd',
      pictureLink : 'www.gmail.com',
      sentiment : 'negative',
      date : '2020-10-08',
      time : '2131312414'
  });

  issue.save( (err, issue)=>{
      if (err) return console.error(err);

      console.log(issue);
  });

});

app.listen(3030, () => {
  console.log("Listening....");
});

