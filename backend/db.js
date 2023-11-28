const mongoose=require('mongoose')
const mongoURI='mongodb://127.0.0.1:27017'

const connectToMongo=()=>{
    mongoose.connect(mongoURI,{
        'dbName':'iNotebook'
    })
    .then(()=>console.log("Connected To Mongo SuccessFully"))
}

module.exports=connectToMongo