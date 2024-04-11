const router = require('express').Router()
const controllers = require('../controllers/assignment')
const {verifyToken, isAdmin, isTeacher} = require('../middlewares/verifyToken')
const upload = require('../configs/cloudinary')

router.post("/", [verifyToken, isAdmin], controllers.createAssignment)
router.get("/", [verifyToken], controllers.getAllAssignment)
router.put('/submit/:aid', [verifyToken], upload.array('files', 10), controllers.submitAssignment)

module.exports = router