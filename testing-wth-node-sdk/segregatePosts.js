const fs = require('fs')


let path = "./file.json"


const data = fs.readFileSync(path)
const posts = JSON.parse(data)

var hastagPosts = posts.data.filter(e => 'message_tags' in e)
var results = hastagPosts.filter(e => e.message_tags.find(items => {
    
    return items.name.toLowerCase() == "#greg"
}))
console.log(results)