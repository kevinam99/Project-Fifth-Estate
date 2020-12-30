const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserEntity = new Schema([
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
    },
    password: {
      type: String,
      required: true,
      minlength: 2,
    },

    emailId: String,
    department: String,

    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
])

const User = mongoose.model('User', UserEntity)
module.exports = User;