const graph = require("fbgraph");

let appId = '211761870180278';
let secret = 'd34304d06b20598e6090ecf7603576be';
let access_token = 'EAADAmKcMj7YBAFAWqQ7sWRFwZAnRXp7CwVNOZBvFPftZB78ULbPrgiz0etBLAnKKcsZBuvkTYsbjkb933vmZAZBbLRlpm3bsvvfBTQW5GpXYfZBEPtXfFJ9ld64ly4o5loTuMY4xNEW07zR9K22RH8B1m0otPAUWOhYUbKRp7C1xZBJiEhpAsej0GIuI240HZApUhZAZAv9ovNuawv4Gc2tKz10';
let userId = "3492229184147401"; // aditya's fake group
graph.setAccessToken(access_token);
let wallPost;

wallPost ={
    "alt_text_custom": `P5E weekly report`,
    "caption": `P5E weekly report with Panaji city location. Visit https://www.github.com/kevinam99 for more`,
    "url": "https://www.facebook.com/images/fb_icon_325x325.png",
    "place": "693912274113140",
    "published": "true"
};



graph.post(userId + "/photos", wallPost, function(err, res){
    if(res)
    {
        console.log(res);
    }

    else if(err)
    {
        console.error(err);
    }

});