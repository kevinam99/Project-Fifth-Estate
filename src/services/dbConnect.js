require('dotenv').config()
const mongoose = require('mongoose')
const Complaint = require('../models/complaint.model')
const logger = require('../logger/logger')

//db connection
const storePosts = async (segregatedPosts) => {
  let mongo_uri = `mongodb+srv://greg:${process.env.MONGO_PASSWORD}@cluster0.adgjc.mongodb.net/demo1?retryWrites=true&w=majority`
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
  let mongo_uri = `mongodb+srv://greg:${process.env.MONGO_PASSWORD}@cluster0.adgjc.mongodb.net/demo1?retryWrites=true&w=majority`
  mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  return Complaint.find({})
}
module.exports = { storePosts, fetchPosts }
