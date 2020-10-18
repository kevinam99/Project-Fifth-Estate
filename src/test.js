let records  =[]

records.push({link: "fexamine.com", dept: "goapwd", sentiment: "neg", place: "margao"})
records.push({link: "fexamine.com", dept: "goapwd", sentiment: "neg", place: "margao"})
records.push({link: "fexamine.com", dept: "goapwd", sentiment: "neg", place: "margao"})
records.push({link: "fexamine.com", dept: "goapwd", sentiment: "neg", place: "margao"})

console.log(records[0])

const app = require('express')()

app.listen(5000, () => {
    console.log("listening at 5000")
})

app.patch('/newhashtag/:tag', (req, res) => {
    console.log(`New hashtag: #${req.params.tag}`)
    res.sendStatus(200)
})