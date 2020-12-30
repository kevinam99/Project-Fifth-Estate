require('dotenv').config()
const mongoose = require('mongoose')
const Complaint = require('../models/complaint.model')
const logger = require('../logger/logger')

const mongo_uri = `mongodb+srv://greg:${process.env.MONGO_PASSWORD}@cluster0.adgjc.mongodb.net/demo1?retryWrites=true&w=majority`

//db connection
const storePosts = async (segregatedPosts) => {
    //let mongo_uri = `mongodb+srv://greg:${process.env.MONGO_PASSWORD}@cluster0.adgjc.mongodb.net/demo1?retryWrites=true&w=majority`

    mongoose.connect(mongo_uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })

    Complaint.insertMany(segregatedPosts)
        .then(() => {
            logger.info(`(dbConnect.js)... Complaints saved to DB.`)
            console.log('Complaints saved to db')
        })
        .catch((err) => {
            logger.error(`(dbConnect.js)... ${err}`)
            console.error(err)
        })

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

const signUp = async (user) => {}
module.exports = { storePosts, fetchPosts }
