const graph = require("fbgraph");

let appId = '211761870180278';
let secret = 'd34304d06b20598e6090ecf7603576be';
let access_token = 'EAADAmKcMj7YBABNZBGirrWQ1PQC4C7HVUxHMoFdLG9ZC1qJT1ycZCLOmvfnqxsRU5Ri9YeInxH3wuLKhPbSXxTLyBZAq4YdrMOwjsQmIJF84UzD8jJ9tX88uQaZBLM47fkSqNpTDUqLdSWPETROFBrw2bbSDzOMaSeI1sbn5nP7dPmwR1QNdCMmtZB7sCBzK04XZA8mJxW3EFdXvDXw4INHREfYjmu2ANYtJhPhBUQ6kiYznJn4gguH';
let userId = "210553450180199"; // kevin's fake group
graph.setAccessToken(access_token);
let wallPost;

wallPost ={
    "alt_text_custom": `P5E weekly report`,
    "caption": `P5E weekly report. Visit https://www.github.com/kevinam99 for more`,
    "url": "https://www.facebook.com/images/fb_icon_325x325.png"
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