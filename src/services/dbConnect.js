require('dotenv').config()
const mongoose = require('mongoose')
const Complaint = require('../models/complaint.model')
const logger = require('../logger/logger')

//db connection
const storePosts = async (segregatedPosts) => {
  let mongo_uri = process.env.MONGODB_URI
  try {
    await mongoose.connect(mongo_uri, {
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
  let mongo_uri = process.env.MONGODB_URI
  mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  return Complaint.find({})
}
module.exports = { storePosts, fetchPosts }