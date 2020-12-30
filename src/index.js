require("dotenv").config();
const FB = require("fb").default;
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require('cors')

const logger = require("./logger/logger");

const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


FB.options({ version: process.env.API_VERSION });
FB.extend({ appId: process.env.APP_ID, appSecret: process.env.APP_SECRET });

app.listen(PORT, () => {
	logger.info(`(index.js)... Listening on port ${PORT}`);
	console.log(`Listening on port ${PORT}`);
});

//API Endpoint routes
app.use('/api/post',require('./posts/posts.controller'))
app.use('/api/user',require('./auth/auth.controller'))
