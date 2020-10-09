const graph = require("fbgraph");
const secrets = require("./secrets.json");


let appId = secrets.app.id;
let secret = secrets.app.secret;
let access_token = secrets.page.access_token;
let userId = secrets.groups.aditya; 
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