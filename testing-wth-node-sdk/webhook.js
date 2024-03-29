const FB = require('fb').default;
const secrets = require('../testing-stuff/secrets.json');
const express_app = require('express')()
const bodyParser = require('body-parser');
const { deepStrictEqual } = require('assert');
FB.options({version: 'v6.0'});

const port = process.env.PORT || 5000
express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(bodyParser.json());

let app = FB.extend({appId: secrets.app.id, appSecret: secrets.app.secret})
let groupId = secrets.groups.kevin;
let appAccessToken = secrets.app.access_token
FB.setAccessToken(appAccessToken)// must use app access token only


const setWebhook = (callback_url, fields) => {
	FB.api(`/${secrets.app.id}/subscriptions`, 'POST', {
		object: `group`, // type pf subscription
		callback_url: callback_url, // change this with your own ngrok url
		fields: fields,
		// fields: `description,full_picture,message,message_tags,story_tags,created_time,coordinates,name,link,place,picture,status_type,type,attachments{media}`, // stuff that you want to access
		verify_token: `webhook-endpoint`,
		active: true
	},res => {
		if(res.success)
		{
			console.log("Webhook created successfully")
		}
		else
		{
			console.log("Couldn't create webhook")
			console.log(res)
		}
	})
}

const deleteWebhook = fields => {
	FB.api(`/${secrets.app.id}/subscriptions`, 'DELETE', {
		object: `user`, // group to which you want to subscribe
		fields: fields
		// fields: `description,full_picture,message,message_tags,story_tags,created_time,coordinates,name,link,place,picture,status_type,type,attachments{media}`, // stuff that you want to access	
	},res => {
		if(res.success)
		{
			console.log("Webhook deleted successfully")
		}
		else
		{
			console.log("Couldn't delete webhook")
			console.log(res)
		}
	})
}

let callback_url = `https://98ae67c300f3.ngrok.io` // must use https only
let fields = `posts`
// setWebhook(callback_url, fields)
// deleteWebhook(fields)

// You can manage your webhooks here: https://developers.facebook.com/apps/211761870180278/webhooks/

express_app.listen(port, () =>{
	console.log(`Listening on port ${port}`)
})

express_app.get('/', (req, res) => {
	res.send(req.query['hub.challenge'])
})

console.log(new Date(`2020-10-07T13:20:38+0000`).getTime()) // unix timestamp
console.log(new Date(`2020-10-07T13:20:38+0000`).toTimeString().split(' ')[0]
)
console.log(new Date(`2020-10-07T13:20:38+0000`).toISOString().split('T')[0]
)