const router = require('express').Router()
const controllers = require('../controllers/assignment')
const {verifyToken, isAdmin, isTeacher} = require('../middlewares/verifyToken')

router.post("/", [verifyToken, isTeacher], controllers.createAssignmentForRoom)

module.exports = router