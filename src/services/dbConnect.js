require('dotenv').config()
const mongoose = require('mongoose')
const Complaint = require('../models/complaint.model')
const logger = require('../logger/logger')

//db connection
const storePosts = async (segregatedPosts) => {
	const mongo_uri = `mongodb+srv://greg:${process.env.MONGO_PASSWORD}@cluster0.adgjc.mongodb.net/demo?retryWrites=true&w=majority`;
	try {
		await mongoose.connect(mongo_uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
		logger.info("(dbConnect.js)... Mongo connected")

		await Complaint.insertMany(segregatedPosts)
		logger.info(`(dbConnect.js) line 24... Complaints saved to DB.`)
	}
	
	catch(error) {
		logger.error(`(dbConnect.js) line 19... ${error}`)
	}
	// const connection = mongoose.connection;

	// connection
	// 	.once("open", () => {
	// 		//connected {db operations inside this method only}
	// 		console.log("Connected to MongoDB!");
	// 		let issue = new Complaint(segregatedPosts);

	// 		issue.save((err, issue) => {
	// 			if (err) return console.error(err);

	// 			console.log(issue);
	// 		});
	// 	})
	// 	.catch((error) => {
	// 		// handling a rejected promise
	// 		console.log("Mongo not connected");
	// 		console.error(error);
	// 	});

};

module.exports = storePosts;
