const router = require('express').Router()
const controllers = require('../controllers/course')
const {verifyToken, isAdmin, isTeacher} = require('../middlewares/verifyToken')

router.post('/', [verifyToken, isTeacher], controllers.createCourse)
router.get('/', controllers.getAllCourses)
router.get('/:cid', controllers.getCourse)

module.exports = router