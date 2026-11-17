const mongoose = require('mongoose')

const connectDB = async() => {
try{
    await mongoose.connect(process.env.MONGODB_URL)

    console.log('MonogoDB connected')
}catch(error){
    console.error('Error connecting to MonogoDB:', error.message)
}


}
module.exports = connectDB