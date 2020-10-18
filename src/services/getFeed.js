require('dotenv').config()
const FB = require('fb').default;
// const secrets = require('../testing-stuff/secrets.json')
FB.extend({appId: process.env.APP_ID, appSecret: process.env.APP_SECRET})
let page_access_token = process.env.PAGE_ACCESS_TOKEN
let groupId = 210553450180199

FB.setAccessToken(page_access_token)

const getTime = () => {
	let date = new Date().toUTCString()
	let now = Math.floor(new Date(date).getTime() / 1000)

	let since = new Date(date).setHours(new Date(date).getHours() - 1)
	since = Math.floor(new Date(since).getTime() / 1000)

	return {since, now}
}

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

	FB.api(`/${groupId}/feed`, 'GET', apiParams, res => {
				if(res.error)
				{
					reject(res.error)
				}
				else{
					console.log(res.data.length)
					if(res.data.length > 0) {
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
						reject(`No posts available at this time...(getFeed.js)`)
						return;
					}
				}
			}
		)
	})
}

module.exports = getFeed
