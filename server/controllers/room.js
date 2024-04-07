const asyncHandler = require('express-async-handler')
const Room = require('../models/room')
const User = require('../models/user')
const Schedule = require('../models/schedule')
const mongoose = require('mongoose')

const createRoom = asyncHandler(async (req, res) => {
    const { room_name, capacity, location, teacher, course } = req.body; 
    console.log({ room_name, capacity, location, teacher, course })

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
    const { rid } = req.params;
    const { userIds } = req.body;

    // Kiểm tra xem có người dùng được gửi lên không
    if (!userIds || userIds.length === 0) {
        return res.status(400).json({ status: false, mes: 'No users provided' });
    }

    // Tìm kiếm phòng cần cập nhật
    const room = await Room.findById(rid);

    if (!room) {
        return res.status(404).json({ status: false, mes: 'Room not found' });
    }

    // Thêm userIds vào trường users của phòng
    room.users.push(...userIds);

    // Lưu lại phòng đã cập nhật
    const updatedRoom = await room.save();

    return res.status(200).json({
        status: true,
        mes: 'Users added to room successfully',
        updatedRoom
    });
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

    // Chuyển đổi các chuỗi ID người dùng thành đối tượng ObjectId
    const userIdObjects = userIds.map(id => new mongoose.Types.ObjectId(id));

    // Kiểm tra xem mỗi ID người dùng trong userIdObjects đã tồn tại trong room.users chưa
    const isNewUserAdded = userIdObjects.some(userId => !room.users.includes(userId));

    if (!isNewUserAdded) {
        return res.status(200).json({ 
            success: true, 
            message: 'Users added to the room.' 
        });
    } else {
        room.users.push(...userIdObjects);
        await room.save();
    }

    return res.status(200).json({ 
        success: true, 
        message: 'Users added to the room successfully.' 
    });
})

const addTeacherToRoom  = asyncHandler(async (req, res) => {
    const {uid, rid} = req.body

    const room = await Room.findById(rid)
    if(!room){
        throw new Error('Room not found')
    }

    // const user = await User.find({_id: {$in: uid}, role: 'user'})
    const user = await User.findById(uid)

    if(user.role === 'teacher'){
        if(room.users.includes(uid)){
            throw new Error(`User with ID ${user._id} is already added to the room.`)
        }else{
            room.users.push(user._id)
            await room.save()
        }
    }else{
        throw new Error(`User with ID ${user._id} is not a regular user.`)
    }

    return res.status(200).json({ 
        success: true, 
        message: 'Teacher added to the room successfully.' 
    });
})

const deleteUserFromRoom  = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const {uid, rid} = req.body

    const room = await Room.findById(rid)
    if(!room){
        throw new Error('Room not found')
    }

    // const user = await User.find({_id: {$in: uid}, role: 'user'})
    const user = await User.findById(uid)

    if(_id){
        if(room.users.includes(uid)){
            room.users.pop(user._id)
            await room.save()
        }else{
            throw new Error(`User with id ${user._id} is not existed in the room.`)
        }
    }else{
        throw new Error(`User with id ${user._id} is not a teacher.`)
    }

    return res.status(200).json({ 
        success: true, 
        mes: 'Users added to the room successfully.' 
    });
})

const addScheduleToRoom = asyncHandler(async (req, res) => {
    const { rid, sid } = req.body;

    let room = await Room.findById(rid);
    if (!room) {
        throw new Error('Room not found')
    }

    const schedule = await Schedule.findById(sid);
    if (!schedule) {
        throw new Error('Schedule not found')
    }

    if (room.schedule) {
        throw new Error('This room is already assigned a schedule.')
    }

    const existingRoomWithSchedule = await Room.findOne({ schedule: sid });
    if (existingRoomWithSchedule) {
        throw new Error('This schedule is already assigned to another room.');
    }
    
    room.schedule = sid;
    await room.save();

    return res.status(200).json({ 
        success: true, 
        message: 'Schedule added to the room successfully.', 
        room 
    });
});

const getAllStudentInRoom = asyncHandler(async (req, res) => {
    const { rid } = req.params;
    const room = await Room.findById(rid);

    if (!room) {
        return res.status(404).json({ success: false, message: 'Room not found.' });
    }

    const usersInRoom = await User.find({ _id: { $in: room.users } }).select('first_name last_name email mobile');

    return res.status(200).json({ 
        success: true, 
        usersInRoom 
    });
})

const submitAssignment = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const {rid} = req.params
    
    if(!req.files){
        throw new Error('Missing inputs')
    }

    const room = await Room.findById(rid)
    const isExistedUser = room?.users?.find(u => u._id.toString() === _id.toString())
    if(isExistedUser){
        const submitFiles = await Room.findByIdAndUpdate(rid, {$push: {files: {$each: req.files.map(el => el.path)}}}, {new: true})
        return res.status(200).json({
            status: submitFiles ? true : false,
            mes: submitFiles ? submitFiles : 'Can not send file'
        })
    }else{
        throw new Error('User not found in this room')
    }
})

module.exports = {
    createRoom,
    getAllRooms,
    updateRoomById,
    deleteRoomById,
    addUsersToRoom,
    deleteUserFromRoom,
    addScheduleToRoom,
    getAllStudentInRoom,
    submitAssignment,
    addTeacherToRoom,
    getRoomById
}