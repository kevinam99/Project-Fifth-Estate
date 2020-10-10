const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema= new Schema([{
    postLink: {
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
    },

    pictureLink: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    sentiment: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    date: { // format is YYYY-MM-DD
        type: Date,
        required: true,
        trim: true,
        minlength: 3
    },
    
    time: { // send time as a string
        type: String, 
        required: true,
        trim: true,
        minlength: 3
    },

    status:{
        type: String,
        enum: [ 'PENDING', 'WORKING_ON', 'RESOLVED'],
        required: true,
        trim: true,
        default: 'PENDING'
    }

}])

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;