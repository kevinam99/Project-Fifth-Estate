const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserEntity = new Schema([
  {
    userName: {
      type: String,
      required: true,
      minlength: 7,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    emailId: String,
    department: String,

    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
])
