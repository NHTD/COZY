const express = require('express')
require('dotenv').config()
const initRoutes = require('./routes/index')
const DBConnection = require('./configs/DBConnection')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'PUT', 'GET', 'DELETE']
}))
app.use(cookieParser())
const port = process.env.PORT || 8888
app.use(express.urlencoded({extended: true}))
app.use(express.json())

DBConnection()  

initRoutes(app)

app.listen(port, () => {
    console.log('Server running on the port ' + port);
})