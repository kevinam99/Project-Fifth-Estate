require('dotenv').config()
const mongoose = require('mongoose')
const Complaint = require('../models/complaint.model')
const logger = require('../logger/logger')

const MONGODB_URI = process.env.MONGODB_URI
//db connection
const storePosts = async (segregatedPosts) => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })

    await Complaint.insertMany(segregatedPosts)
    logger.info(`(dbConnect.js)... Complaints saved to DB.`)
  } catch (error) {
    logger.error(`(dbConnect.js) line 19... ${error}`)
  }
  return 1
}
const fetchPosts = async (date) => {
  try {
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    
    return Complaint.find({})
    
  } catch (error) {
    logger.error(`(dbConnect.js) line 31... ${error}`)
  }

  
}
module.exports = { storePosts, fetchPosts }
