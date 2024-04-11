const mongoose = require('mongoose'); // Erase if already required

var quizQuestionSchema = new mongoose.Schema({
    question: { 
        type: String, 
        required: true 
    },
    options: [
        { 
            type: String, 
            required: true 
        }
    ],
    correctOptionIndex: { 
        type: Number, 
        required: true 
    }
});

//Export the model
module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);