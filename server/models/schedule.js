const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var scheduleSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    start_hour:{
        type:String,
        required:true
    },
    end_hour:{
        type:String,
        required:true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
    }
}, {
    timestamps: true    
}); 

//Export the model
module.exports = mongoose.model('Schedule', scheduleSchema);