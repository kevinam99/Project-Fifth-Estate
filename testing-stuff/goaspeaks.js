const graph = require("fbgraph");
const secrets = require("./secrets.json");


let appId = secrets.app.id;
let secret = secrets.app.secret;
let access_token = secrets.page.access_token;
let userId = secrets.groups.aditya; 
graph.setAccessToken(access_token);
let wallPost = {
    "message": "Testing from script"
};

var options = {
    timeout:  3000
  , pool:     { maxSockets:  Infinity }
  , headers:  { connection:  "keep-alive" }
};

const fs = require('fs');
let path = "./file.json";

graph
  .setOptions(options)
  .get("210553450180199/feed?fields=description,full_picture,message,message_tags,story_tags,created_time,coordinates,name,link,place,picture,application,status_type,type,attachments{media,description}", function(err, res) {
    try {
        console.log(res);
        fs.writeFileSync(path, JSON.stringify(res, null, 4))
      } catch (err) {
        console.error(err)
      }

    // console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }

    });

