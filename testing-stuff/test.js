const request = require('request');

const OAuth2 = require('oauth2').OAuth2;var oauth2 = new OAuth2("YOUR Facebook APP ID",
                        "YOUR Facebook APP SECRET",
                       "", "https://www.facebook.com/dialog/oauth",
                   "https://graph.facebook.com/oauth/access_token",
                   null);
  
app.get('/facebook/auth',function (req, res) {
      var redirect_uri = "Your App domain" +    "/Path_To_Be_Redirected_to_After_Verification";
      // For eg. "http://localhost:3000/facebook/callback"
      var params = {'redirect_uri': redirect_uri, 'scope':'user_about_me,publish_actions'};
      res.redirect(oauth2.getAuthorizeUrl(params));
});