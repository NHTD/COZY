const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var tuitionSchema = new mongoose.Schema({
    fee:{
        type:String,
        required:true,
        unique:true
    },
    deadline:{
        type:Date,
        required:true,
    },
    status:{
        type: String,
        enum: ['Paid', 'Unpaid'],
        default: 'Unpaid'
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Tuition', tuitionSchema);