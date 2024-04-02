const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const crypto = require('crypto')

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    //1: Admin, 2: Teacher, 3: User
    role:{
        type:String,
        enum: [1, 2, 3],
        default: 3
    },
    address:{
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
    },
    cart: [{
        course: {type: mongoose.Types.ObjectId, ref: 'Course'},
        addedAt: { type: Date, default: Date.now }
    }],
    refreshToken: {
        type: String,
    },
    passwordChangedAt: {    
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: String
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hashSync(this.password, salt)
})

userSchema.methods = {
    isCorrectPassword: async function(password){
        return await bcrypt.compare(password, this.password)
    },
    createTokenToChangePassword: function(){
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 15 * 60 * 100
        return resetToken
    }
}

//Export the model
module.exports = mongoose.model('User', userSchema);