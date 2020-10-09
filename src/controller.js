const getFeed = require('./services/getFeed')
const {gregPosts, segregate} = require('./services/segregatePosts')

const feed = async () => {
    try {
        const posts = await getFeed()
        return posts
    } catch(err) {
        console.error(error)
    }
}

const greg = async () => {
    try {
        const greg_posts = await gregPosts()
        return greg_posts
    } catch(err) {
        return new Error(err)
    }
}

const segregatePosts = async (gregPosts) => {
    try {
        const {
            link,
            complaint,
            dept,
            place,
            time,
            date
        } = await segregate(gregPosts)

        return {
            link,
            complaint,
            dept,
            place,
            time,
            date
        }
    } catch(error)
    {
        return new Error(error)
    }
}

module.exports = {
    feed,
    greg,
    segregatePosts
}