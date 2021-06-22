/** @module userMgmt */
require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/users.model')
const logger = require('../logger/logger')
const bcrypt = require('bcrypt')


process.on('SIGINT', function() {
    mongoose.disconnect(function () {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });
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
           // connectDB(process.env.MONGODB_USERS_URI)
            const hashedPassword = await bcrypt.hash(newPassword, 8)
            await User.findOneAndUpdate({username}, {password: hashedPassword}, null)
            logger.info(`User ${username}'s password has been updated successfully.`)
            // mongoose.disconnect()
            return true
        }
        catch(error) {
            // mongoose.disconnect()
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
    //    connectDB(process.env.MONGODB_URI_DEV)
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
           // mongoose.disconnect()
            return true
        }
        catch(error) {
           // mongoose.disconnect()
            console.error(error)
            return false
        }
        
    }

    else {
        return "missing_params_to_create_user"
    }
}

// createUser("username", "password123", "admin", "all")



/**
 * This function logs in a user to the system.
 *
 * @param {string} username - The user's username.
 * @param {string} password - The user's password in plain text.
 * @return {boolean}
 */
const loginUser = async(username, password) => {
    try {
    //    connectDB(process.env.MONGODB_URI_DEV)
        console.log(`Logging in user ${username}`)
        const user = await User.findOne({username})
        if(user) {
            if(await bcrypt.compare(password, user.password)) {
                // mongoose.disconnect()
                console.log(`${username} login successful`)
                return user
                
            }
            else {
                console.log(`${username}'s entered password is incorrect`)
                return "incorrect_password"
            }
        }
        else if(user == null) {
            // mongoose.disconnect()
            console.log(`User ${username} doesn't exist`)
            return null
        }
        
    }
    catch(error) {
        console.error(`Error while loggin in user ${username}: ${error}`)
        return false
    }
    
}

// loginUser("usernaem", "passweord123")
// mongoose.disconnect()
/**
 * This function removes a user from the DB.
 *
 * @param {string} username - The user's username.
 * @param {string} newPassword - The new password in plain text.
 * @return {boolean}
 */
const removeUser = async(username) => {
    if (username) {    
       // connectDB(process.env.MONGODB_USERS_URI)
        try {
            await User.findOneAndDelete({ username })
            logger.info(`User ${username} deleted successfully`)
           // mongoose.disconnect()
            return true
        }
        catch(error) {
            // mongoose.disconnect()
            console.error(error)
            return false
        }
    }

    else console.log("No username received to delete.")
}

// removeUser("uname")

module.exports = {
    changeUserPassword,
    createUser,
    loginUser,
    removeUser
}