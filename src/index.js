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
		res.send(issues);
	} catch (error) {
		logger.error(error);
	}
});

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

const main = async () => {
	try {
		const posts = await getFeed()
		logger.info(`(index.js)...posts.length = ${posts.length}.`)
		if (posts.length > 0) {
			// const filteredGregPosts = await filterGregPosts(posts)
			// logger.info(`(index.js)... greg posts = ${filteredGregPosts.length}`)
			// console.log(filteredGregPosts)
			logger.info("(index.js)... Segregating Posts")
			const segregatedPosts = await segregate(posts); //segregates posts and returns an array of obj containing all the posts
			
			logger.info("(index.js)... Storing segregated posts to db")
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
//     console.log("In if block")

// }
