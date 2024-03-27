const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema({
    room_name:{
        type:String,
        required:true,
        unique:true
    },
    capacity:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    schedule:{
        type: mongoose.Types.ObjectId,
        ref: 'Schedule'
    },
    users: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    assignments: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'Assignment'
        }
    ],
    files: {
        type: Array
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Room', roomSchema);