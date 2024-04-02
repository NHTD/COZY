const room = require('./room')
const user = require('./user')
const schedule = require('./schedule')
const assignment = require('./assignment')
const tuition = require('./tuition')
const order = require('./order')
const course = require('./course')
const courseCategory = require('./courseCategory')

const initRoutes = app => {
    app.use('/api/user', user)
    app.use('/api/room', room)
    app.use('/api/schedule', schedule)
    app.use('/api/assignment', assignment)
    app.use('/api/tuition', tuition)
    app.use('/api/order', order)
    app.use('/api/course', course)
    app.use('/api/courseCategory', courseCategory)
}

module.exports = initRoutes