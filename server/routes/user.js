const router = require('express').Router()
const controllers = require('../controllers/user')
const {verifyToken, isAdmin, isTeacher} = require('../middlewares/verifyToken')

router.post('/register', controllers.register)
router.post('/', controllers.login)
router.post('/createuser', controllers.createUsers)
router.get('/', [verifyToken, isAdmin], controllers.getAllUsers)
router.get('/refreshtoken', controllers.refreshAccessToken)
router.get('/getOne', [verifyToken], controllers.getUserById)
router.post('/forgotPassword', controllers.forgotPassword)
router.put('/resetPassword', controllers.resetPassword)
router.put('/updateuser', [verifyToken], controllers.updateUser)
router.get('/getAllStudent', [verifyToken, isTeacher], controllers.getAllStudentByTeacher)
router.post('/updatecourse', [verifyToken], controllers.updateCourse)

router.put('/:uid', [verifyToken, isAdmin], controllers.updateUserByAdmin)
router.delete('/:uid', [verifyToken, isAdmin], controllers.deleteUserById)

module.exports = router