/** @module dbConnect */
require('dotenv').config()
const mongoose = require('mongoose')
const Complaint = require('../models/complaint.model')
const logger = require('../logger/logger')

const MONGODB_URI = process.env.MONGODB_URI

/**
 * This function helps to connect to MongoDB Cloud Atlas before any post is stored.
 *
 * @param {string} MONGODB_URI - The URI to connect to MongoDB Cloud Atlas.
 * @returns {string} response - The response from MongoDB Cloud Atlas.
 */
const connectDB = async(MONGODB_URI) => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    logger.info("Connected to Mongo Atlas!")
  }
  catch(error) {
    logger.error(`Error while connecting to Mongo Atlas: ${error}`)
  }
}
/** 
 * This fuction stores the posts to the DB.
 * @param {object} segregatedPosts - Contains the relevant posts with #greg along with the department and sentiment of the post.
 * 
 */
const storePosts = async (segregatedPosts) => {
    try{
      connectDB(MONGODB_URI)
      await Complaint.insertMany(segregatedPosts)
      logger.info(`(dbConnect.js)... Complaints saved to DB.`)
    
  } catch (error) {
    logger.error(`(dbConnect.js)... ${error}`)
    return error
  }
  return 1
}

/**
 * 
 * This function fetches posts from the DB with the given date.
 * @param {string} date - Posts originationg from the specified date.
 * 
 * @returns {object} Complaint - Contains all the complaints of the given date.
 */
const fetchPosts = async (date) => {
  try {
    connectDB(MONGODB_URI)
    return Complaint.find({})
    
  } catch (error) {
    logger.error(`(dbConnect.js)... ${error}`)
    return error
  }

  
}

/**
 * 
 * This function updates the status of the complaint.
 * @param {string} id - Post ID within set by MongoDB
 * @param {string} newStatus - New status (ASSIGNED, PENDING, RESOLVED)
 * @returns {object} Complaint - Contains all the complaints of the given date.
 */
const updateComplaintStatus = async (id, newStatus) => {
  const doc = {
    '_id': id
  }

  const updatedDoc = {
    'status': newStatus
  }
  connectDB(MONGODB_URI)
  try {
    await Complaint.findOneAndUpdate(doc, updatedDoc, {new: true})
    return 1
  }
  catch(error) {
    console.error(error)
    return error
  }
}

// updateComplaintStatus("60cf4d5c315b9545acf44b21", "RESOLVED")
module.exports = { storePosts, fetchPosts , updateComplaintStatus}
