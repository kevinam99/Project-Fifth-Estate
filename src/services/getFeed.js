/** @module getFeed */

require('dotenv').config()
const logger = require('../logger/logger');
const FB = require('fb').default;
// const secrets = require('../testing-stuff/secrets.json')
FB.extend({appId: process.env.APP_ID, appSecret: process.env.APP_SECRET})
FB.options({version: process.env.API_VERSION});
const page_access_token = process.env.PAGE_ACCESS_TOKEN
const groupId = "210553450180199"

FB.setAccessToken(page_access_token)


 /**
 * Function to calculate the time in UTC format of the past hour from the current time
 * 
 * @returns {string} since - The UTC timestamp of the past hour.
 * @returns {string} now - The UTC timestamp of the current time.
 */
const getTime = () => {
	let date = new Date().toUTCString()
	let now = Math.floor(new Date(date).getTime() / 1000)

	let since = new Date(date).setHours(new Date(date).getHours() - 1)
	since = Math.floor(new Date(since).getTime() / 1000)

	return {since, now}
}

 /**
 * This function makes an API call to the Graph API to obtain the posts from the past hour.
 * 
 * @param {string} groupId - The group ID of the concerned Facebook Group.
 * @returns {Promise} posts - The posts received.
 */
const getFeed = async () => {
	return new Promise((resolve, reject) => {
	const {since, now} = getTime()
	let lastPostId
	const apiParams = {
							fields: `description,
									full_picture,
									message,
									message_tags,
									story_tags,
									created_time,
									coordinates,
									name,
									link,
									place,
									picture,
									status_type,
									type,
									attachments{media},
									comments{message_tags}`,
							since: since,
							until: now
					}

	/**
	 * Getting feed from the Facebook group
	 * @param {String} endpoint - The Graph API endpoint to be hit.
	 * @param {String} request - Type of HTTP request - GET, POST, Patch etc.
	 * @param {Object} apiParams - The details required to be extracted from Facebook.
	 * 
	 * @returns {Object} posts - The posts received.
	 */
	FB.api(`/${groupId}/feed`, 'GET', apiParams, res => {
				if(res.error)
				{
					logger.error(`(getFeed.js)... ${res.error}`)
					reject(res.error)
				}
				else{
					console.log(res.data)
					if(res.data.length > 0) {
						logger.info(`(getFeed.js)... Received ${res.data.length} posts at this time.`)
						console.log(`res.data[0] (from getFeed.js) = ${res.data[0]} \n`)
						if(lastPostId == undefined) { // running the whole program for the first time
							lastPostId = res.data[0].id // keeping knowledge of last post accessed so that the same post isn't accessed
							resolve(res.data)
						}
						else if(lastPostId) { // if we know what the last post has been accessed when the program was run the previous time
							res.data = res.data.filter(posts => {
								return posts.id != lastPostId
							})
							resolve(res.data)
						}
						
					}
					else {
						logger.info(`(getFeed.js)... No posts available at this time`)
						return;
					}
				}
			}
		)
	})
}

module.exports = getFeed
