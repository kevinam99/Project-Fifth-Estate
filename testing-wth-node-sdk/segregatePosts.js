const fs = require('fs')


const path = "./file.json"


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

const places = {
                    mapusa: true,
                    margao: true,
                    panjim: true,
                    ponda: true
               }

let dept = `unknown`, place = `unknown`, complaint = ``, date, time

gregPosts.forEach(post => {
    complaint = post.message
    date = new Date(post.created_time).toISOString().split('T')[0] // YYYY-MM-DD
    time = new Date(post.created_time).toTimeString().split(' ')[0]
    const UNIXTimestamp = new Date(post.created_time).getTime()
    try {
        place = post.place.location.city
        post.message_tags.find(items => {
            const dept_place = items.name.toLowerCase().split('#')[1]
            if(departments[dept_place]) // if dept exists
            {
                dept = dept_place
                
            }
        })
    }
    catch(TypeError) { // TypeError: Cannot read property 'location' of undefined. This error might occur for place in case the user doesn't tag a place in the post
        post.message_tags.find(items => {
            const dept_place = items.name.toLowerCase().split('#')[1]
        if(places[dept_place] && place != `unknown`) // if place exists
            {
                place = dept_place
            }
        })
    }

    finally {
        place = place.split(' ')[0].toLowerCase()
        if(dept != `unknown` && place != `unknown`)
        {
            console.log(`Complaint => [ ${complaint} ] \ndepartment => ${dept} \nplace => ${place}\n`)
        }
        else
        {
            console.log(`Complaint: [ ${complaint} ]`)
            if(dept == `unknown`)
            {
                console.log(`dept unknown`)
            }

            if(place == `unknown`)
            {
                console.log(`Place unknown`)
            }
        }
        console.log(`Date => ${date}, Time => ${time}\n\n\n\n`)
        // reinitialise values for next post
        place = `unknown`
        dept = `unknown`
        complaint = `unknown`
        time = `unknown`
    }  
})