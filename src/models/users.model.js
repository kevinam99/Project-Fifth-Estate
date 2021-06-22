const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema([{
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },

    role: { // tenant, super-admin
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    
    dept: { 
        type: String, 
        required: true,
        trim: true,
        minlength: 3
    }

}])

const User = mongoose.model('User', userSchema);

module.exports = User;