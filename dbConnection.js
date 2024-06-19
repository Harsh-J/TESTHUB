const mongoose=require('mongoose')
async function connectDB(url){
    const result=await mongoose.connect(url)
    return result
}

module.exports=connectDB