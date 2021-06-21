/** @module index */
require("dotenv").config();
const FB = require("fb").default;
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require('cors')

const getFeed = require("./services/getFeed");
const {
	filterGregPosts,
	segregate,
	createNewTag,
} = require("./services/segregatePosts");
const { storePosts, fetchPosts, updateComplaintStatus} = require("./services/dbConnect");
const { changeUserPassword, createUser, loginUser, removeUser } = require("./services/dbConnect");
const logger = require("./logger/logger");

const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

FB.options({ version: process.env.API_VERSION });
FB.extend({ appId: process.env.APP_ID, appSecret: process.env.APP_SECRET });

app.listen(PORT, () => {
	logger.info(`(index.js)... Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
	//console.log(req.body)
	res.sendStatus(200)
})

app.post('/', (req, res) => {
	//console.log(req.body)
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
 * 
 * This endpoint is used for adding new departments
 * @returns {Integer} Response Code
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
		res.status(200).send(issues);
	} catch (error) {
		logger.error(`(index.js, in GET /api/dbposts)... ${error}`);
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
		if(!req.query.groupId == "") res.send(main()).status(200)
		else res.send(main(req.query.groupId)).status(200)
	}
	catch(error) {
		res.status(500).send(error)
		logger.error(`(index.js, in GET /api/posts)... ${error}`)
	}
})

app.post("/api/updateStatus", async(req, res) => {
	console.log(req.query.status)

	if(req.query.id && req.query.newStatus) {
		try {
			const status = updateComplaintStatus(req.query.id, req.query.newStatus)
			if(status) res.sendStatus(200)
		}
		
		catch(error) {
			res.send(error).status(500)
			logger.error(error)
		}
	}
	else {
		res.send("All query not received").status(200)
	}
})


app.post("/api/login", async(req, res) => {
	const username = req.body.username
	const password = req.body.password
	return res.send(loginUser(username, password)).status(200)
})

app.post("/api/createUser", async(req, res) => {
	const username = req.body.username
	const password = req.body.password
	const role = req.body.role
	const dept = req.body.role
	return res.send(createUser(username, password, role, dept)).status(200)
})

app.post("/api/removeUser", async(req, res) => {
	const username = req.body.username
	return res.send(removeUser(username)).status(200)
})

app.post("/api/forgotPassword", async(req, res) => {
	const username = req.body.username
	const password = req.body.password
	return res.send(changeUserPassword(username, password)).status(200)
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
const main = async(groupId = 210553450180199) => {
	try {
		/** Getting the posts from the Facebook Group from the last 1 hour. */
		const posts = await getFeed(groupId);
		logger.info(`(index.js)...posts.length = ${posts.length}.`);

		if (posts.length > 0) {
			/** Getting relevant posts by identifying #greg in the post body. */
			const filteredGregPosts = await filterGregPosts(posts);
			logger.info(`(index.js)... greg posts = ${filteredGregPosts.length}`);
			if(filteredGregPosts.length > 0) {
				logger.info("(index.js)... Segregating Posts");
				
				/** Segregating the post based on the relevant department and sentiment. */
				const segregatedPosts = await segregate(filteredGregPosts); 
				
				logger.info("(index.js)... Storing segregated posts to db");
				
				/** Storing the relevant posts to the DB, MongoDb Could Atlas */
				await storePosts(segregatedPosts);
				logger.info(`(index.js)... Posts saved to DB`);
			}
			else if(filteredGregPosts.length == 0) {
				logger.info("No Greg posts available")
			}
			
		} else {
			logger.info(`(index.js)... No posts available at this time`);
			
		}
	} catch (err) {
		logger.error(`(index.js)... Error: ${err}`);
	}
}

main()