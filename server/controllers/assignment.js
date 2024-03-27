const asyncHandler = require('express-async-handler')
const Assignment = require('../models/assignment')
const Room = require('../models/room')

const createAssignmentForRoom = asyncHandler(async (req, res) => {
    const {assignment_name, description, deadline, rid} = req.body

    if(!assignment_name || !description || !deadline){
        throw new Error('Missing inputs')
    }

    const assignment = await Assignment.create({assignment_name, description, deadline, room: rid}) 

    await Room.findByIdAndUpdate(rid, {$push: {assignments: assignment._id}})

    return res.status(200).json({
        status: assignment ? true : false,
        mes: assignment ? assignment : 'Can not create assignment for this room'
    })
})

const updateAssignment = asyncHandler(async (req, res) => {
    const {aid} = req.params

    if(Object.keys(req.body).length === 0){
        throw new Error('Missing inputs')
    }

    const updateData = await Assignment.findByIdAndUpdate(aid, req.body, {new: true})

    return res.status(200).json({
        status: updateData ? true : false,
        mes: updateData ? 'Updated data' : 'Can not update assignment. Something went wrong'
    })
})

const deleteAssignment = asyncHandler(async (req, res) => {
    const {aid} = req.params

    if(Object.keys(req.body).length === 0){
        throw new Error('Missing inputs')
    }

    const updateData = await Assignment.findByIdAndUpdate(aid)

    return res.status(200).json({
        status: updateData ? true : false,
        mes: updateData ? 'Updated data' : 'Can not update assignment. Something went wrong'
    })
})
  
module.exports = {
    createAssignmentForRoom,
    updateAssignment,
    deleteAssignment
}