const graph = require("fbgraph");

let appId = '211761870180278';
let secret = 'd34304d06b20598e6090ecf7603576be';
let access_token = 'EAADAmKcMj7YBAO2cHbk0g57VeVRcPaujHV7mLRqkCVArFcLhNZBZClNSYQQjEtTZBUxaVxzeLR0owfB9GjYEfhlZBGZBdk6cCcEZCkx7vUIk8HHmKfvEdsveBrIGEKlnt5R5AnQkXxPHdbeeBx5zqvRNypE71ZBx2PTDBhv0j2CoVugkFKv6BApoNlrdnQ1fNC4wjHZAacbyjj1Kr8N2ZBnSqb3055IDQ0tcZB0OM0uhqx1Gje0rEgd6cY';
let userId = "210553450180199"; // kevin's fake group
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
        console.log(res); // { id: xxxxx}
        // console.log(err.type);
    });
}

// postOnlyPic()
postStatusWithPic()