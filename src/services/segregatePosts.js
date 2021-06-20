/** @module segregate */
const logger = require("../logger/logger");
/**
 * Sentiment analysing module. This method identifies the positivity score
 * of the recieved post text.
 */
const analyseSentiment = require('Sentimental').analyze;

/**
 * 
 * This function analyses the given posts and only keeps the posts that have #greg in the body.
 * 
 * @param {Object} post - The complete post information from Graph API's response.
 * @returns {Object} gregPosts - The posts that have #greg in the body.
 */
const filterGregPosts = (post) => {

	const hastagPosts = post.filter((e) => "message_tags" in e); // get posts containing hashtags
	const gregPosts = hastagPosts.filter((e) =>
		e.message_tags.find((items) => {
			return items.name.toLowerCase() == "#greg";
		})
	);
	logger.info(`(segregatePosts.js)... Filtered Greg posts. Total: ${gregPosts.length}`)
	return gregPosts;
};

/**
 * This object contains the record of the relevant departments.
 */
const departments = {
	goapwd: true,
	goaelectricity: true,
	goahealth: true,
	goatransport: true,
	goaeducation: true,
};

/** 
 * This function adds new departments as and when there's a requirement
 * 
 * @param {String} receivedTag - The new tag, i.e, the department name
 * @returns {Object} departments - The updated list of all departments.
 */
const createNewTag = (receivedTag) => {
	console.log(receivedTag)
	if (!departments[`${receivedTag}`]) {
		departments[`${receivedTag}`] = true;
		return departments;
	}
	else{
		return false;
	}
};

/**
 * 
 * This function segregates wach post by further identifying the relevant department (from the hashtags), 
 * the geotagged location and the positivity score of the post text (sentiment). The technique used is
 * lexicon based sentiment analysis.
 * 
 * @param {Object} gregPosts - The posts identified by #greg
 * @returns {Object} segregatedPosts - The posts broken down to dept, place, complaint, date, time and post link.
  */
const segregate = async (gregPosts) => {
	// segregating based on departments
	logger.info(`(segregatePosts.js)... Segregation begins`)
	const places = {
		mapusa: true,
		margao: true,
		panjim: true,
		ponda: true,
	};

	let dept = `unknown`,
		place = `unknown`,
		complaint = ``,
		date,
		time,
		link = ``;

	let segregatedPosts = []; //array of posts

	/**
	 * Iterating through each post with #greg
	 */
	gregPosts.forEach(post => {

		// reinitialise values for next post

		place = `unknown`;
		link = `unknown`;
		dept = [`unknown`];
		complaint = `unknown`;
		time = `unknown`;
		link = `https://www.facebook.com/${post.id}`;
		sentiment = 0;
		complaint = post.message;

		date = new Date(post.created_time).toISOString().split("T")[0];
		time = new Date(post.created_time).toTimeString().split(" ")[0];

		try {
			place = post.place.location.city;
			post.message_tags.find((items) => {
				const dept_place = items.name.toLowerCase().split("#")[1];
				console.log(`dept_pace = ${dept_place}\n`)
				if (departments[dept_place] && dept_place != 'greg') {
					// if dept exists
					dept.push(dept_place);
				}
			});
		} catch (TypeError) {
			// TypeError: Cannot read property 'location' of undefined. This error might occur for place in case the user doesn't tag a place in the post
			post.message_tags.find((items) => {
				const dept_place = items.name.toLowerCase().split("#")[1];
				if (places[dept_place]) {
					// if place exists
					place = dept_place;
				}
				if (departments[dept_place] && dept_place != 'greg') {
					// if dept exists
					dept.push(dept_place);
				}
			});
		} finally {
			place = place.split(" ")[0].toLowerCase();
			if (dept != `unknown` && place != `unknown`) {
				logger.info(
					`Complaint => [ ${complaint} ] \ndepartment => ${dept} \nplace => ${place}\n`
				);
			} else {
				logger.info(`Complaint: [ ${JSON.stringify(complaint)} ]`);
				if (dept == `unknown`) {
					logger.info(`dept unknown`);
				}

				if (place == `unknown`) {
					logger.info(`Place unknown`);
				}
			}


			if(dept.length > 1) { // excluding the preinitialise ['unknown']
				dept = dept.filter(element => { // removing `unknown` from dept list
					return element !== `unknown`
				})
			}
			 

			const obj = {
				postLink: link,
				dept: dept,
				place: place,
				sentiment: analyseSentiment(complaint).score,
				date: date,
				time: time,
			};
			logger.info(`(segregatePosts.js)... Complaint details: ${JSON.stringify(obj)}`)
			console.log(obj)
			segregatedPosts.push(obj);
		}
	});
	
	return segregatedPosts;
};


module.exports = {
	filterGregPosts,
	segregate,
	createNewTag
};
