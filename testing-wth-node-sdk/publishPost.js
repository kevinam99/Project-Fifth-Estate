// Publishing post as the page
const FB = require('fb').default;
const secrets = require('../testing-stuff/secrets.json');
const fs = require('fs');

FB.options({version: 'v6.0'});

let app = FB.extend({appId: secrets.app.id, appSecret: secrets.app.secret})
let page_access_token = secrets.page.access_token;
let groupId = secrets.groups.kevin;

FB.setAccessToken(page_access_token);

var body = 'kevin posted with facebook-node-sdk 1';
FB.api(`${groupId}/feed`, 'post', { message: body }, function (res) {
  if(!res || res.error){
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.id);
});