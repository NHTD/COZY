const router = require('express').Router()
const controllers = require('../controllers/order')
const {verifyToken, isAdmin, isTeacher} = require('../middlewares/verifyToken')

router.post('/', [verifyToken], controllers.createOrder)
router.get('/getUser', [verifyToken], controllers.getUserOrder)
router.get('/', [verifyToken], controllers.getOrders)

router.post('/:oid', [verifyToken, isAdmin], controllers.updateStatusOrder)

module.exports = router