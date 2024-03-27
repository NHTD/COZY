const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')
const crypto = require('crypto')

const register = asyncHandler(async(req, res) => {
    const {first_name, last_name, email, mobile, password} = req.body
    if(!first_name || !last_name || !email || !mobile || !password){
        return res.status(400).json({
            success: true,
            msg: 'Missing inputs'
        })
    }

    const checkUser = await User.findOne({email})

    if(checkUser){
        throw new Error('User has existed')
    }else{
        const response = await User.create(req.body)

        return res.status(200).json({
            status: response ? true : false,
            msg: response ? 'Register is successful' : 'Register is failed'
        })
    }
})

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.send(400).json({
            status: false,
            msg: 'Missing inputs'
        })
    }

    const response = await User.findOne({email})
    if(response && await response.isCorrectPassword(password)){
        const accessToken = generateAccessToken(response._id, response.email)
        const refreshToken = generateRefreshToken(response._id)

        await User.findByIdAndUpdate(response._id, {refreshToken}, {new: true})

        res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true})

        return res.status(200).json({
            status: response ? true : false,
            accessToken,
            refreshToken,
            msg: response ? response : 'Something went wrong',
        })
    }else{
        throw new Error('Email or password has failed')
    }
})

const getAllUsers = asyncHandler(async(req, res) => {
    const response = await User.find()

    return res.status(200).json({
        status: response ? true : false,
        msg: response ? response : 'Can not get all users'
    })
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    const cookie = req.cookies

    if(cookie && cookie.refreshToken){
        const data = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
        const response = await User.findByIdAndUpdate(data._id, {refreshToken: cookie.refreshToken}, {new: true})

        return res.status(200).json({
            status: response ? true : false,
            msg: response ? generateAccessToken(response._id, response.email) : 'Something went wrong'
        })
    }else{
        throw new Error('No refresh token in cookies')
    }
})

const forgotPassword = asyncHandler(async(req, res) => {
    const {email} = req.body
    if(!email){
        throw new Error('Missing inputs')
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            status: false,
            msg: 'User is not found!'
        })
    }

    const resetToken = user.createTokenToChangePassword()
    await user.save()

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này hết hạn sau 15m kể từ bây giờ. <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html
    }

    const emailData = await sendMail(data)

    return res.status(200).json({
        status: emailData.response?.includes('OK') ? true : false,
        msg: emailData.response?.includes('OK') ? 'Please, check your email!' : 'There was an error, please try again'
    })
})

const resetPassword = asyncHandler(async(req, res) => {
    const {password, token} = req.body

    if(!password || !token){
        throw new Error('Missing inputs')
    }

    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now()}})
    if(!user){
        return res.status(400).json({
            status: false,
            msg: 'Invalid token'
        })
    }

    user.password=password
    user.passwordChangedAt=Date.now()
    user.passwordResetToken=undefined
    user.passwordResetExpires=undefined
    user.save()

    return res.status(200).json({
        status: user ? true : false,
        msg: user ? 'Updated password' : 'Something went wrong'
    })
})

const getUserById = asyncHandler(async(req, res) => {
    const {_id} = req.user

    const user = await User.findById(_id)
    return res.status(200).json({
        status: user ? true : false,
        mes: user? user : 'Can not find user' 
    })
})

const updateUser = asyncHandler(async(req, res) => {
    const {_id} = req.user
    if(Object.keys(req.body).length === 0){
        throw new Error('Missing inputs')
    }

    const user = await User.findByIdAndUpdate(_id, req.body, {new: true})
    return res.status(200).json({
        status: user ? true : false,
        mes: user ? 'Update is successful' : 'Can not update user. Something went wrong'
    })
})

const updateUserByAdmin = asyncHandler(async(req, res) => {
    const {uid} = req.params
    if(Object.keys(req.body).length === 0){
        throw new Error('Missing inputs')
    }

    const updateUser = await User.findByIdAndUpdate(uid, req.body, {new: true})
    return res.status(200).json({
        status: updateUser ? true : false,
        mes: updateUser ? 'Update is successful' : 'Can not update user. Something went wrong'
    })
})

const deleteUserById = asyncHandler(async(req, res) => {
    const {uid} = req.params

    const deleteUser = await User.findByIdAndDelete(uid)
    return res.status(200).json({
        status: deleteUser ? true : false,
        mes: deleteUser ? 'Delete is successful' : 'Can not update user. Something went wrong'
    })
})

const getAllStudentByTeacher = asyncHandler(async(req, res) => {
    const {_id} = req.user
    if(!_id){
        throw new Error('This teacher was not found')
    }

    const student = await User.find({role: 'user'})
    return res.status(200).json({
        status: student ? true : false,
        mes: student ? student : 'Something went wrong'
    })
})

const updateCourse = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const {cid} = req.body

    if(!cid){
        throw new Error('Missing inputs')
    }

    const userCart = await User.findById(_id).select('cart')
    
    const isCartExisted = userCart?.cart?.find(el => el.course.toString() === cid);
    if(isCartExisted){
        // const updateUserCart = await User.updateOne({cart: {$elemMatch: isCartExisted}}, {$set: {"cart.$.quantity": quantity}}, {new: true})
        const updateUserCart = await User.findOne({cart: {$elemMatch: isCartExisted}})
        console.log(updateUserCart);

        return res.status(200).json({
            status: updateUserCart ? true : false,
            mes: updateUserCart ? 'This course existed in order' : 'Cannot update'
        });
    }else{
        const updateUserCart = await User.findByIdAndUpdate(_id, {$push: {cart: {course: cid}}}, {new: true})

        return res.status(200).json({
            status: updateUserCart ? true : false,
            mes: updateUserCart ? 'Updated' : 'Can not update'
        })
    }
})

module.exports = {
    register,
    login,
    getAllUsers,
    refreshAccessToken,
    forgotPassword,
    resetPassword,
    getUserById,
    updateUserByAdmin,
    deleteUserById,
    updateUser,
    getAllStudentByTeacher,
    updateCourse,
}