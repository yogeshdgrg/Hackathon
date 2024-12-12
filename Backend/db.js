const mongoose = require("mongoose")

const connectMongoDB = async(url) =>{
    if(!url) return null
    return mongoose.connect(url)
}

module.exports = {connectMongoDB}