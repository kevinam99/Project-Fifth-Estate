const FB = require('fb').default;
const secrets = require('../secrets.json');

function getLongLivedUserAccessToken()
{
    let endpoint = `?grant_type=&
    client_id=${secrets.app.id}&
    client_secret=${secrets.app.secret}&
    fb_exchange_token={short-lived-user-access-token}`;

    let options = {
        client_id: secrets.app.id,
        client_secret: secrets.app.secret,
        fb_exchange_token: secrets.user.kevin,
        grant_type: 'fb_exchange_token'
    }

    FB.api('/oauth/access_token', options, function (res) {
        if(!res || res.error) {
            console.error(!res ? 'error occurred' : res.error);
            return;
        }
    
        var accessToken = res.access_token;
        console.log(`User Access token: ${accessToken}\n\n`);
        try {
            // writing feed to file
              const fs = require('fs');
              let path = "./longLivedUserAccessToken.json";
              fs.writeFileSync(path, JSON.stringify(res, null, 4))
            } 
          catch (err){
            console.error(err)
          }
        getLongLivedPageAccessToken(accessToken);
    });
}




function getLongLivedPageAccessToken(userAccessToken)
{
    let endpoint = `{page-id}?
    fields=access_token&
    access_token={user-access-token}`;

    let options = {
        //fields: secrets.page.access_token,
        fields: "access_token",
        access_token: userAccessToken
    }
    const pageId= secrets.page.id;
    FB.api('/' + pageId, 'GET', options, function (res) {
        if(!res || res.error) {
            console.error(!res ? 'error occurred' : res.error);
            return;
        }
        else{
            console.log(res.access_token);
            try {
                // writing feed to file
                  const fs = require('fs');
                  let path = "./longLivedPageAccessToken.json";
                  fs.writeFileSync(path, JSON.stringify(res, null, 4))
                } 
              catch (err){
                console.error(err)
              }
        }
    
    });
}

getLongLivedUserAccessToken();