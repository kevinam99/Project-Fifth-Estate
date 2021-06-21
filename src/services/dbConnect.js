/** @module dbConnect */
require('dotenv').config()
const mongoose = require('mongoose')
const Complaint = require('../models/complaint.model')
const User = require('../models/users.model')
const logger = require('../logger/logger')
const bcrypt = require('bcrypt')

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
 * This function changes the user's password in case they forget it.
 *
 * @param {string} username - The user's username.
 * @param {string} newPassword - The new password in plain text.
 * @return {boolean}
 */
const changeUserPassword = async(username, newPassword) => {
    if(username) {
        try {
            connectDB(process.env.MONGODB_USERS_URI)
            const hashedPassword = await bcrypt.hash(newPassword, 8)
            await User.findOneAndUpdate({username}, {password: hashedPassword}, null)
            logger.info(`User ${username}'s password has been updated successfully.`)
            return true
        }
        catch(error) {
            console.error(`Error when updating user ${username}'s password: ${error}`)
            return false
        }
    }
    else console.log("Enter a username")
}

// changeUserPassword("username", "pwd1")

/**
 * This function creates a new user.
 *
 * @param {string} username - The user's username.
 * @param {string} password - The user's password in plain text.
 * @param {string} role - Whether a tenant user or admin.
 * @param {string} dept - The user's dept. In case role is admin, the dept is "all"
 * @return {boolean}
 */
const createUser = async(username, password, role, dept) => {
    if(username && password && role && dept) { 
        connectDB(process.env.MONGODB_USERS_URI)
        try {
            const hashedPassword = await bcrypt.hash(password, 8)
            const loginInfo = {
                username,
                password: hashedPassword,
                role,
                dept
            }
            await User.create(loginInfo)
            logger.info(`User ${username} created successfully`)
            return true
        }
        catch(error) {
            console.error(error)
            return false
        }
    
    }

    else {
        return "missing_params_to_create_user"
    }
}

// createUser("uname", "password123", "admin", "all")


/**
 * This function logs in a user to the system.
 *
 * @param {string} username - The user's username.
 * @param {string} password - The user's password in plain text.
 * @return {boolean}
 */
const loginUser = async(username, password) => {
    try {
        connectDB(process.env.MONGODB_USERS_URI)
        const user = await User.findOne({username})
        if(user) {
            if(await bcrypt.compare(password, user.password)) {
                console.log(`${username} login successful`)
                return true
                
            }
        }
        else if(user == null) {
            console.log(`${username} login unsuccessful`)
            return false
        }
    }
    catch(error) {
        console.error(`Error while loggin in user ${username}: ${error}`)
        return false
    }
    
}

// loginUser("username", "pwd1")

/**
 * This function removes a user from the DB.
 *
 * @param {string} username - The user's username.
 * @param {string} newPassword - The new password in plain text.
 * @return {boolean}
 */
const removeUser = async(username) => {
    if (username) {    
        connectDB(process.env.MONGODB_USERS_URI)
        try {
            await User.findOneAndDelete({ username })
            logger.info(`User ${username} deleted successfully`)
            return true
        }
        catch(error) {
            console.error(error)
            return false
        }
    }

    else console.log("No username received to delete.")
}

// removeUser("uname")
/** 
 * This fuction stores the posts to the DB.
 * @param {object} segregatedPosts - Contains the relevant posts with #greg along with the department and sentiment of the post.
 * 
 */
const storePosts = async (segregatedPosts) => {
    try {
      if(NODE_ENV === 'dev') connectDB(process.env.MONGODB_URI_DEV)
      else if(NODE_ENV === 'prod') connectDB(process.env.MONGODB_URI_PROD)
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
    if(NODE_ENV === 'dev') connectDB(process.env.MONGODB_URI_DEV)
    else if(NODE_ENV === 'prod') connectDB(process.env.MONGODB_URI_PROD)
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
 * @returns {boolean}
 */
const updateComplaintStatus = async (id, newStatus) => {
  const currentId = {
    '_id': id
  }

  const updatedStatus = {
    'status': newStatus
  }
  if(NODE_ENV === 'dev') connectDB(process.env.MONGODB_URI_DEV)
  else if(NODE_ENV === 'prod') connectDB(process.env.MONGODB_URI_PROD)
  try {
    await Complaint.findOneAndUpdate(currentId, updatedStatus, {new: true})
    return true
  }
  catch(error) {
    console.error(error)
    return error
  }
}

// updateComplaintStatus("60cf4d5c315b9545acf44b21", "RESOLVED")
// Export in alphabetic order
module.exports = {  
    changeUserPassword,
    createUser,
    fetchPosts,
    loginUser,
    removeUser,
    storePosts,
    updateComplaintStatus
}
