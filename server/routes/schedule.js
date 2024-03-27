const router = require('express').Router()
const controllers = require('../controllers/schedule')
const {verifyToken, isAdmin, isTeacher} = require('../middlewares/verifyToken')

router.post('/', [verifyToken, isTeacher], controllers.createSchedule)
router.get('/', [verifyToken, isTeacher], controllers.getSchedules)

router.get('/:sid', controllers.getScheduleById)
router.put('/:sid', [verifyToken, isTeacher], controllers.updateSchedule)
router.delete('/:sid', [verifyToken, isTeacher], controllers.deleteSchedule)

module.exports = router