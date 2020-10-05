const fs = require('fs')


const path = "./test.json"


const data = fs.readFileSync(path)
const posts = JSON.parse(data)

// segregating based on #greg
const hastagPosts = posts.data.filter(e => 'message_tags' in e)
const gregPosts = hastagPosts.filter(e => e.message_tags.find(items => {
    
    return items.name.toLowerCase() == "#greg"
}))
console.log(gregPosts) // greg


// segregating based on departments

const departments = {
                        goapwd: true, 
                        goaelectricity: true, 
                        goahealth: true, 
                        goatransport: true,
                        goaeducation: true
                    }

gregPosts.forEach(post => {
    post.message_tags.find(items => {
        const dept = items.name.toLowerCase().split('#')[1]
        if(departments[dept]) // if dept exists
        {
            console.log(`Complaint => [ ${post.message} ] \ndepartment => ${dept}`)
        }
    })
})
