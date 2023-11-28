const connectToMongo=require('./db')
const express = require('express')
const app = express()
const cors=require('cors')
app.get('/', (req, res) => {
  res.send('Hello world')
})
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(5000,()=>{
    console.log('iNotebook listening on 5000')
})

connectToMongo();