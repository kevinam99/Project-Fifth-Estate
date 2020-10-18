require("dotenv").config();
const FB = require("fb").default;
const app = require("express")();
const bodyParser = require("body-parser");

const getFeed = require("./services/getFeed");
const { filterGregPosts, segregate, createNewTag } = require("./services/segregatePosts");
const storePosts = require("./services/dbConnect");

const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

FB.options({ version: process.env.API_VERSION });
FB.extend({ appId: process.env.APP_ID, appSecret: process.env.APP_SECRET });

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

const main = async () => {
	try {
		const posts = await getFeed()
		console.log(
			`posts.length (from index.js) = ${posts.length}.`
		)
		if (posts.length > 0) {
			const filteredGregPosts = await filterGregPosts(posts)
			console.log(
				`greg posts (from index.js) = ${filteredGregPosts.length}`
			)
			// console.log(filteredGregPosts)
			console.log("Segregating Posts");
			const segregatedPosts = await segregate(filteredGregPosts); //segregates posts and returns an array of obj containing all the posts

			console.log("storing segregated posts to db")
			const saved = await storePosts(segregatedPosts) //the array of posts is stored to the db
			console.log(`${saved}...(index.js)`);
		} else {
			console.log(`No posts available at this time...(index.js)`)
		}
	} catch (err) {
		console.error(err);
	}
};

main();
// posts.then(res => { console.log(`posts.length (from index.js) = ${res}`)})
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
