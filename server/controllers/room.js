const asyncHandler = require('express-async-handler')
const Room = require('../models/room')
const User = require('../models/user')
// const Schedule = require('../models/schedule')
const Assignment = require('../models/assignment')

const createRoom = asyncHandler(async (req, res) => {
    const { room_name, capacity, location, teacher, course } = req.body; 

    if (!room_name || !capacity || !location || !teacher || !course) {
        throw new Error('Missing inputs');
    }

    const createdRoom = await Room.create(req.body);

    return res.status(200).json({
        status: createdRoom ? true : false,
        message: createdRoom ? 'Room created successfully' : 'Cannot create room. Something went wrong'
    });
});

const getAllRooms = asyncHandler(async (req, res) => {
    const getRooms = await Room.find()

    return res.status(200).json({
        status: getRooms ? true : false,
        mes: getRooms ? getRooms : 'Can not get all rooms'
    })
})

const getRoomById = asyncHandler(async (req, res) =>{
    const {rid} = req.params

    const response = await Room.findById(rid)

    return res.status(200).json({
        status: response ? true : false,
        mes: response ? response : 'Can not get room. Something went wrong'
    })
})

const updateRoomById = asyncHandler(async (req, res) => {
    const {rid} = req.params

    const response = await Room.findByIdAndUpdate(rid, req.body, {new: true})
    
    if(Object.keys(req.body).length === 0){
        return res.status(500).json({
            status: false,
            mes: 'Missing inputs'
        })
    }

    return res.status(200).json({
        status: response ? true : false,
        mes: response ? 'Updated successful' : 'Can not update room. Something went wrong'
    })
})

const deleteRoomById = asyncHandler(async (req, res) => {
    const {rid} = req.params

    const deleteRoom = await Room.findByIdAndDelete(rid)

    return res.status(200).json({
        status: deleteRoom ? true : false,
        mes: deleteRoom ? 'Deleted room' : 'Cannot delete room. Something went wrong'
    })
})

const addUsersToRoom  = asyncHandler(async (req, res) => {
    const { rid } = req.params;
    const { userIds } = req.body;

    const room = await Room.findById(rid);
    if (!room) {
        throw new Error('Room not found');
    }

    let isNewUserAdded = false;
    for (const userId of userIds) {
        if (!room.users.includes(userId)) {
            isNewUserAdded = true; 
            room.users.push(userId);
        }
    }

    if (!isNewUserAdded) {
        return res.status(200).json({ 
            status: false, 
            mes: 'Users already exist in the room' 
        });
    } else {
        await room.save();
    }

    return res.status(200).json({ 
        status: true, 
        mes: 'Users added to the room successfully.' 
    });
})


const deleteUserFromRoom  = asyncHandler(async (req, res) => {
    const {rid} = req.params
    const {userIds} = req.body

    const room = await Room.findById(rid)
    if(!room){
        return res.status(500).json({
            status: false,
            mes: 'Can not find room.'
        })
    }
    if(room.users.length === 0){
        return res.status(200).json({
            status: false,
            mes: 'Can not find user to delete'
        })
    }else{
        for(const userId of userIds){
            if(room.users.includes(userId)){
                room.users.pop(userId)
                await room.save()
            }
        }
    }

    return res.status(200).json({
        status: true,
        mes: 'Delete user from room successfully'
    })
})

const getAllStudentInRoom = asyncHandler(async (req, res) => {
    const { rid } = req.params;
    const room = await Room.findById(rid);

    if (!room) {
        return res.status(404).json({ success: false, message: 'Room not found.' });
    }

    const usersInRoom = await User.find({ _id: { $in: room.users } }).select('first_name last_name email mobile');

    return res.status(200).json({ 
        status: true, 
        mes: usersInRoom 
    });
})

const getAllAssignmentInRoom = asyncHandler(async(req, res) => {
    const {rid} = req.params

    const room = await Room.findById(rid)
    if(!room){
        return res.status(200).json({
            status: false,
            mes: 'Room is not found'
        })
    }

    const response = await Assignment.find({_id: {$in: room.assignments}})

    return res.status(200).json({
        status: response ? true : false,
        mes: response ? response : 'Can not get all assignments in this room'
    })
})
  

// const submitAssignment = asyncHandler(async (req, res) => {
//     const {_id} = req.user
//     const {rid} = req.params
    
//     if(!req.files){
//         throw new Error('Missing inputs')
//     }

//     const room = await Room.findById(rid)
//     const isExistedUser = room?.users?.find(u => u._id.toString() === _id.toString())
//     if(isExistedUser){
//         const submitFiles = await Room.findByIdAndUpdate(rid, {$push: {files: {$each: req.files.map(el => el.path)}}}, {new: true})
//         return res.status(200).json({
//             status: submitFiles ? true : false,
//             mes: submitFiles ? submitFiles : 'Can not send file'
//         })
//     }else{
//         throw new Error('User not found in this room')
//     }
// })

// const submitAssignment = asyncHandler(async (req, res) => {
//     const assignmentId = req.params.assignmentId;
//     const submissionText = req.body.submissionText;
//     const files = req.files;

//     const result = await Assignment.updateOne(
//       { _id: assignmentId },
//       { $push: { 
//           submit: {
//             $each: files.map(file => ({
//               postedBy: req.user,
//               comment: submissionText,
//               file: file.path
//             }))
//           } 
//         } 
//       }
//     );

//     if (result.nModified > 0) {
//       res.status(200).json({ message: 'Assignment submitted successfully' });
//     } else {
//       res.status(404).json({ error: 'Assignment not found' });
//     }
// });

const getUserInRoom = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const response = await Room.find({ users: _id });

    return res.status(200).json({
        status: response ? true : false,
        mes: response ? response : 'User is not found'
    });
})      



module.exports = {
    createRoom,
    getAllRooms,
    updateRoomById,
    deleteRoomById,
    addUsersToRoom,
    deleteUserFromRoom,
    getAllStudentInRoom,
    getRoomById,
    getAllAssignmentInRoom,
    getUserInRoom
}