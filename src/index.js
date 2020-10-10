require('dotenv').config()
const FB = require('fb').default
const app = require('express')()
const bodyParser = require('body-parser')

const getFeed = require('./services/getFeed')

FB.options({version: process.env.API_VERSION});
const PORT = process.env.PORT || 5000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

FB.extend({appId: process.env.APP_ID, appSecret: process.env.APP_SECRET})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

const main = async () => {
    try {
        const posts = await getFeed()
        console.log(`posts.length (from index.js) = ${posts.length}`)
        if(posts.length > 0) {
            
        }
    }
    catch(err) {
        console.error(err)
    }
}

main()
// posts.then(res => { console.log(`posts.length (from index.js) = ${res}`)})
// posts.catch(err => console.error(err))

// const gregPosts = Controller.greg()
// console.log(`greg posts (from index.js) = ${gregPosts.length}`)

// if(gregPosts.length > 0)
// {
//     const {
//         link,
//         complaint,
//         dept,
//         place,
//         time,
//         date
//     } = Controller.segregate()
//     console.log("In if block")

// }
 
app.post('/complaint', (req, res) => {
    res.sendStatus(200)
    console.log(`Field => ${req.body.entry[0].changes[0].field}`)
    const date = new Date().toISOString(req.body.entry[0].time).split('T')[0]
    const time = new Date().toTimeString(req.body.entry[0].time).split(' ')[0]
    console.log(`Date: ${date} \nTime: ${time}`)
})