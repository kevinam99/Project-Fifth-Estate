require("dotenv").config();
const mongoose = require("mongoose");
const Complaint = require("../models/complaint.model");

const PORT = process.env.PORT || 3030;
const app = require("express")();
const bodyParser = require("body-parser");
const { db } = require("../models/complaint.model");
app.use(bodyParser.json);
app.listen(PORT, () => {
	console.log("Listening....");
});

//db connection
const storePosts = async (segregatedPosts) => {
	let mongo_uri = `mongodb+srv://greg:${process.env.MONGO_PASSWORD}@cluster0.adgjc.mongodb.net/test?retryWrites=true&w=majority`;

	mongoose.connect(mongo_uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	});

	const connection = mongoose.connection;

	connection
		.once("open", () => {
			//connected {db operations inside this method only}
			console.log("Connected to MongoDB!");
			let issue = new Complaint(segregatedPosts);

			issue.collection.insertMany((err, issue) => {
				if (err) return console.error(err);

				console.log(issue);
			});
		})
		.catch((error) => {
			// handling a rejected promise
			console.log("Mongo not connected");
			console.error(error);
		});

	return "Sucess";
};

module.exports = storePosts;
