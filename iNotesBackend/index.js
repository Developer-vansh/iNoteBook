const connectToMongo=require('./db')
const express = require('express')
const app = express()
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()
app.get('/', (req, res) => {
  res.send('Hello iNotes')
})
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(5000,()=>{
    console.log('iNotebook listening on 5000')
})

connectToMongo();