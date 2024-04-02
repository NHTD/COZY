const asyncHandler = require('express-async-handler')
const courseCategory = require('../models/courseCategory')

const createCategory = asyncHandler(async(req, res) => {
    const {title} = req.body
    if(!title){
        throw new Error('Missing inputs')
    }

    const response = await courseCategory.create(req.body)
    return res.status(200).json({
        status: response ? true : false,
        msg: response ? 'Create successful' : 'Cannot create category'
    })
})

const getCategories = asyncHandler(async(req, res) => {
    const response = await courseCategory.find()

    return res.status(200).json({
        status: response ? true : false,
        msg: response ? response : 'Can not get category'
    })
})

module.exports = {
    createCategory,
    getCategories
}