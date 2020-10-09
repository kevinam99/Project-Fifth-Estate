const isGreg = post => {
    // segregating based on #greg
    const hastagPosts = post.data.filter(e => 'message_tags' in e)
    const gregPosts = hastagPosts.filter(e => e.message_tags.find(items => {
        
        if(items.name.toLowerCase() == "#greg")
        {
            return true
        }
    }))
    return false
    console.log(gregPosts) // greg

}

const segregate = post => {
    

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

    let dept = `unknown`, place = `unknown`, complaint = ``, date, time, link = ``;
    gregPosts.forEach(post => {
        link = `www.facebook.com/${post.id}`;
        complaint = post.message
        date = new Date().toISOString(post.created_time).split('T')[0]
        time = new Date().toTimeString(post.created_time).split(' ')[0]
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

            return {
                link,
                complaint,
                dept,
                place,
                time,
                date
            }
            console.log(`Date => ${date}, Time => ${time}\n\n\n\n`)
            // reinitialise values for next post
            place = `unknown`
            link = `www.facebook.com/`
            dept = `unknown`
            complaint = `unknown`
            time = `unknown`
        }  
    })
}

module.exports = segregate