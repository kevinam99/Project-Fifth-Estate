const graph = require("fbgraph");

let appId = `211761870180278`;
let secret = `d34304d06b20598e6090ecf7603576be`;
let access_token = `EAADAmKcMj7YBABfJ60JxxddtleBq2TX0CKEZB2d6iTTO1yZAz5dsAvDbSOceZBky34F2GVT38gpHr7EMCffwwoRezEUfQiOG6BUuMnXrzA0ZB49j2wcXGrt6uBHVlhEFeGXjzbk63iQAr1L67amR2Pw81tW8A5htLR5LCDC7DQWgb9743BsQgxO1evgjlFZCFZCkk9aHB29uFSov0ifIckxFF4BvzFMrZBnfF8xMf9jrwZDZD`;
let userId = "3492229184147401";
graph.setAccessToken(access_token);
let wallPost = {
    "message": "messsage"
};

graph.post(userId + "/feed?access_token=" + access_token, wallPost, function(err, res) {
    // returns the post id
    console.log(res); // { id: xxxxx}
});