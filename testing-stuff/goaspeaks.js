const graph = require("fbgraph");

let appId = '211761870180278';
let secret = 'd34304d06b20598e6090ecf7603576be';
let access_token = 'EAADAmKcMj7YBANZB5dGCWozdba6t6Kh4S8YXzvK1EImGjfZBbnA4VAQpN5vHDrMOJ5j1g0Yx0CHATz9ZCNqFTUFeT682bor4JVG1ZAr3yrSyyXaQDe9ZAYV3XfnZCX48tIPhE3MphnwFkwCrV2JQMK4qRF93ycKmlwxmJZBZCZCXlNx8iJXJK9ARVazXTueLnA3zW3iN4IBpAjZAjlYmi4ZB6NowH63tb5f3OAXKGJyjFPwvQZDZD';
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
  .get("210553450180199/feed?fields=message,message_tags,story_tags", function(err, res) {
    try {
        console.log(res);
        fs.writeFileSync(path, JSON.stringify(res, null, 4))
      } catch (err) {
        console.error(err)
      }

    // console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }

    });

