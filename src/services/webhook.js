const FB = require('fb').default;
const express_app = require('express')()
const bodyParser = require('body-parser');
const { deepStrictEqual } = require('assert');
FB.options({version: process.env.API_VERSION});

const PORT = process.env.PORT || 5000
express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(bodyParser.json());

FB.extend({appId: process.env.APP_ID, appSecret: process.env.APP_SECRET})
const appAccessToken = process.env.APP_ACCESS_TOKEN
FB.setAccessToken(appAccessToken)// must use app access token only


const setWebhook = async (callback_url, fields, object) => {
	const options = {
		object: object, // type pf subscription
		callback_url: callback_url, // change this with your own ngrok url
		fields: fields,
		// fields: `description,full_picture,message,message_tags,story_tags,created_time,coordinates,name,link,place,picture,status_type,type,attachments{media}`, // stuff that you want to access
		verify_token: `webhook-endpoint`,
		active: true
	}

	console.log(`Creating webhook at ${callback_url}`)
	await FB.api(`/${process.env.APP_ID}/subscriptions`, 'POST', options, res => {
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

const deleteWebhook = (fields, object) => {
	FB.api(`/${secrets.app.id}/subscriptions`, 'DELETE', {
		object: object, // group to which you want to subscribe
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

// let callback_url = `https://e2131e08cfd4.ngrok.io/` // must use https only
// let fields = `photos`
// let object = `user`
// setWebhook(callback_url, fields, object)
// deleteWebhook(fields, object)

// You can manage your webhooks here: https://developers.facebook.com/apps/211761870180278/webhooks/

// express_app.listen(PORT, () =>{
// 	console.log(`Listening on PORT ${PORT}`)
// })

// express_app.get('/', (req, res) => {
// 	res.send(req.query['hub.challenge'])
// })

module.exports = setWebhook
