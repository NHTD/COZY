const router = require('express').Router()
const controllers = require('../controllers/courseCategory')
const {verifyToken, isAdmin, isTeacher} = require('../middlewares/verifyToken')

router.post('/', controllers.createCategory)
router.get('/', [verifyToken, isAdmin], controllers.getCategories)

module.exports=router
