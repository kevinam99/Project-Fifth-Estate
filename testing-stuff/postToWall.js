const graph = require("fbgraph");

let appId = '211761870180278';
let secret = 'd34304d06b20598e6090ecf7603576be';
let access_token = 'EAADAmKcMj7YBABNZBGirrWQ1PQC4C7HVUxHMoFdLG9ZC1qJT1ycZCLOmvfnqxsRU5Ri9YeInxH3wuLKhPbSXxTLyBZAq4YdrMOwjsQmIJF84UzD8jJ9tX88uQaZBLM47fkSqNpTDUqLdSWPETROFBrw2bbSDzOMaSeI1sbn5nP7dPmwR1QNdCMmtZB7sCBzK04XZA8mJxW3EFdXvDXw4INHREfYjmu2ANYtJhPhBUQ6kiYznJn4gguH';
let userId = "210553450180199";
graph.setAccessToken(access_token);
let wallPost;

// for(let i = 0; i < 10; i++)
// {
    wallPost = {
        "message": `testing with pictures`,
   };
    
    graph.post(userId + "/feed?access_token=" + access_token, wallPost, function(err, res) {
        // returns the post id
        console.log(res); // { id: xxxxx}
        // console.log(err.type);
    });
// }