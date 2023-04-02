
// importing the required modules
const mongoose = require('mongoose');

// defining the schema in the db
const roomSchema = new mongoose.Schema({
    room_number : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    type_room :{
        type : String,
        required : true
    },
    start_time : {
        type : String,
        required : true
    },
    end_time : {
        type : String,
        required : true
    }    
})

// creating a mongoose model with the schema
const RoomBook = mongoose.model('RoomBook', roomSchema)

// exporting modules
module.exports = RoomBook
