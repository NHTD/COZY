const asyncHandler = require('express-async-handler')
const Assignment = require('../models/assignment')
const Room = require('../models/room')
const assignment = require('../models/assignment')

const createAssignment = asyncHandler(async (req, res) => {
    const {assignment_name, description, deadline, room} = req.body

    if(!assignment_name || !description || !deadline){
        throw new Error('Missing inputs')
    }

    const assignment = await Assignment.create({assignment_name, description, deadline, room}) 

    await Room.findByIdAndUpdate(room, {$push: {assignments: assignment._id}})

    return res.status(200).json({
        status: assignment ? true : false,
        mes: assignment ? 'Create assignment successfully' : 'Can not create assignment for this room'
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


    return res.status(200).json({
        status: updateData ? true : false,
        mes: updateData ? 'Updated data' : 'Can not update assignment. Something went wrong'
    })
})


const getAllAssignment = asyncHandler(async (req, res) => {
    const response = await Assignment.find()

    return res.status(200).json({
        status: response ? true : false,
        mes: response ? response : 'Can not get assignment. Something went wrong'
    })
})

const submitAssignment = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const { comment } = req.body;
    let files = [];

    if (req.files) {
        files = req.files.map(el => el.path);
    } 

    console.log("file: ", files)
    console.log("comment", comment)

    const submission = {
        postedBy: req.user,
        comment: comment,
        files: files
    };

    const submitAssignment = await Assignment.findById(aid)
    const checkUserSubmit = submitAssignment?.submit?.find(el => el.postedBy.toString() === req.user._id.toString())   
    
    if(checkUserSubmit){
        await Assignment.updateOne({
            submit: {$elemMatch: checkUserSubmit}
        }, {
            $set: {"submit.$.comment": comment, "submit.$.files": files}
        }, {
            new: true
        })
    }else{
        await Assignment.findByIdAndUpdate(
            { _id: aid },
            { $push: { submit: submission } },
            {new: true}
        );
    }

    const response = await Assignment.findById(aid)

    return res.status(200).json({
        status: response ? true : false,
        mes: response ? 'Submitted successfully' : 'Can not submit assignment'
    });
});


module.exports = {
    createAssignment,
    updateAssignment,
    deleteAssignment,
    getAllAssignment,
    submitAssignment
}