const FB = require('fb').default;
const secrets = require('../testing-stuff/secrets.json');
const express_app = require('express')()
const bodyParser = require('body-parser');
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
FB.api(`/${secrets.app.id}/subscriptions`, 'GET', {
    object: `https://www.facebook.com/groups/${groupId}/`, // group to which you want to subscribe
    callback_url: `https://7ddccafa50f6.ngrok.io`, // change this with your own ngrok url
    fields: `description,full_picture,message,message_tags,story_tags,created_time,coordinates,name,link,place,picture,status_type,type,attachments{media}`, // stuff that you want to access
    active: true
},res => {
    console.log(res.data)
})
