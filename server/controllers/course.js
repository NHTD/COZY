const asyncHandler = require('express-async-handler')
const Course = require('../models/course')

const createCourse = asyncHandler(async (req, res) => {
    const {course_name, status, start_date, course_length, price, image, title, des} = req.body
    if(!course_name || !status || !start_date || !course_length || !price || !image || !title || !des){
        throw new Error('Missing inputs')
    }

    const data = await Course.create(req.body)

    return res.status(200).json({
        status: data ? true : false,
        mes: data ? data : 'Can not create course'
    })
})

const getAllCourses = asyncHandler(async (req, res) => {
    const response = await Course.find();

    return res.status(200).json({
        status: response ? true : false,
        mes: response ? response : 'Can not get all courses. Something went wrong'
    })
})

const getCourse = asyncHandler(async (req, res) => {
    const {cid} = req.params
    const response = await Course.findById(cid);

    return res.status(200).json({
        status: response ? true : false,
        mes: response ? response : 'Can not get all courses. Something went wrong'
    })
})

module.exports = {
    createCourse,
    getAllCourses,
    getCourse
}