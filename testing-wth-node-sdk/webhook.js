const FB = require('fb').default;
const secrets = require('../testing-stuff/secrets.json');
const express_app = require('express')()
const bodyParser = require('body-parser');
const { deepStrictEqual } = require('assert');
FB.options({version: 'v6.0'});

const port = process.env.PORT || 5000
express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(bodyParser.json());
express_app.get('/', (req, res) => {
  res.send("Hello! Welcome to 5E")
})

express_app.post('/', (req, res) => {
	res.send("Webhook received")
})

let app = FB.extend({appId: secrets.app.id, appSecret: secrets.app.secret})
let groupId = secrets.groups.kevin;
let appAccessToken = secrets.app.access_token
FB.setAccessToken(appAccessToken)// must use app access token only


const setWebhook = (callback_url, fields) => {
	FB.api(`/${secrets.app.id}/subscriptions`, 'POST', {
		object: `user`, // group to which you want to subscribe
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
let fields = `photos, feed`
setWebhook(callback_url, fields)
// deleteWebhook(fields)

// You can manage your webhooks here: https://developers.facebook.com/apps/211761870180278/webhooks/