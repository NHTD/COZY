const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var assignmentSchema = new mongoose.Schema({
    assignment_name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,  
    },
    deadline:{
        type:String,
        required:true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    submit:[
        {
            postedBy: {type: mongoose.Types.ObjectId, ref: 'User'},
            comment: {type: String},
            files: [{ type: String }]
        }
    ]
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Assignment', assignmentSchema);