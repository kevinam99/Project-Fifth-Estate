const graph = require("fbgraph");
const secrets = require("./secrets.json");


let appId = secrets.app.id;
let secret = secrets.app.secret;
let access_token = secrets.page.access_token;
let userId = secrets.groups.aditya; 
graph.setAccessToken(access_token);


let wallPost = {
    
    "message": "Aditya Here Testing again from Rome this time \n #iLoveKORUNA",
    
    
};

graph.post(userId + "/feed?access_token=" + access_token, wallPost, function(err, res) {
    // returns the post id
    console.log(res); // { id: xxxxx}
});