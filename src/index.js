/** @module index */

require("dotenv").config("./.env");
const FB = require("fb").default;
const app = require("express")();
const bodyParser = require("body-parser");

const getFeed = require("./services/getFeed");
const { filterGregPosts, segregate, createNewTag } = require("./services/segregatePosts");
const { storePosts, fetchPosts } = require("./services/dbConnect");
const logger = require("./logger/logger");

const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

FB.options({ version: process.env.API_VERSION });
FB.extend({ appId: process.env.APP_ID, appSecret: process.env.APP_SECRET });

app.listen(PORT, () => {
	logger.info(`(index.js)... Listening on port ${PORT}`)
});

/**
 * @event POST /
 * 
 */
 
app.post('/', (req, res) => {
	console.log(req.body)
	res.sendStatus(200)
})

/**
 * @event POST /complaint
 * This is the webhook endpoint that receives new posts as and when they
 * are published. 
 * 
 * @returns {Integer} Response Code
 */
app.post("/complaint", (req, res) => {
	res.sendStatus(200);
	console.log(`Field => ${req.body.entry[0].changes[0].field}`);
	const date = new Date().toISOString(req.body.entry[0].time).split("T")[0];
	const time = new Date().toTimeString(req.body.entry[0].time).split(" ")[0];
	console.log(`Date: ${date} \nTime: ${time}`);
});

/**
 * @event PATCH /hashtag
 * This endpoint is used for adding new departments. The department name is sent in the
 * body of the request
 * @returns {Integer} Response Code
 * 
 */
app.patch("/hashtag", (req, res) => {
	const dept = createNewTag(req.body.tagName);
	console.log(dept);
	if (dept) {
		res.sendStatus(200);
	} else {
		res.sendStatus(500);
	}
});

/**
 * @event GET /api/dbposts
 * 
 * This endpoint is used for adding new departments. Used for testing locally.
 * 
 * @returns {object} posts - Posts saved in the DB
 */
app.get("/api/dbposts", async(req, res) => {
	logger.info("(index.js)... Fetching Issues from DB")
	try {
		const issues = await fetchPosts("2020-10-18");
		logger.info(issues);
		res.send(issues);
	} catch (error) {
		logger.error(error);
	}
});

/**
 * @event GET /api/posts
 * 
 * This endpoint is used to run the main() method over an API call. Used for testing locally.
 * 
 * @returns {integer} responseCode - HTTP response.
 */
 
app.get("/api/posts", async(req,res)=>{
	try {
		main()
		res.sendStatus(200)
	}
	catch(error) {
		res.send(error)
		logger.error(`(index.js, line 68)... ${error}`)
	}
})

/**
 * The main function is where the execution begins.
 * First, the posts are obtained from Facebook. Then they're for #greg
 * If no posts are found, the execution stops until the next time the fuction is called.
 * 
 * If posts are found, they are further segregated to place, department(s) and sentiment.
 * Lastly, the posts are then stored to the DB.
 * 
 * The execution stops here until it is run again.
 * @param {integer} [groupId] - The group ID of the concerned Facebook Group.
 */
const main = async () => {
	try {
		/** Getting the posts from the Facebook Group from the last 1 hour. */
		const posts = await getFeed()
		logger.info(`(index.js)...posts.length = ${posts.length}.`)
		if (posts.length > 0) {
			// const filteredGregPosts = await filterGregPosts(posts)
			// logger.info(`(index.js)... greg posts = ${filteredGregPosts.length}`)
			// console.log(filteredGregPosts)

			/** Segregating the post based on the relevant department and sentiment. */
			logger.info("(index.js)... Segregating Posts")
			const segregatedPosts = await segregate(posts); //segregates posts and returns an array of obj containing all the posts
			
			logger.info("(index.js)... Storing segregated posts to db")
			/** Storing the relevant posts to the DB, MongoDb Could Atlas */
			const saved = await storePosts(segregatedPosts) //the array of posts is stored to the db
			if(saved) logger.info(`(index.js)... Posts saved to DB`);
			
		} else {
			logger.info(`(index.js)... No posts available at this time`)
		}
	} catch (err) {
		logger.error(`(index.js)... Error: ${err}`)
	}
};

main();
// posts.then(res => { logger.info(`posts.length (from index.js) = ${res}`)})
// posts.catch(err => console.error(err))

// const gregPosts = Controller.greg()
// console.log(`greg posts (from index.js) = ${gregPosts.length}`)

// if(gregPosts.length > 0)
// {
//     const {
//         link,
//         complaint,
//         dept,
//         place,
//         time,
//         date
//     } = Controller.segregate()
//     console.log("In if block") testing for com

// }
