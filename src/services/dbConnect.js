/** @module dbConnect */
require("dotenv").config()
const admin = require("firebase-admin");
const serviceAccount = require("../../project-5e-firebase-adminsdk-wk2m9-3ef3f96fa7.json");
const logger = require("../logger/logger");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.FIREBASE_URL
  });
logger.info("Initialized Firebase Realtime DB app!")



/** 
 * This fuction stores the posts to the DB.
 * @param {object} segregatedPosts - Contains the relevant posts with #greg along with the department and sentiment of the post.
 * 
 */
const storePosts = async (segregatedPosts) => {
		try{
		
			const ref = admin.database().ref("posts")
			segregatedPosts.forEach(segregatedPost => {
				const newPostRef = ref.push()
				newPostRef.set(segregatedPost, error => {
					if (error) {
						// The write failed...
						logger.error("(dbConnect.js)... Error while adding post: " + error)
					} else {
						// The write was successful...
						logger.info(`(dbConnect.js)... Complaints saved to DB.`)
						
					}
				})
				
			});
			
		
	} catch (error) {
		logger.error(`(dbConnect.js)... ${error}`)
		return error
	}
	return 1
}

/**
 * 
 * This function fetches posts from the DB with the given date.
 * @param {string} date - Posts originating from the specified date.
 * 
 * @returns {object} data - Contains all the complaints of the given date.
 */
const fetchPosts = async (date) => {
	try {
		const ref = admin.database().ref("posts")
		let data
		if(date) data =  await ref.orderByChild("date").equalTo(date).once("value")
		else if (!date) data =  await ref.once("value")
		
		ref.off("value");
		if(process.env.NODE_ENV == "dev") console.log(data.val())
		return data.val()
		
		
	} catch (error) {
		logger.error(`(dbConnect.js)... Error file fetching posts:  ${error}`)
		return error
	}
}

fetchPosts()
module.exports = { storePosts, fetchPosts }