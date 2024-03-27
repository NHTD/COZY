const router = require('express').Router()
const controllers = require('../controllers/room')
const {verifyToken, isAdmin, isTeacher} = require('../middlewares/verifyToken')
const upload = require('../configs/cloudinary')

router.post('/',[verifyToken, isTeacher], controllers.createRoom)
router.post('/addUsers', [verifyToken, isTeacher], controllers.addUsersToRoom)
router.get('/', [verifyToken, isTeacher], controllers.getAllRooms)
router.delete('/deleteUser', [verifyToken, isTeacher], controllers.deleteUserFromRoom)
router.post('/addSchedule', [verifyToken, isTeacher], controllers.addScheduleToRoom)

router.put('/submit/:rid', [verifyToken], upload.array('files', 10), controllers.submitAssignment)
router.put('/getAllStudentInRoom/:rid', [verifyToken, isTeacher], controllers.getAllStudentInRoom)
router.put('/:rid', controllers.updateRoomById)
router.delete('/:rid', controllers.deleteRoomById)

module.exports = router