const router = require('express').Router()
const controllers = require('../controllers/course')
const {verifyToken, isAdmin, isTeacher} = require('../middlewares/verifyToken')
const upload = require('../configs/cloudinary')

router.post('/', [verifyToken, isAdmin], upload.single('image'), controllers.createCourse)
router.get('/', controllers.getAllCourses)

router.get('/:cid', controllers.getCourse)

router.put('/:cid',[verifyToken, isAdmin], upload.single('image'), controllers.updateCourse)
router.delete('/:cid',[verifyToken, isAdmin], upload.single('image'), controllers.deleteCourse)

module.exports = router