const graph = require("fbgraph");

let appId = '211761870180278';
let secret = 'd34304d06b20598e6090ecf7603576be';
let access_token = 'EAADAmKcMj7YBAO2cHbk0g57VeVRcPaujHV7mLRqkCVArFcLhNZBZClNSYQQjEtTZBUxaVxzeLR0owfB9GjYEfhlZBGZBdk6cCcEZCkx7vUIk8HHmKfvEdsveBrIGEKlnt5R5AnQkXxPHdbeeBx5zqvRNypE71ZBx2PTDBhv0j2CoVugkFKv6BApoNlrdnQ1fNC4wjHZAacbyjj1Kr8N2ZBnSqb3055IDQ0tcZB0OM0uhqx1Gje0rEgd6cY';
//let userId = "164559246924824/feed"; ///goa speaks
let userId = "3492229184147401/feed?fields=place,message,picture,message_tags&limit(1000)";
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

