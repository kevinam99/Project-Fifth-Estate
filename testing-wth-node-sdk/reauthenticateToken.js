const FB = require('fb').default;
const secrets = require('../testing-stuff/secrets.json');

function getLongLivedUserAccessToken()
{
    let endpoint = `?grant_type=&
    client_id=${secrets.app.id}&
    client_secret=${secrets.app.secret}&
    fb_exchange_token={short-lived-user-access-token}`;

    let options = {
        client_id: secrets.app.id,
        client_secret: secrets.app.secret,
        fb_exchange_token: 'EAADAmKcMj7YBAHHG6CcTegDgjz3mAI0glVA5szBiIxnzZAnEaB8FOo776HmksVKHMVJ9oZBt0FhcLQ0yLwtZBegg0wPOmNWKi8xZBDZBWtVcVQfDFPOoZAjuBTP2NLuijj2ZA1dYDefCB5QsqdgAl4AjglB7S9mcWnPp3oHFgiyVvqaDmZBmmVI90nUbucm1Cy93OooCFGhhQJZBvVz24s6WW',
        grant_type: 'fb_exchange_token'
    }

    FB.api('oauth/access_token', options, function (res) {
        if(!res || res.error) {
            console.error(!res ? 'error occurred' : res.error);
            return;
        }
    
        var accessToken = res.access_token;
        console.log(accessToken);
        getLongLivedPageAccessToken(accessToken);
    });
}

//above function works fine

//the below function has issues. Possibly the api call is wrong


function getLongLivedPageAccessToken(userAccessToken)
{
    let endpoint = `{page-id}?
    fields=access_token&
    access_token={user-access-token}`;

    let options = {
        access_token: userAccessToken
    }
    const pageId= secrets.page.id;
    FB.api(pageId +`?fields=access_token`, options, function (res) {
        if(!res || res.error) {
            console.error(!res ? 'error occurred' : res.error);
            return;
        }
        else{
            console.log(res.access_token);
        }
    
    });
}

getLongLivedUserAccessToken();