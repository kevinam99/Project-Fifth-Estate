const User = require('./user.entity')
const mongo_uri = `mongodb+srv://greg:${process.env.MONGO_PASSWORD}@cluster0.adgjc.mongodb.net/demo1?retryWrites=true&w=majority`
const mongoose = require('mongoose')
const logger = require('../logger/logger')

const signUp = async (userCredentialsDto) => {
    try {
        mongoose.connect(mongo_uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })

        const { username, password } = userCredentialsDto

        const user = new User()
        user.username = username
        user.password = password
        user.isAdmin = true
        await user.save()
        logger.info(`${user} added to DB`)

        return user
    } catch (Err) {
        logger.error('Err')
    }
}

module.exports = { signUp }
