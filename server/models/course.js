const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var courseSchema = new mongoose.Schema({
    course_name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    start_date:{
        type:String,
        required:true,
    },
    course_length:{
        type:String,
        required:true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: 'https://speedify.com/wp-content/uploads/no-disconnect.png'
        // required:true,
    },
    // participants:[
    //     {
    //         type: mongoose.Types.ObjectId, 
    //         ref: 'User'
    //     }
    // ],
    // schedule:{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Schedule',
    // },
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Course', courseSchema);