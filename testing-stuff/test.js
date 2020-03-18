const request = require('request');

let appId = `211761870180278`;
let secret = `d34304d06b20598e6090ecf7603576be`;
let access_token = `EAADAmKcMj7YBAFiuhU1qJXvxsTEuZAjO7ZBXYj8k7ZA1u22X3MQ0QZCXXbHoNLp2tXX9UmEDT7kdQQLZAPnvzQCBtazZBHie59omy9vl5HawEHBoNSgNEnStIjEzo5cBYUqm5lyvZCZC3KLwltVlPuATP26adlNmnZCAyFTss4h0mQreLq0ERuGl2mPZBg2LXuxkoZD`;
const OAuth2 = require('oauth2').OAuth2;
var oauth2 = new OAuth2(appId,
                        secret,
                       "", "https://www.facebook.com/dialog/oauth",
                   "https://graph.facebook.com/oauth/"+ access_token,
                   null);

const express = require('express');
let app = express();
app.get('/facebook/auth',function (req, res) {
    try{
        var redirect_uri = "facebook.com";
      // For eg. "http://localhost:3000/facebook/callback"
      var params = {'redirect_uri': redirect_uri, 'scope':'user_about_me,publish_actions'};
      res.redirect(oauth2.getAuthorizeUrl(params));
      console.log(res);
    }
    catch(err) 
    {
        console.error(err);
    }
      
});