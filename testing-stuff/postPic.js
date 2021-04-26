const graph = require("fbgraph");
const secrets = require("./secrets.json");


let appId = secrets.app.id;
let secret = secrets.app.secret;
let access_token = secrets.page.access_token;
let userId = secrets.groups.aditya; 
graph.setAccessToken(access_token);
let wallPost;

function postOnlyPic()
{
    wallPost ={
        "alt_text_custom": `P5E weekly report`,
        "caption": `P5E weekly report with Panaji city location. Visit https://www.github.com/kevinam99 for more`,
        "url": "https://www.facebook.com/images/fb_icon_325x325.png",
        "place": "693912274113140", // Panaji city. Location shows up only when pic is opened.
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
}

function postStatusWithPic()
{
    wallPost ={
        "alt_text_custom": `P5E weekly report`,
        "message": `P5E weekly report with Panaji city location. Visit https://www.github.com/kevinam99 for more`,
       // "url": "https://www.facebook.com/images/fb_icon_325x325.png",
     //   "place": "693912274113140", // Panaji city. Location shows up only when pic is opened.
        "published": "true",
        "place": "693912274113140",
       // "picture": "https://www.facebook.com/images/fb_icon_325x325.png",
        "status_type": "added_photos",
        "type": "photo",
        "attachments": {
            "data": [
                {
                    "media": {
                        "image": {
                            "height": 325,
                            "src": "/home/kevin/Projects/bots/facebook/'Screenshot from 2019-03-08 00-05-05.png'",
                            "width": 325
                        }
                    },
                    "description": "P5E weekly report with Panaji city location. Visit https://www.github.com/kevinam99 for more"
                }
            ]
        }
    
};
    
    graph.post(`${userId}/feed?access_token=${access_token}`, wallPost, function(err, res) {
        // returns the post id
        console.log(res);
        // { id: xxxxx}
        // console.log(err.type);
    });
}

// postOnlyPic()
postStatusWithPic() //still unsuccessful