require('dotenv').config()
const FB = require('fb').default
const app = require('express')()
const bodyParser = require('body-parser')
const { deepStrictEqual } = require('assert')
const webhook = require('./services/webhook')
FB.options({version: process.env.API_VERSION});
const PORT = process.env.PORT || 5000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

FB.extend({appId: process.env.APP_ID, appSecret: process.env.APP_SECRET})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// function segregate()

const setWebhook = async () => {
    let callback_url
    if(process.env.NODE_ENV == `dev`)
    {
        callback_url = `https://f6688ef10dbb.ngrok.io/complaint` // must use https only
    }

    else if(process.env.NODE_ENV == `production`)
    {
        callback_url = process.env.WEBHOOK_CALLBACK_URL // must use https only
    }
    
    const fields = `photos`
    const object = `user`
    try {
       await webhook(callback_url, fields, object)
       app.get('/complaint', (req, res) => {
            res.status(200).send(req.query['hub.challenge']).end()
        })
    }
    catch(error)
    {
        console.log(error.message)
    }
    
}

setWebhook()

app.post('/complaint', (req, res) => {
    res.sendStatus(200)
    console.log(`Field => ${req.body.entry[0].changes[0].field}`)
    const date = new Date().toISOString(req.body.entry[0].time).split('T')[0]
    const time = new Date().toTimeString(req.body.entry[0].time).split(' ')[0]
    console.log(`Date: ${date} \nTime: ${time}`)
})