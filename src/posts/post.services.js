const logger = require('../logger/logger')

const getFeed = require('../services/getFeed')
const {
    filterGregPosts,
    segregate,
    createNewTag,
} = require('../services/segregatePosts')
const { storePosts, fetchPosts } = require('../services/dbConnect')

const extractPosts = async (groupId) => {
    try {
        const posts = await getFeed(groupId)
        logger.info(`(posts.controller.js)...posts.length = ${posts.length}.`)

        if (posts.length > 0) {
            const filteredGregPosts = await filterGregPosts(posts)

            logger.info(
                `(posts.controller.js)... greg posts = ${filteredGregPosts.length}`
            )

            logger.info('(posts.controller.js)... Segregating Posts')

            const segregatedPosts = await segregate(filteredGregPosts)

            logger.info('(index.js)... Storing segregated posts to db')

            const saved = await storePosts(segregatedPosts) //the array of posts is stored to the db

            logger.info(`(index.js)... Posts saved to DB`)

            return (
                `Saved ${saved}...(index.js)` +
                `\r\n${JSON.stringify(segregatedPosts, null, 4)}`
            )
        } else {
            logger.info(`(index.js)... No posts available at this time`)
            return `No posts available at this time...(index.js)`
        }
    } catch (err) {
        logger.error(`(posts.controller.js)... Error: ${err}`)
        return err
    }
}

const getDbPosts = async () => {
    try {
        const issues = await fetchPosts()
        console.log(issues)
        return issues
    } catch (error) {
        console.error(error)
    }
}

module.exports = { extractPosts, getDbPosts }
