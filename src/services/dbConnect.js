require('dotenv').config()
const mongoose = require('mongoose')
const Complaint = require('../models/complaint.model')
const logger = require('../logger/logger')

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async(MONGODB_URI) => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    logger.info("Connected to Mongo Atlas")
  }
  catch(error) {
    logger.error(`Error while connecting to Mongo Atlas: ${error}`)
  }
}
//db connection
const storePosts = async (segregatedPosts) => {
    try{
      await Complaint.insertMany(segregatedPosts)
      logger.info(`(dbConnect.js)... Complaints saved to DB.`)
    
  } catch (error) {
    logger.error(`(dbConnect.js) line 27... ${error}`)
    return error
  }
  return 1
}
const fetchPosts = async (date) => {
  try {
    return Complaint.find({})
    
  } catch (error) {
    logger.error(`(dbConnect.js) line 37... ${error}`)
    return error
  }

  
}

connectDB(MONGODB_URI)
module.exports = { storePosts, fetchPosts }
