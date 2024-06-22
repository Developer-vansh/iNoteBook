const mongoose=require('mongoose')
console.log(process.env.MONGO_URI)
const mongoURI=process.env.MONGO_URI

const connectToMongo=()=>{
    mongoose.connect(mongoURI,{
        'dbName':'iNotebook'
    })
    .then(()=>console.log("Connected To Mongo SuccessFully"))
}

module.exports=connectToMongo