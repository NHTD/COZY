const asyncHandler = require('express-async-handler')
const Schedule = require('../models/schedule')
const Course = require('../models/course')

const createSchedule = asyncHandler(async (req, res) => {
    const {date, start_hour, end_hour, courseId} = req.body

    if(!date || !start_hour || !end_hour || !courseId){
        throw new Error('Missing inputs')
    }

    const course = await Course.findById(courseId)
    if (!course) {
        throw new Error('Course not found')
    }

    const scheduleData = {
        date,
        start_hour,
        end_hour,
        course: courseId
    }

    const generateSchedule = await Schedule.create(scheduleData)

    return res.status(200).json({
        status: generateSchedule ? true : false,
        mes: generateSchedule ? generateSchedule : 'Can not create schedule. Something went wrong'
    })
})
const deleteSchedule = asyncHandler(async (req, res) => {
    const {sid} = req.params

    const deleteData = await Schedule.findByIdAndDelete(sid)
    return res.status(200).json({
        status: deleteData ? true : false,
        mes: deleteData ? 'Delete is successful' : false
    })
})

const updateSchedule = asyncHandler(async (req, res) => {
    const {sid} = req.params
    if(Object.keys(req.body).length === 0){
        throw new Error('Missing inputs')
    }

    const deleteData = await Schedule.findByIdAndUpdate(sid, req.body, {new: true})
    return res.status(200).json({
        status: deleteData ? true : false,
        mes: deleteData ? 'Delete is successful' : false
    })
})

const getSchedules = asyncHandler(async (req, res) => {
    const data = await Schedule.find()
    return res.status(200).json({
        status: data ? true : false,
        mes: data ? data : 'Can not get all schedule'
    })
})

const getScheduleById = asyncHandler(async (req, res) => {
    const {sid} = req.params

    const data = await Schedule.findById(sid)
    return res.status(200).json({
        status: data ? true : false,
        mes: data ? data : 'Can not get schedule'
    })
})

module.exports = {
    createSchedule,
    deleteSchedule,
    updateSchedule,
    getSchedules,
    getScheduleById
}