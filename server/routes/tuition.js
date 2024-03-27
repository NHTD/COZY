const router = require('express').Router()
const controllers = require('../controllers/tuition')
const {verifyToken, isAdmin, isTeacher} = require('../middlewares/verifyToken')

router.post('/', [verifyToken, isTeacher], controllers.createTuition)

module.exports = router