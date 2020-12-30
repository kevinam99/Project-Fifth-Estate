const User = require('./user.entity')

const signUp = async (userCredentialsDto) => {
    const { username, password } = userCredentialsDto

    const user = new User()
    user.username = username
    user.password = password
    //await user.save()     need to setup db for that
}

module.exports = { signUp }
