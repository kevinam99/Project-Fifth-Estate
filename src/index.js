require("dotenv").config("./.env");
const FB = require("fb").default;
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require('cors')

const getFeed = require("./services/getFeed");
const { filterGregPosts, segregate, createNewTag } = require("./services/segregatePosts");
const storePosts = require("./services/dbConnect");
const logger = require("./logger/logger");

const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

FB.options({ version: process.env.API_VERSION });
FB.extend({ appId: process.env.APP_ID, appSecret: process.env.APP_SECRET });

app.listen(PORT, () => {
	logger.info(`(index.js)... Listening on port ${PORT}`)
});

app.post('/', (req, res) => {
	console.log(req.body)
	res.sendStatus(200)
})



app.post("/complaint", (req, res) => {
	res.sendStatus(200);
	console.log(`Field => ${req.body.entry[0].changes[0].field}`);
	const date = new Date().toISOString(req.body.entry[0].time).split("T")[0];
	const time = new Date().toTimeString(req.body.entry[0].time).split(" ")[0];
	console.log(`Date: ${date} \nTime: ${time}`);
});

//for adding new departments
app.patch("/hashtag", (req, res) => {
	const dept = createNewTag(req.body.tagName);
	console.log(dept)
	if (dept) {
		res.sendStatus(200);
		
	} else {
		res.sendStatus(500);
	}
});

app.get("/dbposts", async(req, res) => {
	console.log("Fetching Issues from DB")
	try {
		const issues = await fetchPosts("2020-10-18");
		console.log(issues);
		res.send(issues);
	} catch (error) {
		console.error(error);
	}
});

app.get("/posts", async(req,res)=>{
	try {
		const posts = await getFeed();
		logger.info(`(index.js)...posts.length = ${posts.length}.`);

		if (posts.length > 0) {
			const filteredGregPosts = await filterGregPosts(posts);
			logger.info(
				`(index.js)... greg posts = ${filteredGregPosts.length}`
			);
			logger.info("(index.js)... Segregating Posts");
			const segregatedPosts = await segregate(filteredGregPosts); //segregates posts and returns an array of obj containing all the posts

			logger.info("(index.js)... Storing segregated posts to db");
			
			const saved = await storePosts(segregatedPosts); //the array of posts is stored to the db
			logger.info(`(index.js)... Posts saved to DB`);
			res.send(`Saved ${saved}...(index.js)`+ `\r\n${JSON.stringify(segregatedPosts,null,4)}`);
		} else {
			logger.info(`(index.js)... No posts available at this time`);
			res.send(`No posts available at this time...(index.js)`);
		}
	} catch (err) {
		logger.error(`(index.js)... Error: ${err}`);
		res.send(err);
	}
})
