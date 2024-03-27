const asyncHandler = require('express-async-handler')
const Order = require('../models/order')
const User = require('../models/user')

const createOrder = asyncHandler(async(req, res) => {
    const {_id} = req.user
    // const {tuition} = req.body
    
    const userCart = await User.findById(_id).select('cart').populate('cart.course', 'course_name price')

    const courses = userCart?.cart?.map(el => ({
        course: el.course._id
    }))

    let total = userCart?.cart?.reduce((sum, el) => el.course.price + sum, 0)

    const createData = {courses, total, orderBy: _id}

    const response = await Order.create(createData)
    return res.status(200).json({
        success: response ? true : false,
        mes: response? response : 'Something went wrong'
    })
})

const updateStatusOrder = asyncHandler(async(req, res) => {
    const {oid} = req.params
    const {status} = req.body
    if(!status){
        throw new Error('Missing inputs')
    }

    if (!['Canceled', 'Processing', 'Succeed'].includes(status)) {
        throw new Error('Invalid status');
    }

    const updateData = await Order.findByIdAndUpdate(oid, {status}, {new: true})

    return res.status(200).json({
        status: updateData ? true : false,
        mes: updateData ? 'Updated' : 'Can not update order status'
    })
})

const getUserOrder = asyncHandler(async(req, res) => {
    const {_id} = req.user

    const getOneUser = await Order.find({orderBy: _id})

    return res.status(200).json({
        status: getOneUser ? true : false,
        mes: getOneUser ? getOneUser : 'Can not get user in order'
    })
})

const getOrders = asyncHandler(async(req, res) => {
    const getAllOrder = await Order.find()

    return res.status(200).json({
        status: getAllOrder ? true : false,
        mes: getAllOrder ? getAllOrder : false
    })
})

module.exports = {
    createOrder,
    updateStatusOrder,
    getUserOrder,
    getOrders
}