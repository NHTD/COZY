const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const verifyToken = asyncHandler(async (req, res, next) => {
    if(req?.headers?.authorization?.startsWith('Bearer')){
        const token = req?.headers?.authorization?.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
            if(error){
                throw new Error('Invalid token')
            }
            req.user = decode
            next()
        })
    }else{
        throw new Error('Required authorization')
    }
})

const isAdmin = asyncHandler(async (req, res, next) => {
    const {_id} = req.user
    const data = await User.findById(_id)
    if(+data.role !== 1){
        throw new Error('Require admin role')
    }
    next()
})

const isTeacher = asyncHandler(async (req, res, next) => {
    const {_id} = req.user
    const data = await User.findById(_id)
    if(+data.role !== 2){
        throw new Error('Require teacher role')
    }
    next()
})

module.exports = {
    verifyToken,
    isAdmin,
    isTeacher
}