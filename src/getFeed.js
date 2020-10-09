require('dotenv').config()
const FB = require('fb').default;
<<<<<<< HEAD:testing-wth-node-sdk/getFeed.js
// const secrets = require('../testing-stuff/secrets.json')
const express_app = require('express')()
const bodyParser = require('body-parser')
=======
const secrets = require('../testing-stuff/secrets.json')
const express_app = require('express')()
const bodyParser = require('body-parser')
console.log(process.env.API_VERSION)
>>>>>>> 89da747c610c78c9ac5121b481b7dd5b69e35cd1:src/getFeed.js
FB.options({version: process.env.API_VERSION})

const port = process.env.PORT || 5000
express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(bodyParser.json());


express_app.post('/', (req, res) => {
  res.send("Webhook received")
  console.log(JSON.stringify(req.body.entry, null, 4))
  console.log(`IP: ${req.ip}`)
})

FB.extend({appId: process.env.APP_ID, appSecret: process.env.APP_SECRET})
let page_access_token = process.env.PAGE_ACCESS_TOKEN
let groupId = 210553450180199

FB.setAccessToken(page_access_token);

FB.api(`/${groupId}/feed`, 'GET', {"fields":"description,full_picture,message,message_tags,story_tags,created_time,coordinates,name,link,place,picture,status_type,type,attachments{media},comments{message_tags}"},
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



  express_app.listen(port, ()=> {
    console.log("listening")
  })