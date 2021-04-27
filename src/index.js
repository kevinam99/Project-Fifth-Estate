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
const { storePosts, fetchPosts } = require("./services/dbConnect");
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
	console.log(dept);
	if (dept) {
		res.sendStatus(200);
	} else {
		res.sendStatus(500);
	}
});

app.get("/api/dbposts", async(req, res) => {
	logger.info("(index.js)... Fetching Issues from DB")
	try {
		const issues = await fetchPosts("2020-10-18");
		logger.info(issues);
		res.status(200).send(issues);
	} catch (error) {
		logger.error(`(index.js, line 60)... ${error}`);
	}
});

app.get("/api/posts", async(req,res)=>{
	try {
		main(req.body.groupId)
		res.sendStatus(200)
	}
	catch(error) {
		res.status(500).send(error)
		logger.error(`(index.js, line 68)... ${error}`)
	}
})

const main = async(groupId = 210553450180199) => {
	try {
		const posts = await getFeed(groupId);
		logger.info(`(index.js)...posts.length = ${posts.length}.`);

		if (posts.length > 0) {
			
			const filteredGregPosts = await filterGregPosts(posts);
			logger.info(`(index.js)... greg posts = ${filteredGregPosts.length}`);
			if(filteredGregPosts.length > 0) {
				logger.info("(index.js)... Segregating Posts");
				
				const segregatedPosts = await segregate(filteredGregPosts); 
				
				logger.info("(index.js)... Storing segregated posts to db");
		
				await storePosts(segregatedPosts); //the array of posts is stored to the db
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
