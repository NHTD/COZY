const mongoose = require('mongoose')

const DBConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGOOSE_URI)
        if(connect.connection.readyState === 1){
            console.log('Connected to mongoose!');
        }else{
            console.log('Connecting to mongoose!');
        }
    } catch (error) {
        throw new Error('Cannot connect to mongoose ' + error) 
    }
}

module.exports = DBConnection