const Tuition = require('../models/tuition')
const asyncHandler = require('express-async-handler')

const createTuition = asyncHandler(async (req, res) => {
    const {fee, deadline, status} = req.body

    if(!fee || !deadline || !status){
        throw new Error('Missing inputs')
    }

    const data = await Tuition.create({
        ...req.body,
        deadline: Date.now() + +deadline*24*60*60*1000
    })

    return res.status(200).json({
        status: data ? true : false,
        mes: data ? data : 'Can not create tuition fees, something went wrong'
    })
})
module.exports = {
    createTuition,
}