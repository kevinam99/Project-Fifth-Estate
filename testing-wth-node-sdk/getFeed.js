const FB = require('fb').default;
const secrets = require('../testing-stuff/secrets.json');

FB.options({version: 'v6.0'});

let app = FB.extend({appId: secrets.app.id, appSecret: secrets.app.secret})
let page_access_token = secrets.page.access_token;
let groupId = secrets.groups.kevin;

FB.setAccessToken(page_access_token);

FB.api(`/${groupId}/feed`, 'GET', {"fields":"description,full_picture,message,message_tags,story_tags,created_time,coordinates,name,link,place,picture,status_type,type,attachments{media}"},
    function(res) {
      if(res.error)
      {
        console.error(res.error);
      }
      else{
        console.log(res.data.length);
      // console.log(JSON.stringify(res.data[0], null, 4));
        try {
          // writing feed to file
            const fs = require('fs');
            let path = "./file.json";
            fs.writeFileSync(path, JSON.stringify(res, null, 4))
          } 
        catch (err){
          console.error(err)
        }
      }
    }
  );