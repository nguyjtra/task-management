const mongoose=require('mongoose')

module.exports.connect=async()=>{
    
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connect to database success')

    } catch (error) {
         console.log(' can not connect to database ')
    }
}