const graph = require("fbgraph");

let appId = '211761870180278';
let secret = 'd34304d06b20598e6090ecf7603576be';
let access_token = 'EAADAmKcMj7YBANZB5dGCWozdba6t6Kh4S8YXzvK1EImGjfZBbnA4VAQpN5vHDrMOJ5j1g0Yx0CHATz9ZCNqFTUFeT682bor4JVG1ZAr3yrSyyXaQDe9ZAYV3XfnZCX48tIPhE3MphnwFkwCrV2JQMK4qRF93ycKmlwxmJZBZCZCXlNx8iJXJK9ARVazXTueLnA3zW3iN4IBpAjZAjlYmi4ZB6NowH63tb5f3OAXKGJyjFPwvQZDZD';
let userId = "3492229184147401";
graph.setAccessToken(access_token);
let wallPost = {
    "message": "Testing from script"
};

graph.post(userId + "/feed?access_token=" + access_token, wallPost, function(err, res) {
    // returns the post id
    console.log(res); // { id: xxxxx}
});